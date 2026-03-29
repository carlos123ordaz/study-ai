import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileText, Brain, Calendar, Hash, Layers } from 'lucide-react';
import { documentService } from '@/services/documentService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatFileSize, formatDate } from '@/lib/utils';

export function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: doc, isLoading } = useQuery({
    queryKey: ['document', id],
    queryFn: () => documentService.get(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!doc) return null;

  const statusConfig = {
    uploaded: { label: 'Subido', variant: 'info' as const },
    processing: { label: 'Procesando', variant: 'warning' as const },
    processed: { label: 'Procesado', variant: 'success' as const },
    failed: { label: 'Error', variant: 'destructive' as const },
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/documents')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{doc.name}</h1>
          <p className="text-muted-foreground text-sm">{doc.originalName}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Información del documento</CardTitle>
            <Badge variant={statusConfig[doc.status].variant}>
              {statusConfig[doc.status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <InfoRow icon={FileText} label="Tamaño" value={formatFileSize(doc.size)} />
            <InfoRow
              icon={Hash}
              label="Páginas"
              value={doc.pageCount ? `${doc.pageCount} páginas` : '—'}
            />
            <InfoRow
              icon={Layers}
              label="Chunks de texto"
              value={doc.chunkCount ? `${doc.chunkCount} bloques` : '—'}
            />
            <InfoRow
              icon={Calendar}
              label="Subido"
              value={formatDate(doc.createdAt)}
            />
          </div>

          {doc.processingCreditsUsed > 0 && (
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              <p className="text-sm text-muted-foreground">
                Créditos usados en procesamiento:{' '}
                <span className="text-foreground font-medium">
                  {doc.processingCreditsUsed}
                </span>
              </p>
            </div>
          )}

          {doc.status === 'failed' && doc.errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{doc.errorMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {doc.status === 'processed' && (
        <div className="flex gap-3">
          <Button
            variant="gradient"
            onClick={() =>
              navigate('/quizzes/create', { state: { documentIds: [doc._id] } })
            }
          >
            <Brain className="h-4 w-4" />
            Generar quiz con este documento
          </Button>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-muted p-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FileText,
  Brain,
  TrendingUp,
  Plus,
  ArrowRight,
  Coins,
  Clock,
  Award,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { documentService } from '@/services/documentService';
import { quizService } from '@/services/quizService';
import { creditService } from '@/services/creditService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { cn, formatRelativeTime, getScoreBadgeColor } from '@/lib/utils';

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  iconColor,
  loading,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  iconColor: string;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl font-bold">{value}</p>
            )}
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className={cn('rounded-xl p-3', iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const { data: docsData, isLoading: docsLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => documentService.list(1, 3),
  });

  const { data: quizzesData, isLoading: quizzesLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizService.list(1, 3),
  });

  const { data: attemptsData, isLoading: attemptsLoading } = useQuery({
    queryKey: ['attempts'],
    queryFn: () => quizService.listAttempts(1, 5),
  });

  const { data: credits } = useQuery({
    queryKey: ['credits'],
    queryFn: () => creditService.getBalance(),
  });

  const recentAttempts = attemptsData?.attempts ?? [];
  const avgScore =
    recentAttempts.length > 0
      ? Math.round(recentAttempts.reduce((sum, a) => sum + a.score, 0) / recentAttempts.length)
      : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Hola, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('es', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Button onClick={() => navigate('/quizzes/create')} variant="gradient">
          <Plus className="h-4 w-4" />
          Nuevo quiz
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Coins}
          label="Créditos"
          value={credits ?? user?.credits ?? 0}
          sub="disponibles"
          iconColor="bg-yellow-500/15 text-yellow-400"
        />
        <StatCard
          icon={FileText}
          label="Documentos"
          value={docsData?.total ?? 0}
          iconColor="bg-blue-500/15 text-blue-400"
          loading={docsLoading}
        />
        <StatCard
          icon={Brain}
          label="Quizzes"
          value={quizzesData?.total ?? 0}
          iconColor="bg-purple-500/15 text-purple-400"
          loading={quizzesLoading}
        />
        <StatCard
          icon={TrendingUp}
          label="Promedio"
          value={avgScore !== null ? `${avgScore}%` : '—'}
          sub="últimos intentos"
          iconColor="bg-green-500/15 text-green-400"
          loading={attemptsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Documentos recientes</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/documents')}
              className="text-muted-foreground"
            >
              Ver todos <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {docsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))
            ) : (docsData?.documents ?? []).length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No hay documentos aún</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => navigate('/documents')}
                >
                  Subir PDF
                </Button>
              </div>
            ) : (
              (docsData?.documents ?? []).map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => navigate(`/documents/${doc._id}`)}
                >
                  <div className="rounded-lg bg-blue-500/15 p-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.pageCount ? `${doc.pageCount} páginas · ` : ''}
                      {formatRelativeTime(doc.createdAt)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      doc.status === 'processed'
                        ? 'success'
                        : doc.status === 'failed'
                        ? 'destructive'
                        : 'warning'
                    }
                  >
                    {doc.status === 'processed'
                      ? 'Listo'
                      : doc.status === 'failed'
                      ? 'Error'
                      : 'Procesando'}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent attempts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Intentos recientes</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/quizzes')}
              className="text-muted-foreground"
            >
              Ver todos <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {attemptsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))
            ) : recentAttempts.length === 0 ? (
              <div className="text-center py-8">
                <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No hay intentos aún</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => navigate('/quizzes/create')}
                >
                  Crear quiz
                </Button>
              </div>
            ) : (
              recentAttempts.map((attempt) => {
                const quiz = typeof attempt.quizId === 'object' ? attempt.quizId : null;
                return (
                  <div
                    key={attempt._id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => navigate(`/quizzes/results/${attempt._id}`)}
                  >
                    <div className="rounded-lg bg-purple-500/15 p-2">
                      <Brain className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {quiz ? (quiz as { title: string }).title : 'Quiz'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatRelativeTime(attempt.createdAt)}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-sm font-bold px-2 py-1 rounded-full border',
                        getScoreBadgeColor(attempt.score)
                      )}
                    >
                      {attempt.score}%
                    </span>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      {(user?.credits ?? 0) < 20 && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm font-semibold">Créditos bajos</p>
                <p className="text-xs text-muted-foreground">
                  Solo te quedan {user?.credits} créditos
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
              onClick={() => navigate('/credits')}
            >
              Recargar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

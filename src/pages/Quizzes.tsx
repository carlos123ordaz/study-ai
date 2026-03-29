import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Brain, Plus, Play, Clock, Trash2, Loader2 } from 'lucide-react';
import { quizService } from '@/services/quizService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { useUiStore } from '@/store/uiStore';
import { cn, DIFFICULTY_LABELS, DIFFICULTY_COLORS, formatRelativeTime } from '@/lib/utils';
import { Quiz } from '@/types';

function DeleteConfirm({
  quiz,
  onConfirm,
  onCancel,
  loading,
}: {
  quiz: Quiz;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-card border border-white/[0.08] rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-full bg-red-500/15 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="h-5 w-5 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">Eliminar quiz</h3>
        <p className="text-sm text-muted-foreground text-center mb-1">
          ¿Eliminar <span className="font-medium text-foreground">"{quiz.title}"</span>?
        </p>
        <p className="text-xs text-muted-foreground text-center mb-6">
          Se borrarán también todas sus preguntas e intentos. Los créditos utilizados no se reembolsan.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Quizzes() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useUiStore();
  const [confirmDelete, setConfirmDelete] = useState<Quiz | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizService.list(),
  });

  const { data: attemptsData } = useQuery({
    queryKey: ['attempts'],
    queryFn: () => quizService.listAttempts(1, 50),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quizService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['attempts'] });
      toast.success('Quiz eliminado');
      setConfirmDelete(null);
    },
    onError: (err: Error) => {
      toast.error('Error al eliminar', err.message);
      setConfirmDelete(null);
    },
  });

  const quizzes = data?.quizzes ?? [];
  const attempts = attemptsData?.attempts ?? [];

  const getQuizBestScore = (quizId: string) => {
    const quizAttempts = attempts.filter(
      (a) => (typeof a.quizId === 'string' ? a.quizId : (a.quizId as { _id: string })._id) === quizId
    );
    if (quizAttempts.length === 0) return null;
    return Math.max(...quizAttempts.map((a) => a.score));
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Mis Quizzes</h1>
            <p className="text-muted-foreground mt-1">
              Practica con tus quizzes generados por IA
            </p>
          </div>
          <Button variant="gradient" onClick={() => navigate('/quizzes/create')} className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Nuevo quiz
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <EmptyState
            icon={Brain}
            title="Sin quizzes aún"
            description="Crea tu primer quiz a partir de tus documentos de estudio."
            action={{ label: 'Crear quiz', onClick: () => navigate('/quizzes/create') }}
          />
        ) : (
          <div className="space-y-3">
            {quizzes.map((quiz) => {
              const bestScore = getQuizBestScore(quiz._id);
              return (
                <Card
                  key={quiz._id}
                  className="hover:border-white/[0.15] transition-colors cursor-pointer group"
                  onClick={() => navigate(`/quizzes/${quiz._id}`)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-purple-500/15 p-3 shrink-0">
                        <Brain className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{quiz.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className={cn('font-medium', DIFFICULTY_COLORS[quiz.difficulty])}>
                            {DIFFICULTY_LABELS[quiz.difficulty]}
                          </span>
                          <span>·</span>
                          <span>{quiz.questionCount} preguntas</span>
                          <span>·</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatRelativeTime(quiz.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {bestScore !== null && (
                          <div className="text-right mr-1">
                            <p className="text-xs text-muted-foreground">Mejor</p>
                            <p
                              className={cn(
                                'text-sm font-bold',
                                bestScore >= 80
                                  ? 'text-green-400'
                                  : bestScore >= 60
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                              )}
                            >
                              {bestScore}%
                            </p>
                          </div>
                        )}
                        <Button
                          size="sm"
                          variant="gradient"
                          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/quizzes/${quiz._id}`);
                          }}
                        >
                          <Play className="h-3.5 w-3.5" />
                          Iniciar
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete(quiz);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {confirmDelete && (
        <DeleteConfirm
          quiz={confirmDelete}
          onConfirm={() => deleteMutation.mutate(confirmDelete._id)}
          onCancel={() => setConfirmDelete(null)}
          loading={deleteMutation.isPending}
        />
      )}
    </>
  );
}

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { authService } from '@/services/authService';

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { toast } = useUiStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      toast.error(
        'Error al iniciar sesión',
        error === 'auth_failed' ? 'No se pudo completar la autenticación con Google.' : error
      );
    }
  }, [searchParams, toast]);

  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/50 via-background to-purple-950/30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-brand-500 p-2.5">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              StudyAI
            </span>
          </div>
          <p className="text-muted-foreground">Tu plataforma de estudio inteligente</p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-white/[0.08] bg-card/80 backdrop-blur-sm p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Bienvenido</h1>
            <p className="text-muted-foreground text-sm">
              Inicia sesión para continuar
            </p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            size="lg"
            className="w-full border-white/[0.12] hover:border-white/20 hover:bg-white/5"
          >
            <GoogleIcon />
            Continuar con Google
          </Button>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
              <Sparkles className="h-4 w-4 text-brand-400" />
              <span>Recibe 50 créditos gratis al registrarte</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Al continuar, aceptas nuestros términos de servicio.
        </p>
      </div>
    </div>
  );
}

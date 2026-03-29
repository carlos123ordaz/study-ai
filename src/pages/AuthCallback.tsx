import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { authService } from '@/services/authService';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { setAuthToken } from '@/services/api';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const { toast } = useUiStore();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      toast.error('Error de autenticación', 'Token no recibido.');
      navigate('/login', { replace: true });
      return;
    }

    const init = async () => {
      try {
        setAuthToken(token);
        setToken(token);

        const user = await authService.getMe();
        setUser(user);

        toast.success(`¡Bienvenido, ${user.name.split(' ')[0]}!`);
        navigate('/dashboard', { replace: true });
      } catch {
        toast.error('Error al cargar el perfil', 'Por favor intenta de nuevo.');
        navigate('/login', { replace: true });
      }
    };

    init();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground">Iniciando sesión...</p>
    </div>
  );
}

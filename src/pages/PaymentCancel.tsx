import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        <XCircle className="h-16 w-16 text-yellow-400 mx-auto" />
        <h1 className="text-2xl font-bold">Pago cancelado</h1>
        <p className="text-muted-foreground">
          Cancelaste el proceso de pago. No se realizó ningún cargo.
        </p>
        <Button onClick={() => navigate('/credits')}>Volver a créditos</Button>
      </div>
    </div>
  );
}

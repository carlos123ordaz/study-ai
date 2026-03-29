import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { creditService } from '@/services/creditService';
import { Button } from '@/components/ui/button';

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [creditsAmount, setCreditsAmount] = useState<number | null>(null);

  useEffect(() => {
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      navigate('/credits');
      return;
    }

    // MercadoPago sends these after redirect
    const mpPaymentId = searchParams.get('payment_id') ?? undefined;
    const mpStatus = searchParams.get('status') ?? undefined;

    const confirm = async () => {
      try {
        const payment = await creditService.confirmPayment(paymentId, {
          mpPaymentId,
          mpStatus,
        });

        if (payment.status === 'completed') {
          setCreditsAmount(payment.creditsAmount);
          setStatus('success');
          queryClient.invalidateQueries({ queryKey: ['credits'] });
          queryClient.invalidateQueries({ queryKey: ['credit-transactions'] });
          setTimeout(() => navigate('/credits'), 4000);
        } else {
          setStatus('error');
          setTimeout(() => navigate('/credits'), 4000);
        }
      } catch {
        setStatus('error');
        setTimeout(() => navigate('/credits'), 4000);
      }
    };

    confirm();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        {status === 'processing' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-brand-400 mx-auto" />
            <h1 className="text-2xl font-bold">Procesando pago...</h1>
            <p className="text-muted-foreground">Por favor espera mientras confirmamos tu pago.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <h1 className="text-2xl font-bold">¡Pago exitoso!</h1>
            {creditsAmount && (
              <p className="text-xl text-yellow-400 font-semibold">+{creditsAmount} créditos añadidos</p>
            )}
            <p className="text-muted-foreground">Redirigiendo a créditos...</p>
            <Button onClick={() => navigate('/credits')}>Ir a mis créditos</Button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-red-400 mx-auto" />
            <h1 className="text-2xl font-bold">Error en el pago</h1>
            <p className="text-muted-foreground">
              No se pudo confirmar el pago. Si fue descontado de tu cuenta, contáctanos.
            </p>
            <Button onClick={() => navigate('/credits')}>Volver a créditos</Button>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Coins, Zap, Star } from 'lucide-react';
import { creditService } from '@/services/creditService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUiStore } from '@/store/uiStore';
import { useCreditsBalance } from '@/hooks/useCreditsBalance';
import { cn } from '@/lib/utils';
import { CreditPackage } from '@/types';

const PROVIDER_LABELS: Record<string, string> = {
  mercadopago: 'MercadoPago',
  paypal: 'PayPal',
  mock: 'Demo',
};

function PackageCard({
  pkg,
  index,
  onBuy,
  loading,
}: {
  pkg: CreditPackage;
  index: number;
  onBuy: (idx: number) => void;
  loading: boolean;
}) {
  const isPopular = index === 1;

  return (
    <div
      className={cn(
        'relative rounded-xl border p-6 flex flex-col gap-4 transition-all hover:border-brand-500/40',
        isPopular ? 'border-brand-500/40 bg-brand-500/5' : 'border-white/[0.08]'
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="brand" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            Popular
          </Badge>
        </div>
      )}
      <div>
        <p className="text-lg font-bold">{pkg.label}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-yellow-400">
            {pkg.credits.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">créditos</span>
        </div>
      </div>
      <div className="text-2xl font-bold">${pkg.priceUsd} USD</div>
      <Button
        variant={isPopular ? 'gradient' : 'outline'}
        onClick={() => onBuy(index)}
        loading={loading}
      >
        Comprar
      </Button>
    </div>
  );
}


export function Credits() {
  const { credits } = useCreditsBalance();
  const { toast } = useUiStore();
  const queryClient = useQueryClient();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const { data: packagesData } = useQuery({
    queryKey: ['credit-packages'],
    queryFn: () => creditService.getPackages(),
    select: (data) => {
      // Auto-select first available provider if none selected
      return data;
    },
  });

  const packages = packagesData?.packages ?? [];
  const availableProviders = packagesData?.providers ?? [];
  const isMockOnly = availableProviders.length === 1 && availableProviders[0] === 'mock';
  const activeProvider = selectedProvider ?? availableProviders[0] ?? 'mock';

  const buyMutation = useMutation({
    mutationFn: async (idx: number) => {
      const result = await creditService.initiatePayment(idx, activeProvider);

      // For real providers, redirect to the checkout page
      if (result.checkoutUrl && result.checkoutUrl.startsWith('http')) {
        window.location.href = result.checkoutUrl;
        // Return a sentinel — the page will redirect, this won't resolve
        return null as never;
      }

      // Mock provider: auto-confirm immediately
      const confirmed = await creditService.confirmPayment(result.payment._id);
      return confirmed;
    },
    onSuccess: (payment) => {
      if (!payment) return; // Redirect is in progress
      queryClient.invalidateQueries({ queryKey: ['credit-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['credits'] });
      toast.success('¡Créditos añadidos!', `+${payment.creditsAmount} créditos en tu cuenta.`);
    },
    onError: (err: Error) => {
      toast.error('Error en el pago', err.message);
    },
  });

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Créditos</h1>
        <p className="text-muted-foreground mt-1">Gestiona y recarga tus créditos</p>
      </div>

      {/* Balance */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-yellow-500/20 p-4">
              <Coins className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo actual</p>
              <p className="text-4xl font-bold text-yellow-400">{credits.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">créditos disponibles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-400" />
            Tabla de costos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2 text-muted-foreground">Procesamiento de PDF</p>
              <div className="space-y-1">
                {[
                  ['1–10 páginas', '5 cr'],
                  ['11–30 páginas', '10 cr'],
                  ['31–80 páginas', '20 cr'],
                  ['81–150 páginas', '35 cr'],
                  ['151+ páginas', '50 cr'],
                ].map(([label, cost]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-yellow-400">{cost}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-2 text-muted-foreground">Generación de preguntas</p>
              <div className="space-y-1">
                {[
                  ['Verdadero/Falso', '1 cr/preg'],
                  ['Opción múltiple', '2 cr/preg'],
                  ['Completar espacios', '2 cr/preg'],
                  ['Selección múltiple', '3 cr/preg'],
                  ['Respuesta corta', '3 cr/preg'],
                  ['+ Explicaciones', '+1 cr/preg'],
                  ['Dificultad media', 'x1.2'],
                  ['Dificultad difícil', 'x1.5'],
                ].map(([label, cost]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-yellow-400">{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packages */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Recargar créditos</h2>

          {/* Payment method selector — only shown when real providers are available */}
          {!isMockOnly && availableProviders.length > 0 && (
            <div className="flex items-center gap-2 p-1 rounded-lg border border-white/[0.08] bg-white/[0.03] w-fit">
              {availableProviders.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProvider(p)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    activeProvider === p
                      ? 'bg-brand-500 text-white shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {PROVIDER_LABELS[p] ?? p}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg, idx) => (
            <PackageCard
              key={idx}
              pkg={pkg}
              index={idx}
              onBuy={(i) => buyMutation.mutate(i)}
              loading={buyMutation.isPending}
            />
          ))}
        </div>

        {isMockOnly && (
          <p className="text-xs text-muted-foreground mt-3">
            * Modo demo: los pagos se procesan instantáneamente sin cargo real.
          </p>
        )}
      </div>

    </div>
  );
}

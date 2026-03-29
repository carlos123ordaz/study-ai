import { Link } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Zap,
  CheckCircle,
  Upload,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

const features = [
  {
    icon: Upload,
    title: 'Sube tus materiales',
    description: 'PDFs de clases, apuntes o libros. Los procesamos automáticamente.',
  },
  {
    icon: Brain,
    title: 'IA genera quizzes',
    description: 'Gemini AI crea preguntas basadas exclusivamente en tu contenido.',
  },
  {
    icon: Zap,
    title: '5 tipos de preguntas',
    description: 'Opción múltiple, V/F, completar espacios, respuesta corta y más.',
  },
  {
    icon: CheckCircle,
    title: 'Resultados detallados',
    description: 'Ve tu puntuación, respuestas correctas y explicaciones.',
  },
];

const questionTypes = [
  { label: 'Opción múltiple', color: 'bg-blue-500/20 text-blue-400' },
  { label: 'Selección múltiple', color: 'bg-purple-500/20 text-purple-400' },
  { label: 'Verdadero/Falso', color: 'bg-green-500/20 text-green-400' },
  { label: 'Completar espacios', color: 'bg-yellow-500/20 text-yellow-400' },
  { label: 'Respuesta corta', color: 'bg-pink-500/20 text-pink-400' },
];

export function Landing() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleLogin = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-brand-500 p-1.5">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              StudyAI
            </span>
          </div>
          <div>
            {isAuthenticated ? (
              <Button asChild size="sm">
                <Link to="/dashboard">
                  Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="sm" onClick={handleLogin} variant="gradient">
                Comenzar gratis
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            Estudia más inteligente
            <span className="block bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              con IA a tu lado
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Sube tus PDFs, genera quizzes automáticos basados en tu contenido y domina cada tema
            antes del examen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="gradient" onClick={handleLogin}>
              <Star className="h-5 w-5" />
              Empezar con 50 créditos gratis
            </Button>
            {isAuthenticated && (
              <Button size="xl" variant="outline" asChild>
                <Link to="/dashboard">Ir al dashboard</Link>
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Sin tarjeta de crédito · Login con Google en segundos
          </p>
        </div>

        {/* Question types preview */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
          {questionTypes.map((type) => (
            <span
              key={type.label}
              className={`rounded-full px-3 py-1 text-sm font-medium ${type.color}`}
            >
              {type.label}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              De PDF a quiz en menos de un minuto. La IA trabaja con tu contenido, no con
              conocimiento genérico.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-card p-6 hover:border-brand-500/30 transition-colors"
              >
                <div className="rounded-lg bg-brand-500/15 w-10 h-10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-brand-500/20 bg-gradient-to-b from-brand-500/10 to-transparent p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para estudiar mejor?</h2>
          <p className="text-muted-foreground mb-8">
            Únete y recibe 50 créditos gratuitos al registrarte.
          </p>
          <Button size="xl" variant="gradient" onClick={handleLogin}>
            <Sparkles className="h-5 w-5" />
            Crear cuenta gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 px-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-brand-400" />
          <span className="font-semibold text-brand-400">StudyAI</span>
        </div>
        <p>Tu plataforma de estudio con IA</p>
      </footer>
    </div>
  );
}

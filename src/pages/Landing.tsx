import { Link } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Zap,
  CheckCircle,
  Upload,
  ArrowRight,
  Sparkles,
  FileText,
  LayoutList,
  Clock,
  Shield,
  ChevronRight,
  Star,
  TrendingUp,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Sube tu material',
    description:
      'PDF de clases, apuntes escaneados o libro de texto. Lo que ya tenés, sin formato especial.',
    detail: 'Soporta PDFs hasta 50 MB',
  },
  {
    number: '02',
    icon: Brain,
    title: 'La IA lo convierte',
    description:
      'StudyAI lee tu documento y genera quizzes, flashcards y resúmenes basados en tu contenido.',
    detail: 'Listo en menos de 60 segundos',
  },
  {
    number: '03',
    icon: Target,
    title: 'Estudia y mide',
    description:
      'Respondé el quiz, revisá tus errores y reforzá exactamente lo que falló.',
    detail: 'Con feedback por cada pregunta',
  },
];

const features = [
  {
    icon: LayoutList,
    title: 'Quizzes personalizados',
    description:
      'La IA genera preguntas basadas exclusivamente en tu PDF. Elegís la cantidad, la dificultad y el tipo.',
    badge: 'Feature principal',
    types: [
      { label: 'Opción múltiple', color: 'bg-blue-500/15 text-blue-400' },
      { label: 'Selección múltiple', color: 'bg-purple-500/15 text-purple-400' },
      { label: 'Verdadero/Falso', color: 'bg-green-500/15 text-green-400' },
      { label: 'Completar espacios', color: 'bg-yellow-500/15 text-yellow-400' },
      { label: 'Respuesta corta', color: 'bg-pink-500/15 text-pink-400' },
    ],
    featured: true,
  },
  {
    icon: Zap,
    title: 'Flashcards automáticas',
    description:
      'Los conceptos clave de tus apuntes convertidos en tarjetas para memorización rápida.',
    badge: null,
    types: [],
    featured: false,
  },
  {
    icon: FileText,
    title: 'Resúmenes estructurados',
    description:
      'La IA extrae los puntos más importantes con estructura clara: títulos, conceptos, definiciones.',
    badge: null,
    types: [],
    featured: false,
  },
  {
    icon: CheckCircle,
    title: 'Resultados detallados',
    description:
      'Cada quiz termina con tu puntuación, las respuestas correctas y una explicación de cada una.',
    badge: null,
    types: [],
    featured: false,
  },
];

const useCases = [
  {
    id: 'derecho',
    label: '📚 Derecho',
    title: 'Prepará los parciales de memoria sin morir en el intento',
    body: 'Subí el código, la doctrina o la jurisprudencia. StudyAI genera preguntas sobre los artículos clave, los conceptos legales y los casos. Sin tener que releer 300 páginas la noche antes.',
    quote: '"Subí 200 páginas del código civil y generé un quiz completo en 2 minutos. Aprobé con 9."',
    author: 'Valentina R., estudiante de abogacía',
  },
  {
    id: 'medicina',
    label: '🔬 Medicina',
    title: 'Repasá anatomía, fisiología y farmacología desde tu propio material',
    body: 'La IA hace preguntas sobre los procesos, los nombres técnicos y los mecanismos que aparecen en tus apuntes. El tipo de pregunta que aparece en los exámenes reales.',
    quote: '"Me hizo preguntas sobre fisiología que yo nunca hubiera pensado. Cambió completamente cómo repaso."',
    author: 'Martín C., estudiante de medicina',
  },
  {
    id: 'ingenieria',
    label: '💻 Ingeniería',
    title: 'Convertí las diapositivas en práctica activa',
    body: 'Exportá las slides de la clase como PDF, subílas y en 60 segundos tenés flashcards y quiz de los conceptos más importantes. Ideal para estudiar en el transporte.',
    quote: '"Convirtí las diapositivas de la clase en flashcards para repasar en el colectivo. Ahorro 2 horas por semana."',
    author: 'Lucía M., estudiante de ingeniería de sistemas',
  },
  {
    id: 'economia',
    label: '📊 Economía',
    title: 'Dominá modelos, teorías y casos sin perderte en los apuntes',
    body: 'StudyAI identifica los modelos económicos, las definiciones y los ejemplos en tu material y genera preguntas de comprensión y aplicación.',
    quote: '"El resumen de cada unidad me ahorra 1 hora de lectura por semana. Y el quiz me dice qué no entendí."',
    author: 'Tomás V., estudiante de economía',
  },
  {
    id: 'psicologia',
    label: '🧠 Psicología',
    title: 'Retené teorías, autores y conceptos sin confundirlos',
    body: 'Sube los apuntes por autor o por tema. La IA genera preguntas que te obligan a distinguir entre corrientes, conceptos similares y casos clínicos.',
    quote: '"Llego a los parciales habiendo respondido 3 quizzes de cada tema. El cambio fue total."',
    author: 'Camila F., estudiante de psicología',
  },
];

const testimonials = [
  {
    name: 'Valentina R.',
    role: 'Estudiante de Abogacía',
    avatar: 'VR',
    color: 'bg-purple-500/20 text-purple-300',
    text: 'Antes del parcial de Derecho Constitucional subí el PDF completo y StudyAI me hizo un quiz de 20 preguntas. Aprobé con 9. No lo hubiera hecho solo leyendo.',
  },
  {
    name: 'Mateo G.',
    role: 'Estudiante de Ingeniería de Sistemas',
    avatar: 'MG',
    color: 'bg-blue-500/20 text-blue-300',
    text: 'Yo usaba ChatGPT pero tenía que explicarle todo el contexto cada vez. Con StudyAI subo el archivo y ya. Las preguntas que genera son del nivel de un examen real.',
  },
  {
    name: 'Camila F.',
    role: 'Estudiante de Psicología',
    avatar: 'CF',
    color: 'bg-green-500/20 text-green-300',
    text: 'Los resúmenes que genera son mejor que los míos. Y los flashcards me sirven para repasar de camino a la facu. No cambiaría nada.',
  },
];

const comparison = [
  {
    feature: 'Trabaja con tu material específico',
    studyai: true,
    chatgpt: false,
    manual: false,
  },
  {
    feature: 'Quiz listo en 60 segundos',
    studyai: true,
    chatgpt: false,
    manual: false,
  },
  {
    feature: 'Flashcards automáticas',
    studyai: true,
    chatgpt: false,
    manual: false,
  },
  {
    feature: 'Feedback por pregunta',
    studyai: true,
    chatgpt: 'parcial',
    manual: false,
  },
  {
    feature: 'Sin copiar y pegar el PDF',
    studyai: true,
    chatgpt: false,
    manual: true,
  },
  {
    feature: 'Historial de resultados',
    studyai: true,
    chatgpt: false,
    manual: false,
  },
];

const faqs = [
  {
    q: '¿Cómo funciona exactamente?',
    a: 'Subís un PDF de tus apuntes, clases o libro. StudyAI lo lee, identifica los conceptos más importantes y genera automáticamente quizzes con preguntas, flashcards para memorización y resúmenes estructurados. Todo basado en tu contenido, no en información genérica de internet.',
  },
  {
    q: '¿Mis archivos son privados?',
    a: 'Sí, completamente. Tus documentos se procesan para generar el contenido de estudio y no se comparten con nadie ni se usan para entrenar modelos. Tu material es tuyo y solo vos podés verlo.',
  },
  {
    q: '¿Qué tan precisas son las preguntas?',
    a: 'Las preguntas se basan directamente en el texto de tu documento, lo que las hace mucho más relevantes que preguntar a una IA genérica. Como todo sistema de IA puede cometer errores ocasionalmente — siempre revisá con tu criterio. En general, la calidad es comparable a preguntas de examen reales.',
  },
  {
    q: '¿Sirve para cualquier materia?',
    a: 'Sí. Funciona con cualquier materia que tenga material escrito: Derecho, Medicina, Ingeniería, Economía, Historia, Idiomas, Ciencias, Humanidades. Si tenés un PDF con contenido, StudyAI puede generar preguntas de él.',
  },
  {
    q: '¿Puedo usarlo gratis?',
    a: 'Sí. Al registrarte con Google recibís créditos gratuitos para probar todas las funcionalidades: quizzes, flashcards y resúmenes. No necesitas tarjeta de crédito para empezar.',
  },
  {
    q: '¿En cuánto tiempo tengo mi quiz listo?',
    a: 'En menos de 60 segundos para documentos de hasta 30 páginas. Documentos más largos pueden tardar 1-2 minutos. Podés configurar cuántas preguntas querés y el tipo antes de generarlo.',
  },
  {
    q: '¿Qué tipos de archivos acepta?',
    a: 'Por ahora aceptamos PDFs. Podés subir apuntes escaneados, diapositivas exportadas, libros de texto o cualquier guía de estudio en PDF. El texto debe ser legible (no fotos muy pixeladas).',
  },
  {
    q: '¿Es mejor para repasar o para aprender desde cero?',
    a: 'Es más efectivo para repasar. El flujo ideal es: estudiar y leer el material primero → subir a StudyAI → hacer el quiz para ver qué entendiste y qué no → reforzar lo que falló. Si subís un tema que nunca viste, las preguntas van a resultar muy difíciles porque no tenés base todavía.',
  },
  {
    q: '¿Reemplaza mis propios apuntes?',
    a: 'No reemplaza el proceso de aprender — lo potencia. Sigue siendo valioso que hagas tus apuntes. StudyAI sirve para la etapa de repaso y autoevaluación: convertir lo que ya estudiaste en práctica activa, que es donde realmente se consolida la memoria.',
  },
  {
    q: '¿En qué idioma genera las preguntas?',
    a: 'Las preguntas se generan en el mismo idioma que tu documento. Si subís un PDF en español, el quiz será en español. Si es en inglés, en inglés.',
  },
];

const metrics = [
  { label: 'Documentos procesados', value: '+500' },
  { label: 'Quizzes generados', value: '+3.000' },
  { label: 'Tipos de preguntas', value: '5' },
  { label: 'Segundos para el primer quiz', value: '<60' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function Landing() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleLogin = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  const primaryCTA = isAuthenticated ? (
    <Button size="xl" variant="gradient" asChild>
      <Link to="/dashboard">
        Ir al dashboard <ArrowRight className="h-5 w-5" />
      </Link>
    </Button>
  ) : (
    <Button size="xl" variant="gradient" onClick={handleLogin}>
      <Sparkles className="h-5 w-5" />
      Empezar gratis con Google
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-brand-500 p-1.5">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              StudyAI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#como-funciona" className="hover:text-foreground transition-colors">
              Cómo funciona
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>
          <div>
            {isAuthenticated ? (
              <Button asChild size="sm" variant="gradient">
                <Link to="/dashboard">
                  Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="sm" onClick={handleLogin} variant="gradient">
                Empezar gratis
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="w-[800px] h-[500px] rounded-full bg-brand-500/10 blur-[120px] -translate-y-1/4" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400 mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            Convertí cualquier PDF en una sesión de estudio completa
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            Sube tus apuntes.{' '}
            <span className="block bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Estudia lo que importa.
            </span>
            Llega al examen listo.
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            StudyAI lee tu material y genera quizzes personalizados, flashcards y resúmenes en
            segundos. Sin copiar y pegar en ChatGPT. Sin adivinar qué preguntar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA}
            <Button size="xl" variant="outline" asChild>
              <a href="#como-funciona">
                Ver cómo funciona <ChevronRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-green-400" /> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-400" /> Listo en menos de 30 segundos
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-purple-400" /> Tu material es privado
            </span>
          </p>
        </div>
      </section>

      {/* ── Credibility bar ─────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.02] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-4 font-medium">
            Usado por estudiantes de
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {['📚 Derecho', '🔬 Medicina', '💻 Ingeniería', '📊 Economía', '🧠 Psicología', '🗺️ Historia', '🌐 Idiomas'].map(
              (career) => (
                <span key={career} className="font-medium">
                  {career}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Metrics ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent mb-1">
                {m.value}
              </div>
              <div className="text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
            El problema real
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
            Estudiar con el PDF abierto no es suficiente.
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: '📄',
                title: 'Leer no garantiza recordar',
                body: 'Releer el apunte activa el reconocimiento, no la memoria. Cuando llegás al examen, el material te parece familiar pero no podés reproducirlo.',
              },
              {
                icon: '⏱️',
                title: 'Hacerse preguntas toma horas',
                body: 'Crear tus propias preguntas de repaso es tedioso, lento y terminás evitándolo. El tiempo que no tenés lo usás para seguir leyendo.',
              },
              {
                icon: '🤖',
                title: 'ChatGPT no conoce tu material',
                body: 'Para que funcione tenés que copiar todo el texto, escribir el prompt correcto, formatear la respuesta. Y empezar de cero cada sesión.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-card p-6"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
              Cómo funciona
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              De PDF a sesión de repaso en menos de un minuto.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tres pasos. Sin configuración. Sin copiar texto. Listo para estudiar en segundos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-8 hover:border-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="text-5xl font-black text-white/5 absolute top-6 right-6 select-none group-hover:text-brand-500/10 transition-colors">
                  {step.number}
                </div>
                <div className="rounded-xl bg-brand-500/15 w-12 h-12 flex items-center justify-center mb-6">
                  <step.icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-brand-400 font-medium">
                  <Zap className="h-3 w-3" />
                  {step.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" onClick={handleLogin}>
              Probarlo ahora gratis <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
              Funcionalidades
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Todo lo que necesitas para preparar un examen.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Un lugar. Tu material. Las herramientas que funcionan.
            </p>
          </div>

          {/* Bento grid: featured card + 3 smaller */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured card — quizzes */}
            <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-card to-card p-6 sm:p-8 md:row-span-2 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-400 mb-6">
                  <Star className="h-3 w-3" />
                  Feature principal
                </div>
                <div className="rounded-xl bg-brand-500/15 w-12 h-12 flex items-center justify-center mb-5">
                  <LayoutList className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="font-bold text-xl mb-3">Quizzes generados de tu propio material</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La IA crea preguntas basadas en tu PDF, no en conocimiento genérico. Elegís la
                  dificultad, la cantidad y el tipo de preguntas. Con feedback por cada respuesta.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {features[0].types.map((t) => (
                  <span
                    key={t.label}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${t.color}`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 smaller cards */}
            {features.slice(1).map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/[0.08] bg-card p-6 hover:border-brand-500/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="rounded-xl bg-brand-500/15 w-11 h-11 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
              Casos de uso
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Funciona para tu carrera.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sea cual sea tu materia, si tenés un PDF con contenido, StudyAI genera preguntas de él.
            </p>
          </div>

          <Tabs defaultValue="derecho">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-8 justify-center">
              {useCases.map((uc) => (
                <TabsTrigger
                  key={uc.id}
                  value={uc.id}
                  className="rounded-full border border-white/[0.08] data-[state=active]:border-brand-500/40"
                >
                  {uc.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {useCases.map((uc) => (
              <TabsContent key={uc.id} value={uc.id}>
                <div className="rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-8">
                  <h3 className="font-bold text-xl mb-3">{uc.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{uc.body}</p>
                  <blockquote className="border-l-2 border-brand-500/50 pl-4">
                    <p className="text-sm text-foreground/80 italic mb-2">{uc.quote}</p>
                    <cite className="text-xs text-muted-foreground not-italic">— {uc.author}</cite>
                  </blockquote>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
              Estudiantes reales
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Estudiantes que estudian diferente.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/[0.08] bg-card p-6 flex flex-col justify-between hover:border-brand-500/20 transition-colors"
              >
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full w-9 h-9 flex items-center justify-center text-xs font-bold ${t.color}`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
              Por qué StudyAI
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ¿Por qué no simplemente usar ChatGPT?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              ChatGPT es una herramienta general. StudyAI es tu asistente de estudio.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 sm:py-4 sm:px-6 text-muted-foreground font-medium">
                    Característica
                  </th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-brand-400 font-semibold">
                      <BookOpen className="h-4 w-4" />
                      StudyAI
                    </span>
                  </th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 text-center text-muted-foreground font-medium">
                    ChatGPT
                  </th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 text-center text-muted-foreground font-medium">
                    Manual
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < comparison.length - 1 ? 'border-b border-white/[0.06]' : ''}
                  >
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-muted-foreground text-xs sm:text-sm">{row.feature}</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-center">
                      <CompareCell value={row.studyai} />
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-center">
                      <CompareCell value={row.chatgpt} />
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-center">
                      <CompareCell value={row.manual} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Button variant="gradient" size="lg" onClick={handleLogin}>
              Probarlo gratis <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-brand-400 font-medium uppercase tracking-widest mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Preguntas frecuentes</h2>
            <p className="text-muted-foreground">
              Si todavía tenés dudas, acá están las respuestas más comunes.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">¿Todavía tenés dudas?</p>
            <Button variant="gradient" size="lg" onClick={handleLogin}>
              Probarlo gratis y ver por vos mismo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/[0.06]">
        <div className="relative max-w-3xl mx-auto text-center overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-500/10 via-card to-card p-8 sm:p-12 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[400px] h-[300px] rounded-full bg-brand-500/10 blur-[80px]" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-4 py-1.5 text-sm text-brand-400 mb-6">
              <TrendingUp className="h-3.5 w-3.5" />
              Más de 500 estudiantes activos
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tu próximo examen empieza hoy.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Subí tu primer PDF gratis. Sin tarjeta de crédito. Ver si funciona te toma menos de 2
              minutos.
            </p>
            {primaryCTA}
            <p className="text-xs text-muted-foreground mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span>Sin tarjeta de crédito</span>
              <span>·</span>
              <span>Login con Google en un clic</span>
              <span>·</span>
              <span>Tu material es privado</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-brand-500 p-1.5">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-brand-400">StudyAI</span>
              <span className="text-muted-foreground text-sm ml-1">
                — Tu plataforma de estudio con IA
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <a href="#como-funciona" className="hover:text-foreground transition-colors">
                Cómo funciona
              </a>
              <a href="#features" className="hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#faq" className="hover:text-foreground transition-colors">
                FAQ
              </a>
              <Link to="/login" className="hover:text-foreground transition-colors">
                Ingresar
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 StudyAI. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-400" />
              Powered by Google Gemini 2.5
            </p>
          </div>
        </div>
      </footer>

      {/* ── Sticky mobile CTA ───────────────────────────────────────────────── */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/90 backdrop-blur-xl border-t border-white/[0.08] md:hidden">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleLogin}
          >
            <Sparkles className="h-4 w-4" />
            Empezar gratis con Google
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function CompareCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/15 text-green-400 text-xs font-bold">
        ✓
      </span>
    );
  }
  if (value === 'parcial') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/15 text-yellow-400 text-xs">
        ~
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-muted-foreground text-xs">
      ✕
    </span>
  );
}

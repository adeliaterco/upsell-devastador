"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// Placeholder for UI components. In a real Next.js app, these would be imported from your UI library.
// For this example, they are simple div/button elements with Tailwind classes.
const Button = ({ children, className, ...props }: any) => (
  <button className={`px-6 py-3 rounded-lg font-bold ${className}`} {...props}>
    {children}
  </button>
);
const Card = ({ children, className, ...props }: any) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg ${className}`} {...props}>
    {children}
  </div>
);
const Badge = ({ children, className, ...props }: any) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`} {...props}>
    {children}
  </span>
);

// --- Custom Tailwind CSS classes and animations (can be moved to global.css or tailwind.config.js) ---
const customStyles = `
.glass-strong {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.gradient-success {
  background: linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%);
}
.gradient-danger {
  background: linear-gradient(135deg, #EF4444 0%, #F97316 100%);
}
.gradient-primary {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
}
.gradient-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

@keyframes shine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shine {
  background-size: 200% 100%;
  animation: shine 3s linear infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  50% { box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.7); }
}
.animate-pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes heartbreak {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  50% { transform: scale(1) rotate(0deg); }
  75% { transform: scale(1.1) rotate(5deg); }
}
.animate-heartbreak {
  animation: heartbreak 1.5s infinite;
}

@keyframes urgent-tick {
  0%, 100% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-5px) scale(1.05); }
  50% { transform: translateY(0) scale(1); }
  75% { transform: translateY(5px) scale(1.05); }
}
.animate-urgent-tick {
  animation: urgent-tick 1s infinite;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #F97316; /* orange-500 */
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  border: 2px solid white;
}
.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #F97316; /* orange-500 */
}
`;

export default function UpsellPage() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [dynamicUrgencyCount, setDynamicUrgencyCount] = useState(Math.floor(Math.random() * 10) + 5); // 5-14 people
  const [activePillar, setActivePillar] = useState<number | null>(null);

  // Main Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Exit-intent (beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "¿Estás seguro? Esta oferta especial de $19.99 no estará disponible después.";
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Exit-intent (mouse leave)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !showExitIntent && !isExpired) {
        setShowExitIntent(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showExitIntent, isExpired]);

  // Dynamic Urgency Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicUrgencyCount(Math.floor(Math.random() * 10) + 5); // Update every 10-20 seconds
    }, Math.random() * 10000 + 10000); // Random interval between 10-20 seconds
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePillar = useCallback((pillarIndex: number) => {
    setActivePillar((prev) => (prev === pillarIndex ? null : pillarIndex));
  }, []);

  // Placeholder for quiz data (would be passed as props or fetched from context)
  const quizData = {
    exName: "María", // Example from quiz
    timeApart: "3 meses", // Example from quiz
    currentSituation: "me ignora", // Example from quiz
    gender: "SOY HOMBRE", // Example from quiz
  };

  // --- Offer Expired State ---
  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
        <Card className="glass-strong max-w-2xl w-full text-center p-12 border-4 border-red-500">
          <div className="text-6xl mb-6 animate-bounce">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-6 text-balance">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            El Plan A Permanente ahora cuesta $49.99
          </p>
          <p className="text-lg text-gray-400">
            Esta oferta especial de $19.99 ya no está disponible.
          </p>
          <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white">
            <a href="https://pay.hotmart.com/YOUR_HOTMART_LINK_FULL_PRICE" target="_blank" rel="noopener noreferrer">
              Comprar Plan A Permanente por $49.99
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  // --- Main Upsell Page Content ---
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Custom Styles */}
      <style>{customStyles}</style>

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <Card className="glass-strong max-w-lg w-full text-center p-8 border-4 border-red-500 relative animate-pulse-glow">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-4xl animate-urgent-tick">
              🚨
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-red-500">
              ¡ESPERA! Descubrí algo crítico...
            </h2>
            <p className="text-lg md:text-xl mb-4 text-gray-200">
              Tu riesgo de ruptura dentro de 90 días es:
            </p>
            <div className="bg-gray-700 rounded-full h-6 mb-6 overflow-hidden">
              <div className="bg-red-500 h-full flex items-center justify-center text-sm font-bold" style={{ width: '87%' }}>
                87%
              </div>
            </div>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Con el Plan A Permanente sería: <span className="font-bold text-green-400">3%</span>
            </p>
            <div className="space-y-4">
              <Button
                className="gradient-danger text-white text-xl w-full py-4 animate-shine"
                onClick={() => setShowExitIntent(false)}
              >
                <a href="https://pay.hotmart.com/YOUR_HOTMART_LINK_UPSELL" target="_blank" rel="noopener noreferrer">
                  ¡Quiero protección ahora por $19.99!
                </a>
              </Button>
              <Button
                className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800 w-full py-3"
                onClick={() => setShowExitIntent(false)}
              >
                <a href="https://protocolo-dw.vercel.app/" target="_blank" rel="noopener noreferrer">
                  No, prefiero arriesgarme sin protección
                </a>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 1. HEADER SUCCESS */}
      <section className="gradient-success py-16 md:py-24 relative overflow-hidden animate-shine">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl md:text-8xl mb-6">🎯</div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-balance text-white">
            ¡FELICIDADES! Tu Plan A Está Confirmado
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white">
            ⚠️ NO CIERRES ESTA PÁGINA - Descubrimos algo CHOCANTE sobre tu futuro
          </p>
          <Badge className="glass-strong text-lg md:text-xl px-6 py-3 font-bold text-white border border-green-300">
            ✅ Plan A (Estrategia de reconquista) - CONFIRMADO
          </Badge>
        </div>
      </section>

      {/* 2. SIMULACIÓN TIMELINE (0-180 días) */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-white">
            LA CRUDA REALIDAD: Tu futuro en los próximos 180 días
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Basado en miles de casos, esto es lo que te espera con y sin el Plan A Permanente.
          </p>

          <div className="max-w-3xl mx-auto relative">
            <div className="timeline-line"></div> {/* Vertical line */}
            {[
              { day: 0, title: "Día 0: Reconquista Exitosa", message: "¡Lo lograste! Ella volvió a ti. Felicidades.", type: "success" },
              { day: 15, title: "Día 15: Primera Noche Íntima", message: "La pasión se reaviva. Momentos que extrañabas.", type: "success" },
              { day: 45, title: "Día 45: Primeras Grietas (Sin Mantenimiento)", message: "Pequeñas discusiones, ella se distancia un poco.", type: "warning" },
              { day: 90, title: "Día 90: Ella te Ignora", message: "Mensajes sin respuesta, sientes que la pierdes de nuevo.", type: "danger" },
              { day: 160, title: "Día 160: Ruptura Final", message: "El ciclo se repite. Ella se va para siempre.", type: "danger" },
              { day: 180, title: "Día 180: Eternidad Juntos (CON Protocolo)", message: "Con el Plan A Permanente, tu relación es inquebrantable.", type: "success-alt" },
            ].map((event, index) => (
              <div key={index} className="relative pl-12 py-6 text-left">
                <div className="timeline-dot" style={{ backgroundColor: event.type === "success" ? "#4CAF50" : event.type === "warning" ? "#F59E0B" : event.type === "danger" ? "#EF4444" : "#6366F1" }}></div>
                <Card className={`glass-strong p-4 md:p-6 mb-4 relative ${event.type === "success" ? "border-l-4 border-green-500" : event.type === "warning" ? "border-l-4 border-yellow-500" : event.type === "danger" ? "border-l-4 border-red-500" : "border-l-4 border-indigo-500"}`}>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{event.title}</h3>
                  <p className="text-gray-300">{event.message}</p>
                  {/* Simplified WhatsApp Mockup */}
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg text-sm">
                    <div className="flex items-center mb-2">
                      <img src="https://i.ibb.co/5gSMWD68/Generatedimage-1764387030465.png" alt="Ex Avatar" className="w-8 h-8 rounded-full mr-2" />
                      <span className="font-semibold text-gray-200">{quizData.exName}</span>
                    </div>
                    <div className={`message-bubble ${index % 2 === 0 ? 'sent' : 'received'} bg-blue-500 text-white p-2 rounded-lg`}>
                      {event.type === "success" && "¡No puedo creer que estemos juntos de nuevo! Te amo."}
                      {event.type === "warning" && "¿Estás ocupado? Siento que no me prestas atención."}
                      {event.type === "danger" && "No me busques más. Necesito espacio."}
                      {event.type === "success-alt" && "¡Gracias por ser el hombre de mi vida! Siempre juntos."}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CALCULADORA VISUAL DE RISCO */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-white">
            🚨 TU FUTURO AMOROSO ESTÁ EN RIESGO
          </h2>
          <Card className="glass-strong max-w-3xl mx-auto p-8 md:p-12 border-4 border-red-500 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-4xl animate-heartbeat">
              💔
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-8 text-red-500">
              SIN EL PLAN A PERMANENTE, ESTO ES LO QUE PUEDES PERDER:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg md:text-xl font-bold text-gray-200">
              <div className="p-4 bg-gray-800 rounded-lg">
                <span className="text-red-400 text-3xl block mb-2">87</span>
                Días hasta perderla de nuevo
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <span className="text-red-400 text-3xl block mb-2">2088</span>
                Horas de felicidad en riesgo
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <span className="text-red-400 text-3xl block mb-2">1.247</span>
                Besos que puedes perder
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <span className="text-red-400 text-3xl block mb-2">46</span>
                Noches íntimas en riesgo
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-black text-green-400 mt-10">
              CON PLAN A PERMANENTE: <span className="text-green-400">0% RIESGO</span>
            </p>
          </Card>
        </div>
      </section>

      {/* 4. COMPARACIÓN DOS CAMINHOS */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-16 text-balance text-white">
            ELIGE TU FUTURO: ¿UNA SEGUNDA RUPTURA O LA ETERNIDAD?
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* CAMINO 1: Solo Plan A */}
            <Card className="glass-strong border-4 border-red-500 relative p-8 hover:scale-105 transition-transform duration-300">
              <Badge className="absolute -top-4 right-4 bg-red-500 text-white px-4 py-2 animate-pulse">
                ⚠️ PELIGRO
              </Badge>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-red-500 text-center">
                ❌ CAMINO 1: SOLO CON PLAN A
              </h4>
              <ul className="space-y-4">
                {[
                  "Día 0: Reconquista exitosa",
                  "Día 15: Primera noche íntima",
                  "Día 45: Primeras grietas en la relación",
                  "Día 90: Ella te ignora y se distancia",
                  "Día 160: Ruptura final y dolorosa",
                  "Resultado: Vuelves al punto de partida, solo y con el corazón roto.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                    <span className="text-xl text-red-400">💔</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* CAMINO 2: Plan A + Permanente */}
            <Card className="glass-strong border-4 border-green-500 relative p-8 hover:scale-105 transition-transform duration-300">
              <Badge className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-2 animate-pulse-glow">
                ✅ ETERNIDAD
              </Badge>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-green-500 text-center">
                ✅ CAMINO 2: PLAN A + PERMANENTE
              </h4>
              <ul className="space-y-4">
                {[
                  "Día 0: Reconquista exitosa",
                  "Día 15: Primera noche íntima",
                  "Día 45: Relación más fuerte y unida",
                  "Día 90: Ella te persigue y te valora más",
                  "Día 180: Propuesta de matrimonio / Futuro juntos",
                  "Resultado: Una relación inquebrantable, amor eterno y felicidad garantizada.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                    <span className="text-xl text-green-400">🔥</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. EL PROBLEMA - "¿QUÉ NO FUNCIONA SIN PLAN A PERMANENTE?" */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <Card className="glass-strong max-w-4xl mx-auto p-8 md:p-12 border-l-8 border-red-500 relative">
            <div className="absolute -top-8 left-8 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-3xl animate-heartbreak">
              ❌
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-red-500 text-balance">
              EL ERROR FATAL QUE EL 97% COMETE DESPUÉS DE RECONQUISTAR
            </h3>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-200">
              <p className="font-bold">
                El Plan A te da la estrategia perfecta para reconquistar.
              </p>
              <p className="font-bold">
                Pero NO incluye las técnicas de mantenimiento que la mantienen OBSESIONADA contigo para siempre.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <span className="font-bold text-red-400">Solo reconquistar sin mantenimiento:</span> Te lleva a una segunda ruptura.
                </li>
                <li>
                  <span className="font-bold text-red-400">Dejar todo al "sentido común":</span> El 73% fracasa porque el amor no es sentido común, es estrategia.
                </li>
                <li>
                  <span className="font-bold text-red-400">No tener estrategia de mantenimiento:</span> Es como construir una casa sin cimientos. Se caerá.
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. PROTOCOLO DE LAS 85 TÉCNICAS */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-white">
            🔥 PLAN A PERMANENTE: EL PROTOCOLO DE LAS 85 TÉCNICAS
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            El método "secreto" que convierte atracción en OBSESIÓN y la mantiene a tu lado para siempre.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                icon: "🧠",
                title: "PILAR 1: DOMINIO PSICOLÓGICO (28 técnicas)",
                description: "Técnicas neurológicas que hacen que piense en ti 24/7 y activan su instinto de 'necesidad desesperante'.",
                techniques: [
                  "El método del 'vacío emocional' que la vuelve adicta",
                  "Protocolo de inversión total (ella te persigue)",
                  "Técnicas de anclaje emocional",
                  "Cómo ser su 'droga' emocional",
                  "Estrategias de 'escasez percibida'",
                  "El arte de la 'distancia magnética'",
                  "Creación de 'bucles de deseo'",
                  "Activación del 'miedo a la pérdida'",
                  "Técnicas de 'recompensa intermitente'",
                  "El poder de la 'anticipación'",
                  "Cómo ser 'irremplazable'",
                  "La psicología de la 'dependencia emocional sana'",
                  "Estrategias de 'refuerzo positivo'",
                  "El secreto de la 'conexión profunda'",
                  "Técnicas de 'memoria selectiva'",
                  "Cómo ser su 'zona de confort'",
                  "El arte de la 'sorpresa constante'",
                  "Creación de 'rituales de pareja'",
                  "Activación del 'sentido de pertenencia'",
                  "Técnicas de 'validación emocional'",
                  "El poder de la 'vulnerabilidad controlada'",
                  "Cómo ser su 'confidente'",
                  "La psicología de la 'admiración mutua'",
                  "Estrategias de 'crecimiento conjunto'",
                  "El secreto de la 'pasión duradera'",
                  "Técnicas de 'renovación constante'",
                  "Cómo ser su 'mejor amigo y amante'",
                  "La clave de la 'felicidad compartida'",
                ],
              },
              {
                icon: "💬",
                title: "PILAR 2: COMUNICACIÓN PERFECTA (31 técnicas)",
                description: "Las frases exactas que despiertan sumisión emocional y técnicas de comunicación hipnótica para cualquier situación.",
                techniques: [
                  "Las 21 frases que despiertan sumisión emocional",
                  "Mensajes que funcionan incluso si te ignora",
                  "Técnicas de comunicación hipnótica",
                  "Scripts para cada situación específica",
                  "El arte de la 'escucha activa'",
                  "Cómo usar el 'lenguaje corporal'",
                  "Técnicas de 'persuasión sutil'",
                  "El poder de las 'preguntas abiertas'",
                  "Cómo evitar 'malentendidos'",
                  "La psicología de la 'empatía'",
                  "Estrategias de 'resolución de conflictos'",
                  "El secreto de la 'comunicación no verbal'",
                  "Técnicas de 'afirmación positiva'",
                  "Cómo expresar 'necesidades y deseos'",
                  "La clave de la 'honestidad radical'",
                  "Estrategias de 'negociación efectiva'",
                  "El arte de la 'conversación profunda'",
                  "Cómo usar el 'humor inteligentemente'",
                  "Técnicas de 'elogio sincero'",
                  "El poder de la 'narración de historias'",
                  "Cómo crear 'conexión instantánea'",
                  "La psicología de la 'influencia'",
                  "Estrategias de 'comunicación asertiva'",
                  "El secreto de la 'voz seductora'",
                  "Técnicas de 'silencio estratégico'",
                  "Cómo manejar 'conversaciones difíciles'",
                  "La clave de la 'retroalimentación constructiva'",
                  "Estrategias de 'comunicación en crisis'",
                  "El arte de la 'declaración de amor'",
                  "Cómo mantener la 'chispa en la conversación'",
                  "La psicología de la 'confianza mutua'",
                ],
              },
              {
                icon: "❤️",
                title: "PILAR 3: INTIMIDAD MANTENIDA (26 técnicas)",
                description: "Cómo despertar deseo físico intenso a distancia, técnicas de tensión sexual y el protocolo de seducción psicológica.",
                techniques: [
                  "Cómo despertar deseo físico intenso a distancia",
                  "Técnicas de tensión sexual por mensajes",
                  "El método de 'hambre sexual' controlada",
                  "Protocolo de seducción psicológica",
                  "El arte del 'toque sutil'",
                  "Cómo crear 'ambiente romántico'",
                  "Técnicas de 'juego previo mental'",
                  "El poder de la 'fantasía compartida'",
                  "Cómo mantener la 'novedad en la cama'",
                  "La psicología de la 'conexión física'",
                  "Estrategias de 'exploración mutua'",
                  "El secreto de la 'intimidad emocional'",
                  "Técnicas de 'masaje sensual'",
                  "Cómo usar 'lencería y disfraces'",
                  "La clave de la 'comunicación sexual'",
                  "Estrategias de 'sorpresa erótica'",
                  "El arte de la 'seducción constante'",
                  "Cómo mantener la 'llama encendida'",
                  "Técnicas de 'juego de roles'",
                  "El poder de la 'mirada seductora'",
                  "Cómo crear 'momentos inolvidables'",
                  "La psicología del 'deseo mutuo'",
                  "Estrategias de 'conexión profunda'",
                  "El secreto de la 'pasión duradera'",
                  "Técnicas de 'renovación constante'",
                  "Cómo ser su 'mejor amante'",
                ],
              },
            ].map((pillar, index) => (
              <Card key={index} className="glass-strong p-6 text-left border-l-4 border-indigo-500">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => togglePillar(index)}
                >
                  <h3 className="text-xl md:text-2xl font-black text-indigo-400 flex items-center gap-3">
                    <span className="text-3xl">{pillar.icon}</span> {pillar.title}
                  </h3>
                  <span className="text-3xl text-gray-400">
                    {activePillar === index ? "▲" : "▼"}
                  </span>
                </div>
                <p className="text-gray-300 mt-4">{pillar.description}</p>
                {activePillar === index && (
                  <ul className="mt-6 space-y-3 text-gray-200">
                    {pillar.techniques.map((tech, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base">
                        <span className="text-green-400">✓</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROGRESO VISUAL (Progress Bar) */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-white">
            TU JORNADA HACIA EL AMOR ETERNO
          </h2>
          <Card className="glass-strong max-w-3xl mx-auto p-8 md:p-12 border-4 border-blue-500">
            <h3 className="text-xl md:text-2xl font-bold mb-8 text-blue-400">
              SEGUIMIENTO DE TU PROGRESO:
            </h3>
            <div className="space-y-6">
              <div className="text-left">
                <p className="text-lg font-bold text-green-400 mb-2">Phase 1: Reconquista ✅</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2 text-sm">
                  <li>Quiz Completo ✅</li>
                  <li>Plan A Comprado ✅</li>
                </ul>
              </div>

              <div className="text-left">
                <p className="text-lg font-bold text-yellow-400 mb-2">Phase 2: Protección (AQUÍ)</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div className="bg-yellow-500 h-4 rounded-full" style={{ width: "50%" }}></div>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2 text-sm">
                  <li>Plan A Permanente ⏳ (Tu siguiente paso)</li>
                  <li>85 Técnicas de Mantenimiento</li>
                </ul>
              </div>

              <div className="text-left">
                <p className="text-lg font-bold text-blue-400 mb-2">Phase 3: Eternidad</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <ul className="list-disc list-inside text-gray-300 mt-2 text-sm">
                  <li>Relación Inquebrantable</li>
                  <li>Amor Eterno y Felicidad</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 8. DEPOIMENTOS FUERTES */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-white">
            HISTORIAS REALES DE AMOR ETERNO
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Carlos M., 34 años",
                text: "Reconquisté en 9 días con el Plan A. Pero casi la pierdo en el mes 4. El Plan A Permanente me salvó. Ahora estamos más unidos que nunca.",
                rating: 5,
              },
              {
                name: "Santiago B., 31 años",
                text: "Aplicaba las técnicas de mantenimiento y ella me perseguía todos los días. Es increíble cómo cambió la dinámica. ¡Funciona!",
                rating: 5,
              },
              {
                name: "Diego L., 36 años",
                text: "Pensé que era imposible mantenerla después de la reconquista. Con el Plan A Permanente, no solo la mantuve, sino que nuestra relación es más fuerte que antes.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="glass-strong p-6 border-t-4 border-yellow-500">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="italic text-gray-200 mb-4">"{testimonial.text}"</p>
                <p className="font-bold text-yellow-300">- {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECCIÓN GARANTÍA */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-white">
            TU INVERSIÓN ESTÁ 100% PROTEGIDA
          </h2>
          <Card className="glass-strong max-w-3xl mx-auto p-8 md:p-12 border-4 border-green-500">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-4xl animate-pulse-glow">
              🛡️
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-8 text-green-500">
              GARANTÍA DE AMOR ETERNO
            </h3>
            <ul className="space-y-4 text-lg md:text-xl text-gray-200 text-left">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span><span className="font-bold">30 Días Sin Riesgo:</span> Si no ves resultados, te devolvemos tu dinero.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span><span className="font-bold">Soporte 24h:</span> Nuestro equipo te acompaña en cada paso.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span><span className="font-bold">Acceso Lifetime:</span> Una vez tuyo, es tuyo para siempre.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span><span className="font-bold">Actualizaciones Gratis:</span> Siempre tendrás las últimas técnicas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span><span className="font-bold">Comunidad Exclusiva:</span> Conéctate con hombres que ya lograron el amor eterno.</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 10. URGENCIA DINÁMICA & 11. CONTADOR DE URGENCIA PRINCIPAL */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <Card className="glass-strong border-red-500 max-w-3xl mx-auto p-8 md:p-12 text-center relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-4xl animate-urgent-tick">
              ⏰
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-red-500 text-balance">
              ⚠️ ¡VENTANA CRÍTICA DE OPORTUNIDAD!
            </h3>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
              <p>
                Esta oferta especial es <span className="font-bold text-red-400">SOLO para clientes del Plan A</span> y{" "}
                <span className="font-bold text-red-400">SOLO en esta sesión.</span>
              </p>
              <p>
                Si sales de esta página, tendrás que pagar el precio completo de <span className="font-bold text-red-400">$49.99</span> después.
              </p>
            </div>

            <div className="gradient-danger text-white p-6 rounded-xl text-4xl md:text-6xl font-black mb-8 animate-pulse">
              {formatTime(timeLeft)}
            </div>

            <p className="text-sm md:text-base text-red-300">
              Después de este tiempo, esta oferta desaparece para siempre.
            </p>
            <p className="text-lg md:text-xl font-bold text-yellow-300 mt-6 animate-pulse">
              ¡Apenas {dynamicUrgencyCount} personas compraron en los últimos 60 minutos!
            </p>
            <p className="text-lg md:text-xl font-bold text-yellow-300 mt-2 animate-pulse">
              La próxima turma cierra en {Math.floor(Math.random() * 15) + 5} minutos.
            </p>
            <p className="text-lg md:text-xl font-bold text-yellow-300 mt-2 animate-pulse">
              El precio sube a $49.99 mañana.
            </p>
          </Card>
        </div>
      </section>

      {/* 12. CTA PRINCIPAL */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <Button
            asChild
            className="gradient-danger text-white text-xl md:text-2xl lg:text-3xl font-black px-8 md:px-12 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all animate-shine mb-8 w-full max-w-2xl mx-auto block"
          >
            <a href="https://pay.hotmart.com/YOUR_HOTMART_LINK_UPSELL" target="_blank" rel="noopener noreferrer">
              🔥 SÍ, QUIERO PLAN A PERMANENTE
              <div className="text-base md:text-lg font-semibold mt-2">
                Agregar por solo $19.99 - Acceso inmediato
              </div>
            </a>
          </Button>

          <Card className="glass-strong max-w-2xl mx-auto p-6 mb-8 text-left border-l-4 border-green-500">
            <h4 className="text-lg md:text-xl font-black mb-4 text-green-400">
              ✅ Lo que recibes INMEDIATAMENTE:
            </h4>
            <ul className="space-y-2 text-sm md:text-base text-gray-200">
              <li>• Acceso instantáneo al Protocolo completo</li>
              <li>• 3 Pilares con 85 técnicas de dominancia específicas</li>
              <li>• Plan de acción día a día para mantenerla</li>
              <li>• Garantía de 30 días sin riesgo</li>
              <li>• Acceso lifetime y actualizaciones gratuitas</li>
            </ul>
          </Card>

          {/* 14. SEGUNDA CTA (fallback) */}
          <div className="text-center mt-8">
            <a
              href="https://protocolo-dw.vercel.app/" // Link para continuar sin el upsell
              className="text-gray-400 hover:text-white transition-colors underline text-sm md:text-base"
              target="_blank" rel="noopener noreferrer"
            >
              No, prefiero arriesgarme sin protección y solo usar el Plan A
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

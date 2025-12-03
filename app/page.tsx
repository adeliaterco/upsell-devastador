"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ArrowRight,
  Check,
  Clock,
  Users,
  Heart,
  Play,
  Star,
  TrendingUp,
  Zap,
  Target,
  MessageCircle,
  AlertTriangle,
  Lock,
  RefreshCcw,
  Handshake,
  HeartCrack,
  Flame,
  Lightbulb,
} from "lucide-react";

// --- MOCK COMPONENTS (Para tornar o arquivo auto-contido e executável) ---
// Em um projeto Next.js real, estes seriam importados de @/components/ui
const Button = ({ children, onClick, size = "md", className = "", onTouchStart }: any) => (
  <button
    onClick={onClick}
    onTouchStart={onTouchStart}
    className={`flex items-center justify-center px-6 py-3 rounded-lg font-bold transition-all duration-300 ${className} ${
      size === "lg" ? "text-lg md:text-xl" : "text-base"
    }`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: any) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CountdownTimer = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
  const [time, setTime] = useState(minutes * 60 + seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const displayMinutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const displaySeconds = (time % 60).toString().padStart(2, "0");

  return (
    <span className="font-mono">
      {displayMinutes}:{displaySeconds}
    </span>
  );
};

// Mock para função de analytics
const enviarEvento = (eventName: string, params: any) => {
  console.log(`GA4 Event: ${eventName}`, params);
  // Em um projeto real, você integraria com a API do Google Analytics aqui
};
// --- FIM MOCK COMPONENTS ---

// Definindo as animações diretamente no componente para evitar arquivos CSS externos
const globalStyles = `
  @keyframes shine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-shine {
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 100%);
    background-size: 200% 100%;
    animation: shine 3s infinite;
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
    50% { box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.9); }
  }
  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.05); }
    30% { transform: scale(1); }
    45% { transform: scale(1.05); }
    60% { transform: scale(1); }
  }
  .animate-heartbeat {
    animation: heartbeat 1.5s infinite;
  }

  @keyframes urgent-tick {
    0%, 100% { transform: translateY(0) scale(1); }
    25% { transform: translateY(-5px) scale(1.1); }
    50% { transform: translateY(0) scale(1); }
    75% { transform: translateY(5px) scale(0.9); }
  }
  .animate-urgent-tick {
    animation: urgent-tick 1s infinite;
  }

  @keyframes messageSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .message-bubble {
    animation: messageSlideIn 0.5s ease-out;
  }

  @keyframes typingPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  .typing-indicator {
    animation: typingPulse 1.5s infinite;
  }

  @keyframes typingDots {
    0%, 60%, 100% { transform: scale(0.8); opacity: 0.5; }
    30% { transform: scale(1.2); opacity: 1; }
  }
  .typing-dots span:nth-child(1) { animation-delay: 0s; }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .probability-circle {
    animation: rotate 2s linear infinite;
  }

  /* Glassmorphism effect */
  .glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .glass-strong {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export default function UpsellPage() {
  // ===== ESTADOS =====
  const UPSELL_TIMER_MINUTES = 47;
  const [timeLeft, setTimeLeft] = useState(UPSELL_TIMER_MINUTES * 60);
  const [isExpired, setIsExpired] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userGender, setUserGender] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1); // Para progressão de seções
  const [activeBuyers, setActiveBuyers] = useState(Math.floor(Math.random() * 10) + 15);
  const [activeBlindajes, setActiveBlindajes] = useState(Math.floor(Math.random() * 5) + 3);
  const [activeRelaciones, setActiveRelaciones] = useState(Math.floor(Math.random() * 3) + 1);
  const startTimeRef = useRef(Date.now());

  // ===== EFEITOS =====

  // Timer effect
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

  // Exit-intent modal effect
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !isExpired) {
        setShowExitModal(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isExpired) {
        const message = "¿Estás seguro? Esta oferta especial para blindar tu relación no estará disponible después.";
        e.returnValue = message;
        return message;
      }
    };

    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isExpired]);

  // Initialization and GA4 event
  useEffect(() => {
    const savedGender = localStorage.getItem("userGender") || "";
    setUserGender(savedGender);
    setTimeout(() => setIsLoaded(true), 300);

    enviarEvento("viu_upsell_permanente", {
      timestamp: new Date().toISOString(),
      user_gender: savedGender,
      version: "upsell_permanente_v1",
    });

    startTimeRef.current = Date.now();

    loadVTurbScript();

    return () => {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000;
      enviarEvento("tempo_pagina_upsell_permanente", {
        tempo_segundos: timeSpent,
        conversao: false,
        version: "upsell_permanente_v1",
      });
    };
  }, []);

  // Simulation of buyers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBuyers((prev) => prev + Math.floor(Math.random() * 2) + 1);
      setActiveBlindajes((prev) => prev + Math.floor(Math.random() * 2));
      setActiveRelaciones((prev) => prev + Math.floor(Math.random() * 2));
    }, 35000); // Atualiza a cada 35 segundos

    return () => clearInterval(interval);
  }, []);

  // Automatic step progression (6 seconds each)
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 6000), // 6s
      setTimeout(() => setCurrentStep(3), 12000), // +6s
      setTimeout(() => setCurrentStep(4), 18000), // +6s
      setTimeout(() => setCurrentStep(5), 24000), // +6s
      setTimeout(() => setCurrentStep(6), 30000), // +6s
      setTimeout(() => setCurrentStep(7), 36000), // +6s
      setTimeout(() => setCurrentStep(8), 42000), // +6s
      setTimeout(() => setCurrentStep(9), 48000), // +6s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // ===== FUNÇÕES AUXILIARES =====
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getPronoun = () => (userGender === "SOY MUJER" ? "él" : "ella");
  const getOtherPronoun = () => (userGender === "SOY MUJER" ? "lo" : "la");
  const getOtherWord = () => (userGender === "SOY MUJER" ? "otro" : "otra");

  const loadVTurbScript = () => {
    if (!document.querySelector('script[src*="692ef1c85df8a7aaec7c6000"]')) {
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/15be01a4-4462-4736-aeb9-b95eda21b8b8/players/692ef1c85df8a7aaec7c6000/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const handlePurchase = (position = "principal") => {
    const timeToAction = (Date.now() - startTimeRef.current) / 1000;

    enviarEvento("clicou_comprar_upsell_permanente", {
      posicao: position,
      step_atual: currentStep,
      timestamp: new Date().toISOString(),
      user_gender: userGender,
      tempo_ate_acao: timeToAction,
      conversao: true,
      version: "upsell_permanente_v1",
    });

    enviarEvento("tempo_pagina_upsell_permanente", {
      tempo_segundos: timeToAction,
      conversao: true,
      version: "upsell_permanente_v1",
    });

    setTimeout(() => {
      // Substitua pelo seu link Hotmart de compra do upsell
      window.open("https://pay.hotmart.com/SEU_LINK_HOTMART_UPSELL_AQUI", "_blank");
    }, 100);
  };

  const handleTouchFeedback = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  // ===== RENDERIZAÇÃO CONDICIONAL PARA EXPIRADO =====
  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
        <div className="glass-strong max-w-2xl w-full text-center p-8 md:p-12 rounded-xl">
          <div className="text-6xl md:text-8xl mb-6">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-6">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            O Plan A Permanente agora custa $371.
          </p>
          <p className="text-lg text-gray-400">
            Esta oferta especial de $19.99 já não está disponível.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-hidden">
      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* Exit-intent Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="glass-strong max-w-lg w-full p-8 rounded-xl text-center relative">
            <button
              onClick={() => setShowExitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <div className="text-6xl mb-6 animate-heartbeat">💔</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-red-500">
              ¡ALTO! ¿Estás seguro de que quieres perder esto?
            </h2>
            <p className="text-lg md:text-xl mb-6 text-gray-300">
              Esta oferta especial de <span className="font-bold text-yellow-400">$19.99</span> para blindar tu relación
              <span className="font-bold text-red-500"> desaparecerá PARA SIEMPRE</span> si sales de esta página.
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Não arrisques que {getPronoun()} perca o interesse novamente.
            </p>
            <Button
              onClick={() => {
                setShowExitModal(false);
                handlePurchase("exit_modal");
              }}
              className="block w-full py-4 px-6 mb-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-black rounded-lg shadow-lg hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 animate-pulse-glow"
            >
              SÍ, QUIERO BLINDAR MI RELACIÓN POR $19.99
            </Button>
            <button
              onClick={() => setShowExitModal(false)}
              className="text-gray-400 hover:text-white underline text-sm"
            >
              No, prefiero arriesgarme a perderl{getOtherPronoun()} de nuevo
            </button>
          </div>
        </div>
      )}

      {/* SEÇÃO 1: HEADER - PROBLEMA REVELADO */}
      <section className="bg-gradient-to-r from-red-800 to-red-900 py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl md:text-8xl mb-6 animate-pulse-glow">🚨</div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              ¡ALTO! Tu reconquista está en <span className="text-yellow-400">PELIGRO</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white opacity-90">
              Descubrimos un dato CRÍTICO: <span className="text-red-300">47% de los que reconquistan con el Plan A, la PIERDEN DE NUEVO en 90 días.</span>
            </p>
            <div className="inline-block bg-white bg-opacity-20 text-white text-lg md:text-xl px-6 py-3 font-bold rounded-full animate-shine">
              ⚠️ La reconquista es solo el INICIO.
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 2: ICEBERG VISUAL - O QUE FALTA DEPOIS DOS 21 DIAS */}
      <AnimatePresence>
        {currentStep >= 2 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gray-800"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-white leading-tight">
                🧊 La reconquista es solo la <span className="text-yellow-400">PUNTA DEL ICEBERG</span>
              </h2>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
                {/* Plan A (Reconquista) */}
                <div className="glass-strong p-8 rounded-xl max-w-md w-full text-left border-l-8 border-green-500">
                  <h3 className="text-xl md:text-2xl font-black mb-6 text-green-400">
                    ✅ PLAN A: RECONQUISTA (Días 1-21)
                  </h3>
                  <ul className="space-y-4 text-gray-200">
                    <li className="flex items-start gap-3">
                      <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <span>Estrategia para que {getPronoun()} te busque.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <span>Primer mensaje, follow-ups, encuentros.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <span>89% de probabilidad de éxito en la reconquista.</span>
                    </li>
                  </ul>
                  <p className="text-lg md:text-xl font-black text-green-500 text-center mt-8">
                    ¡Felicidades! Lo lograste.
                  </p>
                </div>

                {/* Plan A Permanente (Mantenimiento) */}
                <div className="glass-strong p-8 rounded-xl max-w-md w-full text-left border-l-8 border-red-500">
                  <h3 className="text-xl md:text-2xl font-black mb-6 text-red-400">
                    ❌ LO QUE FALTA: BLINDAJE (Días 22-90+)
                  </h3>
                  <ul className="space-y-4 text-gray-200">
                    <li className="flex items-start gap-3">
                      <HeartCrack className="text-red-400 flex-shrink-0 mt-1" size={20} />
                      <span>¿Cómo evitar que pierda el interés después de volver?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <HeartCrack className="text-red-400 flex-shrink-0 mt-1" size={20} />
                      <span>¿Cómo blindar la relación contra nuevas rupturas?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <HeartCrack className="text-red-400 flex-shrink-0 mt-1" size={20} />
                      <span>47% de riesgo de perderl{getOtherPronoun()} de nuevo.</span>
                    </li>
                  </ul>
                  <p className="text-lg md:text-xl font-black text-red-500 text-center mt-8">
                    ¿Vas a arriesgarte a una segunda ruptura?
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 3: URGÊNCIA - ENQUANTO ESPERAS, OUTROS ESTÃO BLINDANDO */}
      <AnimatePresence>
        {currentStep >= 3 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gray-900"
          >
            <div className="container mx-auto px-4">
              <div className="glass-strong border-l-8 border-yellow-400 max-w-3xl mx-auto p-8 md:p-12 text-center relative rounded-xl">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl animate-urgent-tick text-gray-900">
                  ⏳
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-yellow-400 leading-tight">
                  ⚠️ MIENTRAS TÚ DECIDES, OTROS ESTÁN BLINDANDO SU RELACIÓN
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-8">
                  <motion.div
                    className="bg-black/30 rounded-lg p-4 border border-yellow-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-yellow-300 font-bold text-xl">{activeBuyers}</div>
                    <div className="text-gray-300 text-sm">hombres compraron el Plan A Permanente</div>
                  </motion.div>
                  <motion.div
                    className="bg-black/30 rounded-lg p-4 border border-green-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="text-green-300 font-bold text-xl">{activeBlindajes}</div>
                    <div className="text-gray-300 text-sm">ya están blindando su relación</div>
                  </motion.div>
                  <motion.div
                    className="bg-black/30 rounded-lg p-4 border border-blue-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-blue-300 font-bold text-xl">{activeRelaciones}</div>
                    <div className="text-gray-300 text-sm">ya tienen una relación permanente</div>
                  </motion.div>
                </div>

                <p className="text-white text-center font-bold text-lg">
                  La reconquista es un éxito, pero la <span className="text-red-300">permanencia</span> es el verdadero desafío.
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 4: VSL PLAYER (VTURB) */}
      <AnimatePresence>
        {currentStep >= 4 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gray-800"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-6 text-white leading-tight">
                <Flame className="inline-block mr-3 text-red-500" size={40} />
                DESCUBRE CÓMO <span className="text-red-400">BLINDAR</span> TU RELACIÓN PARA SIEMPRE
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                El método "secreto" para transformar una reconquista en una relación inquebrantable.
              </p>

              {/* VSL CENTRALIZADA COM VTURB */}
              <div className="flex justify-center mb-6 sm:mb-8 w-full">
                <div className="w-full max-w-3xl">
                  <div className="relative bg-black rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl w-full border-2 border-red-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl sm:rounded-2xl animate-pulse"></div>
                    <div className="relative z-10 w-full" style={{ aspectRatio: "16/9" }}>
                      {/* Placeholder para o player VTurb */}
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-xl rounded-lg">
                        <Play className="mr-2" /> Carregando vídeo...
                        {/* <vturb-smartplayer id="vid-692ef1c85df8a7aaec7c6000"></vturb-smartplayer> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BARRA DE PROGRESSO */}
              <AnimatePresence>
                {currentStep < 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 max-w-md mx-auto"
                  >
                    <div className="text-gray-300 text-sm mb-3 font-semibold">
                      ⏳ DESBLOQUEANDO EL MÉTODO DE BLINDAJE PERMANENTE...
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 max-w-md mx-auto overflow-hidden border border-red-500">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                      />
                    </div>
                    <p className="text-gray-400 text-xs mt-3 italic">
                      Aprende a transformar la reconquista en una relación inquebrantable.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 5: OFERTA COM MÓDULOS */}
      <AnimatePresence>
        {currentStep >= 5 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gradient-to-r from-red-600 to-orange-600"
          >
            <div className="container mx-auto px-4 text-center">
              <Card className="bg-black/80 text-white shadow-2xl border-4 border-yellow-400 w-full max-w-4xl mx-auto backdrop-blur-sm">
                <CardContent className="p-6 md:p-10 w-full">
                  <div className="bg-yellow-400 text-black font-bold text-sm md:text-base rounded-full inline-block px-4 py-2 mb-6">
                    🔥 PLAN A PERMANENTE: BLINDAJE TOTAL POST-RECONQUISTA
                  </div>

                  <h2 className="text-2xl md:text-4xl font-black mb-6 text-white leading-tight">
                    EL MÉTODO COMPLETO PARA <span className="text-yellow-400">MANTENERLA OBSESIONADA</span> POR SIEMPRE
                  </h2>

                  <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg p-6 mb-6 border border-red-500/50">
                    <h3 className="text-red-400 font-bold text-xl md:text-2xl mb-4">
                      🎁 MÓDULOS DE BLINDAJE Y PERMANENCIA:
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-gray-900/30 rounded-lg p-4 border-l-4 border-blue-400 text-left">
                        <h4 className="text-blue-400 font-bold mb-2 text-lg">
                          <RefreshCcw className="inline w-5 h-5 mr-2" />
                          MÓDULO 1: ANTI-RECAÍDA (Días 22-35)
                        </h4>
                        <ul className="text-white text-sm space-y-1">
                          <li>→ Por qué pierde interés después de volver.</li>
                          <li>→ Protocolo de "Novedad Constante" para mantener la chispa.</li>
                          <li>→ 5 técnicas de reconexión emocional profunda.</li>
                        </ul>
                        <p className="text-gray-400 text-xs mt-2">Valor: $97</p>
                      </div>

                      <div className="bg-gray-900/30 rounded-lg p-4 border-l-4 border-purple-400 text-left">
                        <h4 className="text-purple-400 font-bold mb-2 text-lg">
                          <Lock className="inline w-5 h-5 mr-2" />
                          MÓDULO 2: BLINDAJE EMOCIONAL (Días 36-60)
                        </h4>
                        <ul className="text-white text-sm space-y-1">
                          <li>→ Cómo evitar que busque otras personas o se distraiga.</li>
                          <li>→ Técnicas de "Marca Emocional" para ser inolvidable.</li>
                          <li>→ Sistema de Comparación Automática: ella te verá como la mejor opción.</li>
                        </ul>
                        <p className="text-gray-400 text-xs mt-2">Valor: $127</p>
                      </div>

                      <div className="bg-gray-900/30 rounded-lg p-4 border-l-4 border-green-400 text-left">
                        <h4 className="text-green-400 font-bold mb-2 text-lg">
                          <Handshake className="inline w-5 h-5 mr-2" />
                          MÓDULO 3: RELACIÓN PERMANENTE (Días 61-90+)
                        </h4>
                        <ul className="text-white text-sm space-y-1">
                          <li>→ De la "reconquista" a una vida de pareja sólida y feliz.</li>
                          <li>→ Protocolo de Matrimonio/Compromiso: cómo llevar la relación al siguiente nivel.</li>
                          <li>→ Construcción de futuro compartido: planes que la atan a ti.</li>
                        </ul>
                        <p className="text-gray-400 text-xs mt-2">Valor: $147</p>
                      </div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 mt-6 text-center border border-yellow-500">
                      <p className="text-gray-300 text-lg line-through mb-2">Valor Total: $371</p>
                      <p className="text-green-400 font-bold text-2xl md:text-3xl mb-2">Tu inversión HOY: $19,99</p>
                      <p className="text-yellow-300 text-sm md:text-base font-bold">
                        ¡95% de descuento solo por haber completado el Plan A!
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="mb-6 w-full"
                  >
                    <Button
                      onClick={() => handlePurchase("oferta_principal_upsell")}
                      className="w-full max-w-md mx-auto bg-yellow-400 text-black font-black py-4 px-6 rounded-full text-xl md:text-2xl border-4 border-white hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
                      onTouchStart={handleTouchFeedback}
                    >
                      <Lock className="w-6 h-6 mr-3 flex-shrink-0" />
                      <div className="text-center">
                        <div className="leading-tight">SÍ, QUIERO BLINDAR MI RELACIÓN</div>
                        <div className="text-sm md:text-base mt-1 opacity-90">
                          Plan A Permanente por solo $19.99
                        </div>
                      </div>
                    </Button>
                  </motion.div>

                  <div className="bg-red-900/80 p-4 rounded-lg mb-6 border border-red-500">
                    <p className="text-yellow-300 font-bold text-lg md:text-xl mb-2">
                      ⏰ PRECIO ESPECIAL PARA CLIENTES DEL PLAN A:
                    </p>
                    <div className="text-4xl md:text-5xl font-black text-white mb-2">
                      <CountdownTimer minutes={timeLeft / 60} seconds={timeLeft % 60} />
                    </div>
                    <p className="text-red-300 text-sm md:text-base">
                      Después de este tiempo, el precio vuelve a $371.
                    </p>
                  </div>

                  <div className="flex justify-center items-center space-x-4 text-gray-300 text-sm md:text-base mb-4 flex-wrap gap-2">
                    <div className="flex items-center">
                      <Users className="text-green-400 mr-1" size={18} />
                      <span><strong className="text-white">{activeBuyers}</strong> personas ya blindaron hoy</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="text-red-400 mr-1" size={18} />
                      <span><strong className="text-white">87%</strong> evitan la segunda ruptura</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 6: OBJEÇÕES ESPECÍFICAS DE MANUTENÇÃO */}
      <AnimatePresence>
        {currentStep >= 6 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gray-900/50"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white text-center mb-8">
                🤔 <span className="text-yellow-400">"PERO... ¿Y SI VUELVE A PERDER EL INTERÉS?"</span>
              </h2>

              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="glass p-6 rounded-xl border-l-4 border-yellow-400">
                  <h3 className="text-yellow-400 font-bold text-xl mb-3">
                    💭 "Ya la reconquisté, ¿por qué necesitaría más?"
                  </h3>
                  <p className="text-white text-base">
                    <strong>La reconquista es una batalla, la permanencia es la guerra.</strong> El Plan A te dio la victoria inicial. El Plan A Permanente te da las herramientas para asegurar que no haya contraataques y que la relación se fortalezca día a día, evitando la estadística del 47% de segundas rupturas.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl border-l-4 border-blue-400">
                  <h3 className="text-blue-400 font-bold text-xl mb-3">
                    💔 "¿Y si pierde el interés después de unas semanas?"
                  </h3>
                  <p className="text-white text-base">
                    <strong>Es la objeción más común y la que el Módulo 1 resuelve.</strong> El "Protocolo de Novedad Constante" está diseñado para mantener la chispa viva y la atracción en su punto máximo, justo cuando la novedad de la reconquista empieza a desvanecerse (Días 22-35).
                  </p>
                </div>

                <div className="glass p-6 rounded-xl border-l-4 border-green-400">
                  <h3 className="text-green-400 font-bold text-xl mb-3">
                    😰 "¿Y si {getPronoun()} empieza a mirar a {getOtherWord()}s personas de nuevo?"
                  </h3>
                  <p className="text-white text-base">
                    <strong>El Módulo 2 es tu escudo.</strong> Con las "Técnicas de Marca Emocional" y el "Sistema de Comparación Automática", {getPronoun()} te verá como la única opción viable y superior a cualquier otra, blindando su mente contra la competencia externa (Días 36-60).
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 7: CASOS DE ÉXITO (FOCO EM MANUTENÇÃO) */}
      <AnimatePresence>
        {currentStep >= 7 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gray-800"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white text-center mb-12">
                💕 Historias de Éxito: <span className="text-pink-400">RELACIONES PERMANENTES</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500">
                  <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-lg italic text-gray-200 mb-4">
                    "Reconquisté a {getPronoun()} con el Plan A en 15 días. Pero a la semana 3, sentía que el interés de {getPronoun()} bajaba. Apliqué el Módulo 1 del Plan A Permanente. En 5 días, {getPronoun()} me sorprendió con una cena y dijo que nunca se había sentido tan conectad{getOtherPronoun()}."
                  </p>
                  <p className="font-bold text-green-500">- Carlos S., 30 años</p>
                </div>
                <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500">
                  <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-lg italic text-gray-200 mb-4">
                    "Después de reconquistarla, mi mayor miedo era que volviera a mirar a otros. El Módulo 2 fue increíble. Las técnicas de 'Marca Emocional' hicieron que {getPronoun()} me viera como su única opción. Ahora, después de 6 meses, estamos planeando vivir juntos."
                  </p>
                  <p className="font-bold text-green-500">- Sofía G., 28 años (usando el Plan A para su pareja)</p>
                </div>
                <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500 md:col-span-2">
                  <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-lg italic text-gray-200 mb-4">
                    "El Plan A me devolvió a {getPronoun()}, pero el Plan A Permanente me dio la relación que siempre quise. El Módulo 3 me guio para pasar de 'ex' a 'pareja estable' sin conflictos. Hoy, nuestra relación es más fuerte que nunca, y {getPronoun()} está más comprometid{getOtherPronoun()} que antes."
                  </p>
                  <p className="font-bold text-green-500">- Ricardo P., 35 años</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 8: GARANTIA DE 30 DIAS */}
      <AnimatePresence>
        {currentStep >= 8 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gradient-to-r from-green-900/30 to-emerald-900/30"
          >
            <div className="container mx-auto px-4">
              <Card className="bg-green-50 text-gray-900 shadow-2xl border-4 border-green-500 w-full max-w-3xl mx-auto">
                <CardContent className="p-6 md:p-10 text-center w-full">
                  <Shield className="text-green-600 mx-auto mb-4" size={60} />

                  <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                    GARANTÍA INCONDICIONAL DE 30 DÍAS
                  </h2>

                  <p className="text-green-700 text-lg md:text-xl font-bold mb-4">
                    Si el Plan A Permanente no te ayuda a blindar tu relación y evitar una segunda ruptura, te devuelvo el 100% de tu dinero.
                  </p>

                  <div className="bg-white rounded-lg p-4 border-2 border-green-500">
                    <p className="text-green-800 text-base md:text-lg font-semibold">
                      <strong>Mi promesa personal:</strong> Si aplicas el Plan A Permanente y no sientes que tu relación está más fuerte y segura después de 30 días, no solo te devuelvo el dinero, sino que te ofrezco una consulta personal gratuita para analizar tu caso.
                    </p>
                  </div>

                  <p className="text-green-600 text-sm md:text-base mt-4">
                    Tienes 30 días completos para probarlo sin riesgo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SEÇÃO 9: CTA FINAL IRRESISTÍVEL */}
      <AnimatePresence>
        {currentStep >= 9 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16 md:py-24 bg-gradient-to-r from-red-600 via-red-700 to-orange-600"
          >
            <div className="container mx-auto text-center max-w-4xl">
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 border-4 border-yellow-400 w-full">
                <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
                  ⚡ ÚLTIMO AVISO - ASEGURA TU RELACIÓN PARA SIEMPRE
                </h2>

                <p className="text-white text-lg md:text-xl mb-6 font-bold">
                  Ya reconquistaste a {getPronoun()}. Ahora es el momento de <span className="text-yellow-400">BLINDARLA</span> y evitar la segunda ruptura.
                </p>

                <div className="bg-yellow-600/20 border border-yellow-400 rounded-lg p-4 mb-6">
                  <p className="text-yellow-300 text-lg font-bold mb-2">
                    💡 RECUERDA:
                  </p>
                  <p className="text-white text-base md:text-lg">
                    47% de los que reconquistan, la pierden de nuevo. No seas parte de esa estadística.
                  </p>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="w-full mb-6"
                >
                  <Button
                    onClick={() => handlePurchase("cta_final_upsell")}
                    className="w-full max-w-md mx-auto bg-yellow-400 text-black font-black py-4 px-6 rounded-full text-xl md:text-2xl border-4 border-white hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
                    onTouchStart={handleTouchFeedback}
                  >
                    <Lock className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div className="text-center">
                      <div className="leading-tight">SÍ, QUIERO BLINDAR MI RELACIÓN AHORA</div>
                      <div className="text-sm md:text-base mt-1 opacity-90">
                        Plan A Permanente por solo $19.99
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <p className="text-yellow-300 text-sm md:text-base font-bold">
                  No dejes que el éxito de la reconquista se convierta en una segunda ruptura.
                </p>

                {/* WIDGET HOTMART AQUI */}
                <div id="box-hotmart-widget" className="mt-8 p-4 bg-gray-800 rounded-lg text-gray-300">
                  {/* Insira o código do widget Hotmart aqui. Exemplo: */}
                  {/* <script src="https://static.hotmart.com/checkout/widget.min.js"></script>
                  <div data-hm-widget="YOUR_WIDGET_ID" data-hm-product-id="YOUR_PRODUCT_ID"></div> */}
                  <p>
                    **COLOQUE SEU CÓDIGO DO WIDGET HOTMART AQUI**
                    <br />
                    (Ele será renderizado neste espaço)
                  </p>
                </div>

                <a
                  href="https://protocolo-dw.vercel.app/" // Substitua pelo seu link de fallback
                  className="text-gray-400 hover:text-white underline text-sm md:text-base mt-8 block"
                >
                  No, prefiero arriesgarme a perderl{getOtherPronoun()} de nuevo
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

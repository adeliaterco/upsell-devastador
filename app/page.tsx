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
} from "lucide-react";

// --- Componente de Timer Regressivo (Inline) ---
interface CountdownTimerProps {
  initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <span className="font-black text-white">
      {formatTime(timeLeft)}
    </span>
  );
};

// --- Estilos Globais (Inline) ---
const globalStyles = `
  /* Reset e Base Mobile-First */
  * {
    box-sizing: border-box !important;
    max-width: 100% !important;
  }

  html {
    overflow-x: hidden !important;
    max-width: 100vw !important;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  /* Padding e Spacing */
  .mobile-padding {
    padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
  }

  .mobile-offer-padding {
    padding: clamp(1rem, 4vw, 2rem);
  }

  .mobile-urgency-padding {
    padding: clamp(0.75rem, 3vw, 1rem);
  }

  .mobile-guarantee-padding {
    padding: clamp(1rem, 4vw, 1.5rem);
  }

  .mobile-final-padding {
    padding: clamp(1rem, 4vw, 1.5rem);
  }

  /* CSS para Vídeo */
  .mobile-video-padding {
    padding: clamp(0.5rem, 2vw, 1rem);
  }

  .mobile-video-container {
    width: 100% !important;
    max-width: 100% !important;
    position: relative !important;
    overflow: hidden !important;
    border-radius: clamp(0.5rem, 2vw, 1rem) !important;
  }

  .mobile-vturb-player {
    display: block !important;
    margin: 0 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: clamp(0.5rem, 2vw, 1rem) !important;
    overflow: hidden !important;
    aspect-ratio: 16/9 !important;
    height: auto !important;
    min-height: clamp(200px, 40vw, 400px) !important;
  }

  vturb-smartplayer {
    border-radius: clamp(0.5rem, 2vw, 1rem) !important;
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    display: block !important;
    aspect-ratio: 16/9 !important;
    contain: layout style paint !important;
    min-height: clamp(200px, 40vw, 400px) !important;
  }

  .mobile-border-orange {
    border: clamp(1px, 0.5vw, 2px) solid rgb(249 115 22);
  }

  /* Tipografia */
  .mobile-headline {
    font-size: clamp(1.5rem, 6vw, 3rem);
    line-height: 1.2;
    font-weight: 900;
  }

  .mobile-section-title {
    font-size: clamp(1.25rem, 5vw, 2rem);
    line-height: 1.3;
  }

  .mobile-subsection-title {
    font-size: clamp(1.125rem, 4vw, 1.5rem);
    line-height: 1.3;
  }

  .mobile-offer-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.2;
  }

  .mobile-final-title {
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.2;
  }

  .mobile-guarantee-title {
    font-size: clamp(1.125rem, 4vw, 1.5rem);
    line-height: 1.3;
  }

  .mobile-description {
    font-size: clamp(1rem, 3vw, 1.125rem);
    line-height: 1.5;
  }

  .mobile-info-text {
    font-size: clamp(0.875rem, 3vw, 1rem);
    line-height: 1.4;
  }

  .mobile-small-text {
    font-size: clamp(0.75rem, 2.5vw, 0.875rem);
    line-height: 1.4;
  }

  .mobile-stats-number {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    line-height: 1.2;
  }

  .mobile-stats-text {
    font-size: clamp(0.75rem, 2.5vw, 0.875rem);
    line-height: 1.3;
  }

  .mobile-countdown {
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.2;
  }

  .mobile-urgency-text {
    font-size: clamp(0.875rem, 3vw, 1.125rem);
    line-height: 1.3;
  }

  .mobile-guarantee-text {
    font-size: clamp(1rem, 3vw, 1.125rem);
    line-height: 1.4;
  }

  .mobile-guarantee-desc {
    font-size: clamp(0.875rem, 3vw, 1rem);
    line-height: 1.4;
  }

  .mobile-final-subtitle {
    font-size: clamp(1rem, 3vw, 1.25rem);
    line-height: 1.4;
  }

  .mobile-final-warning {
    font-size: clamp(0.75rem, 2.5vw, 0.875rem);
    line-height: 1.3;
  }

  /* Ícones */
  .mobile-icon-size {
    width: clamp(1.25rem, 4vw, 1.5rem);
    height: clamp(1.25rem, 4vw, 1.5rem);
  }

  .mobile-social-icon {
    width: clamp(0.75rem, 2.5vw, 1rem);
    height: clamp(0.75rem, 2.5vw, 1rem);
  }

  .mobile-shield-icon {
    width: clamp(3rem, 8vw, 4rem);
    height: clamp(3rem, 8vw, 4rem);
  }

  /* Bordas */
  .mobile-border-yellow {
    border: clamp(2px, 1vw, 4px) solid rgb(250 204 21) !important;
  }

  .mobile-border-green {
    border: clamp(2px, 1vw, 4px) solid rgb(34 197 94) !important;
  }

  /* Botões */
  .mobile-cta-offer,
  .mobile-cta-final {
    width: 100% !important;
    box-sizing: border-box !important;
    touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent !important;
    user-select: none !important;
    transition: all 0.3s ease !important;
  }

  .mobile-cta-offer {
    background: rgb(234 179 8) !important;
    color: black !important;
    font-weight: 900 !important;
    padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
    border-radius: 9999px !important;
    font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
    border: clamp(2px, 1vw, 4px) solid white !important;
    min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
    max-width: 32rem !important;
    margin: 0 auto !important;
  }

  .mobile-cta-final {
    background: rgb(234 179 8) !important;
    color: black !important;
    font-weight: 900 !important;
    padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
    border-radius: 9999px !important;
    font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
    border: clamp(2px, 1vw, 4px) solid white !important;
    min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
    max-width: 28rem !important;
    margin: 0 auto !important;
  }

  .mobile-cta-offer:hover,
  .mobile-cta-final:hover {
    background: rgb(202 138 4) !important;
    transform: scale(1.02) !important;
  }

  .mobile-cta-final:hover {
    transform: scale(1.05) !important;
  }

  .mobile-cta-offer-text,
  .mobile-cta-final-text {
    font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
    line-height: 1.2 !important;
    font-weight: 800 !important;
  }

  /* Performance */
  .bg-gradient-to-r,
  .bg-gradient-to-br {
    will-change: transform !important;
    backface-visibility: hidden !important;
    transform: translateZ(0) !important;
  }

  /* Texto */
  .break-words {
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    word-break: break-word !important;
  }

  /* Imagens */
  img,
  video {
    max-width: 100% !important;
    height: auto !important;
    display: block !important;
  }

  /* Container limits */
  .min-h-screen {
    max-width: 100vw !important;
    width: 100% !important;
  }

  .max-w-4xl {
    max-width: 100% !important;
    width: 100% !important;
  }

  @media (min-width: 640px) {
    .max-w-4xl { max-width: 56rem !important; }
    .max-w-3xl { max-width: 48rem !important; }
    .max-w-2xl { max-width: 42rem !important; }
    .max-w-md { max-width: 28rem !important; }
  }

  /* Dark mode compatibility */
  @media (prefers-color-scheme: dark) {
    .bg-green-50 {
      background-color: rgb(20 83 45) !important;
    }

    .text-green-800 {
      color: rgb(187 247 208) !important;
    }

    .text-green-700 {
      color: rgb(134 239 172) !important;
    }
  }

  /* Mobile pequeno */
  @media (max-width: 375px) {
    .mobile-headline {
      font-size: 1.25rem !important;
    }

    .mobile-section-title {
      font-size: 1.125rem !important;
    }

    .mobile-offer-title {
      font-size: 1.25rem !important;
    }
  }

  @media (min-width: 640px) {
    .mobile-padding {
      padding: 2rem 1rem !important;
    }
  }

  /* Glassmorphism effect */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .glass-strong {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  /* Animations */
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
  span.typing-dots:nth-child(3) { animation-delay: 0.4s; }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .probability-circle {
    animation: rotate 2s linear infinite;
  }

  /* Hotmart Widget Styles */
  #hotmart-sales-funnel {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 auto !important;
  }
`;

// --- Main Upsell Page Component ---
const UpsellPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(47 * 60); // 47 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
        const message = "¿Estás seguro? Esta oferta especial no estará disponible después.";
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

  // WhatsApp chat simulation logic
  useEffect(() => {
    const messages = [
      { id: 'user-msg-0', type: 'sent', content: "Hola, encontré algo que es tuyo. ¿Cuándo puedes pasar a recogerlo?", delay: 500 },
      { id: 'ex-msg-9', type: 'received', content: "¿Qué cosa? No recuerdo haber dejado nada...", delay: 2000 },
      { id: 'user-msg-45', type: 'sent', content: "Jajaja, no importa. Solo quería saber cómo estabas. Me alegra que estemos bien.", delay: 4000 },
      { id: 'ex-msg-87', type: 'received', content: "Necesito espacio. No me siento cómoda con esto.", delay: 6000 },
      { id: 'user-msg-120', type: 'sent', content: "Entiendo. Solo quería que supieras que te extraño.", delay: 8000 },
      { id: 'ex-msg-180', type: 'received', content: "Estoy saliendo con alguien más. Por favor, no me escribas.", delay: 10000 },
    ];

    let currentMessageIndex = 0;
    const chatElements: { [key: string]: HTMLElement | null } = {};

    const showNextMessage = () => {
      if (currentMessageIndex < messages.length) {
        const msg = messages[currentMessageIndex];
        const element = document.getElementById(msg.id);
        if (element) {
          element.style.opacity = '1';
          element.style.display = 'block';
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }
        currentMessageIndex++;
        if (currentMessageIndex < messages.length) {
          setTimeout(showNextMessage, messages[currentMessageIndex].delay - messages[currentMessageIndex - 1].delay);
        }
      }
    };

    messages.forEach(msg => {
      chatElements[msg.id] = document.getElementById(msg.id);
      if (chatElements[msg.id]) {
        (chatElements[msg.id] as HTMLElement).style.opacity = '0';
        (chatElements[msg.id] as HTMLElement).style.display = 'none';
      }
    });

    setTimeout(showNextMessage, messages[0].delay);

  }, []);

  // Hotmart Widget effect
  useEffect(() => {
    // Função para carregar o widget da Hotmart
    const loadHotmartWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
      script.onload = () => {
        if (window.checkoutElements) {
          window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        }
      };
      document.head.appendChild(script);
    };

    // Carrega o widget após um pequeno delay para garantir que o DOM está pronto
    const timer = setTimeout(loadHotmartWidget, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownsell = () => {
    // INSIRA AQUI O LINK DO SEU DOWNSELL
    window.open("https://protocolo-dw-vc.vercel.app/", "_blank");
  };

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
        <div className="glass-strong max-w-2xl w-full text-center p-8 md:p-12 rounded-xl">
          <div className="text-6xl md:text-8xl mb-6">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-6">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">El Plan A Permanente ahora cuesta $371</p>
          <p className="text-lg text-gray-400">Esta oferta especial de $19.99 ya no está disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative">
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
              Esta oferta especial de <span className="font-bold text-yellow-400">$19.99</span> para el Plan A Permanente
              <span className="font-bold text-red-500"> desaparecerá PARA SIEMPRE</span> si sales de esta página.
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              No arriesgues tu reconquista por <span className="font-bold text-yellow-400">11 días extra de riesgo</span>.
            </p>
            <p className="text-gray-400 text-sm">
              Usa el widget de compra segura abajo en la página para garantizar esta oferta.
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS HEADER */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl md:text-8xl mb-6">🎯</div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
            ¡FELICIDADES! Tu Plan A Está Confirmado
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white opacity-90">
            ⚠️ PERO HAY UN PELIGRO OCULTO: 47% de los que reconquistan, la pierden DE NUEVO en 90 días.
          </p>
          <div className="inline-block bg-white bg-opacity-20 text-white text-lg md:text-xl px-6 py-3 font-bold rounded-full animate-shine">
            ✅ Plan A (Estrategia de reconquista) - CONFIRMADO
          </div>
        </div>
      </section>

      {/* SHOCK REVELATION - WHATSAPP MOCKUP */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-red-500 leading-tight animate-pulse-glow">
            🚨 LA CRUDA REALIDAD: RECONQUISTAR NO ES SUFICIENTE
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {/* iPhone Mockup */}
            <div className="relative w-72 h-[580px] bg-gray-900 rounded-[40px] p-2 shadow-2xl border-4 border-gray-700 flex-shrink-0">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div> {/* Notch */}
              <div className="w-full h-full bg-black rounded-[30px] overflow-hidden flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-green-700 p-4 pt-8 flex items-center text-white text-sm">
                  <span className="mr-2 text-lg">←</span>
                  <img src="https://i.ibb.co/5gSMWD68/Generatedimage-1764387030465.png" className="w-10 h-10 rounded-full mr-3 object-cover" alt="Avatar" />
                  <div className="flex-grow text-left">
                    <div className="font-bold">María</div>
                    <div className="text-xs opacity-80">En línea</div>
                  </div>
                  <span className="mx-2 text-lg">📞</span>
                  <span className="mx-2 text-lg">⋮</span>
                </div>

                {/* Chat Messages */}
                <div ref={chatContainerRef} className="flex-1 bg-gray-100 p-4 overflow-y-auto flex flex-col space-y-3">
                  <div className="text-center text-xs text-gray-500 my-2">Hoy</div>

                  {/* Day 0 - Initial Contact */}
                  <div id="user-msg-0" className="message-bubble bg-green-200 p-3 rounded-lg self-end max-w-[80%] opacity-0 hidden">
                    <p className="text-gray-800 text-lg leading-snug">Hola, encontré algo que es tuyo. ¿Cuándo puedes pasar a recogerlo?</p>
                    <span className="text-xs text-gray-600 block text-right mt-1">Día 0 ✓✓</span>
                  </div>

                  {/* Day 9 - Reconquista */}
                  <div id="ex-msg-9" className="message-bubble bg-white p-3 rounded-lg self-start max-w-[80%] opacity-0 hidden">
                    <p className="text-gray-800 text-lg leading-snug">¿Qué cosa? No recuerdo haber dejado nada...</p>
                    <span className="text-xs text-gray-500 block text-left mt-1">Día 9</span>
                  </div>

                  {/* Day 45 - Happy Phase */}
                  <div id="user-msg-45" className="message-bubble bg-green-200 p-3 rounded-lg self-end max-w-[80%] opacity-0 hidden">
                    <p className="text-gray-800 text-lg leading-snug">Jajaja, no importa. Solo quería saber cómo estabas. Me alegra que estemos bien.</p>
                    <span className="text-xs text-gray-600 block text-right mt-1">Día 45 ✓✓</span>
                  </div>

                  {/* Day 87 - Problems Start */}
                  <div id="ex-msg-87" className="message-bubble bg-white p-3 rounded-lg self-start max-w-[80%] opacity-0 hidden">
                    <p className="text-gray-800 text-lg leading-snug">Necesito espacio. No me siento cómoda con esto.</p>
                    <span className="text-xs text-gray-500 block text-left mt-1">Día 87</span>
                  </div>

                  {/* Day 120 - Ignoring */}
                  <div id="user-msg-120" className="message-bubble bg-green-200 p-3 rounded-lg self-end max-w-[80%] opacity-0 hidden">
                    <p className="text-gray-800 text-lg leading-snug">Entiendo. Solo quería que supieras que te extraño.</p>
                    <span className="text-xs text-gray-600 block text-right mt-1">Día 120 ✓✓</span>
                  </div>

                  {/* Day 180 - With Someone Else */}
                  <div id="ex-msg-180" className="message-bubble bg-white p-3 rounded-lg self-start max-w-[80%] opacity-0 hidden">
                    <p className="text-gray-800 text-lg leading-snug">Estoy saliendo con alguien más. Por favor, no me escribas.</p>
                    <span className="text-xs text-gray-500 block text-left mt-1">Día 180</span>
                  </div>
                </div>

                {/* WhatsApp Input */}
                <div className="bg-gray-200 p-2 flex items-center">
                  <span className="text-2xl text-gray-500 mx-2">😊</span>
                  <input type="text" placeholder="Escribe un mensaje" disabled className="flex-1 p-2 rounded-full bg-white border-none outline-none text-sm text-gray-700" />
                  <span className="text-2xl text-gray-500 mx-2">📎</span>
                  <span className="text-2xl text-gray-500 mx-2">🎤</span>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="glass-strong p-8 rounded-xl max-w-md w-full text-left">
              <h3 className="text-xl md:text-2xl font-black mb-6 text-yellow-400">
                DATOS DEVASTADORES DE 4.247 RECONQUISTAS:
              </h3>
              <p className="text-lg md:text-xl mb-4 text-gray-200">
                El Plan A te da la estrategia perfecta para reconquistar (89% de éxito).
              </p>
              <p className="text-lg md:text-xl mb-6 text-gray-200 font-bold">
                Pero NO incluye las técnicas para EVITAR que la pierdas de nuevo.
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-black text-red-500 mb-2">47%</div>
                  <p className="text-lg md:text-xl font-bold text-gray-200">
                    De los que reconquistan con Plan A <span className="text-red-500">LA PIERDEN DE NUEVO</span> en 90 días.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-black text-green-500 mb-2">87%</div>
                  <p className="text-lg md:text-xl font-bold text-gray-200">
                    EVITAN la segunda ruptura con el Plan A Permanente.
                  </p>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-black text-red-500 text-center mt-8">
                ¿Vas a arriesgar una segunda ruptura, que es 3x más dolorosa?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRUTAL COMPARISON */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-16 text-white leading-tight">
            LA DIFERENCIA ENTRE "RECONQUISTAR"
            <br />
            VS "BLINDAR LA RELACIÓN PARA SIEMPRE"
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* PLAN A (RECONQUISTA) */}
            <div className="glass-strong border-l-8 border-red-500 relative p-8 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-4 right-4 bg-red-500 text-white px-4 py-2 font-bold rounded-full animate-pulse">
                ⚠️ RIESGO DE RECAÍDA
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-red-500 text-center">❌ SOLO CON PLAN A:</h4>
              <ul className="space-y-4">
                {[
                  "Ella siente atracción por ti (Días 1-21)",
                  "Puede volver, pero sin urgencia",
                  "Tú la persigues sutilmente",
                  "Resultados en 21 días promedio",
                  "89% de probabilidad de reconquista",
                  "RIESGO: 47% de perderla de nuevo en 90 días",
                  "Ella controla el ritmo después de la reconquista",
                  "Puede perder interés y buscar a alguien más",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 glass rounded-lg">
                    <span className="text-xl">💔</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PLAN A PERMANENTE (BLINDAJE) */}
            <div className="glass-strong border-l-8 border-green-500 relative p-8 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-2 font-bold rounded-full animate-pulse-glow">
                🔥 BLINDAJE PERMANENTE
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-green-500 text-center">✅ PLAN A + PERMANENTE:</h4>
              <ul className="space-y-4">
                {[
                  "Ella siente OBSESIÓN por ti (Días 22-90+)",
                  "Te busca desesperadamente para mantener la relación",
                  "ELLA te persigue a ti",
                  "Resultados en 90 días de estabilidad",
                  "87% de probabilidad de evitar la segunda ruptura",
                  "GARANTÍA: No podrá olvidarte ni perder interés",
                  "TÚ controlas completamente la dinámica",
                  "Inmunidad total contra otros hombres y recaídas",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 glass rounded-lg">
                    <span className="text-xl">🔥</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT REVELATION - 3 PILARES */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
            🔥 PLAN A PERMANENTE
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white opacity-90">
            El método "secreto" para BLINDAR tu relación y evitar la segunda ruptura
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "🛡️",
                title: "MÓDULO 1: PROTOCOLO ANTI-RECAÍDA (Días 22-35)",
                features: [
                  "7 Señales de Alerta de Pérdida de Interés",
                  "Método de la 'Novedad Constante'",
                  "Técnicas de 'Re-Seducción Activa'",
                ],
              },
              {
                icon: "🧠",
                title: "MÓDULO 2: BLINDAJE EMOCIONAL (Días 36-60)",
                features: [
                  "12 Frases de Dominancia Emocional",
                  "Técnicas de 'Marca Emocional Indeleble'",
                  "Sistema de 'Comparación Automática' a tu favor",
                ],
              },
              {
                icon: "♾️",
                title: "MÓDULO 3: RELACIÓN PERMANENTE (Días 61-90+)",
                features: [
                  "Protocolo Anti-Competencia Avanzado",
                  "Estrategias para 'Solidificar el Compromiso'",
                  "Plan de 'Evolución Constante' de la Relación",
                ],
              },
            ].map((module, index) => (
              <div key={index} className="glass-strong p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4">{module.icon}</div>
                <h3 className="text-lg md:text-xl font-black mb-6 text-white">{module.title}</h3>
                <ul className="space-y-3 text-left">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-yellow-400">⚡</span>
                      <span className="text-white opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-12 text-white leading-tight">
            Historias de Éxito con el Plan A Permanente
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg italic text-gray-200 mb-4">
                "Reconquisté con el Plan A en 15 días, ¡fue increíble! Pero a los 40 días, ella empezó a distanciarse.
                El Plan A Permanente me salvó. Apliqué el 'Protocolo Anti-Recaída' y en una semana ella estaba más enganchada que nunca.
                ¡Ahora estamos planeando vivir juntos!"
              </p>
              <p className="font-bold text-green-500">- Roberto M., 32 años</p>
            </div>
            <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg italic text-gray-200 mb-4">
                "Después de reconquistarla, sentía que caminaba sobre hielo. Tenía miedo de perderla de nuevo.
                El 'Blindaje Emocional' del Plan A Permanente me dio la seguridad. Ella dejó de mencionar a otros hombres
                y ahora soy su única opción. ¡Es como magia, pero es ciencia!"
              </p>
              <p className="font-bold text-green-500">- Diego L., 36 años</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE SECTION */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-strong p-8 rounded-xl border-l-8 border-yellow-400 mb-12">
              <h3 className="text-2xl md:text-3xl font-black mb-6 text-yellow-400">🤔 PIÉNSALO ASÍ...</h3>
              <div className="space-y-4 text-lg md:text-xl leading-relaxed text-gray-200">
                <p>
                  <strong>Ya invertiste en el Plan A</strong> para reconquistarla.
                </p>
                <p>
                  ¿Vas a arriesgar que ella pierda el interés y te deje de nuevo por no invertir <strong className="text-red-500">solo $19.99</strong>?
                </p>
                <p className="text-xl md:text-2xl font-black text-red-500">
                  ¿Vale la pena el riesgo de una segunda ruptura, que es 3x más dolorosa?
                </p>
              </div>
            </div>

            <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500 mb-12">
              <div className="text-2xl md:text-3xl text-gray-400 line-through mb-4">Valor total: $371</div>
              <div className="text-5xl md:text-7xl font-black text-red-500 mb-6">$19.99</div>
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg md:text-xl px-6 py-3 font-black rounded-full animate-pulse-glow">
                ¡Ahorras $351! (95% de descuento)
              </div>
              <p className="text-sm md:text-base text-green-500 mt-4">Acceso inmediato + Garantía de 30 días</p>
            </div>

            {/* HOTMART WIDGET */}
            <div className="glass-strong border-l-8 border-yellow-400 p-6 md:p-8 rounded-xl mb-8">
              <div className="text-center mb-6">
                <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-2">
                  🔒 PAGAMENTO SEGURO
                </div>
              </div>
              
              {/* HOTMART SALES FUNNEL WIDGET */}
              <div id="hotmart-sales-funnel"></div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-xs md:text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Compra Segura
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Acesso Imediato
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  Garantia 30 dias
                </span>
              </div>
            </div>

            <div className="glass max-w-2xl mx-auto p-6 rounded-xl mb-8 text-left">
              <h4 className="text-lg md:text-xl font-black mb-4 text-green-500">✅ Lo que recibes INMEDIATAMENTE:</h4>
              <ul className="space-y-2 text-sm md:text-base text-gray-200">
                <li>• Acceso instantáneo al Plan A Permanente completo</li>
                <li>• 3 módulos de blindaje emocional para evitar la segunda ruptura</li>
                <li>• Plan de acción día a día para mantenerla obsesionada y comprometida</li>
                <li>• Garantía de 30 días sin riesgo</li>
                <li>• Actualizaciones gratuitas de por vida</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY SECTION */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="glass-strong border-l-8 border-red-500 max-w-3xl mx-auto p-8 md:p-12 text-center relative rounded-xl">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-4xl animate-urgent-tick text-white">
              ⏰
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-red-500 leading-tight">
              ⚠️ VENTANA CRÍTICA DE OPORTUNIDAD
            </h3>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
              <p>
                Esta oferta especial es <strong>SOLO para clientes del Plan A</strong> y{" "}
                <strong>SOLO en esta sesión.</strong>
              </p>
              <p>Si sales de esta página, tendrás que pagar el precio completo de $371 después.</p>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-xl text-4xl md:text-6xl font-black mb-8 animate-pulse">
              <CountdownTimer initialSeconds={timeLeft} />
            </div>

            <p className="text-sm md:text-base text-red-500">
              Después de este tiempo, esta oferta desaparece para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL SECTION - ONLY DOWNSELL BUTTON */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center">
            <button
              onClick={handleDownsell}
              className="text-gray-400 hover:text-white underline text-sm md:text-base transition-colors duration-300"
            >
              No, prefiero arriesgarme a perderla de nuevo (y pagar $371 después)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpsellPage;

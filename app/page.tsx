"use client";

import { useEffect, useState, useRef } from "react";

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
`;

export default function UpsellPage() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
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
      if (e.clientY < 50 && !isExpired) { // Trigger when mouse moves to top of viewport
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
          element.style.display = 'block'; // Ensure it's visible
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

    // Initialize elements for later access
    messages.forEach(msg => {
      chatElements[msg.id] = document.getElementById(msg.id);
      if (chatElements[msg.id]) {
        (chatElements[msg.id] as HTMLElement).style.opacity = '0';
        (chatElements[msg.id] as HTMLElement).style.display = 'none'; // Hide initially
      }
    });

    // Start the sequence
    setTimeout(showNextMessage, messages[0].delay);

  }, []); // Empty dependency array means this runs once on mount

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
        <div className="glass-strong max-w-2xl w-full text-center p-8 md:p-12 rounded-xl">
          <div className="text-6xl md:text-8xl mb-6">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-6">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">El Plan A Permanente ahora cuesta $225</p>
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
            <a
              href="https://pay.hotmart.com/SEU_CODIGO_HOTMART_AQUI" // Substitua pelo seu link Hotmart
              className="block w-full py-4 px-6 mb-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-black rounded-lg shadow-lg hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 animate-pulse-glow"
              onClick={() => setShowExitModal(false)}
            >
              SÍ, QUIERO EL PLAN A PERMANENTE POR $19.99
            </a>
            <button
              onClick={() => setShowExitModal(false)}
              className="text-gray-400 hover:text-white underline text-sm"
            >
              No, prefiero arriesgarme
            </button>
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
            ⚠️ NO CIERRES ESTA PÁGINA - Descubrimos algo CRÍTICO sobre tu futuro
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
            🚨 PERO ACABAMOS DE DESCUBRIR ALGO QUE VA A CAMBIAR TODO...
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
                El Plan A te da la estrategia perfecta para reconquistar.
              </p>
              <p className="text-lg md:text-xl mb-6 text-gray-200 font-bold">
                Pero NO incluye las técnicas de dominancia emocional que la vuelven OBSESIONADA contigo.
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-black text-red-500 mb-2">87%</div>
                  <p className="text-lg md:text-xl font-bold text-gray-200">
                    De los que usan SOLO el Plan A <span className="text-red-500">VUELVEN A PERDERLA</span>
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-black text-green-500 mb-2">97%</div>
                  <p className="text-lg md:text-xl font-bold text-gray-200">
                    DE ÉXITO TOTAL con el Plan A Permanente
                  </p>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-black text-red-500 text-center mt-8">
                ¿Vas a arriesgar que ella conozca a alguien más en esos 11 días extra?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRUTAL COMPARISON */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-16 text-white leading-tight">
            LA DIFERENCIA ENTRE SER "UNA OPCIÓN"
            <br />
            VS SER "SU OBSESIÓN"
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* WITHOUT PROTOCOL */}
            <div className="glass-strong border-l-8 border-red-500 relative p-8 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-4 right-4 bg-red-500 text-white px-4 py-2 font-bold rounded-full animate-pulse">
                ⚠️ PELIGRO
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-red-500 text-center">❌ SOLO CON PLAN A:</h4>
              <ul className="space-y-4">
                {[
                  "Ella siente atracción por ti",
                  "Puede volver, pero sin urgencia",
                  "Tú la persigues sutilmente",
                  "Resultados en 20 días promedio",
                  "73% de probabilidad de éxito",
                  "RIESGO: Puede cambiar de opinión",
                  "Ella controla el ritmo",
                  "Puede conocer a alguien más mientras tanto",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 glass rounded-lg">
                    <span className="text-xl">💔</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WITH PROTOCOL */}
            <div className="glass-strong border-l-8 border-green-500 relative p-8 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-2 font-bold rounded-full animate-pulse-glow">
                🔥 DOMINANCIA
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-green-500 text-center">✅ PLAN A + PERMANENTE:</h4>
              <ul className="space-y-4">
                {[
                  "Ella siente OBSESIÓN por ti",
                  "Te busca desesperadamente",
                  "ELLA te persigue a ti",
                  "Resultados en 9 días promedio",
                  "97% de probabilidad de éxito",
                  "GARANTÍA: No podrá olvidarte",
                  "TÚ controlas completamente",
                  "Inmunidad total contra otros hombres",
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
            El método "secreto" que convierte atracción en OBSESIÓN PERMANENTE
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "🧠",
                title: "PILAR 1: DOMINIO PSICOLÓGICO",
                features: [
                  "7 Gatillos de Obsesión",
                  "Método del 'Vacío Emocional'",
                  "Protocolo de Inversión Total",
                ],
              },
              {
                icon: "💬",
                title: "PILAR 2: COMUNICACIÓN IRRESISTIBLE",
                features: [
                  "21 Frases de Dominancia Exactas",
                  "Técnicas de Comunicación Hipnótica",
                  "Scripts para cada Situación",
                ],
              },
              {
                icon: "🛡️",
                title: "PILAR 3: BLINDAJE ANTI-RUPTURA",
                features: [
                  "Protocolo Anti-Competencia",
                  "Técnicas de 'Marca Emocional'",
                  "Sistema de Comparación Automática",
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
                "Compré el Plan A y reconquisté en 10 días. Pero sentía que algo faltaba. El Plan A Permanente fue la clave.
                En 3 días, ella me escribía a las 2 AM diciendo que no podía dejar de pensar en mí. Ahora estamos casados."
              </p>
              <p className="font-bold text-green-500">- Roberto M., 32 años</p>
            </div>
            <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg italic text-gray-200 mb-4">
                "Pensé que era imposible porque estaba con otro tipo. Con el Plan A la hice dudar, pero con el Permanente,
                en 16 días lo dejó por mí. ¡Es como magia! Ella me persigue ahora."
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
                  <strong>Ya invertiste en el Plan A</strong> porque quieres reconquistarla.
                </p>
                <p>
                  ¿Vas a arriesgar que tome <strong>20 días en lugar de 9 días</strong> por ahorrar $19.99?
                </p>
                <p className="text-xl md:text-2xl font-black text-red-500">
                  ¿Vas a arriesgar que ella conozca a otro en esos 11 días extra?
                </p>
              </div>
            </div>

            <div className="glass-strong p-8 rounded-xl border-l-8 border-green-500 mb-12">
              <div className="text-2xl md:text-3xl text-gray-400 line-through mb-4">Valor total: $225</div>
              <div className="text-5xl md:text-7xl font-black text-red-500 mb-6">$19.99</div>
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg md:text-xl px-6 py-3 font-black rounded-full animate-pulse-glow">
                ¡Ahorras $205!
              </div>
              <p className="text-sm md:text-base text-green-500 mt-4">Acceso inmediato + Garantía de 30 días</p>
            </div>

            {/* Hotmart Widget Placeholder */}
            <div className="glass p-6 rounded-xl mb-8 text-gray-400">
              {/* Aquí iría tu widget de Hotmart si lo tuvieras, o un botón directo */}
              <p>Haz clic en el botón de abajo para asegurar tu oferta.</p>
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
              <p>Si sales de esta página, tendrás que pagar el precio completo de $225 después.</p>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-xl text-4xl md:text-6xl font-black mb-8 animate-pulse">
              {formatTime(timeLeft)}
            </div>

            <p className="text-sm md:text-base text-red-500">
              Después de este tiempo, esta oferta desaparece para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://pay.hotmart.com/SEU_CODIGO_HOTMART_AQUI" // Substitua pelo seu link Hotmart
            className="block w-full max-w-2xl mx-auto py-4 md:py-6 px-8 md:px-12 mb-8 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl md:text-2xl lg:text-3xl font-black rounded-xl shadow-lg hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 animate-shine"
          >
            🔥 SÍ, QUIERO LA DOMINANCIA TOTAL
            <div className="text-base md:text-lg font-semibold mt-2">
              Agregar Plan A Permanente por solo $19.99 - Acceso inmediato
            </div>
          </a>

          <div className="glass max-w-2xl mx-auto p-6 rounded-xl mb-8 text-left">
            <h4 className="text-lg md:text-xl font-black mb-4 text-green-500">✅ Lo que recibes INMEDIATAMENTE:</h4>
            <ul className="space-y-2 text-sm md:text-base text-gray-200">
              <li>• Acceso instantáneo al Plan A Permanente completo</li>
              <li>• 3 pilares de dominancia emocional con 85 técnicas</li>
              <li>• Plan de acción día a día para mantenerla obsesionada</li>
              <li>• Garantía de 30 días sin riesgo</li>
              <li>• Actualizaciones gratuitas de por vida</li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="https://protocolo-dw.vercel.app/" // Substitua pelo seu link de fallback
              className="text-gray-400 hover:text-white underline text-sm md:text-base"
            >
              No, prefiero usar solo el Plan A (y arriesgarme a perderla de nuevo)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

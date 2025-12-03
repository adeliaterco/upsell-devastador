"use client"

import { useEffect, useState, useCallback } from "react"

// --- Componentes de UI Simplificados (substitua pelos seus se tiver) ---
const Button = ({ children, className = "", ...props }) => (
  <button className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${className}`} {...props}>
    {children}
  </button>
)

const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg ${className}`} {...props}>
    {children}
  </div>
)

const Badge = ({ children, className = "", ...props }) => (
  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${className}`} {...props}>
    {children}
  </span>
)

// --- Estilos Globais (adicione ao seu global.css ou use um <style> block) ---
// Para este exemplo, incluirei no <style> block no final do componente.

export default function UpsellPage() {
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [isExpired, setIsExpired] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Exit Intent Effect
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = "¿Estás seguro? Esta oferta especial de $19.99 no estará disponible después."
      e.returnValue = message
      return message
    }

    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !isExpired) { // If mouse moves to the top of the viewport
        setShowExitIntent(true)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isExpired])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleConfirmExit = useCallback(() => {
    setShowExitIntent(false)
    // Optionally redirect or close tab if user confirms exit
    // window.location.href = "https://protocolo-dw.vercel.app/" // Fallback link
  }, [])

  const handleStay = useCallback(() => {
    setShowExitIntent(false)
    // Scroll to CTA or highlight it
    document.getElementById('main-cta')?.scrollIntoView({ behavior: 'smooth' });
  }, [])

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black text-white">
        <Card className="glass-strong max-w-2xl w-full text-center p-12">
          <div className="text-6xl mb-6">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-6 text-balance">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">El Plan A Permanente ahora cuesta $225</p>
          <p className="text-lg text-gray-400">Esta oferta especial de $19.99 ya no está disponible.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full text-center p-8 border-red-500 animate-scale-in">
            <div className="text-6xl mb-4 animate-pulse-danger">💔</div>
            <h2 className="text-3xl font-black mb-4 text-red-500">¡ALTO! ¿Estás seguro?</h2>
            <p className="text-lg mb-6 text-gray-200">
              Si sales ahora, pierdes esta oferta única de $19.99 y el riesgo de perderla de nuevo es del 87%.
            </p>
            <div className="flex flex-col space-y-4">
              <Button
                onClick={handleStay}
                className="bg-green-600 hover:bg-green-700 text-white text-xl py-4 animate-bounce-once"
              >
                ¡NO! Quiero proteger mi relación por $19.99
              </Button>
              <Button
                onClick={handleConfirmExit}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-lg py-3"
              >
                Sí, quiero asumir el riesgo (y pagar $225 después)
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 1. HEADER SUPER DIRECTO */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-8 md:py-12 relative overflow-hidden animate-shine">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/30 text-white text-lg md:text-xl px-6 py-2 font-bold mb-4 animate-fade-in">
            ✅ Plan A (Estrategia de reconquista) - CONFIRMADO
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-white text-balance animate-slide-in-up">
            ¡FELICIDADES! Tu Plan A Está Confirmado
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-white/90 animate-fade-in delay-200">
            🔥 Pero hay 1 problema CRÍTICO que el 97% no ve...
          </p>
          <div className="bg-red-600 text-white text-3xl md:text-5xl font-black px-6 py-3 rounded-xl inline-block animate-pulse-danger">
            ⏰ Oferta Exclusiva Expira en: {formatTime(timeLeft)}
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DEL PROBLEMA (Visual - Mockup WhatsApp) */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-red-500 text-balance animate-pulse-glow">
            💔 EL ERROR FATAL: Cómo la pierdes de nuevo en 90 días
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Mockup de Celular */}
            <div className="iphone-mockup relative w-72 h-[500px] bg-black rounded-[3rem] p-2 shadow-2xl flex-shrink-0">
              <div className="notch"></div>
              <div className="screen-content bg-gray-800 rounded-[2.5rem] h-full flex flex-col overflow-hidden">
                {/* WhatsApp Header */}
                <div className="whatsapp-header bg-green-700 p-4 pt-8 flex items-center text-white text-sm">
                  <span className="mr-2">←</span>
                  <img src="https://i.ibb.co/5gSMWD68/Generatedimage-1764387030465.png" className="w-8 h-8 rounded-full mr-2" alt="Ex Avatar" />
                  <div className="flex-1">
                    <div className="font-bold">María</div>
                    <div className="text-xs text-green-200">En línea</div>
                  </div>
                  <span className="ml-auto">⋮</span>
                </div>
                {/* Chat Messages */}
                <div className="chat-messages flex-1 p-3 overflow-y-auto bg-whatsapp-pattern">
                  <div className="message-bubble sent bg-green-200 rounded-lg p-2 mb-2 ml-auto max-w-[80%] text-sm">
                    ¡Te extrañé tanto! ❤️
                    <div className="text-xs text-gray-500 text-right mt-1">Día 9 ✓✓</div>
                  </div>
                  <div className="message-bubble received bg-white rounded-lg p-2 mb-2 mr-auto max-w-[80%] text-sm">
                    Yo también, mi amor. 😊
                    <div className="text-xs text-gray-500 text-left mt-1">Día 9 ✓✓</div>
                  </div>
                  <div className="message-bubble sent bg-green-200 rounded-lg p-2 mb-2 ml-auto max-w-[80%] text-sm">
                    ¿Todo bien? Te noto distante...
                    <div className="text-xs text-gray-500 text-right mt-1">Día 45 ✓✓</div>
                  </div>
                  <div className="message-bubble received bg-white rounded-lg p-2 mb-2 mr-auto max-w-[80%] text-sm">
                    Sí, solo estoy ocupada.
                    <div className="text-xs text-gray-500 text-left mt-1">Día 45 ✓✓</div>
                  </div>
                  <div className="message-bubble sent bg-green-200 rounded-lg p-2 mb-2 ml-auto max-w-[80%] text-sm">
                    Necesitamos hablar. Siento que algo no va bien.
                    <div className="text-xs text-gray-500 text-right mt-1">Día 90 ✓✓</div>
                  </div>
                  <div className="message-bubble received bg-white rounded-lg p-2 mb-2 mr-auto max-w-[80%] text-sm">
                    Tienes razón. Ya no siento lo mismo. Necesito espacio.
                    <div className="text-xs text-gray-500 text-left mt-1">Día 90 ✓✓</div>
                  </div>
                  <div className="message-bubble received bg-white rounded-lg p-2 mb-2 mr-auto max-w-[80%] text-sm">
                    Estoy saliendo con alguien más. Lo siento.
                    <div className="text-xs text-gray-500 text-left mt-1">Día 120 ✓✓</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Texto do Problema */}
            <div className="text-left lg:w-1/2">
              <p className="text-xl md:text-2xl font-bold mb-4 text-gray-200">
                El Plan A te la devuelve. Pero sin el Plan A Permanente, la perderás de nuevo.
              </p>
              <p className="text-lg md:text-xl text-gray-300">
                El 97% de los hombres comete el error de no saber cómo mantener la chispa viva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO A SOLUÇÃO (Timeline Visual) */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-blue-400 text-balance">
            ✨ DOS CAMINOS, UN FUTURO: ¿Cuál eliges?
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sin Protección */}
            <Card className="border-red-500 bg-red-900/20 p-8 animate-fade-in-left">
              <h3 className="text-2xl md:text-3xl font-black mb-6 text-red-400">❌ SOLO CON PLAN A</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">❤️</span> Día 9: Reconquista
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">😊</span> Día 45: Felicidad inicial
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">📉</span> Día 90: Ella se distancia
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">💔</span> Día 120: Ruptura de nuevo
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">😭</span> Día 180: Sola y arrepentido
                </li>
              </ul>
            </Card>
            {/* Con Protección */}
            <Card className="border-green-500 bg-green-900/20 p-8 animate-fade-in-right">
              <h3 className="text-2xl md:text-3xl font-black mb-6 text-green-400">✅ PLAN A + PERMANENTE</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">❤️</span> Día 9: Reconquista
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">😍</span> Día 45: Más enamorados
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">💍</span> Día 90: Planes de futuro
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">💖</span> Día 120: Conexión profunda
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">♾️</span> Día 180: Amor eterno
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. CALCULADORA VISUAL DE RIESGO */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-yellow-400 text-balance animate-pulse-glow">
            ⚠️ TU RIESGO ACTUAL SIN PROTECCIÓN
          </h2>
          <Card className="border-yellow-500 p-8 md:p-12 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-black text-red-500 mb-4 animate-bounce-once">87%</div>
                <p className="text-xl md:text-2xl font-bold text-gray-200">De riesgo de perderla de nuevo</p>
              </div>
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-black text-red-500 mb-4 animate-bounce-once delay-200">11</div>
                <p className="text-xl md:text-2xl font-bold text-gray-200">Días extra de peligro (ella conoce a otro)</p>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-black text-yellow-400 mt-12">
              ¿Vas a arriesgar tu futuro por no proteger tu relación?
            </p>
          </Card>
        </div>
      </section>

      {/* 5. 3 PILARES */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-purple-400 text-balance">
            ✨ LOS 3 PILARES DEL AMOR ETERNO
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-500 p-6 animate-fade-in-up">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-purple-300">DOMINIO PSICOLÓGICO</h3>
              <ul className="space-y-2 text-left text-gray-300 text-sm">
                <li>• Activa su obsesión por ti</li>
                <li>• Haz que te extrañe 24/7</li>
                <li>• Controla sus emociones</li>
              </ul>
            </Card>
            <Card className="border-purple-500 p-6 animate-fade-in-up delay-200">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-purple-300">COMUNICACIÓN PERFECTA</h3>
              <ul className="space-y-2 text-left text-gray-300 text-sm">
                <li>• Frases que evitan peleas</li>
                <li>• Mensajes que la enganchan</li>
                <li>• Siempre sabrás qué decir</li>
              </ul>
            </Card>
            <Card className="border-purple-500 p-6 animate-fade-in-up delay-400">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-purple-300">INTIMIDAD MANTENIDA</h3>
              <ul className="space-y-2 text-left text-gray-300 text-sm">
                <li>• Reaviva la pasión al instante</li>
                <li>• Evita la rutina y el aburrimiento</li>
                <li>• Conexión emocional profunda</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. DEPOIMENTOS */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-green-400 text-balance">
            🗣️ HISTORIAS REALES DE ÉXITO PERMANENTE
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-500 p-6 animate-fade-in-left">
              <div className="text-6xl mb-4">▶️</div> {/* Video thumbnail placeholder */}
              <p className="text-lg italic mb-4 text-gray-200">
                "Reconquisté en 9 días, pero casi la pierdo en el mes 4. El Plan A Permanente me salvó."
              </p>
              <p className="font-bold text-green-300">
                - Roberto M. <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </p>
              <p className="font-bold text-green-400 mt-2">RESULTADO: ¡Amor eterno en 8 días!</p>
            </Card>
            <Card className="border-green-500 p-6 animate-fade-in-right">
              <div className="text-6xl mb-4">▶️</div> {/* Video thumbnail placeholder */}
              <p className="text-lg italic mb-4 text-gray-200">
                "Aplicaba las técnicas de mantenimiento y ella me perseguía todos los días. ¡Increíble!"
              </p>
              <p className="font-bold text-green-300">
                - Santiago B. <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </p>
              <p className="font-bold text-green-400 mt-2">RESULTADO: ¡Relación blindada en 14 días!</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. PRECIO Y CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-8 text-white text-balance">
            ¡ÚLTIMA OPORTUNIDAD PARA EL AMOR DE TU VIDA!
          </h2>
          <Card className="border-white p-8 md:p-12 bg-white/10 animate-scale-in">
            <div className="text-xl md:text-2xl text-gray-300 line-through mb-4">Valor total: $225</div>
            <div className="text-6xl md:text-8xl font-black text-red-400 mb-6 animate-bounce-once">$19.99</div>
            <Badge className="bg-yellow-500 text-yellow-900 text-lg md:text-xl px-6 py-3 font-black animate-pulse-glow">
              ¡AHORRAS $205!
            </Badge>
            <p className="text-sm md:text-base text-gray-200 mt-4">Acceso inmediato + Garantía de 30 días</p>
          </Card>

          <Button
            id="main-cta"
            asChild
            className="bg-green-500 hover:bg-green-600 text-white text-xl md:text-3xl font-black px-8 md:px-12 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all animate-shine mt-12 w-full max-w-2xl mx-auto block"
          >
            <a href="https://pay.hotmart.com/YOUR_HOTMART_LINK_UPSELL">
              🔥 SÍ, QUIERO EL PLAN A PERMANENTE AHORA
              <div className="text-base md:text-lg font-semibold mt-2">
                ¡Protege tu relación para siempre por solo $19.99!
              </div>
            </a>
          </Button>
        </div>
      </section>

      {/* 8. GARANTÍA (Minimalista) */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-blue-400 text-balance">
            🛡️ TU AMOR, 100% PROTEGIDO
          </h2>
          <Card className="border-blue-500 p-8 md:p-12 animate-fade-in">
            <ul className="space-y-4 text-left text-lg md:text-xl text-gray-200">
              <li className="flex items-center gap-3">
                <span className="text-3xl text-green-500">✅</span> Acceso instantáneo y de por vida
              </li>
              <li className="flex items-center gap-3">
                <span className="text-3xl text-green-500">✅</span> Garantía incondicional de 30 días
              </li>
              <li className="flex items-center gap-3">
                <span className="text-3xl text-green-500">✅</span> Soporte premium 24/7
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 9. SEGUNDA CTA (Fallback) */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://protocolo-dw.vercel.app/" // Fallback link if they don't buy the upsell
            className="text-gray-400 hover:text-gray-200 transition-colors underline text-base md:text-lg"
          >
            No, prefiero arriesgarme y usar solo el Plan A (87% de riesgo de perderla de nuevo)
          </a>
        </div>
      </section>

      {/* Global Styles for Animations and Custom Classes */}
      <style jsx global>{`
        .glass-strong {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        .whatsapp-pattern {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="%23ece5dd"/><rect x="0" y="0" width="10" height="10" fill="%23e8ddd4"/><rect x="10" y="10" width="10" height="10" fill="%23e8ddd4"/></svg>');
          background-color: #ece5dd; /* Fallback color */
        }
        .iphone-mockup {
          position: relative;
          border: 10px solid #333;
          box-sizing: content-box;
        }
        .iphone-mockup .notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 25px;
          background: #000;
          border-radius: 0 0 15px 15px;
          z-index: 10;
        }
        .message-bubble.sent {
          margin-left: auto;
          background-color: #dcf8c6;
          border-radius: 10px 10px 0 10px;
        }
        .message-bubble.received {
          margin-right: auto;
          background-color: #ffffff;
          border-radius: 10px 10px 10px 0;
        }

        /* Animations */
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shine {
          background-size: 200% 100%;
          background-image: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.1) 20%,
            transparent 40%
          );
          animation: shine 8s infinite linear;
        }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }

        @keyframes pulse-danger {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-pulse-danger {
          animation: pulse-danger 1.5s infinite ease-in-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }

        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }

        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }

        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }

        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-10px); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-5px); }
          80% { transform: translateY(0); }
        }
        .animate-bounce-once { animation: bounce-once 1s ease-in-out; }
        .animate-bounce-once.delay-200 { animation-delay: 0.2s; }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  )
}

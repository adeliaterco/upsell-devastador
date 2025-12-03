"use client"

import React, { useEffect, useState, useRef } from "react"

// Helper function to format time for the countdown
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

// Main Upsell Component
export default function UpsellPage() {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [isExpired, setIsExpired] = useState(false)

  // State for dynamic scarcity message
  const [scarcityMessage, setScarcityMessage] = useState("")
  const scarcityMessages = [
    "Solo 17 personas han aprovechado esta oferta en la última hora.",
    "La demanda es alta, ¡no te quedes sin tu lugar!",
    "Esta oferta especial termina pronto, ¡actúa ahora!",
    "Última oportunidad para acceder a este precio exclusivo.",
  ]

  // State for exit intent modal
  const [showExitModal, setShowExitModal] = useState(false)

  // Ref for the chat container to enable auto-scroll
  const chatContainerRef = useRef(null)

  // --- Timer Effect ---
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

    // Update scarcity message every 10-20 seconds
    const scarcityInterval = setInterval(() => {
      setScarcityMessage(scarcityMessages[Math.floor(Math.random() * scarcityMessages.length)])
    }, Math.random() * (20000 - 10000) + 10000) // Random interval between 10-20 seconds

    return () => {
      clearInterval(timer)
      clearInterval(scarcityInterval)
    }
  }, [])

  // --- Exit Intent Effect ---
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 50 && !showExitModal && !isExpired) {
        setShowExitModal(true)
      }
    }

    const handleBeforeUnload = (e) => {
      if (!isExpired) {
        const message = "¿Estás seguro? Esta oferta especial no estará disponible después."
        e.returnValue = message
        return message
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [showExitModal, isExpired])

  // --- WhatsApp Mockup Animation Effect ---
  useEffect(() => {
    const messages = [
      { id: "user-msg-1", delay: 500, type: "sent", text: "Hola, ¿cómo estás?" },
      { id: "ex-typing-1", delay: 1500, type: "typing" },
      { id: "ex-msg-1", delay: 3000, type: "received", text: "Bien, gracias. ¿Y tú?" },
      { id: "user-msg-2", delay: 4000, type: "sent", text: "Pensando en ti. Quería verte pronto. 😊" },
      { id: "ex-typing-2", delay: 5500, type: "typing" },
      { id: "ex-msg-2", delay: 7000, type: "received", text: "Estoy un poco ocupada esta semana. Te aviso." },
      { id: "user-msg-3", delay: 8000, type: "sent", text: "Siento que nos estamos distanciando. ¿Pasa algo? 😔" },
      { id: "ex-typing-3", delay: 9500, type: "typing" },
      { id: "ex-msg-3", delay: 11000, type: "received", text: "No, todo bien. Solo necesito espacio." },
      { id: "user-msg-4", delay: 12000, type: "sent", text: "Te extraño mucho. ¿Podemos hablar? 💔" },
      { id: "ex-typing-4", delay: 13500, type: "typing" },
      { id: "ex-msg-4", delay: 15000, type: "received", text: "..." }, // Simulating a very short, cold response or no response
      { id: "status-change", delay: 16500, type: "status", text: "Este contacto ya no está disponible." },
    ]

    let currentMessageIndex = 0
    const chatElements = {}

    const animateMessage = () => {
      if (currentMessageIndex >= messages.length) return

      const msg = messages[currentMessageIndex]
      const element = document.getElementById(msg.id)
      chatElements[msg.id] = element

      setTimeout(() => {
        if (element) {
          if (msg.type === "typing") {
            element.style.display = "flex"
            document.getElementById("typing-status").textContent = "escribiendo..."
          } else if (msg.type === "status") {
            element.style.display = "block"
            document.getElementById("typing-status").textContent = "Últ. vez hoy a las 19:52"
            document.getElementById("contact-avatar").src = "https://i.ibb.co/5gSMWD68/Generatedimage-1764387030465.png" // Ex's avatar
          } else {
            element.style.opacity = "1"
            element.style.transform = "translateY(0)"
            if (msg.type === "received") {
              if (chatElements[`ex-typing-${currentMessageIndex}`]) {
                chatElements[`ex-typing-${currentMessageIndex}`].style.display = "none"
              }
              document.getElementById("typing-status").textContent = "En línea"
            }
          }
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
          }
        }
        currentMessageIndex++
        animateMessage()
      }, msg.delay - (messages[currentMessageIndex - 1]?.delay || 0))
    }

    animateMessage()
  }, [])

  // --- Render Expired Offer Page ---
  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
        <div className="glass-strong max-w-2xl w-full text-center p-8 md:p-12 rounded-xl shadow-lg border border-red-500">
          <div className="text-6xl md:text-8xl mb-6 animate-pulse">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-6 leading-tight">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">El Plan A Permanente ahora cuesta $225</p>
          <p className="text-lg text-gray-400">Esta oferta especial de $19.99 ya no está disponible.</p>
        </div>
      </div>
    )
  }

  // --- Main Upsell Page Render ---
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Global Styles */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          background-color: #1a1a2e; /* Dark background */
          color: #e0e0e0; /* Light text */
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        section {
          padding: 4rem 0;
        }
        h1,
        h2,
        h3,
        h4 {
          font-weight: 900;
          line-height: 1.2;
        }
        .text-balance {
          text-wrap: balance;
        }
        .gradient-success {
          background: linear-gradient(135deg, #28a745 0%, #218838 100%);
        }
        .gradient-danger {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        }
        .gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
        .gradient-warning {
          background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
        }
        .text-success-foreground {
          color: #fff;
        }
        .text-destructive-foreground {
          color: #fff;
        }
        .text-primary-foreground {
          color: #fff;
        }
        .text-warning-foreground {
          color: #333;
        }
        .text-muted-foreground {
          color: #b0b0b0;
        }
        .text-success {
          color: #28a745;
        }
        .text-destructive {
          color: #dc3545;
        }
        .text-primary {
          color: #007bff;
        }
        .text-warning {
          color: #ffc107;
        }
        .text-foreground {
          color: #e0e0e0;
        }
        .bg-muted {
          background-color: #2a2a3a;
        }
        .border-success {
          border-color: #28a745;
        }
        .border-destructive {
          border-color: #dc3545;
        }
        .border-primary {
          border-color: #007bff;
        }
        .border-warning {
          border-color: #ffc107;
        }
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
        }
        .glass-strong {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 60px rgba(0, 0, 0, 0.2);
          border-radius: 16px;
        }

        /* Animations */
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shine {
          background-size: 200% auto;
          animation: shine 8s linear infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 193, 7, 0);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.1);
          }
          30% {
            transform: scale(1);
          }
          45% {
            transform: scale(1.1);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s infinite;
        }

        @keyframes urgent-tick {
          0%,
          100% {
            transform: translateY(-50%) scale(1);
          }
          50% {
            transform: translateY(-50%) scale(1.1);
          }
        }
        .animate-urgent-tick {
          animation: urgent-tick 1s infinite;
        }

        /* Utility classes for layout */
        .flex {
          display: flex;
        }
        .grid {
          display: grid;
        }
        .items-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .flex-col {
          flex-direction: column;
        }
        .gap-4 {
          gap: 1rem;
        }
        .gap-6 {
          gap: 1.5rem;
        }
        .gap-8 {
          gap: 2rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }
        .mb-12 {
          margin-bottom: 3rem;
        }
        .mt-4 {
          margin-top: 1rem;
        }
        .mt-6 {
          margin-top: 1.5rem;
        }
        .mt-8 {
          margin-top: 2rem;
        }
        .p-4 {
          padding: 1rem;
        }
        .p-6 {
          padding: 1.5rem;
        }
        .p-8 {
          padding: 2rem;
        }
        .py-16 {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }
        .py-24 {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .text-center {
          text-align: center;
        }
        .text-left {
          text-align: left;
        }
        .text-xl {
          font-size: 1.25rem;
        }
        .text-2xl {
          font-size: 1.5rem;
        }
        .text-3xl {
          font-size: 1.875rem;
        }
        .text-4xl {
          font-size: 2.25rem;
        }
        .text-5xl {
          font-size: 3rem;
        }
        .text-6xl {
          font-size: 3.75rem;
        }
        .text-7xl {
          font-size: 4.5rem;
        }
        .text-8xl {
          font-size: 6rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .font-black {
          font-weight: 900;
        }
        .rounded-xl {
          border-radius: 0.75rem;
        }
        .rounded-2xl {
          border-radius: 1rem;
        }
        .rounded-full {
          border-radius: 9999px;
        }
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .max-w-xs {
          max-width: 20rem;
        }
        .max-w-md {
          max-width: 28rem;
        }
        .max-w-lg {
          max-width: 32rem;
        }
        .max-w-xl {
          max-width: 36rem;
        }
        .max-w-2xl {
          max-width: 42rem;
        }
        .max-w-3xl {
          max-width: 48rem;
        }
        .max-w-4xl {
          max-width: 56rem;
        }
        .max-w-6xl {
          max-width: 72rem;
        }
        .w-full {
          width: 100%;
        }
        .h-full {
          height: 100%;
        }
        .relative {
          position: relative;
        }
        .absolute {
          position: absolute;
        }
        .top-0 {
          top: 0;
        }
        .left-0 {
          left: 0;
        }
        .right-0 {
          right: 0;
        }
        .bottom-0 {
          bottom: 0;
        }
        .inset-0 {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .transform {
          transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
            skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        }
        .translate-x-1\/2 {
          --tw-translate-x: 50%;
        }
        .-translate-x-1\/2 {
          --tw-translate-x: -50%;
        }
        .translate-y-1\/2 {
          --tw-translate-y: 50%;
        }
        .-translate-y-1\/2 {
          --tw-translate-y: -50%;
        }
        .z-50 {
          z-index: 50;
        }
        .block {
          display: block;
        }
        .hidden {
          display: none;
        }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .hover\:text-foreground:hover {
          color: #e0e0e0;
        }
        .underline {
          text-decoration: underline;
        }
        .italic {
          font-style: italic;
        }
        .leading-relaxed {
          line-height: 1.625;
        }
        .space-y-4 > :not([hidden]) ~ :not([hidden]) {
          margin-top: 1rem;
        }
        .space-y-6 > :not([hidden]) ~ :not([hidden]) {
          margin-top: 1.5rem;
        }
        .space-y-8 > :not([hidden]) ~ :not([hidden]) {
          margin-top: 2rem;
        }
        .space-y-3 > :not([hidden]) ~ :not([hidden]) {
          margin-top: 0.75rem;
        }
        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        .grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .grid-cols-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .md\:grid-cols-2 {
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .md\:grid-cols-3 {
          @media (min-width: 768px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .lg\:grid-cols-2 {
          @media (min-width: 1024px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .lg\:grid-cols-4 {
          @media (min-width: 1024px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .md\:text-xl {
          @media (min-width: 768px) {
            font-size: 1.25rem;
          }
        }
        .md\:text-2xl {
          @media (min-width: 768px) {
            font-size: 1.5rem;
          }
        }
        .md\:text-3xl {
          @media (min-width: 768px) {
            font-size: 1.875rem;
          }
        }
        .md\:text-4xl {
          @media (min-width: 768px) {
            font-size: 2.25rem;
          }
        }
        .md\:text-5xl {
          @media (min-width: 768px) {
            font-size: 3rem;
          }
        }
        .md\:text-6xl {
          @media (min-width: 768px) {
            font-size: 3.75rem;
          }
        }
        .lg\:text-5xl {
          @media (min-width: 1024px) {
            font-size: 3rem;
          }
        }
        .lg\:text-6xl {
          @media (min-width: 1024px) {
            font-size: 3.75rem;
          }
        }
        .md\:py-8 {
          @media (min-width: 768px) {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
        }
        .md\:px-12 {
          @media (min-width: 768px) {
            padding-left: 3rem;
            padding-right: 3rem;
          }
        }
        .md\:p-12 {
          @media (min-width: 768px) {
            padding: 3rem;
          }
        }
        .md\:py-24 {
          @media (min-width: 768px) {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }
        }
        .md\:text-base {
          @media (min-width: 768px) {
            font-size: 1rem;
          }
        }
        .md\:text-lg {
          @media (min-width: 768px) {
            font-size: 1.125rem;
          }
        }
        .md\:text-xl {
          @media (min-width: 768px) {
            font-size: 1.25rem;
          }
        }
        .md\:text-2xl {
          @media (min-width: 768px) {
            font-size: 1.5rem;
          }
        }
        .md\:text-3xl {
          @media (min-width: 768px) {
            font-size: 1.875rem;
          }
        }
        .lg\:text-3xl {
          @media (min-width: 1024px) {
            font-size: 1.875rem;
          }
        }
        .lg\:text-4xl {
          @media (min-width: 1024px) {
            font-size: 2.25rem;
          }
        }
        .lg\:text-5xl {
          @media (min-width: 1024px) {
            font-size: 3rem;
          }
        }
        .lg\:text-6xl {
          @media (min-width: 1024px) {
            font-size: 3.75rem;
          }
        }
        .lg\:grid-cols-2 {
          @media (min-width: 1024px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .lg\:grid-cols-4 {
          @media (min-width: 1024px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        /* Custom Button Styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          text-decoration: none;
          color: white;
          border: none;
        }
        .btn-lg {
          padding: 1.5rem 2.5rem;
          font-size: 1.25rem;
          border-radius: 1rem;
        }
        .btn-xl {
          padding: 1.5rem 3rem;
          font-size: 1.5rem;
          border-radius: 1.25rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 123, 255, 0.6);
        }
        .btn-destructive {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
        }
        .btn-destructive:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 53, 69, 0.6);
        }

        /* Custom Badge Styles */
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 9999px;
          text-transform: uppercase;
        }
        .badge-success {
          background-color: #28a745;
          color: white;
        }
        .badge-destructive {
          background-color: #dc3545;
          color: white;
        }
        .badge-warning {
          background-color: #ffc107;
          color: #333;
        }

        /* WhatsApp Mockup Specific Styles */
        .iphone-mockup {
          width: 320px;
          height: 640px;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 35px;
          padding: 8px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          margin: 0 auto;
        }
        .notch {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 25px;
          background: #000;
          border-radius: 0 0 15px 15px;
          z-index: 10;
        }
        .screen-content {
          background: #000;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .whatsapp-header {
          background: #075e54;
          padding: 35px 15px 15px 15px;
          display: flex;
          align-items: center;
          color: white;
          font-size: 14px;
          z-index: 5;
        }
        .back-arrow {
          margin-right: 10px;
          font-size: 18px;
        }
        .contact-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          object-fit: cover;
        }
        .contact-info {
          flex: 1;
        }
        .contact-name {
          font-weight: bold;
          margin-bottom: 2px;
        }
        .last-seen {
          font-size: 12px;
          color: #b3d4d1;
        }
        .header-icons {
          display: flex;
          gap: 15px;
        }
        .chat-messages {
          flex: 1;
          background: #ece5dd url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="%23ece5dd"/><rect x="0" y="0" width="10" height="10" fill="%23e8ddd4"/><rect x="10" y="10" width="10" height="10" fill="%23e8ddd4"/></svg>');
          padding: 15px;
          overflow-y: auto;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .date-separator {
          text-align: center;
          margin: 10px 0 20px 0;
        }
        .date-separator span {
          background: rgba(0, 0, 0, 0.1);
          color: #667781;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
        }
        .message-bubble {
          margin: 8px 0;
          max-width: 85%;
          position: relative;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .message-bubble.sent {
          margin-left: auto;
          background: #dcf8c6;
          border-radius: 18px 18px 4px 18px;
          align-self: flex-end;
        }
        .message-bubble.received {
          margin-right: auto;
          background: white;
          border-radius: 18px 18px 18px 4px;
          align-self: flex-start;
        }
        .message-content {
          padding: 10px 14px 6px 14px;
          font-size: 16px; /* Increased font size */
          line-height: 1.5; /* Improved line height */
          word-wrap: break-word;
          color: #111; /* Darker text for contrast */
        }
        .message-time {
          padding: 0 14px 8px 14px;
          font-size: 11px;
          color: #667781;
          text-align: right;
        }
        .message-bubble.received .message-time {
          text-align: left;
        }
        .typing-indicator {
          background: white !important;
          padding: 12px !important;
          border-radius: 18px 18px 18px 4px !important;
          width: 60px !important;
          animation: typingPulse 1.5s infinite;
          display: none; /* Hidden by default */
          align-self: flex-start;
        }
        @keyframes typingPulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        .typing-dots {
          display: flex;
          gap: 4px;
        }
        .typing-dots span {
          width: 6px;
          height: 6px;
          background: #999;
          border-radius: 50%;
          animation: typingDots 1.4s infinite;
        }
        .typing-dots span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typingDots {
          0%,
          60%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        .whatsapp-input {
          background: #f0f0f0;
          padding: 8px;
        }
        .input-container {
          background: white;
          border-radius: 25px;
          display: flex;
          align-items: center;
          padding: 8px 15px;
          gap: 10px;
        }
        .input-container input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #999;
        }

        /* Exit Modal Styles */
        .exit-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .exit-modal-overlay.show {
          opacity: 1;
        }
        .exit-modal-content {
          background: #1a1a2e;
          border-radius: 16px;
          padding: 2rem;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transform: translateY(20px);
          transition: transform 0.3s ease-in-out;
          border: 2px solid #dc3545;
        }
        .exit-modal-overlay.show .exit-modal-content {
          transform: translateY(0);
        }
        .exit-modal-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .iphone-mockup {
            width: 280px;
            height: 560px;
          }
          .whatsapp-header {
            padding-top: 25px;
          }
          .message-content {
            font-size: 15px;
          }
          .btn-lg {
            font-size: 1.125rem;
            padding: 1.25rem 2rem;
          }
        }
        @media (min-width: 768px) {
          .md\:flex-row {
            flex-direction: row;
          }
          .md\:text-left {
            text-align: left;
          }
          .md\:items-start {
            align-items: flex-start;
          }
        }
      `}</style>

      {/* SUCCESS HEADER */}
      <section className="gradient-success py-16 md:py-24 relative overflow-hidden animate-shine">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl md:text-8xl mb-6">🎯</div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-balance text-success-foreground">
            ¡FELICIDADES! Tu Plan A Está Confirmado
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-8 text-success-foreground">
            ⚠️ NO CIERRES ESTA PÁGINA - Descubrimos algo CHOCANTE sobre tu futuro
          </p>
          <div className="badge badge-success text-lg md:text-xl px-6 py-3 font-bold glass-strong">
            ✅ Plan A (Estrategia de reconquista) - CONFIRMADO
          </div>
        </div>
      </section>

      {/* SHOCK REVELATION - PROBLEMA CRÍTICO */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance animate-pulse-glow text-red-500">
            🚨 PERO ACABAMOS DE DESCUBRIR ALGO QUE VA A CAMBIAR TODO...
          </h2>

          <div className="glass-strong max-w-4xl mx-auto p-8 md:p-12 border border-yellow-500">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-8 text-yellow-500">
              DATOS DEVASTADORES DE 4.247 RECONQUISTAS:
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-black text-yellow-500 mb-4">73%</div>
                <p className="text-lg md:text-xl font-bold text-gray-200">
                  De los hombres que usan SOLO el Plan A logran reconquistar
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-7xl font-black text-green-500 mb-4">97%</div>
                <p className="text-lg md:text-xl font-bold text-gray-200">DE ÉXITO TOTAL con el Protocolo</p>
              </div>
            </div>

            <div className="glass p-6 mb-8 border border-yellow-500">
              <p className="text-lg md:text-xl font-bold text-yellow-500">
                PERO los que agregan el "Plan A Permanente":
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-6xl font-black text-green-500 mb-4">11 DÍAS</div>
              <p className="text-lg md:text-xl font-bold text-gray-200">MÁS RÁPIDO (9 días vs 20 días)</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl font-black mt-12 text-red-500 text-balance">
            <strong>¿LA DIFERENCIA?</strong>
            <br />
            El Plan A te hace ATRACTIVO. El Plan A Permanente te hace IRRESISTIBLE.
          </p>
        </div>
      </section>

      {/* TIMELINE VISUAL 0-180 DIAS CON WHATSAPP MOCKUP */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-blue-400">
            🔮 ESTO ES LO QUE ELLA REALMENTE SENTIRÍA SI LE ESCRIBIERAS HOY
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Basado en miles de casos, así se vería tu futuro sin el Plan A Permanente.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* iPhone Mockup */}
            <div className="iphone-mockup">
              <div className="notch"></div>
              <div className="screen-content">
                {/* WhatsApp Header */}
                <div className="whatsapp-header">
                  <div className="back-arrow">←</div>
                  <img
                    src="https://i.ibb.co/5gSMWD68/Generatedimage-1764387030465.png"
                    className="contact-avatar"
                    alt="Avatar"
                    id="contact-avatar"
                  />
                  <div className="contact-info">
                    <div className="contact-name">Ella</div>
                    <div className="last-seen" id="typing-status">
                      En línea
                    </div>
                  </div>
                  <div className="header-icons">
                    <span>📹</span>
                    <span>📞</span>
                    <span>⋮</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages" ref={chatContainerRef}>
                  <div className="date-separator">
                    <span>Día 0 - Reconquista Exitosa</span>
                  </div>

                  <div className="message-bubble sent" id="user-msg-1">
                    <div className="message-content">Hola, ¿cómo estás?</div>
                    <div className="message-time">19:30 ✓✓</div>
                  </div>

                  <div className="message-bubble received typing-indicator" id="ex-typing-1">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="message-bubble received" id="ex-msg-1">
                    <div className="message-content">Bien, gracias. ¿Y tú?</div>
                    <div className="message-time">19:32</div>
                  </div>

                  <div className="date-separator">
                    <span>Día 15 - Todo parece ir bien</span>
                  </div>
                  <div className="message-bubble sent" id="user-msg-2">
                    <div className="message-content">Pensando en ti. Quería verte pronto. 😊</div>
                    <div className="message-time">10:00 ✓✓</div>
                  </div>

                  <div className="message-bubble received typing-indicator" id="ex-typing-2">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="message-bubble received" id="ex-msg-2">
                    <div className="message-content">Estoy un poco ocupada esta semana. Te aviso.</div>
                    <div className="message-time">14:30</div>
                  </div>

                  <div className="date-separator">
                    <span>Día 45 - Primeras señales de distancia</span>
                  </div>
                  <div className="message-bubble sent" id="user-msg-3">
                    <div className="message-content">Siento que nos estamos distanciando. ¿Pasa algo? 😔</div>
                    <div className="message-time">18:00 ✓✓</div>
                  </div>

                  <div className="message-bubble received typing-indicator" id="ex-typing-3">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="message-bubble received" id="ex-msg-3">
                    <div className="message-content">No, todo bien. Solo necesito espacio.</div>
                    <div className="message-time">22:15</div>
                  </div>

                  <div className="date-separator">
                    <span>Día 90 - La relación se enfría</span>
                  </div>
                  <div className="message-bubble sent" id="user-msg-4">
                    <div className="message-content">Te extraño mucho. ¿Podemos hablar? 💔</div>
                    <div className="message-time">09:00 ✓✓</div>
                  </div>

                  <div className="message-bubble received typing-indicator" id="ex-typing-4">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="message-bubble received" id="ex-msg-4">
                    <div className="message-content">...</div>
                    <div className="message-time">17:00</div>
                  </div>

                  <div className="date-separator">
                    <span>Día 180 - La perdiste de nuevo</span>
                  </div>
                  <div className="message-bubble received" id="status-change">
                    <div className="message-content text-center">
                      <span className="font-bold text-red-500">Este contacto ya no está disponible.</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Input */}
                <div className="whatsapp-input">
                  <div className="input-container">
                    <span>😊</span>
                    <input type="text" placeholder="Escribe un mensaje" disabled />
                    <span>📎</span>
                    <span>🎤</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Analysis / Risk Calculator */}
            <div className="glass-strong p-8 md:p-10 max-w-md w-full border border-red-500">
              <h3 className="text-xl md:text-2xl font-black mb-6 text-red-500 text-center">
                📊 TU RIESGO SIN EL PLAN A PERMANENTE
              </h3>
              <div className="text-center mb-8">
                <div className="text-7xl md:text-8xl font-black text-red-500 animate-heartbeat">87%</div>
                <p className="text-lg md:text-xl font-bold text-gray-200">
                  De probabilidad de perderla de nuevo en menos de 6 meses.
                </p>
              </div>
              <ul className="space-y-4 text-left text-gray-300 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">❌</span>
                  <span>Ella se distancia emocionalmente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">❌</span>
                  <span>Pierde el interés y la atracción.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">❌</span>
                  <span>Puede conocer a otra persona.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">❌</span>
                  <span>Vuelves al punto de partida, pero peor.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON: PLAN A vs PLAN A PERMANENTE */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-16 text-balance text-blue-400">
            LA DIFERENCIA ENTRE SER "UNA OPCIÓN"
            <br />
            VS SER "SU OBSESIÓN PERMANENTE"
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* SOLO CON PLAN A */}
            <div className="glass-strong border border-red-500 relative p-8 hover:scale-105 transition-all">
              <div className="badge badge-destructive absolute -top-4 right-4 px-4 py-2 animate-pulse">
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
                    <span className="text-xl text-red-500">💔</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PLAN A + PERMANENTE */}
            <div className="glass-strong border border-green-500 relative p-8 hover:scale-105 transition-all">
              <div className="badge badge-success absolute -top-4 right-4 px-4 py-2 animate-pulse-glow">
                🔥 DOMINANCIA
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-green-500 text-center">
                ✅ PLAN A + PERMANENTE:
              </h4>
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
                    <span className="text-xl text-green-500">🔥</span>
                    <span className="text-sm md:text-base font-semibold text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE INCLUI - 3 PILARES COM 85 TÉCNICAS */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-primary-foreground text-balance">
            🔥 PLAN A PERMANENTE:
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90">
            El método "secreto" que convierte atracción en OBSESIÓN PERMANENTE
          </p>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "🧠",
                title: "PILAR 1: DOMÍNIO PSICOLÓGICO",
                features: [
                  "Los 7 gatillos de obsesión",
                  "El método del 'vacío emocional'",
                  "Protocolo de inversión total",
                ],
              },
              {
                icon: "💬",
                title: "PILAR 2: COMUNICACIÓN PERFEITA",
                features: [
                  "Las 21 frases de dominancia exactas",
                  "Técnicas de comunicación hipnótica",
                  "Scripts para cada situación",
                ],
              },
              {
                icon: "🎯",
                title: "PILAR 3: ESTRATEGIA ANTI-COMPETENCIA",
                features: [
                  "Cómo hacerla inmune a otros hombres",
                  "Técnicas de 'marca emocional' permanente",
                  "Blindaje psicológico contra tentaciones",
                ],
              },
            ].map((module, index) => (
              <div key={index} className="glass-strong p-6 hover:scale-105 transition-all border border-blue-400">
                <div className="text-4xl mb-4">{module.icon}</div>
                <h3 className="text-lg md:text-xl font-black mb-6 text-primary-foreground">{module.title}</h3>
                <ul className="space-y-3 text-left">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-warning">⚡</span>
                      <span className="text-primary-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 DEPOIMENTOS FORTES */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-12 text-blue-400">
            TESTIMONIOS REALES DE ÉXITO PERMANENTE
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-strong p-6 border border-green-500">
              <p className="italic text-lg mb-4 text-gray-200">
                "Reconquisté con el Plan A en 10 días, pero a los 3 meses sentí que se distanciaba. El Plan A
                Permanente fue el interruptor que la hizo obsesionarse de nuevo. Hoy, 1 año después, estamos mejor que
                nunca."
              </p>
              <p className="font-bold text-green-500">- Roberto M., 32 años ⭐⭐⭐⭐⭐</p>
            </div>
            <div className="glass-strong p-6 border border-green-500">
              <p className="italic text-lg mb-4 text-gray-200">
                "Casi cometo el error de solo reconquistar. Gracias al Plan A Permanente, no solo la recuperé, sino que
                ahora ella me persigue y me demuestra su amor cada día. ¡Es increíble!"
              </p>
              <p className="font-bold text-green-500">- Carlos S., 29 años ⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIA 100% */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance text-green-400">
            TU INVERSIÓN ESTÁ 100% PROTEGIDA
          </h2>
          <div className="glass-strong max-w-3xl mx-auto p-8 md:p-12 border border-green-500">
            <ul className="space-y-6 text-left text-lg md:text-xl">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">✅</span>
                <span>
                  **Garantía de 30 Días:** Si no ves resultados o no estás satisfecho, te devolvemos tu dinero. Sin
                  preguntas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">✅</span>
                <span>
                  **Soporte Prioritario:** Acceso a nuestro equipo para resolver tus dudas en menos de 24 horas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">✅</span>
                <span>
                  **Acceso de por Vida:** Una vez que lo adquieres, es tuyo para siempre, incluyendo futuras
                  actualizaciones.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">✅</span>
                <span>
                  **Comunidad Exclusiva:** Únete a un grupo de hombres que han logrado la reconquista y la mantienen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">✅</span>
                <span>
                  **Sin Riesgos:** Tu única preocupación será cómo manejar tanta obsesión.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* URGENCY SECTION */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="glass-strong border border-red-500 max-w-3xl mx-auto p-8 md:p-12 text-center relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-4xl animate-urgent-tick">
              ⏰
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-red-500 text-balance">
              ⚠️ VENTANA CRÍTICA DE OPORTUNIDAD
            </h3>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-8 text-gray-300">
              <p>
                Esta oferta especial es <strong>SOLO para clientes del Plan A</strong> y{" "}
                <strong>SOLO en esta sesión.</strong>
              </p>
              <p>Si sales de esta página, tendrás que pagar el precio completo de $225 después.</p>
            </div>

            <div className="gradient-danger text-destructive-foreground p-6 rounded-xl text-4xl md:text-6xl font-black mb-4 animate-pulse">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm md:text-base text-red-400 mb-8">
              Después de este tiempo, esta oferta desaparece para siempre.
            </p>

            {scarcityMessage && (
              <p className="text-lg md:text-xl font-bold text-yellow-400 animate-pulse">{scarcityMessage}</p>
            )}
          </div>
        </div>
      </section>

      {/* PRICE SECTION & CTA */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="glass-strong border border-yellow-500 p-8 mb-12">
              <h3 className="text-2xl md:text-3xl font-black mb-6 text-yellow-500">🤔 PIÉNSALO ASÍ...</h3>
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

            <div className="glass-strong border border-green-500 p-8 mb-12">
              <div className="text-2xl md:text-3xl text-gray-400 line-through mb-4">Valor total: $225</div>
              <div className="text-5xl md:text-7xl font-black text-red-500 mb-6">$19.99</div>
              <div className="badge gradient-warning text-warning-foreground text-lg md:text-xl px-6 py-3 font-black animate-pulse-glow">
                ¡Ahorras $205!
              </div>
              <p className="text-sm md:text-base text-green-500 mt-4">Acceso inmediato + Garantía de 30 días</p>
            </div>

            {/* HOTMART WIDGET - Placeholder */}
            <div className="glass p-6 rounded-xl mb-8">
              <p className="text-gray-400">
                Aquí iría tu widget de Hotmart o formulario de pago.
                <br />
                Asegúrate de que el botón de abajo apunte a tu link de checkout.
              </p>
            </div>

            {/* MAIN CTA */}
            <a
              href="https://pay.hotmart.com/YOUR_HOTMART_LINK_UPSELL" // REPLACE WITH YOUR HOTMART UPSELL LINK
              className="btn btn-destructive btn-xl font-black px-8 md:px-12 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all animate-shine mb-8 w-full max-w-2xl mx-auto block"
            >
              🔥 SÍ, QUIERO EL PLAN A PERMANENTE
              <div className="text-base md:text-lg font-semibold mt-2">
                Agregar por solo $19.99 - Acceso inmediato
              </div>
            </a>

            {/* FALLBACK CTA */}
            <a
              href="https://protocolo-dw.vercel.app/" // REPLACE WITH YOUR FALLBACK LINK
              className="text-gray-400 hover:text-gray-200 transition-colors underline text-sm md:text-base"
            >
              No, prefiero arriesgarme y usar solo el Plan A (87% de riesgo)
            </a>
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      {showExitModal && (
        <div className={`exit-modal-overlay ${showExitModal ? "show" : ""}`}>
          <div className="exit-modal-content">
            <h3 className="text-3xl font-black text-red-500 mb-4">
              ¡ESPERA! No te vayas sin esto...
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Estás a punto de cerrar esta página y perder la oportunidad de asegurar tu relación para siempre.
            </p>
            <p className="text-lg text-yellow-400 mb-8">
              Sin el Plan A Permanente, el 87% de los hombres vuelven a perder a su pareja.
            </p>
            <div className="exit-modal-buttons">
              <a
                href="https://pay.hotmart.com/YOUR_HOTMART_LINK_UPSELL" // REPLACE WITH YOUR HOTMART UPSELL LINK
                className="btn btn-destructive btn-lg w-full"
                onClick={() => setShowExitModal(false)}
              >
                🔥 SÍ, QUIERO EL PLAN A PERMANENTE POR $19.99
              </a>
              <button
                className="btn btn-primary btn-lg w-full"
                onClick={() => setShowExitModal(false)}
              >
                No, gracias. Prefiero arriesgarme.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

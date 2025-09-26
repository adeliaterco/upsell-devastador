"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UpsellPage() {
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
  const [isExpired, setIsExpired] = useState(false)

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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "¿Estás seguro? Esta oferta especial de $17 no estará disponible después."
      e.returnValue = message
      return message
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-strong max-w-2xl w-full text-center p-12">
          <div className="text-6xl mb-6">⏰</div>
          <h1 className="text-4xl md:text-6xl font-black text-destructive mb-6 text-balance">OFERTA EXPIRADA</h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">El Protocolo de Dominancia ahora cuesta $225</p>
          <p className="text-lg text-muted-foreground">Esta oferta especial de $17 ya no está disponible.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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
          <Badge className="glass-strong text-lg md:text-xl px-6 py-3 font-bold">
            ✅ Plan A (Estrategia de reconquista) - CONFIRMADO
          </Badge>
        </div>
      </section>

      {/* SHOCK REVELATION */}
      <section className="gradient-danger py-16 md:py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-12 text-balance animate-pulse-glow text-destructive-foreground">
            🚨 PERO ACABAMOS DE DESCUBRIR ALGO QUE VA A CAMBIAR TODO...
          </h2>

          <Card className="glass-strong max-w-4xl mx-auto p-8 md:p-12 border-warning">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-8 text-warning">
              DATOS DEVASTADORES DE 4.247 RECONQUISTAS:
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-black text-warning mb-4">73%</div>
                <p className="text-lg md:text-xl font-bold text-foreground">
                  De los hombres que usan SOLO el Plan A logran reconquistar
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-7xl font-black text-success mb-4">97%</div>
                <p className="text-lg md:text-xl font-bold text-foreground">DE ÉXITO TOTAL con el Protocolo</p>
              </div>
            </div>

            <Card className="glass p-6 mb-8">
              <p className="text-lg md:text-xl font-bold text-warning">
                PERO los que agregan el "Protocolo de Dominancia Emocional":
              </p>
            </Card>

            <div className="text-center">
              <div className="text-4xl md:text-6xl font-black text-success mb-4">11 DÍAS</div>
              <p className="text-lg md:text-xl font-bold text-foreground">MÁS RÁPIDO (9 días vs 20 días)</p>
            </div>
          </Card>

          <p className="text-xl md:text-2xl lg:text-3xl font-black mt-12 text-destructive-foreground text-balance">
            <strong>¿LA DIFERENCIA?</strong>
            <br />
            El Plan A te hace ATRACTIVO. El Protocolo te hace IRRESISTIBLE.
          </p>
        </div>
      </section>

      {/* CRITICAL PROBLEM */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="glass-strong max-w-4xl mx-auto p-8 md:p-12 border-l-8 border-warning relative">
            <div className="absolute -top-8 left-8 w-16 h-16 bg-warning rounded-full flex items-center justify-center text-3xl animate-heartbreak">
              💔
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-warning text-balance">
              💔 EL PROBLEMA QUE EL 73% NO VE VENIR
            </h3>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed">
              <p className="font-bold">El Plan A te da la estrategia perfecta para reconquistar.</p>
              <p className="font-bold">
                Pero NO incluye las técnicas de dominancia emocional que la vuelven OBSESIONADA contigo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <Card className="glass border-destructive text-center p-6">
                <div className="text-3xl md:text-4xl font-black text-destructive mb-2">27%</div>
                <div className="text-sm md:text-base font-semibold text-destructive">Fallan completamente</div>
              </Card>
              <Card className="glass border-destructive text-center p-6">
                <div className="text-3xl md:text-4xl font-black text-destructive mb-2">20 días</div>
                <div className="text-sm md:text-base font-semibold text-destructive">Tiempo promedio</div>
              </Card>
              <Card className="glass border-destructive text-center p-6">
                <div className="text-3xl md:text-4xl font-black text-destructive mb-2">43%</div>
                <div className="text-sm md:text-base font-semibold text-destructive">Ella conoce a otro</div>
              </Card>
            </div>

            <p className="text-xl md:text-2xl font-black text-destructive text-center text-balance">
              ¿Vas a arriesgar que ella conozca a alguien más en esos 11 días extra?
            </p>
          </Card>
        </div>
      </section>

      {/* BRUTAL COMPARISON */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-16 text-balance">
            LA DIFERENCIA ENTRE SER "UNA OPCIÓN"
            <br />
            VS SER "SU OBSESIÓN"
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* WITHOUT PROTOCOL */}
            <Card className="glass-strong border-destructive relative p-8 hover:scale-105 transition-transform">
              <Badge className="absolute -top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 animate-pulse">
                ⚠️ PELIGRO
              </Badge>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-destructive text-center">❌ SOLO CON PLAN A:</h4>
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
                    <span className="text-sm md:text-base font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* WITH PROTOCOL */}
            <Card className="glass-strong border-success relative p-8 hover:scale-105 transition-transform">
              <Badge className="absolute -top-4 right-4 bg-success text-success-foreground px-4 py-2 animate-pulse-glow">
                🔥 DOMINANCIA
              </Badge>
              <h4 className="text-xl md:text-2xl font-black mb-6 text-success text-center">✅ PLAN A + PROTOCOLO:</h4>
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
                    <span className="text-sm md:text-base font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="glass-strong max-w-4xl mx-auto p-8 md:p-12 border-l-8 border-primary relative">
            <div className="absolute -top-8 left-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-3xl animate-pulse-glow">
              🔥
            </div>

            <h4 className="text-2xl md:text-3xl font-black mb-8 text-primary">
              "Casi cometo el ERROR MÁS GRANDE de mi vida..."
            </h4>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed italic">
              <p>
                "Compré el Plan A el lunes. El miércoles, casi no compro el Protocolo porque pensé que era
                'innecesario'. Por suerte, algo me hizo comprarlo. En 3 días, ella me escribía a las 2 AM diciendo que
                no podía dejar de pensar en mí."
              </p>
              <p>
                "La diferencia fue BRUTAL. Con solo el Plan A, ella respondía mis mensajes y salimos una vez. Pero
                cuando apliqué el Protocolo de Dominancia, fue como activar un interruptor en su cerebro. No podía vivir
                sin mí."
              </p>
            </div>

            <Card className="glass border-success p-6 mt-8">
              <p className="font-bold text-success text-lg">
                <strong>Resultado:</strong> Reconquista en 8 días. Hoy estamos casados hace 2 años y ella me dice que
                nunca había sentido una conexión tan fuerte con alguien.
              </p>
            </Card>

            <p className="mt-6 font-bold text-primary">- Roberto M., reconquistó en 8 días con Plan A + Protocolo</p>
          </Card>
        </div>
      </section>

      {/* PRODUCT REVELATION */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-primary-foreground text-balance">
            🔥 PROTOCOLO DE DOMINANCIA EMOCIONAL
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90">
            El método "secreto" que convierte atracción en OBSESIÓN
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "🧠",
                title: "LOS 7 GATILLOS DE OBSESIÓN",
                features: [
                  "Técnicas neurológicas que hacen que piense en ti 24/7",
                  'Cómo activar su instinto de "necesidad desesperante"',
                  'El método del "vacío emocional" que la vuelve adicta',
                  "Protocolo de inversión total (ella te persigue)",
                ],
              },
              {
                icon: "💬",
                title: "FRASES DE DOMINANCIA EXACTAS",
                features: [
                  "Las 21 frases que despiertan sumisión emocional",
                  "Mensajes que funcionan incluso si te ignora",
                  "Técnicas de comunicación hipnótica",
                  "Scripts para cada situación específica",
                ],
              },
              {
                icon: "⚡",
                title: "ESTRATEGIA DE DOMINANCIA SEXUAL",
                features: [
                  "Cómo despertar deseo físico intenso a distancia",
                  "Técnicas de tensión sexual por mensajes",
                  'El método de "hambre sexual" controlada',
                  "Protocolo de seducción psicológica",
                ],
              },
              {
                icon: "🎯",
                title: "PROTOCOLO ANTI-COMPETENCIA",
                features: [
                  "Cómo hacerla inmune a otros hombres",
                  'Técnicas de "marca emocional" permanente',
                  "Sistema de comparación automática (tú siempre ganas)",
                  "Blindaje psicológico contra tentaciones",
                ],
              },
            ].map((module, index) => (
              <Card key={index} className="glass-strong p-6 hover:scale-105 transition-transform">
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="glass-strong border-warning p-8 mb-12">
              <h3 className="text-2xl md:text-3xl font-black mb-6 text-warning">🤔 PIÉNSALO ASÍ...</h3>
              <div className="space-y-4 text-lg md:text-xl leading-relaxed">
                <p>
                  <strong>Ya invertiste en el Plan A</strong> porque quieres reconquistarla.
                </p>
                <p>
                  ¿Vas a arriesgar que tome <strong>20 días en lugar de 9 días</strong> por ahorrar $17?
                </p>
                <p className="text-xl md:text-2xl font-black text-destructive">
                  ¿Vas a arriesgar que ella conozca a otro en esos 11 días extra?
                </p>
              </div>
            </Card>

            <Card className="glass-strong border-success p-8 mb-12">
              <div className="text-2xl md:text-3xl text-muted-foreground line-through mb-4">Valor total: $225</div>
              <div className="text-5xl md:text-7xl font-black text-destructive mb-6">$17</div>
              <Badge className="gradient-warning text-warning-foreground text-lg md:text-xl px-6 py-3 font-black animate-pulse-glow">
                ¡Ahorras $208!
              </Badge>
              <p className="text-sm md:text-base text-success mt-4">Acceso inmediato + Garantía de 30 días</p>
            </Card>

            {/* HOTMART WIDGET */}
            <div className="glass p-6 rounded-xl mb-8">
              <div id="hotmart-sales-funnel"></div>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="glass-strong border-destructive max-w-3xl mx-auto p-8 md:p-12 text-center relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-destructive rounded-full flex items-center justify-center text-4xl animate-urgent-tick">
              ⏰
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-destructive text-balance">
              ⚠️ VENTANA CRÍTICA DE OPORTUNIDAD
            </h3>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-8">
              <p>
                Esta oferta especial es <strong>SOLO para clientes del Plan A</strong> y{" "}
                <strong>SOLO en esta sesión.</strong>
              </p>
              <p>Si sales de esta página, tendrás que pagar el precio completo de $225 después.</p>
            </div>

            <div className="gradient-danger text-destructive-foreground p-6 rounded-xl text-4xl md:text-6xl font-black mb-8 animate-pulse">
              {formatTime(timeLeft)}
            </div>

            <p className="text-sm md:text-base text-destructive">
              Después de este tiempo, esta oferta desaparece para siempre.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Button
            asChild
            size="lg"
            className="gradient-danger text-destructive-foreground text-xl md:text-2xl lg:text-3xl font-black px-8 md:px-12 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all animate-shine mb-8 w-full max-w-2xl mx-auto block"
          >
            <a href="https://pay.hotmart.com/D100233207O?off=r4cz8pgu">
              🔥 SÍ, QUIERO LA DOMINANCIA TOTAL
              <div className="text-base md:text-lg font-semibold mt-2">
                Agregar Protocolo por solo $17 - Acceso inmediato
              </div>
            </a>
          </Button>

          <Card className="glass max-w-2xl mx-auto p-6 mb-8 text-left">
            <h4 className="text-lg md:text-xl font-black mb-4 text-success">✅ Lo que recibes INMEDIATAMENTE:</h4>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li>• Acceso instantáneo al Protocolo completo</li>
              <li>• 4 módulos de dominancia específicos</li>
              <li>• Plan de acción día a día para 14 días</li>
              <li>• Garantía de 30 días sin riesgo</li>
            </ul>
          </Card>

          <div className="text-center">
            <a
              href="https://comprarplanseguro.shop/dw/"
              className="text-muted-foreground hover:text-foreground transition-colors underline text-sm md:text-base"
            >
              No, prefiero usar solo el Plan A (20 días promedio)
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

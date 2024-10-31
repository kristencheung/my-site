"use client"
import { useEffect, useRef } from "react"

declare global {
  interface Window {
    p5: any
  }
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.p5 && containerRef.current) {
      const symbols: any[] = []
      const splashes: any[] = []
      const SYMBOL_TYPES = [
        "cross",
        "cross",
        "square",
        "square",
        "square",
        "square",
        "line",
        "line",
        "line",
        "line",
      ]

      // Responsive calculations
      function getResponsiveValues(p: any) {
        const isMobile = p.width < 768 // Standard mobile breakpoint
        return {
          textWidth: isMobile ? p.width * 0.55 : p.width * 0.19, // Wider text area on mobile
          textHeight: isMobile ? 40 : 60, // Smaller collision height on mobile
          splashSize: isMobile ? 0.4 : 0.6, // Smaller splash on mobile
          symbolSize: isMobile ? 0.8 : 1, // Slightly smaller symbols on mobile
          particleCount: isMobile ? 3 : 4, // Fewer particles on mobile
          splashSpeed: isMobile ? 0.8 : 1, // Slower splash on mobile
        }
      }

      function getFadeDistance(p: any) {
        if (p.random() < 0.6) {
          return p.random(window.innerHeight * 0.1, window.innerHeight * 0.4)
        } else {
          return p.random(window.innerHeight * 0.5, window.innerHeight * 0.8)
        }
      }

      function getDepthColor(p: any) {
        // Create three distinct layers of depth
        const layer = p.random()
        let baseColor, alpha

        if (layer < 0.3) {
          // Background layer - darkest gray
          baseColor = p.random(90, 110)
          alpha = p.random(180, 200)
        } else if (layer < 0.7) {
          // Middle layer - medium gray
          baseColor = p.random(110, 130)
          alpha = p.random(200, 230)
        } else {
          // Foreground layer - still gray, never approaching white
          baseColor = p.random(130, 150)
          alpha = p.random(230, 255)
        }

        // Add subtle variation within each layer
        const variation = p.random(-5, 5)
        const finalColor = Math.min(150, baseColor + variation)
        return {
          r: finalColor,
          g: finalColor,
          b: finalColor,
          alpha,
        }
      }

      function getSymbolSize(p: any, layer: number) {
        // Size varies by layer for depth perception
        if (layer < 0.3) {
          return p.random(2, 4)
        } else if (layer < 0.7) {
          return p.random(3, 6)
        } else {
          return p.random(4, 8)
        }
      }

      function createSplashParticle(
        p: any,
        x: number,
        y: number,
        angle: number,
        speed: number,
        size: number
      ) {
        const responsive = getResponsiveValues(p)
        const layer = p.random()
        return {
          x,
          y,
          dx: Math.cos(angle) * speed * responsive.splashSpeed,
          dy: Math.sin(angle) * speed * responsive.splashSpeed,
          alpha: 255,
          size: size * responsive.splashSize,
          rotation: p.random(p.TWO_PI),
          rotationSpeed: p.random(-0.05, 0.05),
          type: SYMBOL_TYPES[Math.floor(p.random(SYMBOL_TYPES.length))],
          color: getDepthColor(p),
          layer,
        }
      }

      function createSplash(
        p: any,
        x: number,
        y: number,
        size: number,
        symbolType: string
      ) {
        const particleCount = 4
        const particles = []

        for (let i = 0; i < particleCount; i++) {
          const angle = (p.TWO_PI / particleCount) * i - p.PI / 2
          const speed = p.random(0.3, 1.5)
          const particleSize = size * p.random(0.3, 0.8)
          particles.push(
            createSplashParticle(p, x, y, angle, speed, particleSize)
          )
        }

        return {
          particles,
          alpha: 255,
          fadeSpeed: 6,

          update() {
            this.alpha -= this.fadeSpeed
            this.particles.forEach((particle) => {
              particle.dy += 0.03
              particle.x += particle.dx
              particle.y += particle.dy
              particle.alpha -= this.fadeSpeed
              particle.rotation += particle.rotationSpeed
              particle.color.alpha = particle.alpha
            })
          },

          display(p: any) {
            const responsive = getResponsiveValues(p)
            this.particles.forEach((particle) => {
              if (particle.alpha <= 0) return

              p.push()
              p.translate(particle.x, particle.y)
              p.rotate(particle.rotation)
              p.stroke(
                particle.color.r,
                particle.color.g,
                particle.color.b,
                particle.color.alpha
              )
              p.noFill()
              p.strokeWeight(
                particle.layer < 0.3 ? 0.3 : particle.layer < 0.7 ? 0.5 : 0.7
              ) * responsive.symbolSize

              switch (particle.type) {
                case "cross":
                  p.line(-particle.size / 2, 0, particle.size / 2, 0)
                  p.line(0, -particle.size / 2, 0, particle.size / 2)
                  break
                case "square":
                  p.rectMode(p.CENTER)
                  p.rect(0, 0, particle.size, particle.size)
                  break
                case "line":
                  p.line(-particle.size / 2, 0, particle.size / 2, 0)
                  break
              }
              p.pop()
            })
          },
        }
      }

      function createSymbol(p: any) {
        const fadeDistance = getFadeDistance(p)
        const fadeLength = p.random(100, 200)
        const layer = p.random() // Determines depth layer

        return {
          x: p.random(p.width),
          y: p.random(-100, 0),
          size: getSymbolSize(p, layer),
          speed: p.random(0.6, 1.6),
          alpha: 255,
          fadeSpeed: p.random(0.5, 2),
          rotation: p.random(p.TWO_PI),
          rotationSpeed: p.random(-0.02, 0.02),
          type: SYMBOL_TYPES[Math.floor(p.random(SYMBOL_TYPES.length))],
          hasCollided: false,
          color: getDepthColor(p),
          fadeDistance,
          fadeLength,
          layer,

          update() {
            const responsive = getResponsiveValues(p)
            if (!this.hasCollided) {
              this.y += this.speed
              this.rotation += this.rotationSpeed

              // Responsive text collision area
              const textWidth = responsive.textWidth
              const textLeft = (p.width - textWidth) / 2
              const textRight = textLeft + textWidth
              const NAME_Y_POSITION = p.height / 2

              const isInTextArea =
                this.x > textLeft &&
                this.x < textRight &&
                Math.abs(this.y - NAME_Y_POSITION) < responsive.textHeight / 2

              if (isInTextArea && !this.hasCollided) {
                this.hasCollided = true
                splashes.push(
                  createSplash(p, this.x, this.y, this.size, this.type)
                )
                this.alpha = 0
              }
            }

            if (
              !this.hasCollided &&
              this.y > this.fadeDistance - this.fadeLength
            ) {
              const fadeProgress =
                (this.y - (this.fadeDistance - this.fadeLength)) /
                this.fadeLength
              this.alpha = p.lerp(255, 0, fadeProgress)
              this.color.alpha = this.alpha
            }
          },

          display(p: any) {
            if (this.alpha <= 0) return
            const responsive = getResponsiveValues(p)

            p.push()
            p.translate(this.x, this.y)
            p.rotate(this.rotation)
            p.stroke(this.color.r, this.color.g, this.color.b, this.color.alpha)
            p.noFill()
            p.strokeWeight(
              (this.layer < 0.3 ? 0.3 : this.layer < 0.7 ? 0.5 : 0.7) *
                responsive.symbolSize
            )

            switch (this.type) {
              case "cross":
                p.line(-this.size / 2, 0, this.size / 2, 0)
                p.line(0, -this.size / 2, 0, this.size / 2)
                break
              case "square":
                p.rectMode(p.CENTER)
                p.rect(0, 0, this.size, this.size)
                break
              case "line":
                p.line(-this.size / 2, 0, this.size / 2, 0)
                break
            }
            p.pop()
          },
        }
      }

      sketchRef.current = new window.p5((p: any) => {
        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
          canvas.parent(containerRef.current!)
          p.background(0)
        }

        p.draw = () => {
          p.background(0, 0, 0)

          for (let i = splashes.length - 1; i >= 0; i--) {
            const splash = splashes[i]
            splash.update()
            splash.display(p)

            if (splash.alpha <= 0) {
              splashes.splice(i, 1)
            }
          }

          for (let i = symbols.length - 1; i >= 0; i--) {
            const symbol = symbols[i]
            symbol.update()
            symbol.display(p)

            if (symbol.alpha <= 0) {
              symbols.splice(i, 1)
            }
          }

          const responsive = getResponsiveValues(p)
          if (p.frameCount % (responsive.symbolSize < 1 ? 7 : 6) === 0) {
            symbols.push(createSymbol(p))
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight)
        }
      })
    }

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#1E1E1E]"
      aria-hidden="true"
    />
  )
}

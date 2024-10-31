import P5 from "p5"

export interface Symbol {
  x: number
  y: number
  size: number
  speed: number
  alpha: number
  fadeSpeed: number
  rotation: number
  rotationSpeed: number
  type: "cross" | "square" | "line"
  update: (p: P5) => void
  display: (p: P5) => void
}

export default Symbol

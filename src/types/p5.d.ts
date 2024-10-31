declare module "p5" {
  export default class P5 {
    constructor(sketch: (p: P5) => void, node?: HTMLElement)
    createCanvas(w: number, h: number): any
    background(r: number, g?: number, b?: number): void
    draw(): void
    width: number
    height: number
    frameCount: number
    TWO_PI: number
    random(max: number): number
    random(min: number, max: number): number
    random(arr: string[]): string
    push(): void
    pop(): void
    translate(x: number, y: number): void
    rotate(angle: number): void
    stroke(r: number, g: number, b: number, a: number): void
    noFill(): void
    strokeWeight(weight: number): void
    line(x1: number, y1: number, x2: number, y2: number): void
    rectMode(mode: string): void
    rect(x: number, y: number, w: number, h: number): void
    CENTER: string
    remove(): void
    resizeCanvas(w: number, h: number): void
    setup(): void
    windowResized(): void
  }
}

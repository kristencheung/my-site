"use client"
import AnimatedBackground from "@/components/AnimatedBackground"
import CenteredText from "@/components/CenteredText"

export default function Home(): JSX.Element {
  return (
    <main className="relative w-screen h-screen bg-[#1E1E1E] overflow-hidden antialiased">
      <AnimatedBackground />
      <CenteredText />
    </main>
  )
}

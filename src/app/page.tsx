"use client"
import AnimatedBackground from "@/components/AnimatedBackground"
import CenteredText from "@/components/CenteredText"
import SocialFooter from "@/components/SocialFooter"

export default function Home(): JSX.Element {
  return (
    <main className="relative w-[100dvw] h-[100dvh] bg-black overflow-hidden antialiased">
      <AnimatedBackground />
      <CenteredText />
      <SocialFooter />
    </main>
  )
}

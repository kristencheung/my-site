export default function CenteredText(): JSX.Element {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <h1 className="text-[#8a8a8a] text-xl md:text-2xl lg:text-3xl font-helv uppercase font-light tracking-wide">
        Kristen Cheung
      </h1>
      <p className="text-[#5a5a5a] mt-4 text-sm md:text-base font-light italic uppercase">
        Work in Progress
      </p>
    </div>
  )
}

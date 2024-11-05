import Link from "next/link"
import XIcon from "./icons/XIcon"
import GithubIcon from "./icons/GithubIcon"
import ReadCVIcon from "./icons/ReadCVIcon"

export const SocialFooter = () => {
  return (
    <div className="absolute left-1/2 bottom-8 flex flex-row gap-4 -translate-x-1/2">
      <Link
        target="_blank"
        href="https://x.com/kristen__cheung"
        className="group"
      >
        <XIcon className="w-6 h-6 fill-[#5a5a5a] group-hover:fill-[#c6c5c5] transition-colors duration-300" />
      </Link>
      <Link
        target="_blank"
        href="https://github.com/kristencheung"
        className="group"
      >
        <GithubIcon className="w-6 h-6 fill-[#5a5a5a] group-hover:fill-[#c6c5c5] transition-colors duration-300" />
      </Link>
      <Link
        target="_blank"
        href="https://read.cv/kristencheung"
        className="group"
      >
        <ReadCVIcon className="w-6 h-6 fill-[#5a5a5a] group-hover:fill-[#c6c5c5] transition-colors duration-300" />
      </Link>
    </div>
  )
}

export default SocialFooter

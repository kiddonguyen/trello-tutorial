import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
const headingFont = localFont({
  src: "../public/fonts/font.woff2",
})
export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" width={30} height={30} alt="logo" title="logo" />
        <p className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}>Taskify</p>
      </div>
    </Link>
  );
};

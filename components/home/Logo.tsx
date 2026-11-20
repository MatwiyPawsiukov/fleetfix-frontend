import Image from "next/image";
import logoMark from "@/app/assets/logo.png";

type LogoProps = {
  inverted?: boolean;
};

export function Logo({ inverted = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src={logoMark}
        alt=""
        width={36}
        height={36}
        loading="eager"
        className="size-9 rounded-xl shadow-md shadow-brand-600/30"
      />
      <span
        className={`text-lg font-semibold tracking-tight ${inverted ? "text-white" : "text-ink dark:text-white"}`}
      >
        Fleet<span className={inverted ? "text-brand-300" : "text-brand-600 dark:text-brand-400"}>Fix</span>
      </span>
    </span>
  );
}

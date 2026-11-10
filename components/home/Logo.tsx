type LogoProps = {
  inverted?: boolean;
};

export function Logo({ inverted = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 shadow-md shadow-brand-600/30">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" aria-hidden="true">
          <path
            d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6a6 6 0 0 1-7.6 1.6l-6.6 6.6a2 2 0 0 1-2.8-2.8l6.6-6.6A6 6 0 0 1 12.2 3.8l1.3 1.3a4 4 0 0 0 1.2 1.2Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={`text-lg font-semibold tracking-tight ${inverted ? "text-white" : "text-ink dark:text-white"}`}
      >
        Fleet<span className={inverted ? "text-brand-300" : "text-brand-600 dark:text-brand-400"}>Fix</span>
      </span>
    </span>
  );
}

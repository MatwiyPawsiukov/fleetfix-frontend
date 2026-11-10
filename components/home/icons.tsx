import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "calendar"
  | "clipboard"
  | "wrench"
  | "receipt"
  | "bell"
  | "tire"
  | "box"
  | "chart"
  | "inbox"
  | "users"
  | "shield"
  | "check"
  | "arrow-right"
  | "message"
  | "lock"
  | "globe"
  | "menu"
  | "close"
  | "clock"
  | "euro"
  | "sun"
  | "moon";

const paths: Record<IconName, ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4M7.5 13.5h3M13.5 13.5h3M7.5 17h3" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2.5" />
      <path d="M9 4V3h6v1M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6a6 6 0 0 1-7.6 1.6l-6.6 6.6a2 2 0 0 1-2.8-2.8l6.6-6.6A6 6 0 0 1 12.2 3.8l1.3 1.3a4 4 0 0 0 1.2 1.2Z" />
  ),
  receipt: (
    <>
      <path d="M6 2.5h12v19l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5v-19Z" />
      <path d="M9 7.5h6M9 11h6M9 14.5h3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" />
      <path d="M10 20a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  tire: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
    </>
  ),
  box: (
    <>
      <path d="m12 2.5 8.5 4.5v10L12 21.5 3.5 17V7L12 2.5Z" />
      <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="M7.5 15.5v-4M12 15.5V8M16.5 15.5v-6" />
    </>
  ),
  inbox: (
    <>
      <path d="M3.5 13.5 6 4.5h12l2.5 9v6h-17v-6Z" />
      <path d="M3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.5a6.5 6.5 0 0 1 3 5.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10v-6l-8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  "arrow-right": <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  message: (
    <path d="M4 5.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4.5 3.5v-3.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  euro: (
    <>
      <path d="M17.5 6.2A7 7 0 1 0 17.5 17.8" />
      <path d="M4.5 10h9M4.5 14h9" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, className = "size-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

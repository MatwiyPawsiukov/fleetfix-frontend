import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FleetFix — програма для автосервісів",
    template: "%s — FleetFix",
  },
  description:
    "Заявки, календар, кошториси, рахунки за німецькими правилами та нагадування про TÜV — уся робота СТО в одній програмі.",
};

// Runs during HTML parsing, before first paint: applies the saved theme
// (or the OS preference) so there is no light→dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      data-theme="light"
      // Lets Next.js disable smooth scrolling while switching pages, so a new
      // page starts at the top instantly; in-page anchors still scroll smoothly.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

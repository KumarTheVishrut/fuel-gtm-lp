import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "FUEL — GTM Architecture",
  description:
    "A multi-disciplinary consultancy for SaaS and complex tech. We refine your ICP, build your sales team, and execute outbound engines through direct frontline intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={`antialiased ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}

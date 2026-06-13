import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Vacantes Remotas para Talento LATAM`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "vacantes remotas LATAM",
    "trabajo remoto LATAM",
    "empleos remotos en USD",
    "remote jobs LATAM",
    "trabajos remotos para argentinos",
    "trabajos remotos para latinoamericanos",
    "trabajo remoto latinoamerica",
    "jobs en dolares LATAM",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Vacantes Remotas para Talento LATAM`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Empleoon — Vacantes Remotas LATAM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Vacantes Remotas para Talento LATAM`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

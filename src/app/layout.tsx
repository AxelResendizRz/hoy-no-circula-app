import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoy-no-circula-app.vercel.app";
const SITE_NAME = "Hoy No Circula CDMX y EDOMEX";
const TITLE = "Hoy No Circula CDMX y EDOMEX | ¿Circula mi auto hoy?";
const DESCRIPTION =
  "Consulta si tu auto circula hoy en CDMX y Estado de México según tu placa, engomado y holograma. Avisos de contingencia ambiental actualizados.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "hoy no circula",
    "hoy no circula CDMX",
    "hoy no circula Estado de México",
    "hoy no circula hoy",
    "engomado",
    "holograma",
    "contingencia ambiental",
    "circula mi auto hoy",
    "placas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "es-MX",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Ciudad de México" },
    { "@type": "AdministrativeArea", name: "Estado de México" },
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}

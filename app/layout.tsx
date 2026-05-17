import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LanguageWrapper from "@/components/LanguageWrapper";

const jakarta = Plus_Jakarta_Sans({ 
  variable: "--font-jakarta", 
  subsets: ["latin"] 
});

const dmSans = DM_Sans({ 
  variable: "--font-dm-sans", 
  subsets: ["latin"] 
});

const jetbrainsMono = JetBrains_Mono({ 
  variable: "--font-jetbrains-mono", 
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "ZiryabTec | Transformation Digitale & Consulting",
  description: "Agence de consulting, développement logiciel, et transformation digitale. Nous construisons l'avenir digital de votre entreprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col relative font-sans"
        style={{ backgroundColor: '#0e0f14', color: '#F0F0F5' }}
        suppressHydrationWarning
      >
        <LanguageWrapper>
          {/* Navbar component will go here, currently using placeholder path since it's moved */}
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          {/* Footer component will go here */}
          <Footer />
        </LanguageWrapper>
      </body>
    </html>
  );
}

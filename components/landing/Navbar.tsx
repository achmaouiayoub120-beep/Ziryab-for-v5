"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FrFlag = ({ className = "w-5 h-[14px]" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={`rounded-[2px] overflow-hidden shrink-0 ${className}`}>
    <rect width="1" height="2" fill="#0055A4" />
    <rect width="1" height="2" x="1" fill="#FFFFFF" />
    <rect width="1" height="2" x="2" fill="#EF4135" />
  </svg>
);

const EnFlag = ({ className = "w-5 h-[14px]" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={`rounded-[2px] overflow-hidden shrink-0 ${className}`}>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── MAIN NAVBAR — Transparent Dark ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0e0f14]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-20 md:h-24" suppressHydrationWarning>
          {/* Logo */}
          <Link href="/" className="relative flex items-center group">
            <div className="relative h-14 w-[120px] md:h-16 md:w-[140px] transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="ZiryabTec Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[15px] font-semibold text-[var(--text-secondary)] hover:text-white transition-colors duration-300 group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("fr")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-300 ${
                  language === "fr"
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
                }`}
              >
                <FrFlag /> FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-300 ${
                  language === "en"
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
                }`}
              >
                <EnFlag /> EN
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-[var(--accent)] text-white px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-bold hover:bg-[var(--accent-hover)] transition-all duration-500 shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_35px_var(--accent-glow)]"
            >
              {t("nav.cta")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY — Dark ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 top-[80px] z-40 bg-[#0e0f14]/98 backdrop-blur-xl flex flex-col lg:hidden"
          >
            <nav className="flex-1 flex flex-col px-6 py-10 gap-6 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-display font-bold text-white hover:text-[var(--accent)] transition-colors duration-300 block pb-4 border-b border-white/[0.06]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 justify-center mb-4">
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${
                      language === "fr"
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-[var(--text-muted)] hover:text-white border border-transparent"
                    }`}
                  >
                    <FrFlag className="w-[22px] h-[16px]" /> FR
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${
                      language === "en"
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-[var(--text-muted)] hover:text-white border border-transparent"
                    }`}
                  >
                    <EnFlag className="w-[22px] h-[16px]" /> EN
                  </button>
                </div>
                <Link
                  href="/contact"
                  className="bg-[var(--accent)] text-white py-4 rounded-[var(--radius-md)] font-bold text-center text-lg w-full shadow-[0_0_24px_var(--accent-glow)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.cta")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

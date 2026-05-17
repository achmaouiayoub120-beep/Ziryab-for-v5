"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import LogoMarquee from "@/components/landing/LogoMarquee";
import ServicesPreview from "@/components/landing/ServicesPreview";
import FeaturedProjects from "@/components/landing/FeaturedProjects";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import { GradientText } from "@/components/ui/GradientText";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <ServicesPreview />
      <FeaturedProjects />
      <StatsSection />

      {/* ABOUT PREVIEW SECTION */}
      <section className="py-24 md:py-36 bg-[var(--bg-alt)] relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-widest mb-3">
              {t("about.mission.tag")}
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
              {language === "fr"
                ? "L'innovation technologique au service de"
                : "Technological innovation at the service of"}{" "}
              <GradientText>
                {language === "fr" ? "l'humain" : "humanity"}
              </GradientText>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
              {t("about.mission.p1")}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--accent)] font-bold hover:gap-3 transition-all duration-500 group"
            >
              {language === "fr"
                ? "Découvrir notre histoire"
                : "Discover our history"}
              <span className="transform transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative"
          >
            <div className="elite-card p-10 md:p-14 text-center relative overflow-hidden neon-border">
              {/* Inner gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.06] to-transparent pointer-events-none rounded-[inherit]" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={32} className="text-[var(--accent)]" />
                </div>
                <p className="text-2xl font-display font-bold text-white mb-3">
                  Design. Build. Scale.
                </p>
                <p className="text-[var(--text-muted)]">
                  {language === "fr"
                    ? "Excellence numérique depuis 2018"
                    : "Digital excellence since 2018"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CTASection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 md:py-36 bg-[var(--bg-alt)]">
      <div className="relative w-full max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-[var(--radius-2xl)] p-10 md:p-16 text-center neon-border"
          style={{
            background: "var(--bg-card)",
          }}
        >
          {/* Inner gradient glow */}
          <div
            className="absolute inset-0 rounded-[var(--radius-2xl)] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Shimmer line across top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] animate-shimmer" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
              {t("about.cta.title")}{" "}
              <GradientText>{t("about.cta.titleAccent")}</GradientText> ?
            </h2>

            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
              {language === "fr"
                ? "Contactez-nous pour un audit gratuit de votre infrastructure digitale."
                : "Contact us for a free audit of your digital infrastructure."}
            </p>

            <div className="mb-8">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                magnetic
              >
                {language === "fr"
                  ? "Démarrer mon projet"
                  : "Start my project"}{" "}
                <span className="ml-2">→</span>
              </Button>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-[var(--text-muted)]">
              {(language === "fr"
                ? [
                    "Audit gratuit",
                    "Devis sous 48h",
                    "Accompagnement sur mesure",
                  ]
                : ["Free audit", "Quote in 48h", "Tailor-made support"]
              ).map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check size={14} className="text-[var(--glow)]" />
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-8 text-sm text-[var(--text-muted)] italic">
              {language === "fr"
                ? "L'innovation au service de l'humain"
                : "Innovation for humanity"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t, language } = useLanguage();
  const slides = t("hero.slides") || [];
  const isSlidesArray = Array.isArray(slides) && slides.length > 0;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    if (!isSlidesArray) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isSlidesArray]);

  const paginate = (newDirection: number) => {
    if (!isSlidesArray) return;
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(12px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: "blur(12px)",
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  // Fallback to static if no slides
  const currentSlideData = isSlidesArray
    ? slides[currentSlide]
    : {
        title: t("hero.title"),
        subtitle: t("hero.subtitle"),
        ctaPrimary: t("hero.ctaPrimary"),
        ctaSecondary: t("hero.ctaSecondary"),
      };

  const titleWords = currentSlideData.title.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#0e0f14] to-[#0e0f14]">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(232, 77, 42, 0.08) 0%, transparent 70%)",
          }}
        />
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.06]"
          style={{ backgroundColor: "#E84D2A" }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-[350px] h-[350px] rounded-full blur-[150px] opacity-[0.05]"
          style={{ backgroundColor: "#00E5FF" }}
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-40" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20 text-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span className="text-[var(--text-secondary)] text-xs font-bold tracking-wider uppercase">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Title — Word by word reveal */}
            <h1
              className="font-display font-bold tracking-tight mb-8 leading-[1.08]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {titleWords.map((word: string, i: number) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "120%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word.toLowerCase().includes("digital") ||
                    word.toLowerCase().includes("innovation") ||
                    word.toLowerCase().includes("avenir") ||
                    word.toLowerCase().includes("future") ? (
                      <GradientText>{word}</GradientText>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {currentSlideData.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button href="/start-project" variant="primary" size="lg" magnetic>
                {currentSlideData.ctaPrimary} <span className="ml-2">→</span>
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                {currentSlideData.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        {isSlidesArray && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-500"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2.5">
              {slides.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentSlide ? 1 : -1);
                    setCurrentSlide(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === currentSlide
                      ? "bg-[var(--accent)] w-8"
                      : "bg-white/[0.15] w-2 hover:bg-white/[0.3]"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-500"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap justify-center gap-10 md:gap-16 mt-16 pt-10 border-t border-white/[0.06]"
        >
          {[
            { value: 50, suffix: "+", label: t("hero.stats.clients") },
            { value: 98, suffix: "%", label: t("hero.stats.satisfaction") },
            { value: 6, suffix: "", label: t("hero.stats.expertise") },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-3xl md:text-4xl font-display font-bold text-white"
              />
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.25em] font-bold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-[var(--text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

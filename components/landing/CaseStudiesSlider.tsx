"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  ShoppingCart,
  Users,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FORMATION_PLATFORM_URL = "https://ziryabtec-qnsv.vercel.app";

const CASE_STUDIES = [
  {
    id: "ztec-erp",
    icon: Database,
    accentColor: "#3B82F6",
    bgColor: "#1a2847",
    tags: ["ERP", "SaaS", "Cloud"],
  },
  {
    id: "retailink",
    icon: ShoppingCart,
    accentColor: "#10B981",
    bgColor: "#152e25",
    tags: ["E-commerce", "Retail", "Analytics"],
  },
  {
    id: "coachprolink",
    icon: Users,
    accentColor: "#F59E0B",
    bgColor: "#2a2212",
    tags: ["Coaching", "CRM", "Gestion"],
  },
  {
    id: "ziryabtec-formation",
    icon: GraduationCap,
    accentColor: "#8B5CF6",
    bgColor: "#1f1a30",
    tags: ["E-learning", "Formation", "LMS"],
    isFormation: true,
  },
];

export default function CaseStudiesSlider() {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [current]);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return CASE_STUDIES.length - 1;
      if (next >= CASE_STUDIES.length) return 0;
      return next;
    });
  };

  const project = CASE_STUDIES[current];
  const Icon = project.icon;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-24 md:py-36 bg-[var(--bg-alt)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[180px]"
          style={{ backgroundColor: project.accentColor }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-[0.2em] mb-4">
            {t("ecosystem.tag")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            {t("ecosystem.title")}
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[var(--radius-2xl)] overflow-hidden min-h-[450px] md:min-h-[500px]"
              style={{
                border: `1px solid ${project.accentColor}20`,
                boxShadow: `0 0 60px ${project.accentColor}08`,
              }}
            >
              {/* Left — Visual Panel with diagonal clip */}
              <div
                className="relative flex items-center justify-center p-12 md:p-16 overflow-hidden"
                style={{ backgroundColor: project.bgColor }}
              >
                {/* Diagonal clip overlay */}
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{
                    background: "var(--bg-alt)",
                    clipPath: "polygon(85% 0, 100% 0, 100% 100%, 75% 100%)",
                  }}
                />

                {/* Large icon */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative z-10"
                >
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[var(--radius-2xl)] flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}08)`,
                      border: `2px solid ${project.accentColor}30`,
                      boxShadow: `0 0 60px ${project.accentColor}15`,
                    }}
                  >
                    <Icon size={64} style={{ color: project.accentColor }} />
                  </div>
                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-20 w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${project.accentColor}40` }}
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 left-16 w-2 h-2 rounded-full"
                  style={{ backgroundColor: `${project.accentColor}30` }}
                />
              </div>

              {/* Right — Text Panel */}
              <div className="bg-[var(--bg-alt)] p-10 md:p-14 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.id + "-text"}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
                          style={{
                            borderColor: `${project.accentColor}30`,
                            color: project.accentColor,
                            background: `${project.accentColor}08`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                      {t(`ecosystem.projects.${project.id}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
                      {t(`ecosystem.projects.${project.id}.desc`)}
                    </p>

                    {/* CTA */}
                    {project.isFormation ? (
                      <a
                        href={FORMATION_PLATFORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[var(--radius-md)] font-bold text-sm text-white transition-all duration-500 hover:gap-3.5 hover:shadow-xl active:scale-[0.98]"
                        style={{
                          background: `linear-gradient(135deg, ${project.accentColor}, #A855F7)`,
                          boxShadow: `0 0 30px ${project.accentColor}25`,
                        }}
                      >
                        {t("ecosystem.accessPlatform")}
                        <ExternalLink size={16} className="shrink-0" />
                      </a>
                    ) : (
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-500 hover:gap-3 group"
                        style={{ color: project.accentColor }}
                      >
                        {t("ecosystem.learnMore")}
                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-500 hover:shadow-[0_0_20px_var(--accent-glow)]"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-3">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10"
                      : "w-2 bg-white/[0.12] hover:bg-white/[0.25]"
                  }`}
                  style={i === current ? { backgroundColor: project.accentColor } : {}}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-500 hover:shadow-[0_0_20px_var(--accent-glow)]"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const technologies = [
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  {
    name: "AWS",
    slug: "amazonwebservices",
    color: "232F3E",
    customUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Linux", slug: "linux", color: "FCC624" },
];

// Duplicate for seamless loop
const allLogos = [...technologies, ...technologies, ...technologies];

export default function LogoMarquee() {
  const { language } = useLanguage();

  return (
    <section className="relative py-16 overflow-hidden bg-[var(--bg-alt)] border-y border-white/[0.04]">
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-10"
      >
        <p className="text-sm text-[var(--text-muted)] font-bold uppercase tracking-widest">
          {language === "fr" ? "Technologies de confiance" : "Trusted Technologies"}
        </p>
      </motion.div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade edges — dark gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-12 w-max items-center"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {allLogos.map((tech, i) => (
            <div
              key={`${tech.slug}-${i}`}
              className="flex items-center gap-4 shrink-0 group"
            >
              <div className="w-14 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center p-2 transition-all duration-500 group-hover:border-[var(--glow)]/30 group-hover:bg-white/[0.08] group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.08)]">
                <img
                  src={
                    tech.customUrl
                      ? tech.customUrl
                      : `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`
                  }
                  alt={tech.name}
                  className="w-full h-full object-contain transition-all duration-500 brightness-50 grayscale group-hover:brightness-100 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <span className="font-display text-sm font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Building2, Code2, TrendingUp, Award } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function StatsSection() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Building2,
      value: 50,
      suffix: "+",
      label: language === "fr" ? "Clients accompagnés" : "Clients supported",
      accentColor: "#3B82F6",
    },
    {
      icon: Code2,
      value: 120,
      suffix: "+",
      label: language === "fr" ? "Projets livrés" : "Projects delivered",
      accentColor: "#06B6D4",
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: "%",
      label: language === "fr" ? "Taux de satisfaction" : "Satisfaction rate",
      accentColor: "#10B981",
    },
    {
      icon: Award,
      value: 6,
      suffix: "",
      label:
        language === "fr" ? "Domaines d'expertise" : "Fields of expertise",
      accentColor: "#F97316",
    },
  ];

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg)] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)]/[0.04] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-widest mb-3">
            {language === "fr" ? "EN CHIFFRES" : "BY THE NUMBERS"}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            {language === "fr"
              ? "Notre impact en quelques chiffres"
              : "Our impact in a few numbers"}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <div
                  className="elite-card h-full p-8 md:p-10 text-center group relative overflow-hidden"
                  style={
                    {
                      "--card-glow": `${stat.accentColor}15`,
                    } as React.CSSProperties
                  }
                >
                  {/* Hover glow */}
                  <div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl"
                    style={{
                      background: `linear-gradient(to right, transparent, ${stat.accentColor}1A, transparent)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-all duration-500 shadow-sm"
                      style={{
                        background: `${stat.accentColor}10`,
                        border: `1px solid ${stat.accentColor}20`,
                        color: stat.accentColor,
                      }}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Value */}
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] block"
                    />

                    {/* Label */}
                    <p className="text-sm text-[var(--text-muted)] mt-3 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

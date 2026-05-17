"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowUpRight, Globe, Smartphone, Users, Zap, GraduationCap, Brain } from "lucide-react";

// --- Service Data ---
const SERVICES = [
  {
    id: "dev-web",
    icon: Globe,
    accentColor: "#3B82F6",
    className: "md:col-span-4 lg:col-span-4 lg:row-span-2 min-h-[400px]",
    visual: "grid",
  },
  {
    id: "dev-mobile",
    icon: Smartphone,
    accentColor: "#6366F1",
    className: "md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px]",
    visual: "circles",
  },
  {
    id: "outsourcing",
    icon: Users,
    accentColor: "#06B6D4",
    className: "md:col-span-4 lg:col-span-3 min-h-[300px]",
    visual: "network",
  },
  {
    id: "digitalisation",
    icon: Zap,
    accentColor: "#8B5CF6",
    className: "md:col-span-2 lg:col-span-3 min-h-[300px]",
    visual: "matrix",
  },
  {
    id: "formation",
    icon: GraduationCap,
    accentColor: "#F97316",
    className: "md:col-span-2 lg:col-span-2 min-h-[300px]",
    visual: "waves",
  },
  {
    id: "data-ia",
    icon: Brain,
    accentColor: "#10B981",
    className: "md:col-span-4 lg:col-span-4 min-h-[300px]",
    visual: "neural",
  },
];

// --- Magnetic Button Component ---
const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });
  
  return (
    <motion.a 
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

// --- Text Reveal (Word by Word) ---
const RevealText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "120%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: delay + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// --- Abstract Generative Visuals with Mouse Parallax ---
const AbstractVisual = ({ type, color, scrollYProgress, mouseX, mouseY }: any) => {
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] group-hover:opacity-[0.3] transition-opacity duration-700"
      style={{ x: mouseX, y: mouseY }}
    >
      {type === "grid" && (
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill={color} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        </motion.div>
      )}

      {type === "circles" && (
        <motion.div style={{ y: y2, rotate }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[150%] h-[150%] border-[1px] rounded-full border-dashed animate-spin-slow" style={{ borderColor: color }} />
          <div className="absolute w-[100%] h-[100%] border-[1px] rounded-full" style={{ borderColor: color, opacity: 0.5 }} />
        </motion.div>
      )}

      {type === "network" && (
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,20 L40,50 L80,30 L90,80 L50,90 Z" fill="none" stroke={color} strokeWidth="0.5" className="opacity-50" />
            <circle cx="10" cy="20" r="2" fill={color} />
            <circle cx="40" cy="50" r="3" fill={color} />
            <circle cx="80" cy="30" r="2" fill={color} />
            <circle cx="90" cy="80" r="4" fill={color} />
            <circle cx="50" cy="90" r="2" fill={color} />
          </svg>
        </motion.div>
      )}

      {type === "matrix" && (
        <motion.div style={{ y: y2 }} className="absolute inset-0">
          <div className="absolute top-10 right-10 flex flex-col gap-4 text-xs font-mono font-bold" style={{ color }}>
            {["+", "x", "o", "∆", "◊", "•"].map((char, i) => (
              <motion.span 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.5 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {type === "neural" && (
        <motion.div style={{ y: y2 }} className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
            <path d="M0,70 Q40,40 60,70 T100,70" fill="none" stroke={color} strokeWidth="0.5" className="opacity-30" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

// --- Individual Service Card ---
const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Mouse Parallax for internal abstracts
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rawMouseX.set(x * -0.05); // Move abstract opposite to mouse
    rawMouseY.set(y * -0.05);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: index * 0.1 
      }}
      whileHover={{ y: -15 }}
      className={`group relative overflow-hidden bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col p-8 md:p-10 transition-all duration-700 ease-out cursor-pointer ${service.className}`}
    >
      {/* Dynamic Hover Border & Glow */}
      <div 
        className="absolute inset-0 border-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ borderColor: `${service.accentColor}50` }} 
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl -z-10"
        style={{ backgroundImage: `radial-gradient(circle at bottom right, ${service.accentColor}30, transparent 70%)` }}
      />

      {/* Abstract Background Visuals with Parallax */}
      <AbstractVisual type={service.visual} color={service.accentColor} scrollYProgress={scrollYProgress} mouseX={mouseX} mouseY={mouseY} />

      {/* Content Container (Parallax) */}
      <motion.div style={{ y: contentY }} className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.02] border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-lg"
          >
            <Icon size={26} style={{ color: service.accentColor }} />
          </div>
          <ArrowUpRight size={28} className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
        </div>

        <div className="mt-12">
          {/* Text Reveal for the Title */}
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
            <RevealText text={t(`services.items.${service.id}.title`)} delay={index * 0.1} />
          </h3>
          
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <p className="text-[#A0A0A8] text-lg leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {t(`services.items.${service.id}.desc`)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Section Component ---
export default function ServicesPreview() {
  const { t, language } = useLanguage();
  
  const regularServices = SERVICES.filter(s => s.id !== "formation");

  return (
    <section className="py-32 md:py-48 bg-[#0e0f14] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1a1b23] to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-[0.2em] mb-4">
            <RevealText text={t("services.tag")} />
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tighter mb-8 max-w-4xl">
            <RevealText text="L'Art Numérique" /> <br/>
            <RevealText text="au Service de l'Excellence." className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]" />
          </h2>
        </div>

        {/* Asymmetrical Grid for Regular Services */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-16">
          {regularServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* ── VIP Formation Banner (Cinematic Masterpiece) ── */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 100 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="relative rounded-[3rem] overflow-hidden group bg-black border border-white/10 mt-16 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Animated Liquid Aurora Background */}
          <div className="absolute inset-0 z-0 opacity-60">
             <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1], 
                 x: [0, 50, 0], 
                 y: [0, -30, 0] 
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#F97316]/30 rounded-[100%] blur-[120px] mix-blend-screen" 
             />
             <motion.div 
               animate={{ 
                 scale: [1, 1.3, 1], 
                 x: [0, -50, 0], 
                 y: [0, 50, 0] 
               }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-40 left-0 w-[800px] h-[800px] bg-[#8B5CF6]/30 rounded-[100%] blur-[150px] mix-blend-screen" 
             />
             {/* 3D Point Cloud Simulation (SVG Grid) */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none group-hover:scale-105 transition-transform duration-[2s] ease-out" />
          </div>

          <div className="relative z-10 flex flex-col xl:flex-row items-center gap-16 p-10 md:p-24">
             {/* Text Content */}
             <div className="flex-1 text-center xl:text-left">
                <span className="inline-block px-5 py-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                  Plateforme E-Learning Indépendante - Master Pro Max
                </span>
                <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-black text-white tracking-tighter mb-8 leading-[0.9]">
                  <RevealText text="ZiryabTec" /> <br/>
                  <RevealText text="Academy" className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.5)]" />
                </h3>
                <p className="text-[#A0A0A8] text-lg md:text-2xl max-w-2xl mx-auto xl:mx-0 leading-relaxed mb-12">
                  L'expérience d'apprentissage ultime. Des parcours de pointe conçus pour transformer les talents en experts absolus de la tech.
                </p>
                
                {/* Magnetic Shimmer CTA */}
                <MagneticButton 
                  href="https://ziryab-for-v4.vercel.app"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black font-black text-lg shadow-[0_0_50px_rgba(255,255,255,0.2)] group/btn overflow-hidden relative"
                >
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <span className="relative z-10 flex items-center gap-3">
                    {language === "fr" ? "Accéder à l'Académie" : "Access the Academy"} 
                    <ArrowUpRight strokeWidth={3} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                  </span>
                </MagneticButton>
             </div>

             {/* 3D Visual Floating Mockup */}
             <div className="flex-1 w-full relative h-[450px] md:h-[600px] flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-black/40 backdrop-blur-md transform -rotate-2 group-hover:rotate-0 transition-transform duration-1000 ease-out z-10"
                >
                  <img 
                    src="https://image.thum.io/get/width/1200/crop/800/https://ziryab-for-v4.vercel.app/"
                    alt="ZiryabTec Academy Master Pro Max"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/20 via-transparent to-transparent pointer-events-none" />
                </motion.div>
                
                {/* Floating Decorative Elements */}
                <motion.div 
                  animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 right-10 w-32 h-32 rounded-3xl bg-[#F97316]/10 backdrop-blur-3xl border border-[#F97316]/30 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.2)] z-20"
                >
                   <GraduationCap size={56} className="text-[#F97316] opacity-90" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 left-10 w-24 h-24 rounded-2xl bg-[#8B5CF6]/10 backdrop-blur-3xl border border-[#8B5CF6]/30 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)] z-20"
                >
                   <Zap size={40} className="text-[#8B5CF6] opacity-90" />
                </motion.div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowUpRight, Globe, Smartphone, Users, Zap, GraduationCap, Brain } from "lucide-react";
import Link from "next/link";

// --- Enriched Service Data for Cinematic Scenes ---
const CINEMATIC_SERVICES = [
  {
    id: "dev-web",
    icon: Globe,
    accentColor: "#3B82F6",
    bgVideo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Abstract tech
    theme: "dark"
  },
  {
    id: "dev-mobile",
    icon: Smartphone,
    accentColor: "#6366F1",
    bgVideo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop", // Fluid abstract
    theme: "dark"
  },
  {
    id: "outsourcing",
    icon: Users,
    accentColor: "#06B6D4",
    bgVideo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop", // Server / Data
    theme: "dark"
  },
  {
    id: "digitalisation",
    icon: Zap,
    accentColor: "#8B5CF6",
    bgVideo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Cyber / Matrix
    theme: "dark"
  },
  {
    id: "data-ia",
    icon: Brain,
    accentColor: "#10B981",
    bgVideo: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop", // Neural / Particle
    theme: "dark"
  }
];

// --- Custom Cursor ---
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center"
        style={{ x: springX, y: springY }}
        animate={{ scale: isHovering ? 2.5 : 1, backgroundColor: isHovering ? "white" : "transparent" }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full mix-blend-difference pointer-events-none z-[10000]"
        style={{ x: useSpring(cursorX, { stiffness: 1000, damping: 20, mass: 0.1 }), y: useSpring(cursorY, { stiffness: 1000, damping: 20, mass: 0.1 }), marginLeft: 14, marginTop: 14 }}
        animate={{ opacity: isHovering ? 0 : 1 }}
      />
    </>
  );
};

// --- Magnetic Button ---
const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 }); // High magnetic pull
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
      className={`hover-target ${className}`}
    >
      {children}
    </motion.a>
  );
};

// --- Floating 3D Isometric Elements ---
const FloatingElements = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden perspective-[1000px]">
      <motion.div 
        animate={{ y: [0, -40, 0], rotateX: [20, 30, 20], rotateY: [-20, -10, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-32 h-32 md:w-64 md:h-64 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl"
        style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
      />
      <motion.div 
        animate={{ y: [0, 40, 0], rotateX: [-20, -10, -20], rotateY: [20, 30, 20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] left-[5%] w-24 h-24 md:w-48 md:h-48 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }}
      >
        <div className="w-1/2 h-1/2 rounded-full border border-white/20 animate-spin-slow" />
      </motion.div>
    </div>
  );
};

// --- Single Cinematic Scene ---
const CinematicScene = ({ service, index }: { service: any, index: number }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  const Icon = service.icon;

  return (
    <div ref={ref} className="relative h-[150vh] w-full">
      {/* The sticky content container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
        
        {/* Background Image / Glow */}
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src={service.bgVideo} className="w-full h-full object-cover opacity-30" alt="" />
          <div 
            className="absolute inset-0 z-20 opacity-50 mix-blend-color"
            style={{ backgroundColor: service.accentColor }}
          />
        </motion.div>

        {/* 1px surgical separator lines drawn on scroll */}
        <motion.div 
          style={{ scaleX: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
          className="absolute top-1/4 left-0 w-full h-[1px] bg-white/10 origin-left z-20"
        />
        <motion.div 
          style={{ scaleX: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
          className="absolute bottom-1/4 right-0 w-full h-[1px] bg-white/10 origin-right z-20"
        />

        {/* Floating 3D Elements */}
        <FloatingElements color={service.accentColor} />

        {/* Main Content */}
        <motion.div style={{ opacity, y: titleY }} className="relative z-30 w-full max-w-[1400px] px-6 mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          <div className="flex-1">
            <div className="mb-6 inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <Icon size={20} style={{ color: service.accentColor }} />
              <span className="text-white text-sm font-bold tracking-widest uppercase">
                Scene 0{index + 1}
              </span>
            </div>

            {/* Giant Text Mask */}
            <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tighter mb-8 leading-[0.9]">
              <span 
                className="bg-clip-text text-transparent bg-cover bg-center hover-target"
                style={{ 
                  backgroundImage: `url(${service.bgVideo})`,
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)"
                }}
              >
                {t(`services.items.${service.id}.title`)}
              </span>
            </h2>

            <p className="text-[#A0A0A8] text-xl md:text-3xl max-w-2xl font-light leading-relaxed">
              {t(`services.items.${service.id}.desc`)}
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-start md:justify-end">
             <Link 
               href={`/services/${service.id}`}
               className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center group hover-target transition-colors duration-500 hover:border-white/50 cursor-pointer"
               style={{ boxShadow: `0 0 50px ${service.accentColor}20` }}
             >
               <span className="text-white font-bold tracking-widest text-sm uppercase group-hover:scale-110 transition-transform duration-500 flex flex-col items-center gap-2">
                 Explorer
                 <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" />
               </span>
             </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

// --- The Climax: Formation Vortex ---
const FormationVortexScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const vortexScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);
  const vortexRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [200, 0]);

  return (
    <div ref={ref} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden">
        
        {/* Vortex Background */}
        <motion.div 
          style={{ scale: vortexScale, rotate: vortexRotate }}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none mix-blend-screen opacity-80"
        >
          {/* Concentric rotating circles creating a portal effect */}
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute rounded-full border-[2px] border-transparent"
              style={{
                width: `${(i + 1) * 20}vw`,
                height: `${(i + 1) * 20}vw`,
                borderImage: `linear-gradient(${i * 60}deg, #F97316, transparent, #8B5CF6) 1`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {/* Deep Abyssal Glow */}
          <div className="absolute w-[50vw] h-[50vw] bg-[#F97316]/20 rounded-full blur-[150px] animate-pulse" />
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] z-10 opacity-20" />

        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-20 flex flex-col items-center text-center max-w-5xl px-6"
        >
          <GraduationCap size={64} className="text-[#F97316] mb-8 animate-bounce" />
          
          <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] font-display font-black text-white tracking-tighter mb-6 leading-[0.85] hover-target">
            ZiryabTec <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#8B5CF6]">
              Academy
            </span>
          </h2>
          
          <p className="text-[#A0A0A8] text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-16 font-light">
            Entrez dans la nouvelle dimension de l'apprentissage. 
            L'excellence technologique érigée au rang d'art.
          </p>

          <MagneticButton 
            href="https://ziryabtec-qnsv.vercel.app"
            className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-white text-black font-black text-xl shadow-[0_0_80px_rgba(249,115,22,0.4)] group overflow-hidden relative"
          >
            <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-black/20 to-transparent" />
            <span className="relative z-10 flex items-center gap-4">
              {language === "fr" ? "Plonger dans l'Académie" : "Enter the Academy"} 
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="text-white" size={20} />
              </div>
            </span>
          </MagneticButton>
        </motion.div>

      </div>
    </div>
  );
};


// --- Main Page Assembly ---
export default function ServicesPage() {
  const { t } = useLanguage();

  // Hide default cursor globally while this page is mounted
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <main className="bg-[#0a0a0a] selection:bg-white selection:text-black">
      <CustomCursor />

      {/* Intro Hero (100vh) */}
      <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a0a] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#0a0a0a_100%)]" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-[0.4em] mb-6">
              {t("nav.services")}
            </p>
            <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-display font-black text-white tracking-tighter mb-8 leading-none">
              L'Art du <br/>
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">Digital.</span>
            </h1>
            <p className="text-[#A0A0A8] text-xl max-w-2xl mx-auto font-light">
              Scrollez pour explorer nos expertises dans une expérience immersive.
            </p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent"
          />
        </div>
      </div>

      {/* Cinematic Sticky Scroll Scenes */}
      <div className="relative">
        {CINEMATIC_SERVICES.map((service, index) => (
          <CinematicScene key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* The Climax */}
      <FormationVortexScene />

    </main>
  );
}

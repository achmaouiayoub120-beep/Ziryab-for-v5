"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowUpRight, GraduationCap } from "lucide-react";

// Fallback high-quality abstract/tech images
const PROJECTS = [
  {
    id: "ztec-erp",
    accentColor: "#3B82F6", // Blue
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tags: ["ERP", "SaaS", "Cloud"],
  },
  {
    id: "retailink",
    accentColor: "#10B981", // Emerald
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    tags: ["E-commerce", "Retail", "Analytics"],
  },
  {
    id: "coachprolink",
    accentColor: "#F59E0B", // Amber
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    tags: ["Coaching", "CRM", "Gestion"],
  },
  {
    id: "ziryabtec-formation",
    accentColor: "#F97316", // Vibrant Orange
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    tags: ["E-learning", "Formation", "LMS"],
    isFormation: true,
  },
];

export default function FeaturedProjects() {
  const { t, language } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Split projects: Regular ones for the typography list, Formation for the giant banner
  const regularProjects = PROJECTS.filter(p => !p.isFormation);
  const formationProject = PROJECTS.find(p => p.isFormation)!;

  // Mouse position tracking for the typography reveal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configuration for the floating image (buttery smooth)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Offset by half the image width/height so it centers on cursor
    mouseX.set(e.clientX - 200); 
    mouseY.set(e.clientY - 150);
  };

  return (
    <section 
      className="py-32 md:py-48 bg-[#0a0a0a] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Global Ambient Light for Typography Section ── */}
      <div className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-out z-0">
        <div 
          className="absolute top-0 left-0 w-full h-[800px] opacity-20 transition-all duration-1000 ease-out blur-[150px]"
          style={{
            background: hoveredIndex !== null 
              ? `radial-gradient(circle at 50% 30%, ${regularProjects[hoveredIndex].accentColor}40, transparent 60%)`
              : 'transparent'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-24">
          <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-[0.2em] mb-4">
            {t("ecosystem.tag")}
          </p>
          <h2 className="text-2xl md:text-3xl text-[var(--text-secondary)] font-medium max-w-2xl leading-relaxed">
            {language === "fr" 
              ? "Découvrez nos solutions conçues pour propulser votre entreprise vers l'excellence digitale."
              : "Discover our solutions designed to propel your business towards digital excellence."}
          </h2>
        </div>

        {/* ── Giant Typographic List (Regular Projects) ── */}
        <div className="flex flex-col border-t border-white/[0.08]">
          {regularProjects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <a
                key={project.id}
                href="/start-project"
                className="relative group block py-10 md:py-16 border-b border-white/[0.08] cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  
                  {/* Giant Title */}
                  <div className="flex-1 transition-transform duration-700 ease-out md:group-hover:translate-x-12">
                    <h3 
                      className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-black uppercase transition-all duration-700 ease-out tracking-tighter"
                      style={{
                        color: isHovered ? "white" : "transparent",
                        WebkitTextStroke: isHovered ? "0px" : "1px rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      {t(`ecosystem.projects.${project.id}.title`).split(' ')[0]}
                    </h3>
                  </div>

                  {/* Secondary Information */}
                  <div 
                    className="md:w-1/3 flex flex-col gap-4 transition-all duration-700 ease-out md:opacity-0 md:group-hover:opacity-100 md:-translate-x-8 md:group-hover:translate-x-0"
                  >
                    <p className="text-[#A0A0A8] text-lg leading-relaxed">
                      {t(`ecosystem.projects.${project.id}.desc`)}
                    </p>
                    <div className="flex items-center gap-3">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="text-xs font-bold uppercase tracking-widest text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div 
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mt-4 transition-all duration-500 group-hover:scale-110"
                      style={{ borderColor: isHovered ? project.accentColor : '' }}
                    >
                      <ArrowUpRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* ── Majestic Formation Banner (Full Width Extra Premium) ── */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mt-32 relative rounded-[3rem] overflow-hidden group bg-black border border-white/10"
        >
          {/* Animated Mesh Gradient / Glows */}
          <div className="absolute inset-0 z-0 opacity-40">
             <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen group-hover:bg-purple-500/40 transition-colors duration-1000" />
             <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px] mix-blend-screen group-hover:bg-orange-500/30 transition-colors duration-1000" />
             {/* Luminous Grid lines */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col xl:flex-row items-center gap-12 p-10 md:p-20">
             {/* Text Content */}
             <div className="flex-1 text-center xl:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold tracking-widest uppercase mb-8">
                  {language === "fr" ? "Plateforme E-Learning Indépendante" : "Independent E-Learning Platform"}
                </span>
                <h3 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter mb-6">
                  ZiryabTec <br/>
                  <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">Formation</span>
                </h3>
                <p className="text-[#A0A0A8] text-lg md:text-xl max-w-xl mx-auto xl:mx-0 leading-relaxed mb-10">
                  {t(`ecosystem.projects.ziryabtec-formation.desc`)}
                </p>
                
                {/* Huge Shimmer CTA Button */}
                <a 
                  href="https://ziryabtec-qnsv.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-white text-black font-bold text-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] group/btn overflow-hidden relative"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  
                  {language === "fr" ? "Découvrir la Plateforme" : "Discover the Platform"}
                  <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
             </div>

             {/* Floating Image / Mockup */}
             <div className="flex-1 w-full relative h-[400px] md:h-[500px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/50 backdrop-blur-sm">
                  <img 
                    src={formationProject.image}
                    alt="ZiryabTec Formation Platform"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Subtle glass reflection over the image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                </div>
                
                {/* Floating 3D elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-orange-500/10 backdrop-blur-2xl border border-orange-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.2)]"
                >
                   <GraduationCap size={48} className="text-orange-400 opacity-80" />
                </motion.div>
             </div>
          </div>
        </motion.div>

      </div>

      {/* ── Floating Cursor Image Reveal (Only for Typographic List) ── */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-[400px] h-[300px] rounded-3xl overflow-hidden pointer-events-none z-50 hidden md:block"
            style={{
              x: smoothX,
              y: smoothY,
              boxShadow: `0 20px 50px ${regularProjects[hoveredIndex].accentColor}80`, // Neon drop shadow
            }}
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img 
              src={regularProjects[hoveredIndex].image} 
              alt="Project Showcase" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-110"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

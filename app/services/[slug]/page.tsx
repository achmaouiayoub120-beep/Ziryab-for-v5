"use client";

import { use, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

// --- EXCEPTION: Formation Vortex Redirect ---
const FormationVortex = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://ziryab-for-v4.vercel.app/";
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen opacity-80"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full border-[2px] border-transparent"
            style={{
              width: `${(i + 1) * 15}vw`,
              height: `${(i + 1) * 15}vw`,
              borderImage: `linear-gradient(${i * 45}deg, #F97316, transparent, #8B5CF6) 1`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="absolute w-[40vw] h-[40vw] bg-[#F97316]/30 rounded-full blur-[100px] animate-pulse" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6">Redirection...</h1>
        <p className="text-[#F97316] text-2xl tracking-widest uppercase font-bold animate-pulse">
          ZiryabTec Academy
        </p>
      </motion.div>
    </div>
  );
};

// --- DATA SOURCE ---
const PRO_DATA: Record<string, any> = {
  "dev-web": {
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    slogan: "L'art du code pur.",
    desc: "Nous forgeons des architectures web conçues pour la scalabilité absolue. Chaque composant est taillé sur mesure, pensé pour des performances foudroyantes et une résilience à toute épreuve.",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  "dev-mobile": {
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    slogan: "L'écosystème au bout des doigts.",
    desc: "Des expériences mobiles natives et hybrides qui transcendent les standards. Fluidité, animations 120fps et intégration profonde avec l'OS.",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607252656733-fd742ca4c6f5?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  "outsourcing": {
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    slogan: "L'extension de votre génie.",
    desc: "Intégrez des esprits brillants directement dans vos processus. Nos équipes dédiées s'adaptent, conçoivent et déploient à la vitesse de l'innovation.",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  "digitalisation": {
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    slogan: "La révolution silencieuse.",
    desc: "Automatisez l'obsolète. Nous transformons vos processus métiers complexes en écosystèmes digitaux invisibles, fiables et surpuissants.",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop"
    ]
  },
  "data-ia": {
    heroImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop",
    slogan: "Prédire. Agir. Dominer.",
    desc: "L'intelligence artificielle au service de l'hyper-croissance. Des modèles d'apprentissage profond qui transforment la data brute en or stratégique.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    ]
  }
};

// --- COMPONENTS ---

const ScrollBackgroundWord = ({ text, offset }: { text: string, offset: string[] }) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], offset);
  return (
    <motion.div 
      style={{ x }} 
      className="absolute whitespace-nowrap font-display font-black text-[15vw] leading-[0.8] text-white/[0.02] pointer-events-none select-none mix-blend-overlay"
    >
      {text}
    </motion.div>
  );
};

const FloatingBento = ({ color }: { color: string }) => {
  return (
    <div className="relative z-20 grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto px-6 py-40">
      
      {/* Box 1: Neural Network Simulation */}
      <motion.div 
        whileHover="hover"
        className="col-span-1 md:col-span-4 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl p-10 md:p-16 relative overflow-hidden group cursor-crosshair shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent group-hover:from-white/[0.03] transition-colors duration-700" />
        <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative z-10 tracking-tight">Réseau Dynamique.</h3>
        <p className="text-[#A0A0A8] text-lg relative z-10 max-w-md leading-relaxed font-light">
          Synchronisation instantanée des données à travers toute l'infrastructure. Architecture maillée incassable.
        </p>
        
        {/* Micro animation SVG: Expanding Network */}
        <motion.svg className="absolute bottom-[-30%] right-[-10%] w-[120%] h-[120%] opacity-10 group-hover:opacity-100 transition-opacity duration-1000" viewBox="0 0 100 100">
           <motion.circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="0.5" variants={{ hover: { scale: [1, 1.2, 1], opacity: [0.2, 0.8, 0.2], transition: { duration: 3, repeat: Infinity } } }} />
           <motion.circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="1" variants={{ hover: { scale: [1, 0.8, 1], transition: { duration: 2, repeat: Infinity } } }} />
           <motion.path d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20" stroke={color} strokeWidth="0.2" variants={{ hover: { rotate: [0, 90], transition: { duration: 10, repeat: Infinity, ease: "linear" } } }} style={{ originX: "50px", originY: "50px" }} />
        </motion.svg>
      </motion.div>

      {/* Box 2: Ascending Charts */}
      <motion.div 
        whileHover="hover"
        className="col-span-1 md:col-span-2 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl p-10 md:p-16 relative overflow-hidden group cursor-crosshair shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <h3 className="text-3xl font-display font-bold text-white mb-4 relative z-10 tracking-tight">Hyper<br/>Croissance.</h3>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end justify-around px-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
          {[1, 2, 3, 4, 5].map(i => (
             <motion.div 
               key={i} 
               className="w-4 rounded-t-md shadow-[0_0_20px_currentColor]" 
               style={{ backgroundColor: color, color: color }} 
               variants={{ 
                 hover: { height: ["20%", `${20 + i * 15}%`, "20%"], transition: { duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" } } 
               }} 
               initial={{ height: "20%" }} 
             />
          ))}
        </div>
      </motion.div>

      {/* Box 3: Geometric Precision */}
      <motion.div 
        whileHover="hover"
        className="col-span-1 md:col-span-6 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl p-10 md:p-16 relative overflow-hidden group cursor-crosshair shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between"
      >
        <div className="relative z-10 max-w-2xl mb-10 md:mb-0">
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Précision Chirurgicale.</h3>
          <p className="text-[#A0A0A8] text-lg leading-relaxed font-light">
            Chaque pixel, chaque milliseconde de latence est optimisée. Nous ne construisons pas de simples applications, nous forgeons des armes digitales.
          </p>
        </div>

        {/* Morphing Geometric Shape */}
        <div className="relative w-48 h-48 flex items-center justify-center">
           <motion.div 
             className="absolute inset-0 border border-white/20 rounded-full"
             variants={{ hover: { borderRadius: ["50%", "20%", "50%"], rotate: [0, 180], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } } }}
           />
           <motion.div 
             className="absolute inset-4 border-2"
             style={{ borderColor: color }}
             variants={{ hover: { borderRadius: ["20%", "50%", "20%"], rotate: [0, -180], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } } }}
           />
           <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_20px_white]" />
        </div>
      </motion.div>

    </div>
  );
};

const HorizontalGallery = ({ images }: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]); // Move horizontally based on scroll

  return (
    <section ref={containerRef} className="h-[300vh] w-full relative z-20 bg-[#020202]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        <div className="px-[10vw] mb-12">
          <p className="text-white/30 tracking-[0.3em] uppercase text-sm font-bold mb-4">La Galerie Parallaxe</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">L'Interface <br/> à l'état pur.</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-[5vw] px-[10vw] items-center">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="w-[80vw] md:w-[60vw] aspect-[16/10] relative shrink-0 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 group cursor-grab active:cursor-grabbing"
            >
               <motion.img 
                 src={img} 
                 className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// --- MAIN PAGE ---

export default function ServiceProPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const service = SERVICES.find((s) => s.id === resolvedParams.slug);

  if (!service) notFound();

  if (service.id === "formation") {
    return <FormationVortex />;
  }

  const data = PRO_DATA[service.id] || PRO_DATA["dev-web"];
  const accentColor = (service as any).accentColor || "#3B82F6";

  return (
    <main className="bg-[#020202] selection:bg-white selection:text-black">
      
      {/* ── HERO CINÉMATIQUE ── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Dissipating Black Overlay */}
        <motion.div 
          className="absolute inset-0 bg-[#020202] z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Back Link */}
        <div className="absolute top-32 left-6 md:left-12 z-40">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft size={16} /> Retour
          </Link>
        </div>

        {/* Ambient Hero Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none z-0"
          style={{ backgroundColor: accentColor }}
        />

        {/* Giant Title */}
        <div className="relative z-20 text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8] mix-blend-plus-lighter"
          >
            {service.title.split(" ").map((word, i) => (
               <span key={i} className={i % 2 !== 0 ? "text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.3)] block" : "block"}>
                 {word}
               </span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="mt-8 text-[var(--accent)] font-bold tracking-[0.4em] uppercase text-sm"
          >
            {data.slogan}
          </motion.p>
        </div>

        {/* 3D Mockup Rising */}
        <motion.div 
          initial={{ y: "100%", opacity: 0, scale: 0.8, filter: "blur(30px)" }}
          animate={{ y: "20%", opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 w-[90vw] md:w-[60vw] aspect-video rounded-t-[3rem] overflow-hidden border-t border-l border-r border-white/20 shadow-[0_-30px_100px_rgba(0,0,0,0.8)] z-30"
        >
          <img src={data.heroImage} className="w-full h-full object-cover" alt="Hero Mockup" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020202] opacity-90" />
        </motion.div>
      </section>

      {/* ── STORYTELLING PARALLAX ── */}
      <section className="relative py-40 overflow-hidden bg-[#020202]">
        
        {/* Giant Background Words */}
        <div className="absolute top-20 left-0 w-full overflow-hidden">
           <ScrollBackgroundWord text="GÉREZ. CONTRÔLEZ." offset={["-20%", "20%"]} />
        </div>
        <div className="absolute top-[40%] left-0 w-full overflow-hidden">
           <ScrollBackgroundWord text="ANALYSEZ. PRÉDUISEZ." offset={["10%", "-30%"]} />
        </div>
        <div className="absolute bottom-20 left-0 w-full overflow-hidden">
           <ScrollBackgroundWord text="DOMINEZ. INNOVEZ." offset={["-10%", "30%"]} />
        </div>

        {/* Asymmetric Elegant Text */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1 }}
            className="max-w-xl md:ml-[10%]"
          >
            <div className="w-12 h-[1px] bg-[var(--accent)] mb-8" />
            <p className="text-2xl md:text-4xl text-white font-light leading-relaxed tracking-tight">
              {data.desc}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1 }}
            className="max-w-lg mt-40 md:ml-auto md:mr-[10%]"
          >
            <div className="w-12 h-[1px] bg-[var(--accent)] mb-8" />
            <p className="text-xl md:text-2xl text-[#A0A0A8] font-light leading-relaxed">
              Une conception rigoureuse qui efface la frontière entre l'art visuel et l'ingénierie logicielle avancée. Le luxe digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FLOATING BENTO GRID ── */}
      <FloatingBento color={accentColor} />

      {/* ── HORIZONTAL SCROLL GALLERY ── */}
      <HorizontalGallery images={data.gallery} />

      {/* ── CTA FOOTER ── */}
      <section className="relative py-40 px-6 text-center z-20 bg-[#020202]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-white/20" />
        
        <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-12 mt-16 tracking-tighter">
          Prêt à <br/> <span style={{ color: accentColor }}>Transformer ?</span>
        </h2>
        
        <Link
          href="/contact"
          className="relative inline-flex items-center gap-6 px-16 py-8 rounded-[3rem] bg-white text-black font-black text-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] shadow-[0_0_50px_rgba(255,255,255,0.2)] group"
        >
          <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          Démarrer le Projet
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
            <ArrowUpRight className="text-white" size={24} />
          </div>
        </Link>
      </section>

    </main>
  );
}

"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

export default function TestimonialsSection() {
  const { language } = useLanguage();

  return (
    <section className="py-24 md:py-36 bg-[var(--bg)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--glow)]/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-[0.2em] mb-4">
            {language === "fr" ? "Témoignages" : "Testimonials"}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-bold tracking-tight mb-6">
            {language === "fr"
              ? "Ce que disent nos clients"
              : "What our clients say"}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            {language === "fr"
              ? "La confiance de nos partenaires est notre plus belle réussite. Découvrez leurs retours sur notre collaboration."
              : "The trust of our partners is our greatest success. Discover their feedback on our collaboration."}
          </p>
        </motion.div>

        {/* Swiper Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-7xl mx-auto"
        >
          <div
            className="testimonials-swiper-wrapper"
            style={
              {
                "--swiper-theme-color": "#E84D2A",
                "--swiper-navigation-size": "20px",
                "--swiper-navigation-color": "#E84D2A",
                "--swiper-pagination-color": "#E84D2A",
                "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.15)",
              } as React.CSSProperties
            }
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-16 !pt-4 !px-4"
            >
              {TESTIMONIALS.map((testimonial) => {
                return (
                  <SwiperSlide key={testimonial.id} className="h-auto">
                    <div className="h-full elite-card p-8 md:p-10 flex flex-col relative overflow-hidden group">
                      {/* Hover glow */}
                      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent" />
                      
                      {/* Decorative quote mark */}
                      <div className="absolute top-4 right-4 text-[var(--accent)] opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-700">
                        <Quote size={80} strokeWidth={1.5} className="rotate-12" />
                      </div>

                      {/* Stars Rating */}
                      <div className="flex items-center gap-1.5 mb-6 relative z-10">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={18}
                            className="text-[var(--accent)] fill-[var(--accent)]"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="flex-1 relative z-10 mb-8">
                        <p className="text-[var(--text-secondary)] leading-relaxed italic text-[1.05rem]">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                      </blockquote>

                      {/* Divider */}
                      <div className="h-px w-full bg-white/[0.06] mb-6 relative z-10" />

                      {/* Author Info */}
                      <div className="flex items-center gap-4 relative z-10 mt-auto">
                        <img
                          src={(testimonial as any).avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white/[0.08]"
                        />
                        <div>
                          <p className="font-display font-bold text-white text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-sm font-medium text-[var(--text-muted)]">
                            {testimonial.role},{" "}
                            <span className="text-[var(--accent)]">
                              {(testimonial as any).company}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const socialLinks = [
  { icon: LinkedinIcon, href: SITE_CONFIG.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: GithubIcon, href: "#", label: "Github" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const entrepriseLinks = [
    { name: t("footer.links.about"), href: "/about" },
    { name: t("footer.links.careers"), href: "#" },
    { name: t("footer.links.blog"), href: "#" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const legalLinks = [
    { name: t("footer.links.legal"), href: "#" },
    { name: t("footer.links.terms"), href: "#" },
    { name: t("footer.links.privacy"), href: "#" },
    { name: t("footer.links.cookies"), href: "#" },
  ];

  return (
    <footer className="bg-[var(--bg)] pt-20 pb-8 relative overflow-hidden border-t border-white/[0.04]" suppressHydrationWarning>
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[var(--glow)] opacity-[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Col (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative h-14 w-[120px] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="ZiryabTec Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.desc")}
            </p>

            {/* Social Icons — Neon hover */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--glow)] hover:border-[var(--glow)]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-500"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href={`tel:${SITE_CONFIG.phone?.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 text-[var(--text-muted)] hover:text-white transition-colors duration-300">
                <Phone size={14} className="text-[var(--accent)]" />
                {SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 text-[var(--text-muted)] hover:text-white transition-colors duration-300">
                <Mail size={14} className="text-[var(--accent)]" />
                {SITE_CONFIG.email}
              </a>
              <p className="flex items-center gap-2.5 text-[var(--text-muted)]">
                <MapPin size={14} className="text-[var(--accent)]" />
                {SITE_CONFIG.location}
              </p>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="font-display font-bold text-white mb-6 tracking-wider text-sm uppercase">
              {t("footer.sections.services")}
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] text-sm transition-colors duration-300"
                  >
                    {t(`services.items.${service.id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise Col */}
          <div>
            <h3 className="font-display font-bold text-white mb-6 tracking-wider text-sm uppercase">
              {t("footer.sections.company")}
            </h3>
            <ul className="flex flex-col gap-3">
              {entrepriseLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal Col */}
          <div>
            <h3 className="font-display font-bold text-white mb-6 tracking-wider text-sm uppercase">
              {t("footer.sections.legal")}
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-xs">
            © {currentYear} {SITE_CONFIG.name}. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs">
            {language === "fr"
              ? "Fièrement conçu au Maroc"
              : "Proudly designed in Morocco"}{" "}
            <span className="text-sm leading-none">🇲🇦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

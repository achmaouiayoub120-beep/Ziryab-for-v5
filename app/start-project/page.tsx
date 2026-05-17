"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Code2, Smartphone, Globe, Sparkles } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { SectionWrapper, FadeInChild } from "@/components/ui/SectionWrapper";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PROJECT_TYPES = [
  { id: "web", icon: Globe, label: "Application Web", desc: "Plateforme SaaS, ERP, Portail" },
  { id: "mobile", icon: Smartphone, label: "Application Mobile", desc: "iOS & Android native ou cross-platform" },
  { id: "software", icon: Code2, label: "Logiciel Sur-Mesure", desc: "Solution métier spécifique" },
  { id: "other", icon: Sparkles, label: "Autre projet", desc: "Audit, Data, IA, etc." },
];

const BUDGETS = [
  "< 10k €", "10k - 50k €", "50k - 100k €", "> 100k €"
];

export default function StartProjectPage() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    budget: "",
    details: "",
    name: "",
    email: "",
    company: ""
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  const isStep1Valid = formData.type !== "";
  const isStep2Valid = formData.budget !== "" && formData.details.length > 10;
  const isStep3Valid = formData.name !== "" && formData.email !== "";

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <SectionWrapper className="max-w-4xl mx-auto px-6 relative z-10">
        <FadeInChild className="text-center mb-16">
          <p className="text-sm text-[var(--accent)] font-bold uppercase tracking-[0.2em] mb-4">
            {language === "fr" ? "DÉMARRER UN PROJET" : "START A PROJECT"}
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            {language === "fr" ? "Parlons de votre" : "Let's discuss your"} <GradientText>{language === "fr" ? "vision" : "vision"}</GradientText>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            {language === "fr" 
              ? "Complétez ce formulaire rapide pour nous aider à comprendre vos besoins. Notre équipe vous contactera sous 24h avec une approche sur-mesure." 
              : "Complete this quick form to help us understand your needs. Our team will contact you within 24h with a tailored approach."}
          </p>
        </FadeInChild>

        <div className="elite-card p-8 md:p-12 relative overflow-hidden">
          {/* Progress Bar */}
          {step < 4 && (
            <div className="flex gap-2 mb-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-1.5 flex-1 rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div 
                    className="h-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]"
                    initial={{ width: "0%" }}
                    animate={{ width: step >= i ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Project Type */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-display font-bold text-white">
                  {language === "fr" ? "Quel type de projet souhaitez-vous réaliser ?" : "What type of project do you want to build?"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map(type => {
                    const Icon = type.icon;
                    const isSelected = formData.type === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setFormData({...formData, type: type.id})}
                        className={`text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                          isSelected 
                            ? "bg-[var(--accent)]/10 border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]" 
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "bg-[var(--accent)] text-white" : "bg-white/[0.05] text-[var(--text-muted)]"
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className={`font-bold mb-1 transition-colors ${isSelected ? "text-white" : "text-[var(--text-primary)]"}`}>
                            {type.label}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)]">{type.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end pt-6">
                  <button 
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white font-bold rounded-lg transition-all hover:bg-[var(--accent-hover)] shadow-[0_0_20px_var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === "fr" ? "Continuer" : "Continue"} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Details & Budget */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-display font-bold text-white">
                  {language === "fr" ? "Parlez-nous un peu plus de ce projet" : "Tell us a bit more about this project"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-muted)] mb-3">
                      {language === "fr" ? "Budget estimé" : "Estimated budget"}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {BUDGETS.map(budget => (
                        <button
                          key={budget}
                          onClick={() => setFormData({...formData, budget})}
                          className={`py-3 px-4 text-sm font-bold rounded-lg border transition-all ${
                            formData.budget === budget
                              ? "bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)] shadow-[0_0_15px_var(--accent-glow)]"
                              : "bg-white/[0.02] border-white/[0.06] text-[var(--text-secondary)] hover:border-white/[0.2]"
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[var(--text-muted)] mb-3">
                      {language === "fr" ? "Description du projet" : "Project description"}
                    </label>
                    <textarea 
                      value={formData.details}
                      onChange={e => setFormData({...formData, details: e.target.value})}
                      placeholder={language === "fr" ? "Décrivez brièvement vos objectifs, fonctionnalités clés..." : "Briefly describe your goals, key features..."}
                      className="w-full h-40 bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--glow)] focus:ring-1 focus:ring-[var(--glow)] transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/[0.06]">
                  <button 
                    onClick={handleBack}
                    className="px-6 py-3.5 text-[var(--text-secondary)] font-bold hover:text-white transition-colors"
                  >
                    {language === "fr" ? "Retour" : "Back"}
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white font-bold rounded-lg transition-all hover:bg-[var(--accent-hover)] shadow-[0_0_20px_var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === "fr" ? "Continuer" : "Continue"} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact Info */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-display font-bold text-white">
                  {language === "fr" ? "Où pouvons-nous vous joindre ?" : "Where can we reach you?"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">
                        {language === "fr" ? "Nom complet *" : "Full Name *"}
                      </label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">
                        {language === "fr" ? "Email professionnel *" : "Work Email *"}
                      </label>
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow)] transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">
                      {language === "fr" ? "Entreprise (Optionnel)" : "Company (Optional)"}
                    </label>
                    <input 
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow)] transition-all"
                    />
                  </div>

                  <div className="flex justify-between pt-8 border-t border-white/[0.06]">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3.5 text-[var(--text-secondary)] font-bold hover:text-white transition-colors"
                    >
                      {language === "fr" ? "Retour" : "Back"}
                    </button>
                    <button 
                      type="submit"
                      disabled={!isStep3Valid}
                      className="flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white font-bold rounded-lg transition-all hover:bg-[var(--accent-hover)] shadow-[0_0_20px_var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {language === "fr" ? "Envoyer la demande" : "Submit Request"} <Sparkles size={18} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-[var(--success)]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--success)]/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <CheckCircle size={48} className="text-[var(--success)]" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  {language === "fr" ? "Demande envoyée !" : "Request sent!"}
                </h2>
                <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-10">
                  {language === "fr" 
                    ? "Merci pour votre confiance. Un de nos experts va analyser votre demande et vous recontacter très rapidement."
                    : "Thank you for your trust. One of our experts will review your request and get back to you shortly."}
                </p>
                <a 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-white/[0.1] text-white font-bold rounded-lg hover:bg-white/[0.05] transition-all"
                >
                  {language === "fr" ? "Retour à l'accueil" : "Back to home"}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionWrapper>
    </div>
  );
}

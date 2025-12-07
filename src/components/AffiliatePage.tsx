import { motion } from 'framer-motion';
import { ArrowRight, Shield, BadgeCheck, Ban, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { affiliateTranslations } from '../translations/affiliate';

export function AffiliatePage() {
  const { language } = useLanguage();
  const t = affiliateTranslations[language];
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <PageLayout>
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#3B82F6] uppercase tracking-wider mb-4">
                {t.badge}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                {t.subtitle}
              </p>
              <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
                {t.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/app"
                  className="px-8 py-4 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  {t.becomeAffiliate}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#agreement"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300"
                >
                  {t.readTerms}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="agreement" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.agreementTitle}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t.agreementDesc}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.responsibilitiesTitle}
            </h2>
            <div className="space-y-4">
              {[
                t.responsibility1,
                t.responsibility2,
                t.responsibility3,
                t.responsibility4,
                t.responsibility5,
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#A855F7] to-[#3B82F6] flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.oversightTitle}
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: t.oversight1Title,
                  content: t.oversight1Content,
                },
                {
                  title: t.oversight2Title,
                  content: t.oversight2Content,
                },
                {
                  title: t.oversight3Title,
                  content: t.oversight3Content,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(`oversight-${index}`)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform ${
                        openAccordion === `oversight-${index}` ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === `oversight-${index}` && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.commissionsTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center"
              >
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{t.payoutCurrency}</p>
                <p className="text-4xl font-bold">USD</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center"
              >
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{t.minimumPayout}</p>
                <p className="text-4xl font-bold">$500</p>
              </motion.div>
            </div>
            <div className="space-y-4">
              {[
                t.commission1,
                t.commission2,
                t.commission3,
                t.commission4,
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#3B82F6] mt-2" />
                  <p className="text-gray-300">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.promotionTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: t.truthfulTitle,
                  desc: t.truthfulDesc,
                },
                {
                  icon: BadgeCheck,
                  title: t.brandTitle,
                  desc: t.brandDesc,
                },
                {
                  icon: Ban,
                  title: t.prohibitedTitle,
                  desc: t.prohibitedDesc,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#A855F7] to-[#3B82F6] flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.qualificationTitle}
            </h2>
            <div className="space-y-6">
              {[
                {
                  term: t.qualifiedTerm,
                  definition: t.qualifiedDef,
                },
                {
                  term: t.subscriptionsTerm,
                  definition: t.subscriptionsDef,
                },
                {
                  term: t.attributionTerm,
                  definition: t.attributionDef,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#3B82F6]">
                    {item.term}
                  </h3>
                  <p className="text-gray-300 text-lg">{item.definition}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.supportTitle}
            </h2>
            <div className="space-y-6">
              {[
                { title: t.creativeKitTitle, desc: t.creativeKitDesc },
                { title: t.emailTemplatesTitle, desc: t.emailTemplatesDesc },
                { title: t.trainingTitle, desc: t.trainingDesc },
                { title: t.coMarketingTitle, desc: t.coMarketingDesc },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.terminationTitle}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t.terminationDesc}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
              {t.legalTitle}
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: t.dataProtectionTitle,
                  content: t.dataProtectionContent,
                },
                {
                  title: t.confidentialityTitle,
                  content: t.confidentialityContent,
                },
                {
                  title: t.governingTitle,
                  content: t.governingContent,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(`legal-${index}`)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform ${
                        openAccordion === `legal-${index}` ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === `legal-${index}` && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="apply" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.readyTitle}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {t.readyDesc}
            </p>
            <a
              href="/app"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              {t.applyNow}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
    </PageLayout>
  );
}

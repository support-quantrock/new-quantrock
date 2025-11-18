import { motion } from 'framer-motion';
import { ChevronDown, Mail, Globe, CheckCircle, Shield, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { privacyTranslations } from '../translations/privacy';

export function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const t = privacyTranslations[language];
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {t.title}
                </h1>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
                  {t.subtitle}
                </p>
                <p className="text-sm text-gray-400">
                  {t.lastUpdated}
                </p>
              </motion.div>
            </div>
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
                {t.overviewTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.overviewDesc}
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
                {t.section1Title}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: t.section1_1Title,
                    content: t.section1_1Content,
                  },
                  {
                    title: t.section1_2Title,
                    content: t.section1_2Content,
                  },
                  {
                    title: t.section1_3Title,
                    content: t.section1_3Content,
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
                      onClick={() => toggleAccordion(`collect-${index}`)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${
                          openAccordion === `collect-${index}` ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openAccordion === `collect-${index}` && (
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
                {t.section2Title}
              </h2>
              <div className="space-y-4">
                {[
                  t.section2Item1,
                  t.section2Item2,
                  t.section2Item3,
                  t.section2Item4,
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] mt-2" />
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
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                {t.section3Title}
              </h2>
              <p className="text-lg text-gray-300 text-center mb-10">
                {t.section3Subtitle}
              </p>
              <div className="space-y-4">
                {[
                  t.section3Item1,
                  t.section3Item2,
                  t.section3Item3,
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] mt-2" />
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
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
                {t.section4Title}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: t.security1Title,
                    desc: t.security1Desc
                  },
                  {
                    icon: Clock,
                    title: t.security2Title,
                    desc: t.security2Desc
                  },
                  {
                    icon: Trash2,
                    title: t.security3Title,
                    desc: t.security3Desc
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
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
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
                {t.section5Title}
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  t.rights1,
                  t.rights2,
                  t.rights3,
                  t.rights4,
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{item}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <p className="text-gray-300 text-center">
                  {t.rightsContact}{' '}
                  <a href="mailto:support@quantrock.com" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    support@quantrock.com
                  </a>
                </p>
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
                {t.section6Title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.section6Desc}
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
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.section7Title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.section7Desc}
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
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
                {t.section8Title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a
                  href="mailto:support@quantrock.com"
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.emailLabel}</h3>
                  <p className="text-gray-300">support@quantrock.com</p>
                </a>
                <a
                  href="https://www.quantrock.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.websiteLabel}</h3>
                  <p className="text-gray-300">quantrock.com</p>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

import { motion } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { termsTranslations } from '../translations/terms';

export function TermsOfUsePage() {
  const { language } = useLanguage();
  const t = termsTranslations[language];
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#3B82F6] uppercase tracking-wider mb-4">
                  {t.badge}
                </p>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {t.title}
                </h1>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  {t.subtitle}
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
                {t.introTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.introDesc}
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
                {t.paymentTitle}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    term: t.paymentTerm1,
                    definition: t.paymentDef1,
                  },
                  {
                    term: t.paymentTerm2,
                    definition: t.paymentDef2,
                  },
                  {
                    term: t.paymentTerm3,
                    definition: t.paymentDef3,
                  },
                  {
                    term: t.paymentTerm4,
                    definition: t.paymentDef4,
                  },
                  {
                    term: t.paymentTerm5,
                    definition: t.paymentDef5,
                  },
                  {
                    term: t.paymentTerm6,
                    definition: t.paymentDef6,
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
                {t.infoCollectTitle}
              </h2>
              <div className="space-y-4">
                {[
                  t.infoCollect1,
                  t.infoCollect2,
                  t.infoCollect3,
                  t.infoCollect4,
                  t.infoCollect5,
                  t.infoCollect6,
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
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
                {t.infoUseTitle}
              </h2>
              <div className="space-y-4">
                {[
                  t.infoUse1,
                  t.infoUse2,
                  t.infoUse3,
                  t.infoUse4,
                  t.infoUse5,
                  t.infoUse6,
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
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
                {t.disclosureTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: t.disclosure1Title, desc: t.disclosure1Desc },
                  { title: t.disclosure2Title, desc: t.disclosure2Desc },
                  { title: t.disclosure3Title, desc: t.disclosure3Desc },
                  { title: t.disclosure4Title, desc: t.disclosure4Desc },
                  { title: t.disclosure5Title, desc: t.disclosure5Desc },
                  { title: t.disclosure6Title, desc: t.disclosure6Desc },
                  { title: t.disclosure7Title, desc: t.disclosure7Desc },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
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
                {t.cookiesTitle}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: t.cookies1Title,
                    content: t.cookies1Content,
                  },
                  {
                    title: t.cookies2Title,
                    content: t.cookies2Content,
                  },
                  {
                    title: t.cookies3Title,
                    content: t.cookies3Content,
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
                      onClick={() => toggleAccordion(`cookies-${index}`)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${
                          openAccordion === `cookies-${index}` ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openAccordion === `cookies-${index}` && (
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
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.thirdPartyTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.thirdPartyDesc}
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
                {t.securityTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.securityDesc}
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
                {t.childrenTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.childrenDesc}
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
                {t.dntTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.dntDesc}
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
                {t.choicesTitle}
              </h2>
              <div className="space-y-4">
                {[
                  t.choice1,
                  t.choice2,
                  t.choice3,
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
              className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.contactTitle}
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                {t.contactDesc}
              </p>
              <a
                href="mailto:SUPPORT@QUANTROCK.COM"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                {t.contactButton}
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

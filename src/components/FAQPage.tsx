import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { faqTranslations } from '../translations/faq';

export function FAQPage() {
  const { language } = useLanguage();
  const t = faqTranslations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      title: t.faq1Title,
      content: t.faq1Content
    },
    {
      title: t.faq2Title,
      content: t.faq2Content
    },
    {
      title: t.faq3Title,
      content: t.faq3Content
    },
    {
      title: t.faq4Title,
      content: t.faq4Content
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] via-[#0f1535] to-[#1a1f4d]">
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-6 py-2 mb-6">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 font-semibold">{t.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                {t.title}
              </h1>
              <p className="text-lg text-gray-300">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">{t.generalTitle}</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/40"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
                    >
                      <span className="text-lg font-semibold text-white pr-4">
                        {faq.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                        {faq.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                {t.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.quantriex.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 shadow-lg shadow-cyan-500/30"
                >
                  {t.openApp}
                </a>
                <a
                  href="/#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-200 border border-cyan-400/30"
                >
                  {t.pricing}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {t.stillNeedHelp}
              </h3>
              <p className="text-gray-300 mb-6">
                {t.reachOut}
              </p>
              <a
                href="mailto:SUPPORT@QUANTROCK.COM"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
              >
                {t.emailSupport}
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

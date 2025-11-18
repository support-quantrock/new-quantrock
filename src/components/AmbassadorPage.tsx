import { motion } from 'framer-motion';
import { Activity, Cpu, BookOpen, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ambassadorTranslations } from '../translations/ambassador';

export function AmbassadorPage() {
  const { language } = useLanguage();
  const t = ambassadorTranslations[language];

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    { icon: Activity, title: t.features.realTimeData },
    { icon: Cpu, title: t.features.aiAnalytics },
    { icon: BookOpen, title: t.features.expertInsights },
    { icon: Users, title: t.features.communityDriven },
  ];

  const benefits = [
    { title: t.benefits.commission, desc: t.benefits.commissionDesc },
    { title: t.benefits.recurring, desc: t.benefits.recurringDesc },
    { title: t.benefits.vipMembership, desc: t.benefits.vipMembershipDesc },
    { title: t.benefits.vipBadge, desc: t.benefits.vipBadgeDesc },
    { title: t.benefits.certification, desc: t.benefits.certificationDesc },
    { title: t.benefits.invitations, desc: t.benefits.invitationsDesc },
    { title: t.benefits.roundtables, desc: t.benefits.roundtablesDesc },
  ];

  const audienceItems = [
    t.audience.experts,
    t.audience.managers,
    t.audience.professors,
    t.audience.influencers,
  ];

  const steps = [
    {
      title: t.paths.pathA,
      description: t.paths.pathADesc,
    },
    {
      title: t.paths.pathB,
      description: t.paths.pathBDesc,
    },
  ];

  return (
    <PageLayout>
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/20 via-black to-[#3B82F6]/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A855F7]/20 to-[#3B82F6]/20 border border-[#A855F7]/30 rounded-full text-sm mb-6">
                {t.badge}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                {t.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#3B82F6]">
                  {t.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {t.description}
              </p>
              <p className="text-lg text-gray-400 mb-8">
                {t.subDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://quantrock.app.link/X6mJ3n3GGVb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  {t.joinNow}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#why-quantrock"
                  className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t.learnMore}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src="/media/ChatGPT Image Oct 11, 2025, 10_49_29 AM.png"
                  alt={t.imageAlt}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.whoIsItFor.title}</h2>
            <p className="text-xl text-gray-400 mb-8">
              {t.whoIsItFor.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {audienceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <CheckCircle2 className="w-8 h-8 text-[#A855F7] mb-4" />
                <h3 className="text-lg font-semibold">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-quantrock" className="py-24 relative bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.whyQuantrock.title}</h2>
            <p className="text-xl text-gray-400 mb-8">
              {t.whyQuantrock.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#A855F7]/50 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-[#A855F7] mb-4" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-gray-400 max-w-3xl mx-auto"
          >
            {t.whyQuantrock.successNote}
          </motion.p>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.rewardsTitle}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#A855F7]/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#3B82F6]">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.paths.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-[#A855F7]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-lg text-gray-400 max-w-3xl mx-auto"
          >
            {t.pathsNote}
          </motion.p>
        </div>
      </section>

      <section id="join" className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-400 mb-8">
              {t.cta.description}
            </p>
            <a
              href="https://quantrock.app.link/X6mJ3n3GGVb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
    </PageLayout>
  );
}

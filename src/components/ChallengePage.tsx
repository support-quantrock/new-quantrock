import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, CheckCircle2, TrendingUp, Award, Target, DollarSign, Building2, GraduationCap, Camera, ChevronDown } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StageCards } from './StageCards';
import { useLanguage } from '../contexts/LanguageContext';
import { challengeTranslations } from '../translations/challenge';

export function ChallengePage() {
  const { language } = useLanguage();
  const t = challengeTranslations[language];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [allCardsOpen, setAllCardsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'hedgeFunds' | 'familyOffice' | 'congress' | 'insiders'>('hedgeFunds');
  const [openStageCard, setOpenStageCard] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const marqueeContent = {
    hedgeFunds: [
      { src: '/media/download (6).jpg', alt: 'Warren Buffett' },
      { src: '/media/download (5).jpg', alt: 'Bill Ackman' },
      { src: '/media/download (4).jpg', alt: 'Stanley Druckenmiller' },
      { src: '/media/download (3).jpg', alt: 'George Soros' }
    ],
    familyOffice: [
      { src: '/media/download (7).jpg', alt: 'Jeffrey Bezos' },
      { src: '/media/download (8).jpg', alt: 'Bill Gates' },
      { src: '/media/download (9).jpg', alt: 'Mark Zuckerberg' },
      { src: '/media/download (10).jpg', alt: 'Elon Musk' }
    ],
    congress: [
      { src: '/media/download (11).jpg', alt: 'Nancy Pelosi' },
      { src: '/media/download (12).jpg', alt: 'Tommy Tuberville' },
      { src: '/media/download (13).jpg', alt: 'Michael McCaul' },
      { src: '/media/download (14).jpg', alt: 'Pete Ricketts' }
    ],
    insiders: [
      { src: '/media/download (15).jpg', alt: 'Timothy D Cook' },
      { src: '/media/download (16).jpg', alt: 'Satya Nadella' },
      { src: '/media/download (17).jpg', alt: 'Sundar Pichai' },
      { src: '/media/download (18).jpg', alt: 'Marc Benioff' }
    ]
  };

  const faqs = [
    {
      question: t.faq1Question,
      answer: t.faq1Answer
    },
    {
      question: t.faq2Question,
      answer: t.faq2Answer
    },
    {
      question: t.faq3Question,
      answer: t.faq3Answer
    },
    {
      question: t.faq4Question,
      answer: t.faq4Answer
    },
    {
      question: t.faq5Question,
      answer: t.faq5Answer
    },
    {
      question: t.faq6Question,
      answer: t.faq6Answer
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27] overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4d] to-[#2d1b4e]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6"
              >
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-semibold">{t.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight"
              >
                The biggest investment simulation challenge…
                <span className="block mt-1">
                  Combining learning, competition, and{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">real prizes</span>.
                </span>
                <span className="block mt-1">
                  A professional challenge to manage a{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">$100,000</span> simulated portfolio
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-300 mb-3 leading-relaxed"
              >
                A comprehensive program designed to refine investors' skills and enable them to experience an investment journey within a professional trading environment that simulates the actual markets 100% using a hedge-fund style approach, all with zero financial risk.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <a
                  href="#stages"
                  className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium border border-cyan-400/30 text-center"
                >
                  {t.howItWorks}
                </a>
                <a
                  href="/app"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 text-center"
                >
                  {t.startChallenge}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-1"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-gradient-to-br from-[#1a1f4d]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">$100,000</div>
                  <div className="text-sm text-gray-400">simulated portfolio</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-gradient-to-br from-[#1a1f4d]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">Monthly</div>
                  <div className="text-sm text-gray-400">Winner</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="bg-gradient-to-br from-[#1a1f4d]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">Free</div>
                  <div className="text-sm text-gray-400">without risking</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-2 flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-full lg:max-w-6xl rounded-3xl shadow-2xl shadow-cyan-500/30 border border-cyan-500/30 overflow-hidden">
                <img
                  src="/media/nanobana-generated-image (1) (1).png"
                  alt={t.championshipAlt}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-[#0f1535] to-[#1a1f4d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 font-semibold">{t.aboutBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 pb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t.aboutTitle}
              </span>
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-6">
              {t.aboutSubtitle}
            </h3>
            <p className="text-base md:text-base text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.aboutDescription}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a1f4d]/90 to-[#0a0e27]/80 p-10 rounded-3xl border border-cyan-400/30 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 h-full backdrop-blur-sm">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.yourRoleTitle}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-base text-gray-300 leading-relaxed">
                    {t.yourRoleDesc}
                  </p>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-6 rounded-r-2xl">
                    <p className="text-base text-cyan-200 leading-relaxed">
                      {t.yourRoleHighlight}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a1f4d]/90 to-[#0a0e27]/80 p-10 rounded-3xl border border-emerald-400/30 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 h-full backdrop-blur-sm">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.prizesTitle}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></div>
                  </div>
                </div>

                <ul className="space-y-5">
                  <li className="group/item flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-all">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500/30 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-base text-gray-200 leading-relaxed">
                      {t.prize1}
                    </span>
                  </li>
                  <li className="group/item flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-all">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500/30 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-base text-gray-200 leading-relaxed">
                      {t.prize2}
                    </span>
                  </li>
                  <li className="group/item flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-all">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500/30 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-base text-gray-200 leading-relaxed">
                      {t.prize3}
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learn to Invest Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-2xl blur-lg"></div>
          <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-yellow-400 animate-pulse">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <p className="text-base lg:text-lg text-gray-300 font-bold">{t.learnTitle}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-yellow-400 animate-pulse">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <p className="text-sm lg:text-base text-gray-300">
              {t.learnDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs and Marquee Section */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg"></div>
              <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-2 border border-cyan-500/30 flex gap-2">
                <button
                  onClick={() => setActiveTab('hedgeFunds')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'hedgeFunds'
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t.tabHedgeFunds}
                </button>
                <button
                  onClick={() => setActiveTab('familyOffice')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'familyOffice'
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t.tabFamilyOffice}
                </button>
                <button
                  onClick={() => setActiveTab('congress')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'congress'
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t.tabCongress}
                </button>
                <button
                  onClick={() => setActiveTab('insiders')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'insiders'
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t.tabInsiders}
                </button>
              </div>
            </div>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden mx-8">
              <div key={activeTab} className="flex animate-marquee whitespace-nowrap py-6">
                <div className="flex">
                  {marqueeContent[activeTab].map((item, index) => (
                    <div key={index} className="flex items-center mx-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur-md group-hover:blur-xl transition-all duration-300"></div>
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                          <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {marqueeContent[activeTab].map((item, index) => (
                    <div key={`duplicate-${index}`} className="flex items-center mx-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur-md group-hover:blur-xl transition-all duration-300"></div>
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                          <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section id="stages" className="py-24 bg-gradient-to-b from-[#0a0e27] to-[#1a1f4d]">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 pb-2">
              {t.stagesIntro}
            </h2>
            <p className="text-lg text-cyan-300 max-w-3xl mx-auto">
              {t.stagesDescription}
            </p>
          </div>

          <StageCards />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-[#1a1f4d]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 pb-2">
              {t.championshipBenefits}
            </h2>
            <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
              {t.championshipBenefitsDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mb-6 group-hover:scale-110 transition-transform text-5xl">👥</div>
              <h3 className="text-base font-bold text-white mb-4">{t.benefit1}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t.benefit1Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl shadow-lg hover:shadow-pink-500/20 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mb-6 group-hover:scale-110 transition-transform text-5xl">🎯</div>
              <h3 className="text-base font-bold text-white mb-4">{t.benefit2}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t.benefit2Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mb-6 group-hover:scale-110 transition-transform text-5xl">📈</div>
              <h3 className="text-base font-bold text-white mb-4">{t.benefit3}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t.benefit3Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mb-6 group-hover:scale-110 transition-transform text-5xl">💎</div>
              <h3 className="text-base font-bold text-white mb-4">{t.benefit4}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t.benefit4Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-4">{t.benefit5}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t.benefit5Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mb-6 group-hover:scale-110 transition-transform text-5xl">🎓</div>
              <h3 className="text-base font-bold text-white mb-4">{t.benefit6}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t.benefit6Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="rewards" className="py-24 bg-gradient-to-br from-[#0f1535] via-[#1a1f4d] to-[#2d1b4e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.readyToStart}
          </h2>
          <p className="text-lg text-cyan-300 mb-10 leading-relaxed">
            {t.readyToStartDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 font-bold text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 inline-flex items-center gap-2 justify-center">
              {t.joinNow}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="https://challenge.quantrock.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 font-bold text-lg border-2 border-cyan-400/30 inline-flex items-center gap-2 justify-center">
              {t.learnMore}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20">
              <div className="text-2xl font-bold text-emerald-400 mb-2">$10,000</div>
              <div className="text-cyan-300">{t.ctaRealPortfolio}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20">
              <div className="text-2xl font-bold text-yellow-400 mb-2">50%</div>
              <div className="text-purple-300">{t.ctaProfitShare}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20">
              <div className="text-2xl font-bold text-cyan-400 mb-2">{t.free}</div>
              <div className="text-blue-300">{t.ctaStartDemo}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-24 bg-gradient-to-b from-[#0f1535] to-[#1a1f4d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2">
                <span className="text-cyan-300 font-semibold">{t.joinTheChallenge}</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 pb-2">
              {t.registerInterest}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t.registerDesc}
            </p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-[#1a1f4d]/90 to-[#0a0e27]/80 backdrop-blur-2xl rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400"></div>
              <form className="p-8 md:p-12 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label className="block text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      {t.fullName}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.fullNamePlaceholder}
                        className="w-full bg-[#0a0e27]/70 border-2 border-cyan-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0e27]/90 transition-all duration-300 group-hover/input:border-cyan-500/50"
                      />
                    </div>
                  </div>
                  <div className="group/input">
                    <label className="block text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      {t.emailAddress}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-[#0a0e27]/70 border-2 border-cyan-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0e27]/90 transition-all duration-300 group-hover/input:border-cyan-500/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label className="block text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      {t.phone}
                      <span className="text-gray-500 text-xs font-normal">{t.optional}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        className="w-full bg-[#0a0e27]/70 border-2 border-cyan-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0e27]/90 transition-all duration-300 group-hover/input:border-cyan-500/50"
                      />
                    </div>
                  </div>
                  <div className="group/input">
                    <label className="block text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      {t.country}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.countryPlaceholder}
                        className="w-full bg-[#0a0e27]/70 border-2 border-cyan-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0e27]/90 transition-all duration-300 group-hover/input:border-cyan-500/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1.5 w-6 h-6 bg-[#0a0e27]/70 border-2 border-cyan-500/40 rounded-lg focus:ring-2 focus:ring-cyan-400/30 accent-cyan-500 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-gray-300 leading-relaxed cursor-pointer">
                      {t.consentText}
                    </label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 group/btn relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {t.submitRequest}
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                  <button
                    type="reset"
                    className="bg-[#0a0e27]/70 border-2 border-cyan-500/30 text-white px-8 py-4 rounded-xl hover:bg-[#0a0e27]/90 hover:border-cyan-500/50 transition-all duration-300 font-semibold"
                  >
                    {t.reset}
                  </button>
                </div>
                <div className="border-t border-cyan-500/20 pt-6 mt-6">
                  <p className="text-center text-gray-400">
                    {t.alternativeRegister}{' '}
                    <a
                      href="https://challenge.quantrock.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline font-semibold inline-flex items-center gap-1 group/link"
                    >
                      challenge.quantrock.com
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-[#0a0e27] to-[#1a1f4d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2">
                <span className="text-cyan-300 font-semibold">{t.gotQuestions}</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 pb-2">
              {t.faqTitle}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t.faqSubtitle}
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#1a1f4d]/80 to-[#0a0e27]/60 backdrop-blur-xl rounded-2xl border border-cyan-500/30 overflow-hidden shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/20 transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-8 text-left group-hover:bg-cyan-500/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>
                      <span className="text-base md:text-lg font-semibold text-white pr-4 group-hover:text-cyan-300 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-all duration-300 ${openFaq === index ? 'bg-cyan-500/20' : ''}`}>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 pb-8 pl-20">
                      <div className="bg-[#0a0e27]/50 rounded-xl p-6 border-l-4 border-cyan-400">
                        <p className="text-gray-300 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-lg"></div>
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl px-8 py-4 border border-cyan-500/50">
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent pb-2">{t.ourPartners}</h2>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 shadow-xl shadow-green-500/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-green-400 text-center">{t.bankingPartnersLabel}</h3>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-base font-bold text-blue-400 text-center mb-6">{t.educationalPartnersLabel}</h3>
                  <div className="flex flex-wrap justify-center items-center gap-6">
                    <img
                      src="/media/Logo-6 (1).png"
                      alt={t.educationalPartner}
                      className="h-12 w-auto object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                    />
                    <img
                      src="/media/logo.webp"
                      alt={t.educationalPartner}
                      className="h-12 w-auto object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-xl shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-purple-400 text-center">{t.mediaPartnersLabel}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/**
 * QUANTROCK LANDING PAGE
 *
 * High-conversion landing page for Quantrock.com investment app.
 * Built with React + Tailwind CSS + Framer Motion.
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Add Media Assets:
 *    Place all required assets in /public/media/
 *    See /public/media/README.md for complete list and specifications
 *
 * 2. Update App Store Links:
 *    Search for "apps.apple.com" and "play.google.com" in this file
 *    Replace with your actual app store URLs
 *
 * 3. Update Social Links:
 *    Find the footer section and update LinkedIn, Twitter, Instagram URLs
 *
 * 4. Customize Content:
 *    All text content is inline and can be easily modified
 *    Features, testimonials, and steps are defined in arrays at the top of the component
 *
 * FEATURES:
 * - Video background hero with parallax effect
 * - Infinite scrolling logo marquee (auto-pause on hover)
 * - Interactive feature cards with 3D tilt on hover
 * - Animated step-by-step guide
 * - Image/video gallery with lightbox modal
 * - Floating testimonial cards
 * - Particle background animations
 * - Fully responsive mobile-first design
 * - Keyboard accessible
 * - SEO optimized with meta tags
 *
 * PERFORMANCE:
 * - Lazy loading for below-fold media
 * - Optimized animations with Framer Motion
 * - Graceful fallbacks for missing assets
 */

import { motion, useInView, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Brain,
  TrendingUp,
  Wallet,
  FileText,
  Download,
  ArrowRight,
  Smartphone,
  UserCheck,
  Rocket,
  Trophy,
  Calendar,
  MessageCircle,
  FolderKanban,
  PenTool,
  Activity,
  Eye,
  Search,
  Building2,
  Briefcase,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Star,
  Target,
} from 'lucide-react';
import { Marquee } from './Marquee';
import { Gallery } from './Gallery';
import { PageLayout } from './PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../translations';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function LossStatisticsSlider() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;

  const statistics = [
    {
      logo: "/media/Picture3.png",
      alt: "ESMA Logo",
      text: t.landing.lossStatistics.cards[0].text,
      source: t.landing.lossStatistics.cards[0].source
    },
    {
      logo: "/media/Picture4.png",
      alt: "NASAA Logo",
      text: t.landing.lossStatistics.cards[1].text,
      source: t.landing.lossStatistics.cards[1].source
    },
    {
      logo: "/media/Picture5.png",
      alt: "CFTC Logo",
      text: t.landing.lossStatistics.cards[2].text,
      source: t.landing.lossStatistics.cards[2].source
    },
    {
      logo: "/media/Picture6.png",
      alt: "SSRN Logo",
      text: t.landing.lossStatistics.cards[3].text,
      source: t.landing.lossStatistics.cards[3].source
    },
    {
      logo: "/media/Picture7.png",
      alt: "Berkeley Logo",
      text: t.landing.lossStatistics.cards[4].text,
      source: t.landing.lossStatistics.cards[4].source
    },
    {
      logo: "/media/Picture8.png",
      alt: "NBER Logo",
      text: t.landing.lossStatistics.cards[5].text,
      source: t.landing.lossStatistics.cards[5].source
    },
    {
      logo: "/media/Picture9.png",
      alt: "Financial Analysts Journal Logo",
      text: t.landing.lossStatistics.cards[6].text,
      source: t.landing.lossStatistics.cards[6].source
    },
    {
      logo: "/media/Picture10.png",
      alt: "Morningstar Logo",
      text: t.landing.lossStatistics.cards[7].text,
      source: t.landing.lossStatistics.cards[7].source
    },
    {
      logo: "/media/Picture11.png",
      alt: "FCA Logo",
      text: t.landing.lossStatistics.cards[8].text,
      source: t.landing.lossStatistics.cards[8].source
    }
  ];

  const totalPages = Math.ceil(statistics.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const visibleStats = statistics.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <div className="relative max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {visibleStats.map((stat, index) => (
            <div key={currentSlide * itemsPerPage + index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-[#1a1f35] to-[#0f1420] border border-gray-800/50 rounded-3xl p-6">
                <div className="h-2 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-full mb-6" />
                <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center h-40">
                  <img
                    src={stat.logo}
                    alt={stat.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-6 text-center min-h-[120px] flex items-center justify-center">
                  {stat.text}
                </p>
                <div className="text-[#FBBF24] font-semibold text-sm text-center">
                  {stat.source}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-[#FBBF24]/10 hover:bg-[#FBBF24]/20 border border-[#FBBF24]/30 transition-all duration-300 group"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6 text-[#FBBF24] group-hover:text-[#F59E0B]" />
        </button>

        <div className="flex gap-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-[#FBBF24]/10 hover:bg-[#FBBF24]/20 border border-[#FBBF24]/30 transition-all duration-300 group"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6 text-[#FBBF24] group-hover:text-[#F59E0B]" />
        </button>
      </div>
    </div>
  );
}

function InvestmentQuotesSlider() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [currentSlide, setCurrentSlide] = useState(0);

  const quotes = [
    {
      title: t.landing.quotes.graham.title,
      quote: t.landing.quotes.graham.quote,
      author: t.landing.quotes.graham.author,
      image: "/media/image copy copy copy.png",
      alt: "Benjamin Graham - The Father of Value Investing"
    },
    {
      title: t.landing.quotes.lynch.title,
      quote: t.landing.quotes.lynch.quote,
      author: t.landing.quotes.lynch.author,
      image: "/media/image copy copy copy copy.png",
      alt: "Peter Lynch - Legendary Mutual Fund Manager"
    },
    {
      title: t.landing.quotes.livermore.title,
      quote: t.landing.quotes.livermore.quote,
      author: t.landing.quotes.livermore.author,
      image: "/media/image copy copy copy copy copy.png",
      alt: "Jesse Livermore - Legendary Stock Trader"
    },
    {
      title: t.landing.quotes.soros.title,
      quote: t.landing.quotes.soros.quote,
      author: t.landing.quotes.soros.author,
      image: "/media/image copy copy copy copy copy copy.png",
      alt: "George Soros - Legendary Hedge Fund Manager"
    },
    {
      title: t.landing.quotes.buffett.title,
      quote: t.landing.quotes.buffett.quote,
      author: t.landing.quotes.buffett.author,
      image: "/media/image copy copy copy copy copy copy copy.png",
      alt: "Warren Buffett - The Oracle of Omaha"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % quotes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <svg className="w-12 h-12 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-blue-400 uppercase tracking-wider mb-4">
                    {quotes[currentSlide].title}
                  </h3>
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                    "{quotes[currentSlide].quote}"
                  </blockquote>
                  <p className="text-blue-400 font-medium text-lg tracking-wider">
                    {quotes[currentSlide].author} &lt;&lt;&lt;
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none"></div>
                <img
                  src={quotes[currentSlide].image}
                  alt={quotes[currentSlide].alt}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-6 mt-12">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all duration-300 group"
          aria-label="Previous quote"
        >
          <ChevronLeft className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
        </button>

        <div className="flex gap-3">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-blue-400'
                  : 'w-2 bg-blue-400/30 hover:bg-blue-400/50'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all duration-300 group"
          aria-label="Next quote"
        >
          <ChevronRight className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
        </button>
      </div>
    </div>
  );
}

function AnalysisSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    {
      icon: TrendingUp,
      label: t.landing.stockAnalysis.pastPerformance,
      title: t.landing.stockAnalysis.qxRatingTitle,
      description: t.landing.stockAnalysis.qxRatingDesc,
      image: '/media/image.png'
    },
    {
      icon: Trophy,
      label: t.landing.stockAnalysis.qxSmartMoneyTitle,
      title: t.landing.stockAnalysis.qxSmartMoneyTitle,
      description: t.landing.stockAnalysis.qxSmartMoneyDesc,
      image: '/media/image copy copy copy copy copy copy copy copy copy.png'
    },
    {
      icon: Activity,
      label: t.landing.stockAnalysis.qxValueTitle,
      title: t.landing.stockAnalysis.qxValueTitle,
      description: t.landing.stockAnalysis.qxValueDesc,
      image: '/media/image copy copy.png'
    },
  ];

  return (
    <div className="space-y-12">
      {/* Dynamic Title and Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {tabs[activeTab].title}
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {tabs[activeTab].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto"
      >
        {/* Left Sidebar - Analysis Categories */}
        <div className="lg:col-span-3 space-y-2">
          {tabs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === index
                  ? 'bg-gradient-to-r from-[#A855F7]/20 to-[#3B82F6]/20 border border-[#A855F7]/30'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === index ? 'text-[#A855F7]' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${activeTab === index ? 'text-white' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Right Content - Analysis Detailed Views */}
        <div className="lg:col-span-9 flex justify-center items-center">
          <AnimatePresence mode="wait">
            {activeTab === 0 ? (
              // Comprehensive QX Rating View
              <motion.div
                key="qx-rating-detailed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl bg-gradient-to-br from-[#1e3a8a]/30 to-[#312e81]/30 rounded-xl border border-white/10 p-3 md:p-4 space-y-2"
              >
                {/* Metrics Grid */}
                <div className="space-y-1.5">
                  {/* Forecast */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[10px] font-semibold text-white">Forecast</h4>
                      <span className="text-[9px] text-green-400 font-semibold">Strong Buy</span>
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  {/* Smart Money */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-[10px] font-semibold text-white">Smart Money</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                          <span className="text-[9px] text-red-400">↓</span>
                        </div>
                        <span className="text-[9px] text-gray-300">48%</span>
                      </div>
                      <div className="flex-1 mx-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: '51.72%' }}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-300">52%</span>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <span className="text-[9px] text-green-400">↑</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fair Value */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-[10px] font-semibold text-white">Fair Value</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/50">
                        <span className="text-[9px] font-semibold text-purple-300">Fair</span>
                      </div>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-green-500" style={{ width: '60%' }}></div>
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-green-500/20 border border-green-500/50">
                        <span className="text-[9px] font-semibold text-green-300">Under</span>
                      </div>
                    </div>
                  </div>

                  {/* Community Sentiments */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-[10px] font-semibold text-white">Community Sentiments</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                          <span className="text-[9px] text-red-400">↓</span>
                        </div>
                        <span className="text-[9px] text-gray-300">48%</span>
                      </div>
                      <div className="flex-1 mx-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: '51.72%' }}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-300">52%</span>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <span className="text-[9px] text-green-400">↑</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fear & Greed Index */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-[10px] font-semibold text-white">Fear & Greed Index</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-red-400 font-semibold">Fear</span>
                      <div className="flex-1 mx-1.5 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style={{ width: '50%' }}></div>
                      </div>
                      <span className="text-[9px] text-gray-300 font-semibold">Neutral</span>
                      <div className="flex-1 mx-1.5 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-green-500" style={{ width: '50%' }}></div>
                      </div>
                      <span className="text-[9px] text-green-400 font-semibold">Greed</span>
                    </div>
                  </div>

                  {/* Qx Quant */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[10px] font-semibold text-white">Qx Quant</h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <div
                              key={num}
                              className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold ${
                                num === 1 || num === 10
                                  ? 'bg-cyan-500 text-white border-2 border-cyan-300'
                                  : 'text-gray-500'
                              }`}
                            >
                              {num === 1 || num === 10 ? num : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 1 ? (
              // Comprehensive QX Smart Money View
              <motion.div
                key="qx-smart-money-detailed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl bg-gradient-to-br from-[#1e3a8a]/30 to-[#312e81]/30 rounded-xl border border-white/10 p-3 md:p-4 space-y-2"
              >
                {/* Detailed Breakdown */}
                <div className="space-y-1.5">
                  {/* Overall Smart Money Sentiment */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h4 className="text-xs font-bold text-white">Smart Money Liquidity</h4>
                        <p className="text-[9px] text-gray-400">Fund flow analysis</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-center">
                          <div className="text-xs font-bold text-red-400">25%</div>
                          <div className="text-[9px] text-gray-400">Sell</div>
                        </div>
                        <div className="text-center px-2 py-0.5 rounded bg-green-500/20 border border-green-500">
                          <div className="text-[9px] font-semibold text-green-300">Bullish</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-bold text-green-400">75%</div>
                          <div className="text-[9px] text-gray-400">Buy</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hedge Fund */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-xs font-bold text-white">Hedge Fund</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                          <span className="text-[9px] text-red-400 font-bold">↓</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold text-white">24</div>
                          <div className="text-[9px] text-gray-400">48%</div>
                        </div>
                      </div>
                      <div className="flex-1 mx-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: '51.72%' }}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div>
                          <div className="text-[10px] font-semibold text-white text-right">48</div>
                          <div className="text-[9px] text-gray-400 text-right">52%</div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <span className="text-[9px] text-green-400 font-bold">↑</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Family Office */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-xs font-bold text-white">Family Office</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                          <span className="text-[9px] text-red-400 font-bold">↓</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold text-white">3</div>
                          <div className="text-[9px] text-gray-400">48%</div>
                        </div>
                      </div>
                      <div className="flex-1 mx-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: '51.72%' }}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div>
                          <div className="text-[10px] font-semibold text-white text-right">3</div>
                          <div className="text-[9px] text-gray-400 text-right">52%</div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <span className="text-[9px] text-green-400 font-bold">↑</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insider */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-xs font-bold text-white">Insider</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                          <span className="text-[9px] text-red-400 font-bold">↓</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold text-white">1947</div>
                          <div className="text-[9px] text-gray-400">48%</div>
                        </div>
                      </div>
                      <div className="flex-1 mx-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: '51.72%' }}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div>
                          <div className="text-[10px] font-semibold text-white text-right">1900</div>
                          <div className="text-[9px] text-gray-400 text-right">52%</div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <span className="text-[9px] text-green-400 font-bold">↑</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Politicians */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-xs font-bold text-white">Politicians</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                          <span className="text-[9px] text-red-400 font-bold">↓</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold text-white">46</div>
                          <div className="text-[9px] text-gray-400">48%</div>
                        </div>
                      </div>
                      <div className="flex-1 mx-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: '51.72%' }}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div>
                          <div className="text-[10px] font-semibold text-white text-right">50</div>
                          <div className="text-[9px] text-gray-400 text-right">52%</div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <span className="text-[9px] text-green-400 font-bold">↑</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Comprehensive QX Value View
              <motion.div
                key="qx-value-detailed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl bg-gradient-to-br from-[#1e3a8a]/30 to-[#312e81]/30 rounded-xl border border-white/10 p-3 md:p-4 space-y-2"
              >
                {/* Value Analysis */}
                <div className="space-y-1.5">
                  {/* Fair Value Overview */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="mb-1">
                      <h4 className="text-xs font-bold text-white">Fair Value</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/50">
                        <span className="text-[9px] font-bold text-red-300">Over</span>
                      </div>
                      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-green-500" style={{ width: '60%' }}></div>
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/50">
                        <span className="text-[9px] font-bold text-purple-300">Fair</span>
                      </div>
                      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-green-500" style={{ width: '40%' }}></div>
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-green-500/20 border border-green-500/50">
                        <span className="text-[9px] font-bold text-green-300">Under</span>
                      </div>
                    </div>
                  </div>

                  {/* Valuation Metrics */}
                  <div className="grid md:grid-cols-2 gap-1.5">
                    {/* P/E Ratio */}
                    <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-[10px] font-semibold text-white">P/E Ratio</h5>
                        <span className="text-xs font-bold text-cyan-400">24.5</span>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: '65%' }}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Avg: 22.3</p>
                    </div>

                    {/* P/B Ratio */}
                    <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-[10px] font-semibold text-white">P/B Ratio</h5>
                        <span className="text-xs font-bold text-blue-400">3.2</span>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Avg: 2.8</p>
                    </div>

                    {/* Dividend Yield */}
                    <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-[10px] font-semibold text-white">Dividend Yield</h5>
                        <span className="text-xs font-bold text-green-400">2.8%</span>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '55%' }}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Avg: 3.2%</p>
                    </div>

                    {/* EPS Growth */}
                    <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-[10px] font-semibold text-white">EPS Growth</h5>
                        <span className="text-xs font-bold text-emerald-400">18.5%</span>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '80%' }}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Avg: 14.2%</p>
                    </div>
                  </div>

                  {/* Analyst Price Target */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <h4 className="text-xs font-bold text-white mb-1">Analyst Price Target</h4>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-center">
                        <div className="text-[9px] text-gray-400">Low</div>
                        <div className="text-xs font-bold text-red-400">$145</div>
                      </div>
                      <div className="text-center px-2 py-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-500">
                        <div className="text-[9px] text-gray-400">Current</div>
                        <div className="text-sm font-bold text-cyan-300">$178</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] text-gray-400">Avg</div>
                        <div className="text-xs font-bold text-yellow-400">$195</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] text-gray-400">High</div>
                        <div className="text-xs font-bold text-green-400">$225</div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style={{ width: '100%' }}></div>
                      <div className="absolute top-0 left-[44%] w-1 h-full bg-white shadow-lg"></div>
                    </div>
                    <div className="mt-1 text-center">
                      <span className="text-[9px] text-gray-300">
                        <span className="font-semibold text-cyan-400">15</span> analysts
                      </span>
                    </div>
                  </div>

                  {/* Value Score */}
                  <div className="bg-[#0f172a]/50 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">Overall Value Score</h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <div className="text-base font-bold text-cyan-400">7.5</div>
                          <div className="text-[9px] text-gray-400">of 10</div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <div
                              key={num}
                              className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${
                                num <= 7
                                  ? 'bg-cyan-500 text-white'
                                  : num === 8
                                  ? 'bg-cyan-500/50 text-white'
                                  : 'bg-gray-700 text-gray-500'
                              }`}
                            >
                              {num <= 8 ? num : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export function QuantrockLanding() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [insiderSlide, setInsiderSlide] = useState(0);
  const [showHeroAnimation, setShowHeroAnimation] = useState(true);
  const { scrollY } = useScroll();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const phoneImages = [
    '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM.jpeg',
    '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM (1).jpeg',
    '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM (2).jpeg',
    '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM (3).jpeg',
  ];

  const insiderImages = [
    '/media/ChatGPT Image Oct 15, 2025, 10_01_04 PM.png',
    '/media/ChatGPT Image Oct 15, 2025, 09_47_03 PM.png',
    '/media/ChatGPT Image Oct 15, 2025, 09_44_28 PM.png',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % phoneImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + phoneImages.length) % phoneImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextInsiderSlide = () => {
    setInsiderSlide((prev) => (prev + 1) % insiderImages.length);
  };

  const prevInsiderSlide = () => {
    setInsiderSlide((prev) => (prev - 1 + insiderImages.length) % insiderImages.length);
  };

  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutRef = useRef(null);

  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });
  const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const interval = setInterval(nextInsiderSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: t.landing.features.aiInsights,
      description: t.landing.features.aiInsightsDesc,
    },
    {
      icon: TrendingUp,
      title: t.landing.features.realTimeData,
      description: t.landing.features.realTimeDataDesc,
    },
    {
      icon: Wallet,
      title: t.landing.features.smartMoney,
      description: t.landing.features.smartMoneyDesc,
    },
    {
      icon: FileText,
      title: t.landing.features.research,
      description: t.landing.features.researchDesc,
    },
  ];

  const steps = [
    {
      icon: Download,
      title: t.landing.howItWorks.step1,
      description: t.landing.howItWorks.step1Desc,
    },
    {
      icon: UserCheck,
      title: t.landing.howItWorks.step2,
      description: t.landing.howItWorks.step2Desc,
    },
    {
      icon: Rocket,
      title: t.landing.howItWorks.step3,
      description: t.landing.howItWorks.step3Desc,
    },
  ];

  const testimonials = [
    {
      quote: t.landing.testimonials.quote1,
      author: t.landing.testimonials.author1,
      role: t.landing.testimonials.role1,
      avatar: '/media/avatar1.jpg',
    },
    {
      quote: t.landing.testimonials.quote2,
      author: t.landing.testimonials.author2,
      role: t.landing.testimonials.role2,
      avatar: '/media/avatar2.jpg',
    },
    {
      quote: t.landing.testimonials.quote3,
      author: t.landing.testimonials.author3,
      role: t.landing.testimonials.role3,
      avatar: '/media/avatar3.jpg',
    },
  ];

  const [activeWebinarTab, setActiveWebinarTab] = useState<'previous' | 'current' | 'upcoming'>('previous');

  const allGalleryItems = [
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-09-10 at 8.15.34 PM.jpeg.png', alt: 'Quantrock in Action', category: 'previous' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-10-07 at 2.24.58 PM.jpeg', alt: 'Previous Webinar 2', category: 'previous' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM.jpeg', alt: 'Previous Webinar 3', category: 'previous' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-09-10 at 8.15.34 PM.jpeg.png', alt: 'Current Webinar 1', category: 'current' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-10-07 at 2.24.58 PM.jpeg', alt: 'Current Webinar 2', category: 'current' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM.jpeg', alt: 'Current Webinar 3', category: 'current' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-09-10 at 8.15.34 PM.jpeg.png', alt: 'Upcoming Webinar 1', category: 'upcoming' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-10-07 at 2.24.58 PM.jpeg', alt: 'Upcoming Webinar 2', category: 'upcoming' },
    { type: 'image' as const, src: '/media/WhatsApp Image 2025-10-09 at 4.22.08 PM.jpeg', alt: 'Upcoming Webinar 3', category: 'upcoming' },
  ];

  const galleryItems = allGalleryItems.filter(item => item.category === activeWebinarTab);

  const logoCategories = [
    {
      name: 'Hedge Funds',
      items: [
        { name: 'Warren Buffett', placeholder: '/media/Warren Buffett.jpg', aum: '$285B', stocks: '44 Stocks' },
        { name: 'Bill Ackman', placeholder: '/media/Bill Ackman.png', aum: '$11B', stocks: '11 Stocks' },
        { name: 'Bill Nygren', placeholder: '/media/Bill Nygren.jpg', aum: '$23.5B', stocks: '65 Stocks' },
        { name: 'Catherine Wood', placeholder: '/media/Catherine Wood.jpg', aum: '$11.9B', stocks: '233 Stocks' },
        { name: 'Dodge & Cox', placeholder: '/media/Dodge & Cox.jpg', aum: '$178B', stocks: '207 Stocks' },
        { name: 'Jean M. Hynes', placeholder: '/media/Jean M. Hynes.png', aum: '$37.9B', stocks: '87 Stocks' },
        { name: 'Jean Marie Eveillard', placeholder: '/media/Jean Marie Eveillard.jpg', aum: '$47.3B', stocks: '444 Stocks' },
        { name: 'Jim Simons', placeholder: '/media/Jim Simons.jpg', aum: '$24.4B', stocks: '1436 Stocks' },
        { name: 'Ken Fisher', placeholder: '/media/Ken Fisher.jpg', aum: '$228B', stocks: '1110 Stocks' },
        { name: 'Mairs And Power', placeholder: '/media/Mairs And Power.jpg', aum: '$11.3B', stocks: '244 Stocks' },
        { name: 'Philippe Laffont', placeholder: '/media/Philippe Laffont.jpg', aum: '$25.5B', stocks: '125 Stocks' },
        { name: 'Steve Mandel', placeholder: '/media/Steve Mandel.jpg', aum: '$15.2B', stocks: '33 Stocks' },
        { name: 'Steven Cohen', placeholder: '/media/Steven Cohen.jpg', aum: '$27.2B', stocks: '1886 Stocks' },
        { name: 'Tom Gayner', placeholder: '/media/Tom Gayner.jpg', aum: '$10.8B', stocks: '142 Stocks' },
      ]
    },
    {
      name: 'Family Office',
      items: [
        { name: 'Bill Gates', placeholder: '/media/Bill Gates.jpg', aum: '$48.4B', stocks: '69 Stocks' },
        { name: 'George Soros', placeholder: '/media/George Soros.jpg', aum: '$3.51B', stocks: '240 Stocks' },
        { name: 'Michael Burry', placeholder: '/media/Michael Burry.jpg', aum: '$58.6M', stocks: '35 Stocks' },
        { name: 'Stanley Druckenmiller', placeholder: '/media/Stanley Druckenmiller.jpg', aum: '$3.32B', stocks: '117 Stocks' },
      ]
    },
    {
      name: 'Congress',
      items: [
        { name: 'Nancy Pelosi', placeholder: '/media/Nancy Pelosi.jpg', aum: '$27.1M', stocks: '38 Trades' },
        { name: 'Suzan Delbene', placeholder: '/media/Suzan Delbene.jpg', aum: '$49.9M', stocks: '10 Trades' },
        { name: 'Michael Mccaul', placeholder: '/media/Michael Mccaul.jpg', aum: '$6.4M', stocks: '91 Trades' },
        { name: 'Mark Green', placeholder: '/media/Mark Green.jpg', aum: '$3.1M', stocks: '22 Trades' },
        { name: 'Richard Blumenthal', placeholder: '/media/Richard Blumenthal.jpg', aum: '$2.6M', stocks: '10 Trades' },
        { name: 'Tommy Tuberville', placeholder: '/media/Tommy Tuberville.jpg', aum: '$2.34M', stocks: '79 Trades' },
        { name: 'Pete Ricketts', placeholder: '/media/Pete Ricketts.jpg', aum: '$1.1M', stocks: '10 Trades' },
        { name: 'Scott Franklin', placeholder: '/media/Scott Franklin.jpg', aum: '$1.6M', stocks: '25 Trades' },
        { name: 'Shri Thanedar', placeholder: '/media/Shri Thanedar.jpg', aum: '$1.14M', stocks: '21 Trades' },
        { name: 'Ro Khanna', placeholder: '/media/Ro Khanna.jpg', aum: '$2M', stocks: '80 Trades' },
      ]
    },
    {
      name: 'Insiders',
      items: [
        { name: 'Elon Musk', placeholder: '/media/ELON MUSK.jpg', aum: '$103B', stocks: 'CEO - TSLA' },
        { name: 'Lilly Endowment', placeholder: '/media/Picture1.jpg', aum: '$89.5B', stocks: 'Owner - LLY' },
        { name: 'Marc Benioff', placeholder: '/media/Marc Benioff.jpg', aum: '$5.65B', stocks: 'CEO - CRM' },
        { name: 'Timothy D Cook', placeholder: '/media/Timothy D Cook.png', aum: '$731M', stocks: 'CEO - AAPL' },
        { name: 'Sundar Pichai', placeholder: '/media/Sundar Pichai.png', aum: '$530.6M', stocks: 'CEO - GOOGL' },
        { name: 'Mark Zuckerberg', placeholder: '/media/Mark Zuckerberg.jpg', aum: '$368M', stocks: 'CEO - META' },
        { name: 'Satya Nadella', placeholder: '/media/Satya Nadella.jpg', aum: '$355.8M', stocks: 'CEO - MSFT' },
        { name: 'Marianne Lake', placeholder: '/media/Marianne Lake.png', aum: '$52M', stocks: 'CEO - JPM' },
        { name: 'Jeffrey Bezos', placeholder: '/media/Jeffrey Bezos.jpg', aum: '$178B', stocks: 'CEO - AMZN' },
        { name: 'Jen Hsun Huang', placeholder: '/media/Jen Hsun Huang.jpg', aum: '$101B', stocks: 'CEO - NVDA' },
      ]
    }
  ];

  return (
    <PageLayout>
    <div className="bg-[#0A0F1C] text-white overflow-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Logo Animation Background - plays once then fades */}
        <AnimatePresence>
          {showHeroAnimation && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-20 bg-[#0A0F1C] flex items-center justify-center"
            >
              {/* Animated Background Grid */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }} />
              </motion.div>

              {/* Circular Ripples */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-[#A855F7]"
                  style={{
                    width: 100,
                    height: 100,
                    left: '50%',
                    top: '50%',
                    marginLeft: -50,
                    marginTop: -50,
                  }}
                  animate={{
                    scale: [1, 5, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: 0,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                />
              ))}

              {/* Logo */}
              <motion.div
                className="relative z-10"
                initial={{
                  y: -100,
                  opacity: 0,
                  rotateX: -90,
                  scale: 0.5,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
              >
                <motion.img
                  src="/media/logo_png-2.png"
                  alt="Quantrock Logo"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
                      'drop-shadow(0 0 50px rgba(168, 85, 247, 0.9))',
                      'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: 0,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Glowing orb effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#A855F7] to-[#3B82F6] blur-3xl -z-10"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: 0,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/media/v.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 via-[#0A0F1C]/60 to-[#0A0F1C]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.2, type: "spring", stiffness: 100 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {t.landing.hero.title}{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#3B82F6]"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  {t.landing.hero.titleHighlight}
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.6 }}
                className="text-xl md:text-2xl text-gray-300"
              >
                {t.landing.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 3.9 }}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                <motion.a
                  href="/app"
                  className="group relative bg-gradient-to-r from-[#A855F7] to-[#3B82F6] hover:from-[#C084FC] hover:to-[#60A5FA] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  {t.landing.hero.downloadApp}
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 4.2 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="https://apps.apple.com/us/app/quantrock-invest-wisely/id6742403675"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border border-white/20"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone className="w-5 h-5" />
                  {t.landing.hero.appStore}
                </motion.a>
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.quntriex.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border border-white/20"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone className="w-5 h-5" />
                  {t.landing.hero.googlePlay}
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column - Video Display */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 3.4, type: "spring", stiffness: 80 }}
              className="relative flex justify-center lg:justify-end mt-8"
            >
              <div className="relative max-w-xs w-full">
                {/* Gradient Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#3B82F6] opacity-20 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Floating Animation Container with Video */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  {/* Video Container */}
                  <div className="relative w-[320px] h-[665px] overflow-hidden rounded-3xl bg-black shadow-2xl">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="/media/v.mp4" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </header>

      {/* Social Proof Marquee */}
      <section className="py-12 border-y border-white/10 bg-black/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 mb-6"
        >
          <p className="text-center text-gray-400 text-sm uppercase tracking-wider">
            {t.landing.marquee.title}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Marquee categories={logoCategories} speed={30} />
        </motion.div>
      </section>

      {/* Key Features */}
      <section id="features" ref={featuresRef} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.landing.features.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.landing.features.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                transition={{ duration: 0.6 }}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="mb-6 inline-block p-4 bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quantrock Global Investment Championship */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#1a1545] to-[#0A0F1C]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-3"
              >
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-semibold">Quantrock Global Investment Championship</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-300 mb-3 leading-relaxed"
              >
                A comprehensive program designed to refine investors' skills and enable them to experience an investment journey within a professional trading environment that simulates the actual markets 100% using a hedge-fund style approach, all with zero financial risk.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <a
                  href="#stages"
                  className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium border border-cyan-400/30 text-center"
                >
                  {t.landing.challenge.howItWorks}
                </a>
                <a
                  href="/app"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 text-center"
                >
                  {t.landing.challenge.startChallenge}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-1"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-gradient-to-br from-[#1a1f4d]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">$100,000</div>
                  <div className="text-sm text-gray-400">simulated portfolio</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-gradient-to-br from-[#1a1f4d]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">Monthly</div>
                  <div className="text-sm text-gray-400">Winner</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-2 flex items-center justify-center lg:justify-end mt-12"
            >
              <div className="relative w-full max-w-full lg:max-w-6xl rounded-3xl shadow-2xl shadow-purple-500/30 border border-purple-500/30 overflow-hidden">
                <img
                  src="/media/nanobana-generated-image (1) (1).png"
                  alt="Quantrock Championship"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Master the Markets - 28-Day Skill Challenge */}
      {/* <section className="w-full bg-gradient-to-b from-[#0a0e27] to-[#1a1f4d] flex justify-center py-10">
        <div className="w-[85%] mx-auto px-0">
          <div className="grid lg:grid-cols-[65%_35%] gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col text-center md:text-start items-start justify-center gap-4 md:gap-5 m-0 p-0"
            >
              <div className="flex w-fit h-fit justify-center items-center gap-2 rounded-full border border-amber-400 px-3 py-2 bg-amber-500/10">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 text-xs italic font-bold">EXCLUSIVE</span>
              </div>

              <div className="w-full font-bold text-4xl md:text-5xl leading-tight">
                <span className="text-white whitespace-nowrap">Master the Markets</span>
                <span className="text-white"> - </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">28-Day Skill Challenge</span>
              </div>

              <div className="flex flex-col gap-4 md:gap-5 w-full">
                <div className="text-white text-xl leading-relaxed font-bold w-full">
                  Designed to help you pass the challenge and trade like a professional investor.
                </div>
                <div className="text-white text-lg leading-relaxed w-full">
                  Get access to 500+ interactive lessons and exercises covering technical analysis, risk management, portfolio optimization, and professional trading psychology. Learn to recognize market trends, identify high-probability setups, and develop the disciplined mindset required for consistent success.
                </div>
                <div className="text-white text-lg leading-relaxed opacity-70 w-full">
                  Available only for challenge participants.
                </div>
              </div>

              <a
                href="/app"
                className="inline-flex gap-2 whitespace-nowrap text-sm md:mt-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white justify-center items-center text-center font-bold rounded shadow px-6 py-3 w-full md:w-[228px] hover:from-amber-600 hover:to-yellow-600 transition-all duration-300"
              >
                Claim Your Spot
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <img
                src="https://challenge.quantrock.com/ChatGPT%20Image%20Nov%2024,%202025,%2010_14_07%20AM.png"
                alt="Master the Markets Challenge"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* QIQT - Quantrock Investor Qualification Test - HIDDEN */}
      {false && <section className="w-full bg-gradient-to-b from-[#1a1f4d] to-[#0a0e27] flex justify-center py-16">
        <div className="w-[85%] mx-auto px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col text-center md:text-start items-start justify-center gap-5"
            >
              <div className="flex w-fit h-fit justify-center items-center gap-2 rounded-full border border-amber-400 px-3 py-2 bg-amber-500/10">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 text-xs font-bold">QIQT</span>
              </div>

              <div className="w-full font-bold text-3xl md:text-4xl leading-tight">
                <span className="text-white">Quantrock Investor Qualification Test </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">(QIQT)</span>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="text-white text-lg leading-relaxed">
                  QIQT is an intelligent qualification test built on <span className="font-bold text-amber-400">OECD, MIT, and CFA standards</span>, designed to measure your investment experience, financial literacy, motivations, and readiness to learn.
                </div>
                <div className="text-gray-300 text-base leading-relaxed">
                  QIQT helps you assess your financial knowledge, investment background, and determine your ideal path inside Quantrock—whether in challenges, daily lessons, or selecting the appropriate demo portfolio size.
                </div>
              </div>

              <div className="w-full mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-bold text-lg">What is the purpose of QIQT?</span>
                </div>
                <p className="text-gray-300 text-base mb-4">
                  The test aims to accurately classify the user into one of the following levels: <span className="text-amber-400 font-semibold">Beginner / Intermediate / Advanced</span>
                </p>
                <p className="text-gray-400 text-sm mb-3">It works on identifying:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Investment objectives',
                    'Investment experience',
                    'Financial knowledge and literacy',
                    'Readiness and willingness to learn',
                    'Appropriate challenge level',
                    'Simulated portfolio size',
                    'Best learning path',
                    'Motivation for using Quantrock'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/app"
                className="inline-flex gap-2 whitespace-nowrap text-sm md:mt-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white justify-center items-center text-center font-bold rounded shadow px-6 py-3 w-full md:w-[228px] hover:from-amber-600 hover:to-yellow-600 transition-all duration-300"
              >
                Take the Test
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-[#1a1f4d]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/20">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                      <Star className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">Your Level</div>
                    <div className="flex gap-3">
                      <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium">Beginner</div>
                      <div className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium">Intermediate</div>
                      <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium">Advanced</div>
                    </div>
                    <div className="text-gray-400 text-sm">Discover your investment level</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>}

      {/* Investment Legends Quotes Slider */}
      <section className="relative py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <InvestmentQuotesSlider />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={howItWorksRef} className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={howItWorksInView ? 'visible' : 'hidden'}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.landing.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.landing.howItWorks.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={howItWorksInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                transition={{ duration: 0.6 }}
                className="relative text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-40 rounded-full" />
                  <div className="relative bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] p-8 rounded-full">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-[#A855F7] to-[#3B82F6] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%]">
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={howItWorksInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                    >
                      <svg
                        className="w-full h-8"
                        viewBox="0 0 100 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.path
                          d="M 0 10 Q 50 0, 100 10"
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          fill="none"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investor Loss Statistics */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black to-[#0A0F1C]">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {t.landing.lossStatistics.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#EF4444]">
                {t.landing.lossStatistics.titleHighlight}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.landing.lossStatistics.description}
            </p>
          </motion.div>

          <LossStatisticsSlider />
        </div>
      </section>

      {/* Smart Money Tracker Features */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#0A0F1C] to-black">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Quantrock{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#3B82F6]">
                {t.landing.smartMoneyTracker.title}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.landing.smartMoneyTracker.description}
            </p>
          </motion.div>

          {/* Bento Grid Layout - 4 cards per row */}
          <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto relative">
            {/* Blue Gradient Glow Effect - Positioned behind cards */}
            <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/40 via-blue-500/30 to-transparent rounded-full blur-[120px] pointer-events-none" />

            {/* Track Positions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <div className="relative bg-black rounded-2xl p-5 h-full overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white text-lg font-bold mb-1">{t.landing.smartMoneyTracker.trackPositions}</h3>
                  <p className="text-gray-400 text-xs mb-4">{t.landing.smartMoneyTracker.trackPositionsDesc}</p>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-gray-300 text-xs">{t.landing.smartMoneyTracker.activeTrades}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 opacity-70">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      <span className="text-gray-400 text-xs">{t.landing.smartMoneyTracker.assessment}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plan Strategies Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <div className="relative bg-[#2A2A2E] rounded-2xl p-5 h-full overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white text-lg font-bold mb-1">{t.landing.smartMoneyTracker.planStrategies}</h3>
                  <p className="text-gray-400 text-xs mb-4">{t.landing.smartMoneyTracker.planStrategiesDesc}</p>

                  <div className="bg-black/40 rounded-lg p-3 mt-4">
                    <div className="text-gray-400 text-[10px] mb-1">{t.landing.smartMoneyTracker.nextReview}</div>
                    <div className="text-white text-sm font-medium mb-2">{t.landing.smartMoneyTracker.techAnalysis}</div>
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 border-2 border-[#2A2A2E]" />
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-[#2A2A2E]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Real-time Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <div className="relative bg-black rounded-2xl p-5 h-full overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white text-lg font-bold mb-1">{t.landing.smartMoneyTracker.realTimeAlerts}</h3>
                  <p className="text-gray-400 text-xs mb-4">{t.landing.smartMoneyTracker.realTimeAlertsDesc}</p>

                  <div className="space-y-2 mt-4">
                    <div className="bg-white/5 rounded-lg p-2">
                      <div className="flex items-start gap-1.5">
                        <span className="text-purple-400 text-[10px]">@Mark</span>
                        <span className="text-gray-400 text-[10px]">{t.landing.ui.importantDecision}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <input
                        type="text"
                        placeholder={t.landing.ui.messagePlaceholder}
                        className="bg-transparent border-none outline-none text-gray-400 text-[10px] w-full"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Date Circle Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-12 md:col-span-6 lg:col-span-3 flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1a1a1d] to-[#2a2a2e] flex flex-col items-center justify-center border-4 border-[#3a3a3e]">
                  <div className="text-2xl font-bold text-white text-center px-2">Follow</div>
                  <div className="text-gray-400 text-sm mt-1">Tracker</div>
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center">
                  <div className="text-white text-lg">+</div>
                </div>
              </div>
            </motion.div>

            {/* Monitor Performance Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-2xl p-5 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-transparent rounded-2xl" />

                <div className="relative z-10">
                  <h3 className="text-white text-lg font-bold mb-1">{t.landing.smartMoneyTracker.monitorPerformance}</h3>
                  <p className="text-gray-300 text-xs mb-4">{t.landing.smartMoneyTracker.monitorPerformanceDesc}</p>

                  <div className="flex items-center justify-center mt-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-blue-500/40 to-blue-600/20 border-2 border-blue-400/50 flex items-center justify-center">
                        <Activity className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Manage Portfolio Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <div className="relative bg-[#2A2A2E] rounded-2xl p-5 h-full overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white text-lg font-bold mb-1">Manage Portfolio.</h3>
                  <p className="text-gray-400 text-xs mb-4">Customize your workspace.</p>

                  <div className="bg-white/10 rounded-lg p-3 mt-4">
                    <div className="text-white text-sm font-medium mb-2">Marketing</div>
                    <div className="flex -space-x-1.5 mb-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-[#2A2A2E]" />
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-[#2A2A2E]" />
                    </div>
                    <div className="space-y-0.5 text-[10px] text-gray-500">
                      <div>Information</div>
                      <div>Communication</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Take Notes Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <div className="relative bg-black rounded-2xl p-5 h-full overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <PenTool className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-1">Take notes.</h3>
                  <p className="text-gray-400 text-xs mb-4">Track insights and research.</p>

                  <div className="space-y-1.5 mt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400 py-1.5 border-b border-gray-800">
                      <FileText className="w-3 h-3" />
                      <span>Text</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 py-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>To-do list</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bank Forecast Section */}
      <section className="py-24 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <AnalysisSection />
        </div>
      </section>

      {/* Trade Like a Hedge Fund Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A0F1C] to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t.landing.insiderTrading.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#3B82F6]">
                  {t.landing.insiderTrading.titleHighlight}
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                {t.landing.insiderTrading.description}
              </p>

              {/* Trending Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                <div className="text-sm text-gray-400 font-medium">{t.landing.insiderTrading.trendingNow}</div>

                {/* Trending People */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: 'Nancy Pelosi', role: 'Dem - House' },
                    { name: 'Marjorie Taylor Greene', role: 'Rep - House' },
                    { name: 'J. D. Vance', role: 'Rep - VP' },
                  ].map((person, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-2 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A855F7] to-[#3B82F6] flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-white text-[11px] font-semibold truncate">Track {person.name}</div>
                        <div className="text-gray-500 text-[9px] truncate">{person.role}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trading Categories */}
                <div className="grid grid-cols-3 gap-1 px-6">
                  {[
                    { icon: Building2, label: t.landing.insiderTrading.congressTrading, subtitle: t.landing.insiderTrading.seeDashboard },
                    { icon: UserCheck, label: t.landing.insiderTrading.insiderTradingLabel, subtitle: t.landing.insiderTrading.seeDashboard },
                    { icon: Briefcase, label: t.landing.insiderTrading.institutionalHoldings, subtitle: t.landing.insiderTrading.seeDashboard },
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-1 hover:bg-white/10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[50px]"
                    >
                      <category.icon className="w-3.5 h-3.5 text-[#A855F7] mb-0.5" />
                      <div className="text-white text-[8px] font-semibold mb-0.5 text-center leading-tight px-0.5">{category.label}</div>
                      <div className="text-gray-500 text-[6px] text-center">{category.subtitle}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stock Tickers */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { symbol: 'AVGO', company: 'Broadcom Inc', price: '345.50', change: '+2.61%', positive: true },
                    { symbol: 'UNH', company: 'Unitedhealth Grou...', price: '369.92', change: '+1.94%', positive: true },
                    { symbol: 'TEM', company: 'Tempus AI Inc - O...', price: '103.25', change: '+11.24%', positive: true },
                  ].map((stock, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-bold text-black">
                          {stock.symbol[0]}
                        </div>
                        <span className="text-white font-bold text-sm">{stock.symbol}</span>
                      </div>
                      <div className="text-gray-400 text-xs mb-2 truncate">{stock.company}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold text-sm">{stock.price}</span>
                        <span className={`text-xs font-semibold ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Image Slider */}
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={insiderSlide}
                      src={insiderImages[insiderSlide]}
                      alt={`Trading Dashboard ${insiderSlide + 1}`}
                      className="w-full h-auto"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevInsiderSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group z-20"
                  >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={nextInsiderSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group z-20"
                  >
                    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {insiderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setInsiderSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === insiderSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] rounded-2xl shadow-lg flex items-center justify-center"
                >
                  <Wallet className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute bottom-20 -left-10 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-lg"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="absolute -bottom-5 right-20 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Named the App - QUANTROCK */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.landing.appNaming.howWeNamed} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">{t.landing.appNaming.weNamed}</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400">{t.landing.appNaming.theApp}</span>
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4">
              QUANTROCK
            </h3>
          </motion.div>

          <div className="max-w-7xl mx-auto relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-yellow-400/30 -translate-y-1/2 hidden lg:block" />


            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* QUANT Box */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative rounded-3xl p-8 lg:p-12 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center overflow-hidden">
                  {/* Quantitative Finance Background Image */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <linearGradient id="quantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 0.9 }} />
                          <stop offset="50%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.9 }} />
                          <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
                        </linearGradient>
                      </defs>

                      <rect width="400" height="500" fill="url(#quantGradient)" />

                      <g opacity="0.15">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} stroke="white" strokeWidth="0.5" />
                        ))}
                        {Array.from({ length: 16 }).map((_, i) => (
                          <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="500" stroke="white" strokeWidth="0.5" />
                        ))}
                      </g>

                      <g opacity="0.3">
                        <rect x="40" y="180" width="10" height="60" fill="#10b981" />
                        <line x1="45" y1="160" x2="45" y2="240" stroke="#10b981" strokeWidth="2" />
                        <rect x="70" y="200" width="10" height="40" fill="#ef4444" />
                        <line x1="75" y1="190" x2="75" y2="240" stroke="#ef4444" strokeWidth="2" />
                        <rect x="100" y="170" width="10" height="50" fill="#10b981" />
                        <line x1="105" y1="150" x2="105" y2="220" stroke="#10b981" strokeWidth="2" />
                        <rect x="130" y="190" width="10" height="35" fill="#10b981" />
                        <line x1="135" y1="180" x2="135" y2="225" stroke="#10b981" strokeWidth="2" />
                      </g>

                      <g opacity="0.25">
                        <polyline points="220,300 240,280 260,290 280,260 300,270 320,240 340,250 360,220"
                          fill="none" stroke="#06b6d4" strokeWidth="3" />
                        <circle cx="220" cy="300" r="3" fill="#06b6d4" />
                        <circle cx="260" cy="290" r="3" fill="#06b6d4" />
                        <circle cx="300" cy="270" r="3" fill="#06b6d4" />
                        <circle cx="340" cy="250" r="3" fill="#06b6d4" />
                      </g>

                      <g opacity="0.2" fill="white" fontSize="14" fontFamily="monospace">
                        <text x="250" y="80">E(R) = Rf + β(Rm-Rf)</text>
                        <text x="30" y="350">σ² = Σ(xi-μ)²/n</text>
                        <text x="200" y="450">α = Rp - [Rf + β(Rm-Rf)]</text>
                      </g>

                      <g opacity="0.25">
                        <circle cx="80" cy="120" r="2" fill="white" />
                        <circle cx="150" cy="140" r="2" fill="white" />
                        <circle cx="220" cy="100" r="2" fill="white" />
                        <circle cx="290" cy="130" r="2" fill="white" />
                        <circle cx="340" cy="110" r="2" fill="white" />
                      </g>

                      <g opacity="0.2">
                        <rect x="40" y="400" width="25" height="60" fill="#8b5cf6" />
                        <rect x="70" y="380" width="25" height="80" fill="#8b5cf6" />
                        <rect x="100" y="390" width="25" height="70" fill="#8b5cf6" />
                        <rect x="130" y="370" width="25" height="90" fill="#8b5cf6" />
                      </g>
                    </svg>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

                  <h3 className="text-5xl lg:text-6xl font-bold text-white mb-8 relative z-10">
                    {t.landing.appNaming.quant}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-100 leading-relaxed relative z-10">
                    {t.landing.appNaming.quantDesc}
                  </p>
                </div>
              </motion.div>

              {/* Center Plus Icon - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-center lg:hidden"
              >
                <div className="relative flex items-center justify-center">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-30 blur-2xl scale-125" />

                  {/* Isometric Logo Image */}
                  <img
                    src="/media/image copy copy copy copy copy copy copy copy.png"
                    alt="Quantrock Logo"
                    className="relative w-32 h-32 object-contain drop-shadow-xl"
                  />

                  {/* Plus Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-10 h-10 text-cyan-300 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Center Isometric Plus Icon - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative hidden lg:flex items-center justify-center"
              >
                <div className="relative flex items-center justify-center">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-30 blur-3xl scale-150" />

                  {/* Isometric Logo Image */}
                  <img
                    src="/media/image copy copy copy copy copy copy copy copy.png"
                    alt="Quantrock Logo"
                    className="relative w-56 h-56 object-contain drop-shadow-2xl"
                  />

                  {/* Plus Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 text-cyan-300 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* ROCK Box */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative rounded-3xl p-8 lg:p-12 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center overflow-hidden">
                  {/* Rock & Rock Music Background Image */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <linearGradient id="rockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 0.9 }} />
                          <stop offset="50%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.9 }} />
                          <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
                        </linearGradient>
                        <linearGradient id="rockTexture" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#78716c', stopOpacity: 0.3 }} />
                          <stop offset="50%" style={{ stopColor: '#57534e', stopOpacity: 0.3 }} />
                          <stop offset="100%" style={{ stopColor: '#44403c', stopOpacity: 0.3 }} />
                        </linearGradient>
                      </defs>

                      <rect width="400" height="500" fill="url(#rockGradient)" />

                      {/* Rock/Stone Texture Pattern */}
                      <g opacity="0.2">
                        <ellipse cx="50" cy="80" rx="45" ry="35" fill="url(#rockTexture)" />
                        <ellipse cx="180" cy="60" rx="55" ry="40" fill="url(#rockTexture)" />
                        <ellipse cx="330" cy="100" rx="50" ry="38" fill="url(#rockTexture)" />
                        <ellipse cx="100" cy="180" rx="40" ry="32" fill="url(#rockTexture)" />
                        <ellipse cx="300" cy="200" rx="48" ry="36" fill="url(#rockTexture)" />
                        <ellipse cx="70" cy="320" rx="42" ry="34" fill="url(#rockTexture)" />
                        <ellipse cx="250" cy="350" rx="52" ry="40" fill="url(#rockTexture)" />
                        <ellipse cx="150" cy="430" rx="46" ry="35" fill="url(#rockTexture)" />
                        <ellipse cx="340" cy="450" rx="44" ry="33" fill="url(#rockTexture)" />
                      </g>

                      {/* Guitar */}
                      <g opacity="0.25" stroke="#fbbf24" strokeWidth="3" fill="none">
                        <ellipse cx="80" cy="380" rx="25" ry="35" />
                        <rect x="77" y="280" width="6" height="100" fill="#fbbf24" />
                        <line x1="77" y1="285" x2="77" y2="315" strokeWidth="1" stroke="#fff" />
                        <line x1="79" y1="285" x2="79" y2="315" strokeWidth="1" stroke="#fff" />
                        <line x1="81" y1="285" x2="81" y2="315" strokeWidth="1" stroke="#fff" />
                        <line x1="83" y1="285" x2="83" y2="315" strokeWidth="1" stroke="#fff" />
                      </g>

                      {/* Musical Notes */}
                      <g opacity="0.3" fill="#fbbf24">
                        <ellipse cx="280" cy="120" rx="8" ry="6" transform="rotate(-20 280 120)" />
                        <rect x="286" y="95" width="3" height="25" transform="rotate(-20 287 107)" />
                        <ellipse cx="320" cy="140" rx="8" ry="6" transform="rotate(-20 320 140)" />
                        <rect x="326" y="115" width="3" height="25" transform="rotate(-20 327 127)" />

                        <ellipse cx="180" cy="250" rx="7" ry="5" transform="rotate(15 180 250)" />
                        <rect x="184" y="230" width="3" height="20" transform="rotate(15 185 240)" />

                        <ellipse cx="330" cy="320" rx="8" ry="6" transform="rotate(-15 330 320)" />
                        <rect x="336" y="295" width="3" height="25" transform="rotate(-15 337 307)" />
                      </g>

                      {/* Lightning Bolts */}
                      <g opacity="0.25" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
                        <polygon points="220,80 210,120 225,120 215,160 240,115 225,115 235,80" />
                        <polygon points="130,240 122,270 135,270 127,300 148,265 135,265 143,240" />
                      </g>

                      {/* Rock Hand Gesture */}
                      <g opacity="0.3" stroke="#fbbf24" strokeWidth="4" fill="none" strokeLinecap="round">
                        <path d="M 300 420 L 300 450" />
                        <path d="M 310 420 L 310 440" />
                        <path d="M 320 420 L 320 440" />
                        <path d="M 330 420 L 330 450" />
                        <path d="M 295 445 Q 315 455 335 445" />
                      </g>

                      {/* Amplifier */}
                      <g opacity="0.2">
                        <rect x="240" y="400" width="60" height="80" fill="#1f2937" stroke="#fbbf24" strokeWidth="2" />
                        <circle cx="255" cy="430" r="8" fill="#374151" />
                        <circle cx="280" cy="430" r="8" fill="#374151" />
                        <line x1="245" y1="450" x2="265" y2="450" stroke="#fbbf24" strokeWidth="2" />
                        <line x1="245" y1="460" x2="285" y2="460" stroke="#fbbf24" strokeWidth="2" />
                      </g>

                      {/* Cracked Rock Lines */}
                      <g opacity="0.15" stroke="#44403c" strokeWidth="2">
                        <path d="M 0 200 Q 100 210 200 200 T 400 210" fill="none" />
                        <path d="M 0 350 Q 120 340 240 350 T 400 345" fill="none" />
                        <path d="M 100 0 L 120 100 L 140 80 L 160 150" fill="none" />
                        <path d="M 300 50 L 280 120 L 300 180 L 320 200" fill="none" />
                      </g>
                    </svg>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

                  <h3 className="text-5xl lg:text-6xl font-bold text-white mb-8 relative z-10">
                    {t.landing.appNaming.rock}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-100 leading-relaxed relative z-10">
                    {t.landing.appNaming.rockDesc}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.landing.gallery.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              {t.landing.gallery.subtitle}
            </p>

            {/* Webinar Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveWebinarTab('previous')}
                className={`group relative px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeWebinarTab === 'previous'
                    ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-2 border-purple-500/70'
                    : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-500/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300" />
                <span className="relative text-white font-semibold">Previous Webinars</span>
              </button>
              <button
                onClick={() => setActiveWebinarTab('current')}
                className={`group relative px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeWebinarTab === 'current'
                    ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-2 border-purple-500/70'
                    : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-500/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300" />
                <span className="relative text-white font-semibold">Current Webinars</span>
              </button>
              <button
                onClick={() => setActiveWebinarTab('upcoming')}
                className={`group relative px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeWebinarTab === 'upcoming'
                    ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-2 border-purple-500/70'
                    : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-500/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300" />
                <span className="relative text-white font-semibold">Upcoming Webinars</span>
              </button>
            </div>
          </motion.div>

          <Gallery items={galleryItems} />
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.landing.testimonials.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.landing.testimonials.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10, rotateY: 5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
              >
                <div className="text-purple-400 text-6xl mb-4">"</div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A855F7] via-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-white font-bold shadow-lg">
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Quantrock */}
      <section id="about" ref={aboutRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate={aboutInView ? 'visible' : 'hidden'}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              {t.landing.about.title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t.landing.about.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="download" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.landing.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t.landing.cta.subtitle}
            </p>

            <motion.a
              href="/app"
              className="inline-block relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#3B82F6] opacity-75 blur-xl group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-[#A855F7] to-[#3B82F6] hover:from-[#C084FC] hover:to-[#60A5FA] text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-2xl">
                {t.landing.cta.download}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.span>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 justify-center mt-8"
            >
              <motion.a
                href="https://apps.apple.com/us/app/quantrock-invest-wisely/id6742403675"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-white/20 hover:border-white/40"
              >
                <Smartphone className="w-6 h-6" />
                {t.landing.hero.appStore}
              </motion.a>
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.quntriex.finance"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-white/20 hover:border-white/40"
              >
                <Smartphone className="w-6 h-6" />
                {t.landing.hero.googlePlay}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
    </PageLayout>
  );
}

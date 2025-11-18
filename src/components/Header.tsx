import { Menu, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { useTranslation } from '../translations';

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [langOpen, setLangOpen] = useState<boolean>(false);
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);

  return (
    <nav className="fixed top-0 w-full bg-[#0A0F1C]/95 backdrop-blur-md z-50 border-b border-purple-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/media/logo_png-2.png" alt="Quantrock" className="h-10" />
          </a>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-gray-300 hover:text-white transition-colors font-medium">{t.nav.features.toUpperCase()}</a>
          <a href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">{t.nav.howItWorks.toUpperCase()}</a>
          <a href="/#gallery" className="text-gray-300 hover:text-white transition-colors font-medium">{t.nav.gallery.toUpperCase()}</a>
          <a href="/#about" className="text-gray-300 hover:text-white transition-colors font-medium">{t.nav.about.toUpperCase()}</a>
          {/* <a href="/challenge" className="text-gray-300 hover:text-white transition-colors font-medium">{t.nav.challenge.toUpperCase()}</a> */}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-purple-500/30 hover:bg-purple-600/20 transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-2xl">{languages.find(l => l.code === language)?.flag}</span>
              <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden z-50 max-h-96 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0 ${
                      language === lang.code ? 'bg-purple-600/20 text-purple-300' : 'text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href="https://quantrock.app.link/X6mJ3n3GGVb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#A855F7] to-[#3B82F6] hover:from-[#C084FC] hover:to-[#60A5FA] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            {t.nav.downloadApp}
          </a>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 hover:bg-purple-600/20 transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
              <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden z-50 max-h-96 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0 ${
                      language === lang.code ? 'bg-purple-600/20 text-purple-300' : 'text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg blur-md"></div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative bg-black/60 backdrop-blur-xl rounded-lg p-3 border border-purple-500/30 hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 flex items-center gap-2"
            >
              <Menu className="w-6 h-6 text-purple-400" />
              <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden z-50">
                <a
                  href="/"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.home}
                </a>
                <a
                  href="/#features"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.features}
                </a>
                <a
                  href="/#how-it-works"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.howItWorks}
                </a>
                <a
                  href="/#gallery"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.gallery}
                </a>
                <a
                  href="/#about"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.about}
                </a>
                {/* <a
                  href="/challenge"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.challenge}
                </a> */}
                <a
                  href="/ambassador"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.ambassador}
                </a>
                <a
                  href="/affiliate"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 border-b border-purple-500/10 last:border-b-0"
                >
                  {t.nav.affiliate}
                </a>
                <a
                  href="https://quantrock.app.link/X6mJ3n3GGVb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-purple-400 font-semibold hover:text-purple-300 hover:bg-purple-600/20 transition-all duration-300"
                >
                  {t.nav.downloadApp}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

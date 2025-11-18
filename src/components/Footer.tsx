import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../translations';

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="w-full bg-[#0A0F1C] px-4 py-12">
      <div className="relative container mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-lg"></div>
              <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
                <img src="/media/logo_png-2.png" alt="QUANTROCK" className="h-12 w-auto" />
              </div>
            </div>
          </div>
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <li><a href="/affiliate" className="text-gray-300 hover:text-white transition-colors duration-300">{t.footer.affiliate}</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">{t.footer.terms}</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">{t.footer.privacy}</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors duration-300">{t.footer.faq}</a></li>
              <li><a href="/ambassador" className="text-gray-300 hover:text-white transition-colors duration-300">{t.footer.ambassador}</a></li>
              {/* <li><a href="/challenge" className="text-gray-300 hover:text-white transition-colors duration-300">{t.nav.challenge}</a></li> */}
            </ul>
          </nav>
          <div className="flex justify-center gap-4">
            <a href="https://www.facebook.com/quantrock" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-5 h-5 text-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/quantrockfintech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg shadow-pink-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5 text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="https://x.com/Quantrock_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-gray-700 to-black rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg shadow-gray-500/30">
              <svg className="w-5 h-5 text-white" viewBox="0 0 512 512" fill="currentColor"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
            </a>
          </div>
          <div className="text-center mt-6 text-sm text-gray-400">
            {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

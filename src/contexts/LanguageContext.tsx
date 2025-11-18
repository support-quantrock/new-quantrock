import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'zh' | 'fr' | 'es' | 'ru' | 'tr' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ur' as Language, name: 'اردو', flag: '🇵🇰' },
];

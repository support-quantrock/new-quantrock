import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuantrockLanding } from './components/QuantrockLanding';
import { AmbassadorPage } from './components/AmbassadorPage';
import { AffiliatePage } from './components/AffiliatePage';
import { TermsOfUsePage } from './components/TermsOfUsePage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { ChallengePage } from './components/ChallengePage';
import { FAQPage } from './components/FAQPage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuantrockLanding />} />
          <Route path="/ambassador" element={<AmbassadorPage />} />
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

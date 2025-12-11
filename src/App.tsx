import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuantrockLanding } from './components/QuantrockLanding';
import { AmbassadorPage } from './components/AmbassadorPage';
import { AffiliatePage } from './components/AffiliatePage';
import { TermsOfUsePage } from './components/TermsOfUsePage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { ChallengePage } from './components/ChallengePage';
import { FAQPage } from './components/FAQPage';
import { AppPage } from './components/AppPage';
import { DownloadRedirect } from './components/DownloadRedirect';
import { WebinarPage } from './components/WebinarPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Auth Pages
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

// Dashboard Pages
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { ReferralsPage } from './components/dashboard/ReferralsPage';
import { EarningsPage } from './components/dashboard/EarningsPage';
import { ProfilePage } from './components/dashboard/ProfilePage';
import { WebinarDashboard } from './components/dashboard/WebinarDashboard';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<QuantrockLanding />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/download" element={<DownloadRedirect />} />
            <Route path="/ambassador" element={<AmbassadorPage />} />
            <Route path="/affiliate" element={<AffiliatePage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/webinars" element={<WebinarPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="referrals" element={<ReferralsPage />} />
              <Route path="earnings" element={<EarningsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="webinars" element={<AdminRoute><WebinarDashboard /></AdminRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

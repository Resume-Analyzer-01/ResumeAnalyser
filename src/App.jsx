import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { LoadingState } from './components/shared/LoadingState'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
import { AuthProvider } from './contexts/AuthContext'

const HomePage = lazy(() => import('./pages/Home'))
const LoginPage = lazy(() => import('./pages/Login'))
const RegisterPage = lazy(() => import('./pages/Register'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword'))
const VerifyOTPPage = lazy(() => import('./pages/VerifyOTP'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const UploadResumePage = lazy(() => import('./pages/UploadResume'))
const UploadPage = lazy(() => import('./pages/UploadPage'))
const ResumeAnalysisPage = lazy(() => import('./pages/ResumeAnalysis'))
const ResumeHistoryPage = lazy(() => import('./pages/ResumeHistory'))
const ReportsPage = lazy(() => import('./pages/Reports'))
const ProfilePage = lazy(() => import('./pages/Profile'))
const SettingsPage = lazy(() => import('./pages/Settings'))
const PricingPage = lazy(() => import('./pages/Pricing'))
const ContactPage = lazy(() => import('./pages/Contact'))
const FAQPage = lazy(() => import('./pages/FAQ'))
const FeaturesPage = lazy(() => import('./pages/Features'))
const TemplatesPage = lazy(() => import('./pages/Templates'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
          <Suspense fallback={<LoadingState title="Loading ResumeAI" description="Preparing your workspace." />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-otp" element={<VerifyOTPPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/upload" element={<UploadResumePage />} />
                <Route path="/uploadpage" element={<UploadPage />} />
                <Route path="/analysis" element={<ReportsPage />} />
                <Route path="/analysis/:id" element={<ResumeAnalysisPage />} />
                <Route path="/history" element={<ResumeHistoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App

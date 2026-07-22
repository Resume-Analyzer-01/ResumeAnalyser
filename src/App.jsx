import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { LoadingState } from './components/shared/LoadingState'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'

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
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilder'))
const JobMatcherPage = lazy(() => import('./pages/JobMatcher'))
const CoachingPage = lazy(() => import('./pages/Coaching'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingState title="Loading ResumeAI" description="Preparing your workspace." />}>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/builder" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
                    <Route path="/builder/:id" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
                    
                    {/* Job Matcher Routes & Aliases */}
                    <Route path="/job-matcher" element={<ProtectedRoute><JobMatcherPage /></ProtectedRoute>} />
                    <Route path="/jobmatcher" element={<Navigate to="/job-matcher" replace />} />
                    <Route path="/job-matching" element={<Navigate to="/job-matcher" replace />} />
                    <Route path="/jobs" element={<Navigate to="/job-matcher" replace />} />

                    {/* AI Coaching Routes & Aliases */}
                    <Route path="/coaching" element={<ProtectedRoute><CoachingPage /></ProtectedRoute>} />
                    <Route path="/coach" element={<Navigate to="/coaching" replace />} />
                    <Route path="/ai-coach" element={<Navigate to="/coaching" replace />} />

                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/verify-otp" element={<VerifyOTPPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/upload" element={<ProtectedRoute><UploadResumePage /></ProtectedRoute>} />
                    <Route path="/uploadpage" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
                    <Route path="/analysis" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
                    <Route path="/analysis/:id" element={<ProtectedRoute><ResumeAnalysisPage /></ProtectedRoute>} />
                    <Route path="/history" element={<ProtectedRoute><ResumeHistoryPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App

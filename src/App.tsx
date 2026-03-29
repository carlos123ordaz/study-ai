import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { getStoredToken } from '@/services/api';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from '@/app/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';

// Pages
import { Landing } from '@/pages/Landing';
import { Login } from '@/pages/Login';
import { AuthCallback } from '@/pages/AuthCallback';
import { Dashboard } from '@/pages/Dashboard';
import { Documents } from '@/pages/Documents';
import { DocumentDetail } from '@/pages/DocumentDetail';
import { CreateQuiz } from '@/pages/CreateQuiz';
import { Quizzes } from '@/pages/Quizzes';
import { TakeQuiz } from '@/pages/TakeQuiz';
import { QuizResults } from '@/pages/QuizResults';
import { Credits } from '@/pages/Credits';
import { Profile } from '@/pages/Profile';
import { PaymentSuccess } from '@/pages/PaymentSuccess';
import { PaymentCancel } from '@/pages/PaymentCancel';

export default function App() {
  const { setUser, setLoading } = useAuthStore();

  // Re-hydrate user on page load if token exists
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .getMe()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Documents />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DocumentDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Quizzes />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes/create"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateQuiz />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TakeQuiz />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes/results/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <QuizResults />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/credits"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Credits />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

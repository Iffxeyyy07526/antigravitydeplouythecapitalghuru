import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isSupabaseConfigured } from './lib/supabase';
import { AuthProvider, useAuth } from './lib/auth';
import { Toaster } from './components/ui/sonner';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './components/ui/button';
import TelegramSupport from './components/TelegramSupport';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PricingPage from './pages/PricingPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  if (!isSupabaseConfigured) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="glass-card p-10 max-w-md border-accent/20 premium-glow">
          <AlertCircle className="h-16 w-16 text-accent mb-6 mx-auto" />
          <h2 className="text-2xl font-black mb-4 tracking-tight">Configuration Required</h2>
          <p className="text-muted-foreground mb-8 font-medium leading-relaxed">
            The application cannot connect to Supabase. Please ensure you have added the correct 
            <code className="text-accent bg-accent/5 px-2 py-1 rounded mx-1">NEXT_PUBLIC_SUPABASE_URL</code> 
            and <code className="text-accent bg-accent/5 px-2 py-1 rounded mx-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 
            to the <span className="text-white font-bold">Secrets</span> panel in AI Studio.
          </p>
          <Button onClick={() => window.location.reload()} className="btn-premium w-full h-14">
            <RefreshCw className="mr-2 h-5 w-5" /> Reload Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { loading, session, subscription } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
        <p className="text-muted-foreground animate-pulse font-bold tracking-widest uppercase text-xs">Initializing Terminal...</p>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              session ? (
                user?.email_confirmed_at ? (
                  <Navigate to={subscription ? "/dashboard" : "/pricing"} replace />
                ) : (
                  <Login />
                )
              ) : (
                <Login />
              )
            } 
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-center" theme="dark" />
      <TelegramSupport variant="floating" />
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, user, subscription, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!session || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Strictly enforce email verification
  if (!user.email_confirmed_at) {
    return <Navigate to="/login" state={{ error: 'unverified', email: user.email }} replace />;
  }

  if (!subscription) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
}

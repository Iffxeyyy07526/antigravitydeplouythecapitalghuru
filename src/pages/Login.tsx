import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import Logo from '@/components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const navigate = useNavigate();
  const { session, user, subscription } = useAuth();
  const location = useLocation();

  // Auto-redirect if session exists AND email is confirmed
  useEffect(() => {
    if (session && user?.email_confirmed_at) {
      navigate(subscription ? '/dashboard' : '/pricing', { replace: true });
    }
    
    // Check if redirected from a protected route because of unverified status
    const state = location.state as { error?: string; email?: string } | null;
    if (state?.error === 'unverified') {
      setEmail(state.email || '');
      setShowEmailSent(true);
    }
  }, [session, user, subscription, navigate, location]);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      }
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification email resent!");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          }
        });
        
        if (error) {
          console.error("Signup error:", error);
          if (error.message.includes("User already registered")) {
            toast.error("User already registered");
          } else {
            toast.error(error.message);
          }
          return;
        }

        // If session is null OR user is not confirmed, show email sent screen
        if (data.user && (!data.session || !data.user.email_confirmed_at)) {
          setShowEmailSent(true);
          toast.success('Verification email sent!');
        } else if (data.session) {
          toast.success('Account created successfully!');
          navigate('/dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error("Login error:", error);
          toast.error(error.message);
          return;
        }

        if (data.user && !data.user.email_confirmed_at) {
          setShowEmailSent(true);
          toast.error('Email not verified. Please check your inbox.');
          return;
        }
        
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      console.error("Auth exception:", error);
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 relative overflow-hidden noise-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8 md:mb-12">
          <Link to="/" className="flex items-center justify-center mb-6">
            <Logo className="h-12 md:h-16" />
          </Link>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
            {isSignUp ? 'Elite Registration' : 'Terminal Access'}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 font-medium px-4 md:px-0">
            {isSignUp ? 'Join the circle of institutional intelligence.' : 'Authenticate to access your VIP trading terminal.'}
          </p>
        </div>

        <Card className="glass-card p-6 md:p-10 border-white/10 shadow-2xl shadow-brand/5">
          {showEmailSent ? (
            <div className="text-center py-6 md:py-8">
              <div className="h-16 w-16 md:h-20 md:w-20 glass rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-brand/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-brand" />
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 md:mb-4 text-white">Check your email</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-10 font-medium">
                We've sent a verification link to <span className="text-white font-bold">{email}</span>. 
                Please click the link to activate your terminal access.
              </p>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full btn-outline-premium h-12 md:h-14 border-white/10 rounded-xl"
                  onClick={() => setShowEmailSent(false)}
                >
                  Back to Login
                </Button>
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="text-brand hover:text-brand-dark transition-colors font-black uppercase tracking-wider text-[10px] md:text-xs mx-auto block"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleAuth} className="space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="email" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Terminal ID (Email)</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 md:h-14 pl-12 glass border-white/10 focus:border-brand/50 focus:ring-brand/20 transition-all rounded-xl text-white text-sm md:text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="password" name="password" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Access Key (Password)</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 md:h-14 pl-12 glass border-white/10 focus:border-brand/50 focus:ring-brand/20 transition-all rounded-xl text-white text-sm md:text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-premium h-14 md:h-16 text-base md:text-lg shadow-xl shadow-brand/20 rounded-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>{isSignUp ? 'Register Account' : 'Initialize Terminal'} <LogIn className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </form>

              <div className="mt-8 md:mt-10 text-center text-sm font-medium">
                <span className="text-muted-foreground">
                  {isSignUp ? 'Already registered?' : "New to the platform?"}
                </span>{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-brand hover:text-brand-dark transition-colors font-black uppercase tracking-wider text-[10px] md:text-xs ml-2"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </>
          )}
        </Card>

        <p className="mt-8 md:mt-10 text-center text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-medium opacity-50">
          Institutional Grade Encryption Active • 256-bit SSL
        </p>
      </motion.div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-dark/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>
    </div>
  );
}

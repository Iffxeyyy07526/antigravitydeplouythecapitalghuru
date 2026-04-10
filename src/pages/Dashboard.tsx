import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  ExternalLink, 
  LogOut, 
  TrendingUp, 
  Bell, 
  ShieldCheck,
  MessageSquare,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCompletion from '@/components/ProfileCompletion';
import { differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { session, user, profile, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    if (profile) {
      const complete = !!(
        profile.full_name && 
        profile.address && 
        profile.mobile_number && 
        profile.telegram_id
      );
      setIsProfileComplete(complete);
    }
  }, [profile]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error('Error logging out');
    }
  };

  if (!session || !user || !profile) return null;

  if (!isProfileComplete) {
    return <ProfileCompletion onComplete={() => setIsProfileComplete(true)} />;
  }

  const daysRegistered = differenceInDays(new Date(), new Date(profile.created_at));
  const isEmailConfirmed = !!user.email_confirmed_at;

  return (
    <div className="min-h-screen bg-background noise-bg">
      <Navbar />
      
      <main className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase glass text-brand rounded-full border border-brand/20">
              <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              Terminal Active
            </div>
            <h1 className="text-3xl md:text-6xl font-heading font-black tracking-tight text-white leading-tight">
              Welcome back, <br className="md:hidden" />
              <span className="text-brand text-glow">{profile.full_name}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6">
              <div className="glass px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-[10px] md:text-xs font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand" />
                {daysRegistered} Days Registered
              </div>
              <div className={cn(
                "px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-[10px] md:text-xs font-semibold",
                isEmailConfirmed ? "glass text-brand border-brand/20" : "bg-destructive/10 border border-destructive/20 text-destructive"
              )}>
                {isEmailConfirmed ? <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <XCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                Email {isEmailConfirmed ? 'Confirmed' : 'Unconfirmed'}
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="w-full md:w-auto btn-outline-premium h-12 px-6 border-white/10 hover:border-destructive/30 hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          {/* Subscription Status */}
          <Card className="glass-card p-6 md:p-10 lg:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck className="h-32 w-32 md:h-48 md:w-48 text-brand" />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-12 relative z-10">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="h-12 w-12 md:h-16 md:w-16 glass rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                  <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-brand" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-white">Subscription Intelligence</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground font-medium">Institutional Grade Access Control</p>
                </div>
              </div>
              {subscription ? (
                <div className="w-fit px-4 py-1.5 md:px-6 md:py-2 glass border border-brand/30 text-brand rounded-full text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase premium-glow">
                  Active Subscription
                </div>
              ) : (
                <div className="w-fit px-4 py-1.5 md:px-6 md:py-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-full text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase">
                  No Active Plan
                </div>
              )}
            </div>

            {subscription ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 relative z-10">
                {[
                  { label: "Plan Tier", value: subscription.plan.replace('_', ' '), icon: <TrendingUp className="h-4 w-4" /> },
                  { label: "Activation", value: new Date(subscription.started_at).toLocaleDateString(), icon: <Calendar className="h-4 w-4" /> },
                  { label: "Renewal", value: new Date(subscription.expires_at).toLocaleDateString(), icon: <Calendar className="h-4 w-4" /> }
                ].map((item, i) => (
                  <div key={i} className="p-4 md:p-6 glass rounded-2xl border border-white/5 group/item hover:border-brand/20 transition-all duration-300">
                    <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-muted-foreground mb-2 md:mb-3 uppercase tracking-[0.2em] font-black group-hover/item:text-brand transition-colors">
                      {item.icon} {item.label}
                    </div>
                    <div className="text-lg md:text-xl font-heading font-bold capitalize text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 md:p-12 glass border border-dashed border-white/10 rounded-2xl md:rounded-3xl text-center mb-8 md:mb-12 relative z-10">
                <CreditCard className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4 md:mb-6 opacity-20" />
                <h4 className="text-lg md:text-xl font-heading font-bold mb-2 text-white">Unlock Institutional Signals</h4>
                <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-sm mx-auto">You currently don't have an active subscription. Choose a plan to start receiving high-accuracy signals.</p>
                <Button asChild className="w-full sm:w-auto btn-premium px-10 h-12 md:h-14">
                  <Link to="/pricing">Buy a Plan <TrendingUp className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            )}

            {subscription && (
              <div className="p-6 md:p-8 glass border border-brand/20 rounded-2xl md:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-brand/5 pointer-events-none" />
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                  <div className="h-16 w-16 md:h-20 md:w-20 bg-brand rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] rotate-3">
                    <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-white">Join VIP Telegram</h4>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">Real-time institutional signals delivered instantly.</p>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full md:w-auto btn-premium px-10 h-14 md:h-16 text-base md:text-lg relative z-10">
                  <a href="https://t.me/TheCapitalGuruSupport" target="_blank" rel="noopener noreferrer">
                    Connect Now <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            )}
          </Card>

          {/* User Profile Details */}
          <Card className="glass-card p-6 md:p-10 group">
            <h3 className="text-xl font-heading font-bold mb-8 md:mb-10 tracking-tight text-white">Profile Intelligence</h3>
            <div className="space-y-6 md:space-y-8">
              {[
                { label: "Identity", value: profile.full_name, icon: <User className="h-5 w-5" /> },
                { label: "Terminal ID", value: profile.email, icon: <Mail className="h-5 w-5" /> },
                { label: "Physical Address", value: profile.address, icon: <MapPin className="h-5 w-5" /> },
                { label: "Mobile Access", value: profile.mobile_number, icon: <Phone className="h-5 w-5" /> },
                { label: "Telegram Sync", value: profile.telegram_id, icon: <Send className="h-5 w-5" /> },
                { label: "Member Since", value: new Date(profile.created_at).toLocaleDateString(), icon: <Calendar className="h-5 w-5" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-5 group/item">
                  <div className="h-10 w-10 md:h-12 md:w-12 glass rounded-xl flex items-center justify-center border border-white/5 group-hover/item:border-brand/20 transition-all duration-300">
                    <div className="text-muted-foreground group-hover/item:text-brand transition-colors">{item.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black mb-1">{item.label}</div>
                    <div className="font-bold text-base md:text-lg tracking-tight truncate text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-white/5">
              <div className="flex items-center gap-3 text-brand mb-4 md:mb-6">
                <Bell className="h-4 w-4 md:h-5 md:w-5 animate-bounce" />
                <span className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Alert System</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
                Your terminal is configured for instant signal delivery. Ensure Telegram notifications are enabled for maximum performance.
              </p>
            </div>
          </Card>
        </div>

        {/* Performance Quick Look */}
        <div className="mt-16 md:mt-24">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="w-8 md:w-12 h-1px bg-brand/30" />
            <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-white flex items-center gap-3">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-brand" />
              Market Intelligence
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Nifty 50", value: "+1.2%", color: "text-brand" },
              { label: "Bank Nifty", value: "+2.5%", color: "text-brand" },
              { label: "VIP Win Rate", value: "88%", color: "text-brand" },
              { label: "Active Signals", value: "3", color: "text-white" }
            ].map((stat, i) => (
              <Card key={i} className="glass-card p-6 md:p-8 flex flex-col items-center text-center group hover:border-brand/30">
                <div className="text-[9px] md:text-[10px] text-muted-foreground mb-3 md:mb-4 uppercase tracking-[0.2em] font-black">{stat.label}</div>
                <div className={cn(
                  "text-2xl md:text-4xl font-heading font-black tracking-tighter transition-all duration-500 group-hover:scale-110 group-hover:text-glow",
                  stat.color
                )}>{stat.value}</div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, MapPin, Phone, Send, Save } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface ProfileCompletionProps {
  onComplete: () => void;
}

export default function ProfileCompletion({ onComplete }: ProfileCompletionProps) {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    address: profile?.address || '',
    mobile_number: profile?.mobile_number || '',
    telegram_id: profile?.telegram_id || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.full_name || !formData.address || !formData.mobile_number || !formData.telegram_id) {
      toast.error('Please fill in all essential details.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          address: formData.address,
          mobile_number: formData.mobile_number,
          telegram_id: formData.telegram_id,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile completed successfully!');
      await refreshProfile();
      onComplete();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
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
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase glass text-brand rounded-full border border-brand/20">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            Action Required
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight mb-3 md:mb-4">
            Complete Your <span className="text-brand text-glow">Profile</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-md mx-auto px-4 md:px-0">
            To access your institutional trading terminal, please provide your essential identification details.
          </p>
        </div>

        <Card className="glass-card p-6 md:p-10 border-white/10 shadow-2xl shadow-brand/5">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <Label htmlFor="full_name" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Legal Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                  <Input
                    id="full_name"
                    placeholder="John Doe"
                    className="h-12 md:h-14 pl-12 glass border-white/10 focus:border-brand/50 focus:ring-brand/20 transition-all rounded-xl text-white text-sm md:text-base"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <Label htmlFor="address" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Physical Address</Label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                  <Input
                    id="address"
                    placeholder="123 Trading St, Finance City"
                    className="h-12 md:h-14 pl-12 glass border-white/10 focus:border-brand/50 focus:ring-brand/20 transition-all rounded-xl text-white text-sm md:text-base"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="mobile" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Mobile Number</Label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                    <Input
                      id="mobile"
                      placeholder="+91 98765 43210"
                      className="h-12 md:h-14 pl-12 glass border-white/10 focus:border-brand/50 focus:ring-brand/20 transition-all rounded-xl text-white text-sm md:text-base"
                      value={formData.mobile_number}
                      onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="telegram" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Telegram ID</Label>
                  <div className="relative group">
                    <Send className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                    <Input
                      id="telegram"
                      placeholder="@username"
                      className="h-12 md:h-14 pl-12 glass border-white/10 focus:border-brand/50 focus:ring-brand/20 transition-all rounded-xl text-white text-sm md:text-base"
                      value={formData.telegram_id}
                      onChange={(e) => setFormData({ ...formData, telegram_id: e.target.value })}
                      required
                    />
                  </div>
                </div>
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
                <>Save & Continue <Save className="ml-2 h-5 w-5" /></>
              )}
            </Button>
          </form>
        </Card>

        <p className="mt-8 md:mt-10 text-center text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-medium opacity-50">
          Your data is encrypted and stored securely.
        </p>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly VIP',
    price: 2499,
    period: 'month',
    features: [
      'Nifty & BankNifty Signals',
      'Real-time Telegram Alerts',
      'Entry, SL & Target Points',
      'Risk Management Guidance',
      'Daily Market Analysis'
    ],
    highlight: false
  },
  {
    id: 'six_month',
    name: 'Six-Month VIP',
    price: 11999,
    period: '6 months',
    features: [
      'Everything in Monthly',
      'Priority Support',
      'Weekly Strategy Webinars',
      'Personalized Trading Review',
      'Save ₹3,000+'
    ],
    highlight: true,
    badge: 'Best Value'
  },
  {
    id: 'yearly',
    name: 'Yearly VIP',
    price: 19999,
    period: 'year',
    features: [
      'Everything in Six-Month',
      '1-on-1 Mentorship Session',
      'Advanced Options Strategies',
      'Lifetime Community Access',
      'Save ₹10,000+'
    ],
    highlight: false
  }
];

export default function PricingPage() {
  const { session, refreshSubscription } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan: typeof plans[0]) => {
    if (!session) {
      navigate('/login');
      return;
    }

    setLoading(plan.id);
    const res = await loadRazorpay();

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(null);
      return;
    }

    try {
      // 1. Create order on backend
      const { data: order } = await axios.post('/api/payments/create-order', {
        amount: plan.price,
        plan: plan.id
      });

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "The Capital Guru",
        description: `${plan.name} Subscription`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // 3. Verify payment on backend
            const verifyRes = await axios.post('/api/payments/verify', {
              ...response,
              userId: session.user.id,
              plan: plan.id,
              email: session.user.email,
              fullName: session.user.user_metadata.full_name || session.user.email?.split('@')[0]
            });

            if (verifyRes.data.status === 'ok') {
              toast.success('Payment successful! Welcome to VIP.');
              await refreshSubscription();
              navigate('/dashboard');
            }
          } catch (error) {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: session.user.email,
        },
        theme: {
          color: "#00ffcc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background noise-bg">
      <Navbar />
      
      <section className="pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase glass rounded-full">
                <span className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                Limited VIP Slots
              </div>
              <h1 className="text-4xl md:text-7xl font-heading font-black mb-6 md:mb-8 tracking-tight text-white leading-tight">
                Elite <span className="text-brand text-glow">VIP Access</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed px-4 md:px-0">
                No free plans. No compromises. Only pure, high-accuracy signals for institutional-grade trading.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Card className={cn(
                  "glass-card p-8 md:p-10 flex flex-col relative overflow-hidden transition-all duration-500",
                  plan.highlight 
                    ? "lg:scale-105 z-10 border-brand/40 shadow-[0_0_40px_rgba(34,197,94,0.15)]" 
                    : "hover:border-brand/20"
                )}>
                  {plan.highlight && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-dark" />
                  )}
                  
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-brand text-white px-6 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                        {plan.badge}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-8 md:mb-10">
                    <div className="text-[10px] font-black text-brand/60 mb-3 md:mb-4 tracking-[0.3em] uppercase">{plan.name}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white">₹{plan.price.toLocaleString()}</span>
                      <span className="text-muted-foreground font-medium">/{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-5 mb-10 md:mb-12 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 md:gap-4 group/item">
                        <div className="h-6 w-6 rounded-full glass flex items-center justify-center group-hover/item:bg-brand/10 transition-colors">
                          <Check className="h-3.5 w-3.5 text-brand" />
                        </div>
                        <span className="text-sm md:text-base text-muted-foreground font-medium group-hover/item:text-white transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => handlePayment(plan)}
                    disabled={loading === plan.id}
                    className={cn(
                      "w-full h-14 md:h-16 text-base md:text-lg font-black transition-all duration-300 rounded-2xl",
                      plan.highlight ? "btn-premium" : "btn-outline-premium"
                    )}
                  >
                    {loading === plan.id ? (
                      <div className="h-6 w-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Secure Access <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 md:mt-32 flex flex-col items-center justify-center gap-8 md:gap-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 md:gap-3">
                <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-brand" />
                <span className="text-lg md:text-xl font-heading font-black tracking-tighter text-white">RAZORPAY SECURE</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Zap className="h-8 w-8 md:h-10 md:w-10 text-brand" />
                <span className="text-lg md:text-xl font-heading font-black tracking-tighter text-white">INSTANT ACTIVATION</span>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl font-medium leading-relaxed px-4 md:px-0">
              Institutional-grade encryption. All payments are processed through Razorpay's secure gateway. 
              Your capital intelligence starts here.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

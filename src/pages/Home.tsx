import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, TrendingUp, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramSupport from '@/components/TelegramSupport';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase glass rounded-full">
                <span className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                Institutional Grade Signals
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black mb-6 md:mb-8 leading-[1] md:leading-[0.9] tracking-tight text-white">
                Trade with <span className="text-brand text-glow">Precision.</span><br className="hidden sm:block" />
                Win with <span className="text-brand">Authority.</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-10 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-4 md:px-0">
                Elite Nifty & BankNifty signals for serious traders. 
                Experience institutional-grade precision in every trade with our advanced algorithmic intelligence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0">
                <Button asChild size="lg" className="w-full sm:w-auto btn-premium px-10 md:px-12 h-14 md:h-16 text-base md:text-lg shadow-2xl shadow-brand/20">
                  <Link to="/pricing">Join VIP Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <TelegramSupport />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-brand/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-background-secondary/50 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-700" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight">The Path to <span className="text-accent">VIP</span></h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Seamless access to elite trading intelligence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { step: "01", title: "Select Tier", desc: "Choose the institutional plan that aligns with your capital goals.", icon: <ShieldCheck className="h-8 w-8 text-accent" /> },
              { step: "02", title: "Secure Payment", desc: "Encrypted processing via Razorpay. Instant account activation.", icon: <Zap className="h-8 w-8 text-accent" /> },
              { step: "03", title: "Elite Access", desc: "Direct entry to our private terminal and Telegram VIP channel.", icon: <MessageSquare className="h-8 w-8 text-accent" /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card p-8 md:p-10 group"
              >
                <div className="mb-6 md:mb-8 p-4 bg-accent/5 rounded-2xl w-fit group-hover:bg-accent/10 transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="text-[10px] font-black text-accent/40 mb-3 md:mb-4 tracking-[0.3em] uppercase">{item.step}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 md:py-32 bg-background-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-10 leading-tight tracking-tight">
                Built for <span className="text-accent">Serious</span> Capital.
              </h2>
              <div className="space-y-8 md:space-y-10">
                {[
                  { title: "Institutional Accuracy", desc: "Proprietary algorithms delivering 90%+ historical precision." },
                  { title: "Strategic Risk Control", desc: "Defined entry, stop-loss, and multi-target exits for every trade." },
                  { title: "Ultra-Low Latency", desc: "Instant notifications via our high-speed Telegram infrastructure." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[80px] md:blur-[120px] rounded-full" />
              <Card className="glass-card p-6 md:p-10 relative z-10 overflow-hidden border-white/10">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                    </div>
                    <span className="text-lg md:text-xl font-bold tracking-tight">Live Terminal</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Real-time
                  </div>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex justify-between items-end">
                    <span className="text-sm md:text-base text-muted-foreground font-medium">Monthly Performance</span>
                    <span className="text-3xl md:text-4xl font-black text-accent text-glow">+42.5%</span>
                  </div>
                  <div className="h-2.5 md:h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-accent-secondary shadow-[0_0_15px_rgba(0,255,163,0.3)]" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
                    <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[9px] md:text-[10px] text-muted-foreground mb-1 md:mb-2 uppercase tracking-[0.2em] font-black">Win Rate</div>
                      <div className="text-xl md:text-2xl font-bold">88.2%</div>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[9px] md:text-[10px] text-muted-foreground mb-1 md:mb-2 uppercase tracking-[0.2em] font-black">Avg. Profit</div>
                      <div className="text-xl md:text-2xl font-bold">₹12,400</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-brand/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-heading font-black mb-4 md:mb-6 tracking-tight text-white">
              Trusted by <span className="text-brand text-glow">Elite</span> Traders
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">Join the circle of consistent institutional profitability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { name: "Rahul Sharma", role: "Full-time Trader", text: "The Capital Guru changed my trading game. The accuracy of BankNifty signals is institutional level. My portfolio has seen consistent 15-20% monthly growth since joining." },
              { name: "Priya Patel", role: "Capital Manager", text: "I manage significant capital, and these signals provide the precision I need for consistent returns. The risk management is what sets them apart from everyone else." },
              { name: "Amit Verma", role: "Professional Trader", text: "Best risk-to-reward signals in the Indian market. Essential for any serious options trader who wants to stop gambling and start trading like a pro." }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Card className="glass-card p-8 md:p-10 hover:border-brand/30 group transition-all duration-500">
                  <div className="flex gap-1 mb-6 md:mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand text-brand shadow-[0_0_8px_rgba(0,255,163,0.5)]" />)}
                  </div>
                  <p className="text-lg md:text-xl mb-8 md:mb-10 font-medium leading-relaxed italic text-white/90 group-hover:text-white transition-colors">"{t.text}"</p>
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="h-12 w-12 md:h-14 md:h-14 bg-brand/10 rounded-2xl flex items-center justify-center font-black text-brand text-lg md:text-xl border border-brand/20">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg text-white">{t.name}</div>
                      <div className="text-[10px] md:text-sm text-muted-foreground font-medium uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-background-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-heading font-black mb-4 md:mb-6 tracking-tight text-white">
              Common <span className="text-brand">Questions</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">Everything you need to know about our institutional terminal.</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid gap-4 md:gap-6">
            {[
              { q: "What markets do you provide signals for?", a: "We specialize exclusively in Nifty and BankNifty options trading in the Indian market, providing institutional-grade entry and exit points." },
              { q: "How many signals are provided daily?", a: "Quality over quantity. We typically provide 1-3 high-probability signals per day, depending on market volatility and institutional flow." },
              { q: "Is this suitable for beginners?", a: "While our signals are institutional-grade, they are designed to be easy to follow. However, we recommend a basic understanding of options trading." },
              { q: "What is the capital requirement?", a: "We recommend a minimum capital of ₹50,000 to ₹1,00,000 to properly manage risk and follow our position sizing guidelines." },
              { q: "Do you provide automated trading?", a: "Currently, we provide manual signals via our private Telegram VIP channel and web terminal. Automated execution is in our future roadmap." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 md:p-8 border-white/5 hover:border-brand/20 transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-start gap-3">
                  <span className="text-brand">Q.</span> {faq.q}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-7 md:pl-8 border-l-2 border-brand/20">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/[0.02]" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-10 tracking-tight leading-[1] md:leading-[0.9]">Secure Your <span className="text-accent text-glow">VIP</span> Access.</h2>
            <p className="text-lg md:text-2xl text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto font-medium px-4 md:px-0">
              Limited slots available for the current institutional cycle. 
              Don't miss the next major market move.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto btn-premium px-12 md:px-16 h-16 md:h-20 text-xl md:text-2xl premium-glow rounded-2xl">
              <Link to="/pricing">Join VIP Community Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-bg">
      <Navbar />
      <div className="container mx-auto px-6 pt-48 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-12 tracking-tight text-white">
            Terms of <span className="text-brand">Service</span>
          </h1>
          
          <div className="glass-card p-10 space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using The Capital Guru, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Trading Risk Disclosure</h2>
              <p>
                Trading in options involves significant risk of loss and is not suitable for all investors. 
                The Capital Guru provides signals for educational and informational purposes only. 
                Past performance is not indicative of future results. You are solely responsible for your trading decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Subscription and Access</h2>
              <p>
                Access to VIP signals is provided on a subscription basis. Subscriptions are non-refundable 
                once the signals have been accessed. We reserve the right to terminate access for any 
                violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
              <p>
                All content, signals, and algorithms provided by The Capital Guru are our intellectual property. 
                Redistribution or resale of our signals is strictly prohibited and will result in immediate 
                termination of service without refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>
                The Capital Guru shall not be liable for any financial losses incurred through the use of our signals. 
                We do not guarantee the accuracy or timeliness of any information provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Modifications</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the service 
                constitutes acceptance of the updated terms.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

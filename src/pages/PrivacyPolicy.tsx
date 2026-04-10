import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
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
            Privacy <span className="text-brand">Policy</span>
          </h1>
          
          <div className="glass-card p-10 space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information Collection</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our service, or contact us for support. This may include your name, 
                email address, and payment information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use of Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                to process your transactions, and to communicate with you about your account and 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information 
                from unauthorized access, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
              <p>
                We use third-party service providers, such as Razorpay for payment processing 
                and Supabase for authentication and database management. These providers have 
                their own privacy policies regarding the data they handle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service 
                and hold certain information to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

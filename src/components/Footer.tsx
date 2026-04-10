import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Twitter, Instagram, Send, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-brand/5 blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="mb-8 inline-block group">
              <Logo className="h-10" />
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
              India's premier institutional-grade options trading terminal. 
              Empowering serious traders with precision algorithmic intelligence.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Send className="h-5 w-5" />, href: "https://t.me/TheCapitalGuruSupport" },
                { icon: <Twitter className="h-5 w-5" />, href: "#" },
                { icon: <Instagram className="h-5 w-5" />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Ecosystem</h4>
            <ul className="space-y-4">
              {[
                { name: 'Terminal Home', path: '/' },
                { name: 'VIP Pricing', path: '/pricing' },
                { name: 'User Dashboard', path: '/dashboard' },
                { name: 'Elite Signals', path: '/dashboard' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-muted-foreground hover:text-brand transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-brand transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Legal & Trust</h4>
            <ul className="space-y-4">
              {[
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Risk Disclosure', path: '/terms' },
                { name: 'Refund Policy', path: '/terms' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-muted-foreground hover:text-brand transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-brand transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Institutional Support</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0">
                  <Send className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Telegram</div>
                  <a href="https://t.me/TheCapitalGuruSupport" className="text-white hover:text-brand transition-colors font-medium">@TheCapitalGuruSupport</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Email Support</div>
                  <a href="mailto:Mahir@thecapitalguru.net" className="text-white hover:text-brand transition-colors font-medium">Mahir@thecapitalguru.net</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>© {new Date().getFullYear()} THE CAPITAL GURU</span>
            <span className="hidden md:inline w-1 h-1 bg-white/20 rounded-full" />
            <span className="hidden md:inline">Institutional Terminal v2.4.0</span>
          </div>
          <div className="flex items-center gap-8">
            <p className="text-[10px] text-muted-foreground/60 max-w-xl text-center lg:text-right leading-relaxed uppercase tracking-tighter">
              Trading in options involves significant risk. Past performance is not indicative of future results. 
              The Capital Guru is an educational platform and does not provide financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

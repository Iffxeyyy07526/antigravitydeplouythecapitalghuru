import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth';
import { LogOut, User, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function Navbar() {
  const { session, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Dashboard', path: '/dashboard', protected: true },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      scrolled 
        ? "bg-background/60 backdrop-blur-2xl border-b border-white/5 py-3 md:py-4" 
        : "bg-transparent py-5 md:py-8"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-50">
          <Logo className="h-8 md:h-12" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            (!link.protected || session) && (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-semibold transition-all duration-300 hover:text-brand relative group/link",
                  location.pathname === link.path ? "text-brand" : "text-muted-foreground"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[1px] bg-brand transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover/link:w-full"
                )} />
              </Link>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl">
                <Link to="/dashboard">
                  <User className="mr-2 h-4 w-4" /> Account
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all rounded-xl"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors px-4">
                Sign In
              </Link>
              <Button asChild className="btn-premium px-8 h-11 shadow-lg shadow-brand/20 rounded-xl">
                <Link to="/login">Get Started <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2 relative z-50 glass rounded-xl border-white/10" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6 text-brand" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 ease-[0.16, 1, 0.3, 1]",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-20px]"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link, i) => (
            (!link.protected || session) && (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-3xl font-heading font-black tracking-tighter transition-all duration-300",
                  location.pathname === link.path ? "text-brand" : "text-white"
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="w-full max-w-xs h-[1px] bg-white/10 my-4" />
          {session ? (
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Button asChild className="btn-premium w-full h-16 text-xl rounded-2xl" onClick={() => setIsOpen(false)}>
                <Link to="/dashboard">Terminal Dashboard</Link>
              </Button>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }} 
                className="text-xl font-bold text-destructive/80 hover:text-destructive transition-colors py-4"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Button asChild className="btn-premium w-full h-16 text-xl rounded-2xl" onClick={() => setIsOpen(false)}>
                <Link to="/login">Join VIP Now</Link>
              </Button>
              <Link 
                to="/login" 
                className="text-center text-muted-foreground font-bold py-2"
                onClick={() => setIsOpen(false)}
              >
                Existing Member? Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

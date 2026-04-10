import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TelegramSupportProps {
  className?: string;
  variant?: 'hero' | 'floating';
}

export default function TelegramSupport({ className, variant = 'hero' }: TelegramSupportProps) {
  const telegramUrl = "https://t.me/TheCapitalGuruSupport";

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-8 right-8 z-[60] group">
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-background/90 backdrop-blur-md border border-white/10 rounded-xl text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none premium-glow">
          Chat with us on Telegram
        </div>
        
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#009E66] to-[#00FFA3] text-black shadow-[0_0_20px_rgba(0,255,163,0.5)] hover:shadow-[0_0_30px_rgba(0,255,163,0.7)] transition-all duration-300 hover:-translate-y-1 active:scale-95 animate-pulse-glow",
            className
          )}
        >
          <Send className="h-7 w-7 fill-current" />
        </a>
      </div>
    );
  }

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 px-8 h-16 rounded-full bg-gradient-to-r from-[#009E66] to-[#00FFA3] text-black font-black text-lg shadow-[0_0_20px_rgba(0,255,163,0.4)] hover:shadow-[0_0_30px_rgba(0,255,163,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95",
        className
      )}
    >
      <Send className="h-5 w-5 fill-current" />
      Telegram Support
    </a>
  );
}

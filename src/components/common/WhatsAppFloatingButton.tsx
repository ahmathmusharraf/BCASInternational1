import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside
      aria-label="Instant WhatsApp Admissions Assistance"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2"
    >
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-200/80 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Chat with Admissions Desk</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            aria-label="Dismiss WhatsApp tip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20studying%20abroad%20and%20university%20admissions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with BCAS University Admissions on WhatsApp (+94 76 141 5273)"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
      </a>
    </aside>
  );
};

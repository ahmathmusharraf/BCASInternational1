import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { BCAS_CAMPUSES, BCAS_SOCIAL_LINKS } from '../../data/mockData';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  Mail
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, customLogoUrl } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-8 sm:pt-16 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-8 pb-8 sm:pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Overview (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={customLogoUrl}
                alt="BCAS International University Placements"
                className="h-12 w-auto bg-white px-3 py-1.5 rounded-lg object-contain shadow-sm"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/bcas-logo.png';
                }}
              />
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Empowering Sri Lankan students for over 25 years with trusted pathways to leading universities across the United Kingdom, Australia, Canada, Sweden, Finland, Malta, and the United Arab Emirates and many more.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block mb-2.5">
                Official BCAS Channels
              </span>
              <div className="flex flex-wrap gap-2">
                {BCAS_SOCIAL_LINKS.map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-[#00239C] hover:text-white text-xs font-medium text-slate-200 rounded-lg transition-colors border border-slate-700/60"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-70" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registered higher education pioneer in Sri Lanka</span>
            </div>
          </div>

          {/* Column 2: Explore Pathways */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Study
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('destinations')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Study Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('universities')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  University Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Course Search & Shortlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ossd')}
                  className="text-amber-300 hover:text-white transition-colors cursor-pointer text-left font-semibold flex items-center gap-1.5"
                >
                  <span>Canadian High School (OSSD)</span>
                  <span className="text-xs">🇨🇦</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ielts')}
                  className="text-emerald-300 hover:text-white transition-colors cursor-pointer text-left font-semibold flex items-center gap-1.5"
                >
                  <span>Study IELTS (British Council/IDP)</span>
                  <span className="text-xs">🎯</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Student Hub
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('apply')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-blue-300"
                >
                  Start Application Enquiry ↗
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('events')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Event & Campus Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('stories')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Student Success Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blogs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  BCAS Student Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-amber-300 font-medium"
                >
                  Frequent Questions (FAQ)
                </button>
              </li>
              <li>
                <a
                  href="https://bcas.lk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
                >
                  <span>Main BCAS Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campuses Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sri Lanka Campuses
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              {BCAS_CAMPUSES.map(campus => (
                <div key={campus.id} className="border-b border-slate-800/80 pb-2">
                  <span className="font-semibold text-slate-200 block text-xs">
                    {campus.name}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {campus.address.join(', ')}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    {campus.phone && (
                      <a
                        href={`tel:${campus.phone.replace(/\s+/g, '')}`}
                        className="text-blue-300 hover:text-white inline-flex items-center gap-1"
                      >
                        <Phone className="w-2.5 h-2.5" />
                        <span>{campus.phone}</span>
                      </a>
                    )}
                    <a
                      href={campus.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-emerald-300 inline-flex items-center gap-1 font-medium"
                    >
                      <WhatsAppIcon className="w-2.5 h-2.5 fill-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span>Email:</span>
                <a href="mailto:Digital_Int@bcas.lk" className="text-blue-300 hover:text-white font-medium">
                  Digital_Int@bcas.lk
                </a>
              </div>
              <button
                onClick={() => navigateTo('contact')}
                className="text-xs font-semibold text-blue-300 hover:text-white inline-flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span>View all campus maps & directions</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers and Copyright */}
        <div className="pt-5 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-300">
          <div className="text-center md:text-left space-y-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <p>© {currentYear} BCAS International University Placements. All rights reserved.</p>
              <span>·</span>
              <button
                onClick={() => navigateTo('privacy')}
                className="text-blue-300 hover:text-white underline cursor-pointer text-xs"
              >
                Privacy Policy
              </button>
              <span className="text-slate-500">|</span>
              <button
                onClick={() => navigateTo('terms')}
                className="text-blue-300 hover:text-white underline cursor-pointer text-xs"
              >
                Terms of Service
              </button>
              <span className="text-slate-500">|</span>
              <button
                onClick={() => navigateTo('cookie-policy')}
                className="text-blue-300 hover:text-white underline cursor-pointer text-xs"
              >
                Cookie Policy
              </button>
              <span className="text-slate-500">|</span>
              <button
                onClick={() => navigateTo('cookie-preferences')}
                className="text-blue-300 hover:text-white underline cursor-pointer text-xs"
              >
                Cookie Preferences
              </button>
            </div>
            <p className="text-[11px] text-slate-400 max-w-2xl">
              Disclaimer: Programme details, admission requirements, tuition fees, and visa guidelines are subject to change by respective awarding bodies, partner universities, and immigration departments. Official verification with BCAS advisers is recommended prior to formal enrolment.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-slate-300">
            <span>Colombo</span>
            <span>·</span>
            <span>Jaffna</span>
            <span>·</span>
            <span>Kalmunai</span>
            <span>·</span>
            <span>Kandy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

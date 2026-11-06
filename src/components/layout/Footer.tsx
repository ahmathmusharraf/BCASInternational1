import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { BCAS_CAMPUSES, BCAS_SOCIAL_LINKS } from '../../data/mockData';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import {
  Phone,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

const renderSocialIcon = (icon: string) => {
  switch (icon) {
    case 'facebook':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
        </svg>
      );
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

export const Footer: React.FC = () => {
  const { navigateTo, customLogoUrl } = useApp();
  const currentYear = new Date().getFullYear();
  const socialChannels = BCAS_SOCIAL_LINKS.filter(social => social.icon !== 'external');

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
                Follow Us
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialChannels.map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    className="inline-flex items-center justify-center w-9 h-9 bg-slate-800 hover:bg-[#00239C] text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-700/60"
                  >
                    {renderSocialIcon(social.icon)}
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
                  <span>Study IELTS (British Council Partnership)</span>
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
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-blue-200 flex items-center gap-1.5"
                >
                  <span>About Us (Part of BCAS Campus)</span>
                </button>
              </li>
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

          {/* Column 4: Branches & Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Branches
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
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="text-xs font-semibold text-blue-300 hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers and Copyright */}
        <div className="pt-5 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-300 bcas-footer-legal">
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

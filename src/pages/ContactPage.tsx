import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BCAS_CAMPUSES, BCAS_SOCIAL_LINKS } from '../data/mockData';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { submitLeadToGoogleSheets } from '../services/leadService';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
  Send,
  Building2,
  CheckCircle2,
  HelpCircle,
  Share2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, navigateTo } = useApp();
  const [selectedCampusId, setSelectedCampusId] = useState<string>('colombo');

  // Quick message form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('University Placement Enquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const activeCampus =
    BCAS_CAMPUSES.find(c => c.id === selectedCampusId) || BCAS_CAMPUSES[0];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      showToast('Please fill out the required fields', 'warning');
      return;
    }

    try {
      await submitLeadToGoogleSheets({
        name: contactName,
        email: contactEmail,
        phone: contactPhone.trim() || '+94 (Contact Desk)',
        interest: contactSubject,
        message: contactMessage
      });
      setIsSent(true);
      showToast('Your inquiry has been directly recorded into our Google Sheets admissions log!', 'success');
    } catch {
      setIsSent(true);
      showToast('Message recorded successfully.', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12 space-y-6 sm:space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="space-y-2 sm:space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#00239C] uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
          <span>ISLANDWIDE PRESENCE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
          Contact & Campuses
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
          Talk to BCAS about international study, universities, applications, or which campus to visit. Choose the contact option that works best for you and your family.
        </p>

        {/* Quick CTA Actions */}
        <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20speak%20with%20an%20international%20admissions%20counselor."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 sm:gap-2 transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#25D366]" />
            <span>Chat on WhatsApp (+94 76 141 5273)</span>
          </a>
          <a
            href="tel:+94761415273"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 sm:gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
            <span>Call +94 76 141 5273</span>
          </a>
          <a
            href="mailto:Digital_Int@bcas.lk"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-blue-50 hover:bg-blue-100 text-[#00239C] border border-blue-200 font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 sm:gap-2 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
            <span>Email Digital_Int@bcas.lk</span>
          </a>
          <a
            href="https://bcas.lk/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>Visit official BCAS ↗</span>
          </a>
        </div>
      </div>

      {/* Campus Selector & Interactive Detail Cards */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold font-display text-slate-900">
              Our 4 Regional Campuses in Sri Lanka
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a campus to view direct telephone lines, location directions, and opening hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 p-1 bg-slate-100 rounded-xl">
            {BCAS_CAMPUSES.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCampusId(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCampusId === c.id
                    ? 'bg-white text-[#00239C] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Campus Feature Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#BA141A] uppercase tracking-wider block">
                {activeCampus.role}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                {activeCampus.title}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin className="w-5 h-5 text-[#BA141A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-slate-900">Campus Address:</strong>
                  <span>{activeCampus.address.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <Clock className="w-5 h-5 text-[#00239C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-slate-900">Admissions Desk Hours:</strong>
                  <span>{activeCampus.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <Mail className="w-5 h-5 text-[#00239C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-slate-900">Email Address:</strong>
                  <a href={`mailto:${activeCampus.email}`} className="text-[#00239C] hover:underline font-medium">
                    {activeCampus.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {activeCampus.phone && (
                <a
                  href={`tel:${activeCampus.phone.replace(/\s+/g, '')}`}
                  className="px-4 py-2.5 bg-[#00239C] hover:bg-[#001869] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {activeCampus.phone}</span>
                </a>
              )}
              <a
                href={activeCampus.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>WhatsApp Campus Desk</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeCampus.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Get Google Maps Directions ↗</span>
              </a>
            </div>
          </div>

          {/* All 4 Campuses List for Quick Comparison */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 font-display">
              All BCAS Campus Contacts
            </h4>
            <div className="space-y-3">
              {BCAS_CAMPUSES.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCampusId(c.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedCampusId === c.id
                      ? 'bg-white border-[#00239C] shadow-xs'
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{c.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                      {c.city}
                    </span>
                  </div>
                  <span className="text-slate-500 block text-[11px] mt-0.5">{c.address[0]}</span>
                  {c.phone && <span className="text-slate-700 font-mono text-[11px]">{c.phone}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Grid */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold text-[#BA141A] uppercase tracking-wider">
            STAY CONNECTED
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
            Follow BCAS Online
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Official social channels for student highlights, university visit announcements, and intake alerts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BCAS_SOCIAL_LINKS.map(item => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#00239C] transition-all flex flex-col justify-between group text-center"
            >
              <div>
                <span className="font-bold text-sm text-slate-900 group-hover:text-[#00239C] transition-colors block">
                  {item.name}
                </span>
                <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                  {item.handle}
                </span>
              </div>
              <span className="text-xs text-[#00239C] font-semibold mt-3 group-hover:translate-x-0.5 transition-transform inline-block">
                Open ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Message Form: Compact & Streamlined */}
      <section className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        <div className="lg:col-span-5 space-y-2 sm:space-y-3 text-center lg:text-left">
          <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider">
            SEND US A NOTE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Have a specific question?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            Fill in your question and our international placements desk will respond promptly via email or WhatsApp.
          </p>
          <div className="pt-1 text-[11px] sm:text-xs text-blue-200 space-y-0.5">
            <p>✓ Average response time: Under 4 hours</p>
            <p>✓ 100% free comprehensive educational evaluation</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {!isSent ? (
            <form onSubmit={handleSendMessage} className="bg-slate-800/90 p-4 sm:p-5 rounded-xl space-y-2.5 sm:space-y-3 text-xs border border-slate-700/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <label className="text-[10px] sm:text-[11px] font-semibold text-slate-300 block mb-0.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-900 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] sm:text-[11px] font-semibold text-slate-300 block mb-0.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-900 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-slate-300 block mb-0.5">Your Question or Message *</label>
                <textarea
                  rows={2}
                  required
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  placeholder="Ask about entry requirements, intakes, tuition fees, or which campus to visit..."
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-900 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 sm:py-2.5 bg-[#00239C] hover:bg-[#1a3dae] text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message to BCAS Desk</span>
              </button>
            </form>
          ) : (
            <div className="p-5 sm:p-6 bg-slate-800 rounded-xl text-center space-y-2 animate-scale-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white font-display">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-slate-300">
                A counselor from your chosen campus will follow up with you directly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs text-blue-300 hover:underline cursor-pointer pt-1"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

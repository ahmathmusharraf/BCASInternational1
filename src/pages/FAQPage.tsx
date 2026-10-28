import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  GraduationCap,
  ShieldCheck,
  FileCheck2,
  DollarSign,
  Languages,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keyPoints?: string[];
}

export const FAQPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'admissions-fee': true,
    'ielts-prep': true
  });

  const categories = [
    'All',
    'Admissions & Eligibility',
    'Visa & Immigration',
    'BCAS HND & Top-Up',
    'Scholarships & Fees',
    'IELTS & English'
  ];

  const faqs: FAQItem[] = [
    {
      id: 'admissions-fee',
      category: 'Admissions & Eligibility',
      question: 'Do I have to pay BCAS for university counseling and admissions support?',
      answer:
        'No. BCAS International University Placements provides university counseling, application submission, offer follow-up, and standard document verification completely free of charge. You only pay official university tuition fees directly to the institution and government visa processing charges.',
      keyPoints: [
        '100% Free counseling & application filing with no hidden agency fees',
        'Official direct institutional partner of 170+ universities worldwide',
        'Transparent guidance without charging student commissions'
      ]
    },
    {
      id: 'ielts-prep',
      category: 'IELTS & English',
      question: 'Can I apply for university admission if I have not taken the IELTS or PTE exam yet?',
      answer:
        'Yes! You can secure a Conditional Offer Letter using your existing high school (O/Level or A/Level) or BCAS diploma academic transcripts while you prepare for your English test. Many partner universities also waive IELTS if you have strong O/L or A/L English grades (e.g. A or B in O/L English) or offer internal English test alternatives.',
      keyPoints: [
        'Secure your conditional university seat first to avoid deadline rush',
        'Conditional offers give you 2 to 4 months to submit language scores',
        'BCAS offers direct IELTS preparation classes in Colombo, Kandy, Jaffna & Kalmunai'
      ]
    },
    {
      id: 'hnd-transfer',
      category: 'BCAS HND & Top-Up',
      question: 'How does credit transfer from a BCAS Pearson BTEC HND to an overseas Top-Up degree work?',
      answer:
        'Completing a Pearson BTEC Higher National Diploma (HND) at BCAS equals the first two years (Level 4 & 5) of a British bachelor’s degree (240 UK credits). Partner universities in the UK, Australia, Canada, New Zealand, and Malaysia grant direct entry into Year 3 (final Top-Up year). You graduate with the exact same university degree certificate as students who studied all 3 years abroad, saving up to 60% on total overseas tuition and living expenses.',
      keyPoints: [
        'Transfer into the final year (Level 6) of BSc / BEng / BA / BBA degrees',
        'Save £25,000 to £40,000 on foreign tuition and overseas accommodation',
        'Full post-study work visa eligibility upon graduation from the overseas university'
      ]
    },
    {
      id: 'visa-guarantee',
      category: 'Visa & Immigration',
      question: 'Does BCAS guarantee student visa approval?',
      answer:
        'No ethical education consultancy can legitimately guarantee a visa outcome. The final decision rests solely with sovereign government immigration authorities (such as UK Visas and Immigration, Australian Department of Home Affairs, or Immigration New Zealand). What BCAS provides is strict compliance verification, financial audit checking, and genuine student interview coaching that has yielded a 99% verified visa success rate across 25+ years.',
      keyPoints: [
        'Detailed financial documentation review (28-day holding rules, OANDA conversion)',
        'Comprehensive mock interview drills with experienced compliance officers',
        'TB test clinic bookings, medical coordination, and biometrics guidance'
      ]
    },
    {
      id: 'scholarships-criteria',
      category: 'Scholarships & Fees',
      question: 'What scholarships are available for Sri Lankan international students?',
      answer:
        'Partner universities offer automatic regional bursaries (£1,500 – £4,000 / AUD 5,000 – 10,000), early bird deposit incentives, and competitive merit scholarships (up to 50% tuition reduction). Unlike full-ride government awards that require separate complex applications, many university merit discounts are automatically assessed when BCAS submits your academic profile.',
      keyPoints: [
        'Automatic regional bursaries applied directly on your offer letter',
        'Dean’s and Vice-Chancellor’s scholarships for A/Level and HND high achievers',
        'Early-payment tuition discounts for confirming your offer before early deadlines'
      ]
    },
    {
      id: 'work-rights',
      category: 'Visa & Immigration',
      question: 'Can I work part-time while studying abroad?',
      answer:
        'Yes. Most major international destinations grant generous student employment rights: the UK permits 20 hours/week during term-time and full-time during holidays; Australia allows 48 hours per fortnight; New Zealand allows 20 hours/week; Finland allows up to 30 hours/week; and Sweden has no weekly hour cap during studies. Minimum wages typically range from £11.44/hr in the UK to AUD $24.10/hr in Australia.',
      keyPoints: [
        'Part-time earnings easily cover day-to-day groceries and transport',
        'Full-time work rights permitted during summer and winter vacations',
        'On-campus and off-campus career services available at all partner institutions'
      ]
    },
    {
      id: 'post-study-work',
      category: 'Visa & Immigration',
      question: 'What are the Post-Study Work Visa (PSWV) rights after graduation?',
      answer:
        'International graduates can remain and work in their destination country through dedicated post-study visas: UK Graduate Route provides 2 years (3 years for PhD); Australia offers 2 to 4 years (with regional bonuses); New Zealand provides up to 3 years; Canada grants PGWP up to 3 years; and Finland/Sweden offer 1 to 2 years post-study residence permits to seek skilled employment.',
      keyPoints: [
        'No employer sponsorship required to apply for initial Graduate / Post-Study visas',
        'Unrestricted employment in any field or sector during the post-study period',
        'Direct pathways into employer-sponsored permanent residence (PR) systems'
      ]
    },
    {
      id: 'accommodations',
      category: 'Admissions & Eligibility',
      question: 'Does BCAS assist with overseas student accommodation and airport pickup?',
      answer:
        'Yes. Once your student visa is granted, our pre-departure briefing team connects you with guaranteed university halls of residence, verified private student accommodation providers (such as Casita and Amber), alumni networks in your destination city, and airport welcome reception desks organized by the universities.',
      keyPoints: [
        'Assistance booking university on-campus halls and private student studios',
        'Pre-departure briefings in Colombo with alumni and destination coordinators',
        'Assistance with international student SIM cards, forex cards, and health insurance'
      ]
    },
    {
      id: 'intakes-timelines',
      category: 'Admissions & Eligibility',
      question: 'When are the primary intakes and when should I start applying?',
      answer:
        'The main academic intakes are September/October (Autumn intake) and January/February (Spring intake), with additional May/July intakes in Australia, New Zealand, and Malaysia. We strongly recommend starting your consultation 6 to 9 months before your desired intake to allow ample time for document preparation, English testing, offer issuance, and visa processing.',
      keyPoints: [
        'Autumn Intake: Apply between November and May for best scholarship opportunities',
        'Spring Intake: Apply between June and October',
        'BCAS processes rolling admissions throughout the entire calendar year'
      ]
    },
    {
      id: 'canada-ossd',
      category: 'BCAS HND & Top-Up',
      question: 'What is the Canadian OSSD pathway at BCAS for O/Level students?',
      answer:
        'The Ontario Secondary School Diploma (OSSD), offered in partnership with Canadian International Academy (CIA), allows Sri Lankan students who have completed G.C.E. O/Levels to earn an official Canadian high school diploma in just 10 months without sitting for local A/Levels. An OSSD diploma provides direct admission into top universities across Canada, the UK, Australia, and the US as a local Ontario applicant (OUAC 101).',
      keyPoints: [
        'Skip 2.5 years of stressful local A/Levels with continuous assessment',
        'Direct entry into University of Toronto, Waterloo, UBC, McMaster, etc.',
        'Registered Ontario Ministry of Education inspection number (BSID)'
      ]
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.keyPoints && faq.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCat =
        selectedCategory === 'All' || faq.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00239C] hover:text-[#001869] cursor-pointer mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#BA141A] uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
          <HelpCircle className="w-3.5 h-3.5 text-[#BA141A]" />
          <span>OFFICIAL KNOWLEDGE BASE · EXPLORE</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-2">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
          Clear, factual answers to help students and parents navigate university admissions, credit transfer, scholarships, and student visa compliance with complete confidence.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. fees, IELTS, visa, HND, scholarships, work rights)..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all"
          />
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00239C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No matching questions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Have a specific question not listed here? Talk directly with our senior counseling team on WhatsApp or telephone.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Clear Search
              </button>
              <a
                href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20have%20a%20question%20about%20university%20placements."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>Ask via WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#00239C] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-transform duration-200 shrink-0 mt-0.5 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-[#00239C]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in-50 duration-150">
                    <p className="text-slate-600">{faq.answer}</p>

                    {faq.keyPoints && faq.keyPoints.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100/80 bg-slate-50/60 rounded-xl p-3 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Key Takeaways
                        </span>
                        <ul className="space-y-1">
                          {faq.keyPoints.map((kp, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00239C] shrink-0 mt-1.5" />
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions CTA Banner */}
      <div className="bg-gradient-to-r from-[#00239C] to-[#001869] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-wider">
            CANNOT FIND YOUR SPECIFIC ANSWER?
          </span>
          <h2 className="text-lg sm:text-2xl font-bold font-display">
            Speak Directly with an Official BCAS Advisor
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-normal leading-relaxed">
            Our experienced international student counselors at Colombo, Kandy, Jaffna, and Kalmunai are ready to review your academic transcripts and guide you step-by-step.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 justify-center">
          <button
            onClick={() => navigateTo('apply')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white hover:bg-blue-50 text-[#00239C] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            Book Free Consultation
          </button>
          <a
            href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20have%20questions%20about%20studying%20abroad%20and%20university%20options."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#25D366] hover:bg-[#1ebc59] text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BLOG_POSTS } from '../../data/mockData';
import { BlogPost } from '../../types';
import { X, Clock, Calendar, ArrowRight, Share2, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';

export const BlogModal: React.FC = () => {
  const { activeBlogModal, setActiveBlogModal, navigateTo, showToast } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveBlogModal(null);
    };
    if (activeBlogModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeBlogModal, setActiveBlogModal]);

  if (!activeBlogModal) return null;

  const post = activeBlogModal;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150"
      >
        {/* Header media */}
        <div className="relative h-48 sm:h-64 bg-slate-900 shrink-0">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={e => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

          <button
            onClick={() => setActiveBlogModal(null)}
            aria-label="Close article"
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1.5">
              <span className="uppercase tracking-wider">{post.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </span>
              <span>·</span>
              <span>{post.publishedDate}</span>
            </div>
            <h1
              id="blog-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white leading-tight"
            >
              {post.title}
            </h1>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          {/* Author Byline */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                AM
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs sm:text-sm leading-tight">
                  {post.author.name}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {post.author.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal border-l-2 border-[#00239C] pl-4 py-0.5">
            {post.excerpt}
          </p>

          {/* Structured Content Sections */}
          <div className="space-y-6">
            {post.content.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                {sec.heading && (
                  <h3 className="text-lg font-bold font-display text-slate-900 tracking-tight">
                    {sec.heading}
                  </h3>
                )}

                {sec.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.bulletPoints && (
                  <ul className="space-y-2 pt-1 pl-1">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00239C] shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.proTip && (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs sm:text-sm text-blue-950 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#00239C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold mb-0.5">BCAS Counselor Pro-Tip:</strong>
                      <span>{sec.proTip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Related Articles & Guides */}
          {post.relatedPostIds && post.relatedPostIds.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#00239C]" />
                <span>Related Articles & Guides</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.relatedPostIds
                  .map(id => BLOG_POSTS.find(p => p.id === id))
                  .filter((p): p is BlogPost => Boolean(p))
                  .map(related => (
                    <div
                      key={related.id}
                      onClick={() => setActiveBlogModal(related)}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-[#00239C] hover:bg-blue-50/30 transition-all cursor-pointer flex gap-3 group"
                    >
                      <img
                        src={related.heroImage}
                        alt={related.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-100"
                        onError={e => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="min-w-0 flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-[#00239C] uppercase tracking-wider truncate">
                          {related.category} · {related.readTime}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#00239C] line-clamp-2 leading-snug">
                          {related.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3 text-[#00239C]" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Bottom CTA within Article */}
          <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Ready to plan your personal journey?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Talk to a BCAS adviser at Colombo, Jaffna, Kalmunai, or Kandy.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveBlogModal(null);
                navigateTo('apply');
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#00239C] hover:bg-[#001869] rounded-xl whitespace-nowrap shadow-xs transition-colors cursor-pointer"
            >
              Start Free Enquiry ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

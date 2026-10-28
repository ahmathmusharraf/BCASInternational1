import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  Share2,
  RotateCcw
} from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const { setActiveBlogModal, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Study abroad', 'Applications', 'Scholarships', 'Student life'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#00239C] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#00239C]" />
          <span>STUDENT BLOGS & STUDY GUIDES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
          Blogs & International Study Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Good questions, clear answers. Straightforward guides for your international study journey — explore destination options, prepare application documents, discover scholarships, and budget with confidence.
        </p>
      </div>

      {/* Featured Guide Banner (if not searching) */}
      {!searchQuery && selectedCategory === 'All' && (
        <div
          onClick={() => setActiveBlogModal(featuredPost)}
          className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-200 grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#00239C]">
                <span className="uppercase tracking-wider">Featured Guide</span>
                <span>·</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-snug group-hover:text-[#00239C] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-100 text-xs gap-1">
              <span className="text-slate-600 font-medium">
                Written by <strong className="text-slate-900 font-semibold">{featuredPost.author.name}</strong> ({featuredPost.author.role})
              </span>
              <span className="text-[#00239C] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-44 sm:h-52 lg:h-auto overflow-hidden bg-slate-900">
            <img
              src={featuredPost.heroImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent lg:hidden" />
          </div>
        </div>
      )}

      {/* Search and Category Filter Strip */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search guides by keyword (e.g. visa, scholarship, documents, budget)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap gap-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00239C] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500">
            Showing <strong className="text-slate-900">{filteredPosts.length}</strong> guide{filteredPosts.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setActiveBlogModal(post)}
              className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-36 sm:h-40 bg-slate-900 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 px-2 py-0.5 rounded text-[10px] font-bold text-[#00239C] shadow-2xs">
                    {post.category}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white px-1.5 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs">
                    {post.readTime}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {post.publishedDate}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 font-display leading-snug group-hover:text-[#00239C] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[10.5px] font-medium truncate max-w-[240px]" title={`${post.author.name} (${post.author.role})`}>
                  By {post.author.name} ({post.author.role})
                </span>
                <span className="text-[#00239C] font-semibold flex items-center gap-0.5 text-xs">
                  <span>Read guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">↗</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            No guides found matching &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-3 py-1.5 bg-[#00239C] text-white text-xs font-semibold rounded-lg cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Search Filters</span>
          </button>
        </div>
      )}

      {/* Bottom Consultation Strip */}
      <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base sm:text-lg font-bold font-display text-white">
            Have a question not covered in our guides?
          </h3>
          <p className="text-xs text-slate-300 max-w-lg">
            Our international admissions team is available via WhatsApp or in person at Colombo, Jaffna, Kalmunai, and Kandy.
          </p>
        </div>
        <button
          onClick={() => navigateTo('contact')}
          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Contact Our Team ↗
        </button>
      </div>
    </div>
  );
};

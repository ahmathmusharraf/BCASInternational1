import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import {
  Home,
  BookOpen,
  GraduationCap,
  Send,
  Camera,
  Menu
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, navigateTo, savedCourses, isMobileMenuOpen, setIsMobileMenuOpen } = useApp();

  const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'universities', label: 'Universities', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Camera },
    { id: 'apply', label: 'Apply', icon: Send }
  ];

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 safe-area-bottom"
    >
      <div className="grid grid-cols-6 gap-1 max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id && !isMobileMenuOpen;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-colors cursor-pointer min-h-[46px] relative ${
                isActive ? 'text-[#00239C] font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#00239C]' : 'text-slate-500'}`} />
                {item.id === 'courses' && savedCourses.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#BA141A] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {savedCourses.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* 6th item: Navigation Drawer Menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-colors cursor-pointer min-h-[46px] relative ${
            isMobileMenuOpen ? 'text-[#00239C] font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
          title="Toggle Navigation Menu"
        >
          <Menu className={`w-5 h-5 ${isMobileMenuOpen ? 'text-[#00239C]' : 'text-slate-500'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            Menu
          </span>
        </button>
      </div>
    </nav>
  );
};

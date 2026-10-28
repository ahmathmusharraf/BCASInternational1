import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, GraduationCap, ChevronUp, ChevronDown, Check, ArrowRight, Trash2 } from 'lucide-react';

export const UniversityCompareDrawer: React.FC = () => {
  const {
    universityComparisonList,
    toggleUniversityComparison,
    clearUniversityComparison,
    navigateTo
  } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  if (universityComparisonList.length === 0) return null;

  return (
    <div className="fixed bottom-16 lg:bottom-4 left-4 sm:left-6 z-40 max-w-sm sm:max-w-xl w-full">
      {/* Floating Pill if closed */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer group"
        >
          <GraduationCap className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          <div className="text-left text-xs">
            <span className="font-semibold block text-slate-100">
              Comparing {universityComparisonList.length} Universit{universityComparisonList.length === 1 ? 'y' : 'ies'}
            </span>
            <span className="text-slate-400 text-[11px]">Click to view comparison</span>
          </div>
          <ChevronUp className="w-4 h-4 text-slate-400 ml-2" />
        </button>
      ) : (
        /* Expanded Comparison Panel */
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in slide-in-from-bottom-4 duration-200 w-full sm:w-[640px] max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <h3 className="font-display font-bold text-sm">
                Compare Universities ({universityComparisonList.length}/3)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearUniversityComparison}
                title="Clear all"
                className="p-1.5 text-slate-400 hover:text-white rounded-md text-xs hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="p-4 overflow-x-auto overflow-y-auto max-h-[60vh]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 pr-3 font-semibold text-slate-500 w-28 shrink-0">Criteria</th>
                  {universityComparisonList.map(uni => (
                    <th key={uni.id} className="py-2 px-3 font-bold text-slate-900 text-sm align-top">
                      <div className="flex items-start justify-between gap-1">
                        <span>{uni.name}</span>
                        <button
                          onClick={() => toggleUniversityComparison(uni)}
                          className="text-slate-400 hover:text-red-600 cursor-pointer p-0.5"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-500">Destination</td>
                  {universityComparisonList.map(uni => (
                    <td key={uni.id} className="py-2.5 px-3 font-semibold text-slate-900">
                      {uni.country} ({uni.city})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-500">Tuition Range</td>
                  {universityComparisonList.map(uni => (
                    <td key={uni.id} className="py-2.5 px-3 font-mono font-medium text-slate-900">
                      {uni.tuitionRange}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-500">Intakes</td>
                  {universityComparisonList.map(uni => (
                    <td key={uni.id} className="py-2.5 px-3">
                      {uni.intakes.join(', ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-500">Min IELTS</td>
                  {universityComparisonList.map(uni => (
                    <td key={uni.id} className="py-2.5 px-3 font-mono font-medium">
                      {uni.minIELTS}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-500">Scholarships</td>
                  {universityComparisonList.map(uni => (
                    <td key={uni.id} className="py-2.5 px-3 text-emerald-700 font-semibold">
                      {uni.scholarshipAvailable ? '✓ Available' : 'Case by case'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-500">Action</td>
                  {universityComparisonList.map(uni => (
                    <td key={uni.id} className="py-2.5 px-3">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigateTo('apply', {
                            university: uni.name,
                            country: uni.country
                          });
                        }}
                        className="px-2.5 py-1.5 bg-[#00239C] hover:bg-[#001869] text-white rounded-md text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

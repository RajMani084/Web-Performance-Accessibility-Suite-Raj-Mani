import React from 'react';
import { ActiveTab } from '../types';
import { Download, Layers, FileText, Code2, Sliders } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDownloadModal
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('showcase')}
            className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
              Apex Access &amp; Performance
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-sky-400">
              by Raj Mani
            </span>
          </button>
        </div>

        {/* Zone 2: 4 Clean Navigation Links */}
        <nav
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => setActiveTab('showcase')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'showcase'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Live Showcase</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Audit Report</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Deliverables &amp; Code</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'tools'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>A11y &amp; Contrast Tools</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDownloadModal}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .DOCX</span>
          </button>
        </div>
      </div>
    </header>
  );
};

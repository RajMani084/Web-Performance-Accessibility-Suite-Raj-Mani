import React, { useEffect, useRef } from 'react';
import { X, Download, FileText, FileCode, CheckCircle2, Shield } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl text-slate-100 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-sky-400" />
            <h2 id="download-modal-title" className="text-base sm:text-lg font-bold text-white">
              Download Capstone Deliverables
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close download dialog"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-amber-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Official deliverables authored by <strong className="text-white">Raj Mani</strong> for Week 4: Enhancing Web Page Performance &amp; Accessibility.
        </p>

        {/* Deliverables List */}
        <div className="space-y-3">
          {/* Deliverable 1: DOCX */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/30 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <strong className="text-white font-bold text-sm">Formal Technical Report (.docx)</strong>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-bold">
                    Primary Deliverable
                  </span>
                </div>
                <p className="text-slate-400 mt-1">
                  Week4_Performance_Accessibility_Report_Raj_Mani.docx — formatted Word document with tables, exact metrics, and challenges &amp; resolutions.
                </p>
              </div>
            </div>
            <a
              href="/Week4_Performance_Accessibility_Report_Raj_Mani.docx"
              download="Week4_Performance_Accessibility_Report_Raj_Mani.docx"
              className="px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>

          {/* Deliverable 2: Plain Text Report (.txt) */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <strong className="text-white font-bold text-sm">Plain Text Report File (.txt)</strong>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-bold">
                    Clean Text
                  </span>
                </div>
                <p className="text-slate-400 mt-1">
                  Week4_Performance_Accessibility_Report_Raj_Mani.txt — clean ASCII formatted complete report with quantitative data table, steps, and challenges.
                </p>
              </div>
            </div>
            <a
              href="/Week4_Performance_Accessibility_Report_Raj_Mani.txt"
              download="Week4_Performance_Accessibility_Report_Raj_Mani.txt"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Download</span>
            </a>
          </div>

          {/* Deliverable 3: HTML */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                <FileCode className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-white font-bold text-sm">Semantic Accessible Web Page (.html)</strong>
                <p className="text-slate-400 mt-1">
                  accessible-webpage.html — semantic landmarks, skip link, accessible form controls, and ARIA modal.
                </p>
              </div>
            </div>
            <a
              href="/accessible-webpage.html"
              download="accessible-webpage.html"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download</span>
            </a>
          </div>

          {/* Deliverable 4: CSS */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                <FileCode className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-white font-bold text-sm">Optimized Stylesheet (.css)</strong>
                <p className="text-slate-400 mt-1">
                  styles.css — 14.8 KB zero-redundancy stylesheet with WCAG AAA tokens and fluid typography.
                </p>
              </div>
            </div>
            <a
              href="/styles.css"
              download="styles.css"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download</span>
            </a>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Lead Engineer: <strong>Raj Mani</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

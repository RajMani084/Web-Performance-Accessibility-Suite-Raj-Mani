import React, { useState, useEffect } from 'react';
import { Code2, Copy, Check, Download, ExternalLink, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeInspectorProps {
  onOpenDownloadModal: () => void;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ onOpenDownloadModal }) => {
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'txt'>('html');
  const [copied, setCopied] = useState<boolean>(false);
  const [htmlContent, setHtmlContent] = useState<string>('Loading HTML source...');
  const [cssContent, setCssContent] = useState<string>('Loading CSS source...');
  const [txtContent, setTxtContent] = useState<string>('Loading Report text...');

  useEffect(() => {
    // Fetch the physical deliverables from /public
    fetch('/accessible-webpage.html')
      .then(res => res.text())
      .then(text => setHtmlContent(text))
      .catch(() => setHtmlContent('<!-- Error loading /accessible-webpage.html -->'));

    fetch('/styles.css')
      .then(res => res.text())
      .then(text => setCssContent(text))
      .catch(() => setCssContent('/* Error loading /styles.css */'));

    fetch('/Week4_Performance_Accessibility_Report_Raj_Mani.txt')
      .then(res => res.text())
      .then(text => setTxtContent(text))
      .catch(() => setTxtContent('Error loading /Week4_Performance_Accessibility_Report_Raj_Mani.txt'));
  }, []);

  const handleCopy = () => {
    let textToCopy = htmlContent;
    if (activeFile === 'css') textToCopy = cssContent;
    if (activeFile === 'txt') textToCopy = txtContent;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadActiveFile = () => {
    let content = htmlContent;
    let filename = 'accessible-webpage.html';
    let mime = 'text/html';

    if (activeFile === 'css') {
      content = cssContent;
      filename = 'styles.css';
      mime = 'text/css';
    } else if (activeFile === 'txt') {
      content = txtContent;
      filename = 'Week4_Performance_Accessibility_Report_Raj_Mani.txt';
      mime = 'text/plain';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
              <FileCode className="w-4 h-4" />
              <span>Project Deliverables Source Code</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Production Source Code &amp; Asset Deliverables
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Authored by <strong className="text-white">Raj Mani</strong>. Pure semantic HTML5 and streamlined CSS3 ready for standalone deployment or grading review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadActiveFile}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Download {activeFile.toUpperCase()} File</span>
            </button>
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .DOCX Report</span>
            </button>
          </div>
        </div>
      </section>

      {/* Deliverables Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-white block font-bold">accessible-webpage.html</strong>
            <p className="text-slate-400 mt-0.5">
              Semantic landmarks, skip link, accessible form controls, and ARIA modal.
            </p>
            <a
              href="/accessible-webpage.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 font-semibold hover:underline mt-2"
            >
              <span>Open Raw</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-white block font-bold">styles.css</strong>
            <p className="text-slate-400 mt-0.5">
              14.8 KB zero-redundancy stylesheet with WCAG AAA tokens and fluid typography.
            </p>
            <a
              href="/styles.css"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 font-semibold hover:underline mt-2"
            >
              <span>Open Raw</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-white block font-bold">Report (.txt)</strong>
            <p className="text-slate-400 mt-0.5">
              Plain text formatted report file with benchmarks, steps, and challenges.
            </p>
            <a
              href="/Week4_Performance_Accessibility_Report_Raj_Mani.txt"
              download="Week4_Performance_Accessibility_Report_Raj_Mani.txt"
              className="inline-flex items-center gap-1 text-sky-400 font-semibold hover:underline mt-2"
            >
              <span>Download .TXT</span>
              <Download className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-white block font-bold">Report (.docx)</strong>
            <p className="text-slate-400 mt-0.5">
              Microsoft Word document with tables, exact metrics, and styling.
            </p>
            <a
              href="/Week4_Performance_Accessibility_Report_Raj_Mani.docx"
              download="Week4_Performance_Accessibility_Report_Raj_Mani.docx"
              className="inline-flex items-center gap-1 text-sky-400 font-semibold hover:underline mt-2"
            >
              <span>Download .DOCX</span>
              <Download className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Code Viewer Card */}
      <section className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        {/* Code Viewer Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveFile('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeFile === 'html'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>accessible-webpage.html</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFile('css')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeFile === 'css'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>styles.css</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFile('txt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeFile === 'txt'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Report (.txt)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[600px] font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300">
          <pre className="whitespace-pre">
            {activeFile === 'html' ? htmlContent : activeFile === 'css' ? cssContent : txtContent}
          </pre>
        </div>
      </section>
    </div>
  );
};

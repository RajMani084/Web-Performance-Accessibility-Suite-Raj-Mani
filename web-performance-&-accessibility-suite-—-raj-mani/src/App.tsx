/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { LiveShowcase } from './components/LiveShowcase';
import { AuditReport } from './components/AuditReport';
import { CodeInspector } from './components/CodeInspector';
import { AccessibilityTools } from './components/AccessibilityTools';
import { DownloadModal } from './components/DownloadModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('showcase');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Universal Skip Link for the Suite */}
      <a
        href="#suite-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Bar following Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main id="suite-main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'showcase' && (
          <LiveShowcase
            onGoToReport={() => setActiveTab('report')}
            onGoToCode={() => setActiveTab('code')}
          />
        )}

        {activeTab === 'report' && (
          <AuditReport
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        )}

        {activeTab === 'code' && (
          <CodeInspector
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        )}

        {activeTab === 'tools' && (
          <AccessibilityTools />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            Week 4 Task: Enhancing Web Page Performance &amp; Accessibility · Fully engineered by <strong className="text-slate-300">Raj Mani</strong>.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-sky-400 hover:text-sky-300 underline cursor-pointer"
            >
              Download Deliverables (.docx, .html, .css)
            </button>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.1 AAA Compliant</span>
          </div>
        </div>
      </footer>

      {/* Deliverables Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}

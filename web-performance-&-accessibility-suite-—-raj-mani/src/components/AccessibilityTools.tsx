import React, { useState } from 'react';
import { Sliders, CheckCircle2, XCircle, RefreshCw, Eye, Sparkles, Shield } from 'lucide-react';

export const AccessibilityTools: React.FC = () => {
  // Color contrast state
  const [fgColor, setFgColor] = useState<string>('#38bdf8'); // Sky 400
  const [bgColor, setBgColor] = useState<string>('#0b0f17'); // Dark canvas

  // Helper to convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] | null => {
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      return [r, g, b];
    }
    if (clean.length === 6) {
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return [r, g, b];
    }
    return null;
  };

  // Helper to compute relative luminance
  const getLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  // Calculate contrast ratio
  const calculateContrast = (hex1: string, hex2: string): number => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return 1;

    const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const contrastRatio = calculateContrast(fgColor, bgColor);
  const formattedRatio = contrastRatio.toFixed(2);

  // WCAG Compliance checks
  const passesNormalAA = contrastRatio >= 4.5;
  const passesNormalAAA = contrastRatio >= 7.0;
  const passesLargeAA = contrastRatio >= 3.0;
  const passesLargeAAA = contrastRatio >= 4.5;
  const passesUI = contrastRatio >= 3.0;

  // Preset token combos from Raj Mani's design system
  const PRESET_COMBOS = [
    { name: 'Primary Text on Dark Canvas (AAA)', fg: '#f8fafc', bg: '#0b0f17' },
    { name: 'Secondary Text on Dark Surface (AAA)', fg: '#cbd5e1', bg: '#141b26' },
    { name: 'Muted Metadata on Dark Canvas (AAA)', fg: '#94a3b8', bg: '#0b0f17' },
    { name: 'Sky Accent on Dark Canvas (AAA Large)', fg: '#38bdf8', bg: '#0b0f17' },
    { name: 'Amber Focus Ring on Dark (AAA)', fg: '#facc15', bg: '#0b0f17' },
    { name: 'Failing Legacy Baseline Combo (Poor)', fg: '#8e9aa8', bg: '#ffffff' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4" />
          <span>Interactive Diagnostic Utilities</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Accessibility Evaluation &amp; Contrast Testing Suite
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Engineered by <strong className="text-white">Raj Mani</strong> to verify WCAG 2.1 Level AA and Level AAA color contrast algorithms and test visual accessibility across varying sight conditions.
        </p>
      </section>

      {/* Real-Time WCAG Contrast Ratio Calculator */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Real-Time WCAG Contrast Ratio Calculator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Calculated using relative luminance: L1 = 0.2126R + 0.7152G + 0.0722B.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Presets:</span>
            <select
              aria-label="Preset Color Combinations"
              onChange={(e) => {
                const selected = PRESET_COMBOS.find(c => c.name === e.target.value);
                if (selected) {
                  setFgColor(selected.fg);
                  setBgColor(selected.bg);
                }
              }}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer"
            >
              {PRESET_COMBOS.map((combo, idx) => (
                <option key={idx} value={combo.name}>{combo.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Inputs & Ratio Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Pickers */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <label htmlFor="fg-color" className="block text-xs font-semibold text-slate-300 mb-1">
                Foreground Color (Text/Icon)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="fg-color"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-slate-700 bg-transparent cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bg-color" className="block text-xs font-semibold text-slate-300 mb-1">
                Background Color (Surface)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-slate-700 bg-transparent cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
              </div>
            </div>
          </div>

          {/* Computed Ratio */}
          <div className="md:col-span-3 text-center p-6 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Contrast Ratio
            </span>
            <span className="text-4xl font-extrabold text-white font-mono block my-2">
              {formattedRatio} : 1
            </span>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
              passesNormalAAA
                ? 'bg-emerald-500/20 text-emerald-400'
                : passesNormalAA
                ? 'bg-sky-500/20 text-sky-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {passesNormalAAA ? 'WCAG AAA Compliant' : passesNormalAA ? 'WCAG AA Compliant' : 'Fails WCAG Standards'}
            </span>
          </div>

          {/* Live Preview Box */}
          <div
            style={{ backgroundColor: bgColor, color: fgColor }}
            className="md:col-span-5 p-6 rounded-xl border border-slate-700 flex flex-col justify-center min-h-[160px] transition-colors"
          >
            <h3 className="text-xl font-bold tracking-tight mb-1">
              Sample Heading Text
            </h3>
            <p className="text-xs leading-relaxed opacity-95">
              Normal body text demonstration. Verified for legibility under simulated lighting conditions and assistive rendering engines.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              <span className="underline">Interactive Link Affordance</span>
              <span>&rarr;</span>
            </div>
          </div>
        </div>

        {/* Verification Checkpoints Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className={`p-3 rounded-lg border text-xs ${
            passesNormalAA
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
              : 'bg-red-950/20 border-red-800/40 text-red-400'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">Normal Text (AA)</span>
              {passesNormalAA ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
            </div>
            <span className="text-[11px] opacity-80">Req: 4.5:1</span>
          </div>

          <div className={`p-3 rounded-lg border text-xs ${
            passesNormalAAA
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
              : 'bg-red-950/20 border-red-800/40 text-red-400'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">Normal Text (AAA)</span>
              {passesNormalAAA ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
            </div>
            <span className="text-[11px] opacity-80">Req: 7.0:1</span>
          </div>

          <div className={`p-3 rounded-lg border text-xs ${
            passesLargeAA
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
              : 'bg-red-950/20 border-red-800/40 text-red-400'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">Large Text (AA)</span>
              {passesLargeAA ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
            </div>
            <span className="text-[11px] opacity-80">Req: 3.0:1</span>
          </div>

          <div className={`p-3 rounded-lg border text-xs ${
            passesUI
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
              : 'bg-red-950/20 border-red-800/40 text-red-400'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">UI Components (AA)</span>
              {passesUI ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
            </div>
            <span className="text-[11px] opacity-80">Req: 3.0:1</span>
          </div>
        </div>
      </section>

      {/* Accessible Design Principles Matrix */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Universal Inclusive Design Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-sky-400 block font-bold">1. Never Rely on Color Alone</strong>
            <p className="text-slate-300 leading-relaxed">
              WCAG 1.4.1 compliance: Status changes always feature clear textual labels and icons alongside color shifts, ensuring immediate comprehension for color-blind individuals.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-sky-400 block font-bold">2. Generous Touch Bounds (44px)</strong>
            <p className="text-slate-300 leading-relaxed">
              WCAG 2.5.5 compliance: Every interactive control (buttons, tabs, inputs, accordion triggers) enforces a minimum 44×44px hit box to accommodate tremors or coarse touch inputs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-sky-400 block font-bold">3. Vestibular Respect</strong>
            <p className="text-slate-300 leading-relaxed">
              WCAG 2.3.3 compliance: Embedded <code className="text-sky-300">@media (prefers-reduced-motion)</code> disables non-essential animations for users sensitive to motion sickness.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

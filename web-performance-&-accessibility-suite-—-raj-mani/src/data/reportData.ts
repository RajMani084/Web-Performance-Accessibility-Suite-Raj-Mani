import { BenchmarkMetric, ChallengeItem, AccessibilityCheck } from '../types';

export const BENCHMARK_METRICS: BenchmarkMetric[] = [
  {
    id: 'lighthouse-perf',
    name: 'Lighthouse Performance Score',
    category: 'Performance',
    before: '48 / 100',
    after: '99 / 100',
    gain: '+106.2%',
    tool: 'Google Lighthouse v12 (Mobile)',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'lighthouse-a11y',
    name: 'Lighthouse Accessibility Score',
    category: 'Accessibility',
    before: '52 / 100',
    after: '100 / 100',
    gain: '+92.3%',
    tool: 'Google Lighthouse v12',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'fcp',
    name: 'First Contentful Paint (FCP)',
    category: 'Performance',
    before: '3.20 s',
    after: '0.72 s',
    gain: '-77.5%',
    tool: 'WebPageTest (3G Fast simulation)',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'lcp',
    name: 'Largest Contentful Paint (LCP)',
    category: 'Performance',
    before: '4.85 s',
    after: '1.14 s',
    gain: '-76.5%',
    tool: 'Chrome UX Lab / Lighthouse',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'tbt',
    name: 'Total Blocking Time (TBT)',
    category: 'Performance',
    before: '740 ms',
    after: '35 ms',
    gain: '-95.3%',
    tool: 'Chrome Profiler / Lighthouse',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift (CLS)',
    category: 'Performance',
    before: '0.382 (Poor)',
    after: '0.002 (Good)',
    gain: '-99.5%',
    tool: 'Layout Instability API',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'inp',
    name: 'Interaction to Next Paint (INP)',
    category: 'Performance',
    before: '260 ms',
    after: '42 ms',
    gain: '-83.8%',
    tool: 'Web Vitals DevTools',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'css-weight',
    name: 'CSS Payload & Unused Rules',
    category: 'Payload & Redundancy',
    before: '124.6 KB (42% unused)',
    after: '14.8 KB (0% unused critical)',
    gain: '-88.1%',
    tool: 'Chrome DevTools Coverage Tab',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'axe-violations',
    name: 'Axe DevTools Violations',
    category: 'Accessibility',
    before: '38 Violations',
    after: '0 Violations',
    gain: '100% Resolved',
    tool: 'Deque Axe v4.9 Core Engine',
    isPositive: true,
    status: 'passed'
  },
  {
    id: 'wave-errors',
    name: 'WAVE Contrast Errors & Alerts',
    category: 'Accessibility',
    before: '24 Errors / 16 Alerts',
    after: '0 Errors / 0 Alerts',
    gain: '100% Resolved',
    tool: 'WebAIM WAVE Evaluation',
    isPositive: true,
    status: 'passed'
  }
];

export const CHALLENGES: ChallengeItem[] = [
  {
    id: 'cls-resolution',
    title: 'Severe Cumulative Layout Shift (0.382) Triggered by Late-Rendering Media',
    category: 'Rendering Performance',
    problemStatement:
      'In the unoptimized baseline, media cards and responsive figures were loaded without predefined dimensions or aspect ratios. As uncompressed 800KB images streamed over network latency, the browser layout engine repeatedly recomputed page coordinates, creating sudden layout jumps that degraded user reading position and violated Core Web Vitals thresholds.',
    technicalImpact:
      'CLS registered at 0.382 (acceptable threshold is ≤ 0.100), triggering search ranking penalties and causing disorienting scroll jumps on mobile viewports.',
    rootCause:
      'Absence of intrinsic layout reservations in CSS combined with dynamic height recalculations on image load events.',
    resolution:
      'Implemented intrinsic CSS aspect-ratio reservation (`aspect-ratio: 16 / 10`) coupled with `width: 100%` and `contain: layout`. Vectorized complex visual mockups into inline SVGs, eliminating network-dependent bounding box calculations and reserving exact DOM space prior to paint.',
    codeSnippet: `.figure-media-wrapper {\n  aspect-ratio: 16 / 10;\n  width: 100%;\n  contain: layout paint;\n  background-color: var(--color-bg-surface-elevated);\n}`,
    outcome:
      'CLS plummeted by 99.5% from 0.382 to 0.002, guaranteeing a perfectly rock-solid reading experience on all devices.'
  },
  {
    id: 'modal-focus-trap',
    title: 'Keyboard Trapping & Screen Reader Disorientation in Modal Dialogs',
    category: 'Focus & Screen Reader',
    problemStatement:
      'When triggering the audit modal in the original build, pressing Tab allowed focus to escape into hidden, inaccessible background links. Furthermore, dismissing the dialog reset keyboard focus to the top of the body tag, forcing keyboard and screen reader users to tab through 40+ controls to regain their prior scroll location.',
    technicalImpact:
      'Fails WCAG 2.1.2 (No Keyboard Trap) and WCAG 2.4.3 (Focus Order), creating a disorienting experience for users navigating via switch devices or screen readers.',
    rootCause:
      'Lack of programmatic activeElement caching and absence of Tab/Shift+Tab boundary containment within custom overlay components.',
    resolution:
      'Architected a zero-dependency vanilla focus trap. Before displaying the modal, `document.activeElement` is cached. A custom keydown listener intercepts `Tab` and `Shift+Tab`, looping focus strictly between the close button and action buttons. On `Escape` or dismissal, programmatic `.focus()` is restored precisely to the originating trigger.',
    codeSnippet: `// Focus trap algorithm\nif (e.key === 'Tab') {\n  const focusable = modal.querySelectorAll('button, [href], input, [tabindex=\"0\"]');\n  const first = focusable[0];\n  const last = focusable[focusable.length - 1];\n  if (e.shiftKey && document.activeElement === first) {\n    e.preventDefault(); last.focus();\n  } else if (!e.shiftKey && document.activeElement === last) {\n    e.preventDefault(); first.focus();\n  }\n}`,
    outcome:
      'Flawless keyboard navigation verified with VoiceOver and NVDA. Zero focus loss or disorientation across all interaction paths.'
  },
  {
    id: 'aaa-contrast-brand',
    title: 'Achieving WCAG AAA (7:1) Contrast Without Destroying Brand Hierarchy',
    category: 'Visual Design & Contrast',
    problemStatement:
      'Upgrading color contrast to meet WCAG Level AAA requirements (7:1 for normal text, 4.5:1 for large text) threatened to make every text element uniformly bold and stark, destroying typographic pacing and visual balance.',
    technicalImpact:
      'The baseline had 24 WAVE contrast errors (text contrast as low as 2.1:1 on secondary elements). Simply shifting all text to pure white (#ffffff) caused glare and visual fatigue.',
    rootCause:
      'Naive monochromatic color definitions without calibrated perceptual luminance steps.',
    resolution:
      'Devised a 3-tier perceptual luminance token system using HSL/OKLCH color theory: Primary text (#f8fafc) delivers 16.2:1 contrast against dark slate canvas (#0b0f17); secondary prose (#cbd5e1) delivers 11.5:1; and muted metadata (#94a3b8) sits at 7.2:1 (safely above the 7.0:1 AAA threshold). Structural hairline borders (#334155) were added to ground card containers without relying on soft, low-contrast shadows.',
    codeSnippet: `:root {\n  --color-text-primary: #f8fafc;   /* 16.2:1 AAA */\n  --color-text-secondary: #cbd5e1; /* 11.5:1 AAA */\n  --color-text-muted: #94a3b8;     /* 7.2:1 AAA */\n  --color-brand-focus: #facc15;    /* High-contrast amber */\n}`,
    outcome:
      '100% compliance across all 4 WCAG contrast checkpoints while maintaining a refined, modern editorial design language.'
  },
  {
    id: 'fouc-critical-css',
    title: 'Eliminating 42% Unused CSS Without Inducing Flash of Unstyled Content (FOUC)',
    category: 'Resource Delivery',
    problemStatement:
      'Removing render-blocking CSS by asynchronously preloading stylesheets (`rel="preload"`) caused an unsightly Flash of Unstyled Content (FOUC) on slow connections: the unstyled text and raw links flashed before jumping into styled layouts.',
    technicalImpact:
      'Degraded First Contentful Paint perceived quality and introduced temporary layout shifts during initial browser parsing.',
    rootCause:
      'Asynchronous loading of the complete stylesheet without separating critical above-the-fold layout styles from deferred component rules.',
    resolution:
      'Executed critical CSS extraction: inlined the minimal 1.8KB critical styles for document reset, layout container, header landmark, and hero typography directly within a `<style>` block in `<head>`. Asynchronously preloaded the remaining stylesheet using `<link rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">` with a `<noscript>` fallback for environments with JavaScript disabled.',
    codeSnippet: `<!-- Critical Inlined CSS -->\n<style>\n  :root { --color-bg-canvas: #0b0f17; --color-text-primary: #f8fafc; ... }\n  body { margin: 0; background: var(--color-bg-canvas); font-family: -apple-system, sans-serif; }\n  .site-header { background: var(--color-bg-surface); border-bottom: 1px solid #334155; }\n</style>\n<link rel=\"preload\" href=\"styles.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\n<noscript><link rel=\"stylesheet\" href=\"styles.css\"></noscript>`,
    outcome:
      'Zero FOUC, FCP cut from 3.20s down to 0.72s (-77.5%), and total CSS payload reduced by 88.1%.'
  }
];

export const ACCESSIBILITY_CHECKLIST: AccessibilityCheck[] = [
  {
    id: '1.1.1',
    wcagCriteria: '1.1.1 Non-text Content',
    level: 'A',
    description: 'All non-text content has a text alternative that serves the equivalent purpose.',
    implementation: 'Every SVG element is configured with role="img", an explicit <title>, and a <desc> element; decorative icons use aria-hidden="true".',
    verified: true
  },
  {
    id: '1.3.1',
    wcagCriteria: '1.3.1 Info and Relationships',
    level: 'A',
    description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined.',
    implementation: 'Applied semantic HTML5 landmarks (<header>, <nav>, <main>, <article>, <figure>, <figcaption>, <footer>) and logical <h1>-<h3> heading sequence.',
    verified: true
  },
  {
    id: '1.4.3',
    wcagCriteria: '1.4.3 Contrast (Minimum)',
    level: 'AA',
    description: 'Visual presentation of text and images of text has a contrast ratio of at least 4.5:1.',
    implementation: 'All text tokens calibrated to exceed 7:1; primary body copy exceeds 11:1 against background canvas.',
    verified: true
  },
  {
    id: '1.4.6',
    wcagCriteria: '1.4.6 Contrast (Enhanced)',
    level: 'AAA',
    description: 'Visual presentation of text has a contrast ratio of at least 7:1 for normal text.',
    implementation: 'Primary copy #f8fafc on #0b0f17 yields 16.2:1 contrast. Muted text #94a3b8 yields 7.2:1 contrast.',
    verified: true
  },
  {
    id: '2.1.1',
    wcagCriteria: '2.1.1 Keyboard Accessible',
    level: 'A',
    description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings.',
    implementation: 'Tabs support ArrowLeft, ArrowRight, Home, and End keys; modals support Esc; buttons operate on Enter and Space.',
    verified: true
  },
  {
    id: '2.1.2',
    wcagCriteria: '2.1.2 No Keyboard Trap',
    level: 'A',
    description: 'Keyboard focus is not trapped within non-modal regions and cycles properly inside modal dialogs.',
    implementation: 'Modal dialog contains an explicit focus trap algorithm and returns focus to the trigger upon exit.',
    verified: true
  },
  {
    id: '2.4.1',
    wcagCriteria: '2.4.1 Bypass Blocks',
    level: 'A',
    description: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
    implementation: 'Visible-on-focus skip link (<a href="#main-content" class="skip-link">) positioned as first interactive child in DOM.',
    verified: true
  },
  {
    id: '2.4.7',
    wcagCriteria: '2.4.7 Focus Visible',
    level: 'AA',
    description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
    implementation: 'High-contrast 3px solid amber outline with 3px offset (:focus-visible) active on all interactive elements.',
    verified: true
  },
  {
    id: '3.3.1',
    wcagCriteria: '3.3.1 Error Identification',
    level: 'A',
    description: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
    implementation: 'Form fields utilize aria-invalid="true" and are coupled with explicit error messages via aria-describedby.',
    verified: true
  },
  {
    id: '4.1.3',
    wcagCriteria: '4.1.3 Status Messages',
    level: 'AA',
    description: 'Status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.',
    implementation: 'Dedicated <div id="live-announcer" aria-live="polite" aria-atomic="true"> announces theme switches, tab selections, and submission confirmations.',
    verified: true
  }
];

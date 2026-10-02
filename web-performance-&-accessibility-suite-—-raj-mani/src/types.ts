export type ActiveTab = 'showcase' | 'report' | 'code' | 'tools';

export interface BenchmarkMetric {
  id: string;
  name: string;
  category: 'Performance' | 'Accessibility' | 'Payload & Redundancy';
  before: string;
  after: string;
  gain: string;
  tool: string;
  isPositive: boolean;
  status: 'passed' | 'critical';
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: 'Rendering Performance' | 'Focus & Screen Reader' | 'Visual Design & Contrast' | 'Resource Delivery';
  problemStatement: string;
  technicalImpact: string;
  rootCause: string;
  resolution: string;
  codeSnippet?: string;
  outcome: string;
}

export interface AccessibilityCheck {
  id: string;
  wcagCriteria: string;
  level: 'A' | 'AA' | 'AAA';
  description: string;
  implementation: string;
  verified: boolean;
}

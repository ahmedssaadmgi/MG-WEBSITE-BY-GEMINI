export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: MonsterStyle;
  timestamp: number;
}

export enum MonsterStyle {
  SAAS_DASHBOARD = 'SaaS Dashboard UI',
  MOBILE_APP = 'Modern Mobile App Interface',
  SYSTEM_ARCHITECTURE = 'Cloud Infrastructure Diagram',
  AI_VISUALIZATION = 'AI/ML Data Visualization',
  CORPORATE_IDENTITY = 'Corporate Brand Identity',
  WEBSITE_LANDING = 'High-Conversion Landing Page'
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  tags: string[];
  region?: string;
  partner?: string;
  category: 'AI/ML' | 'SaaS' | 'Mobile' | 'Platform' | 'HealthTech';
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  currentImage: GeneratedImage | null;
}

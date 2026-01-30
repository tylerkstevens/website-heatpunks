export type GrantCategoryId =
  | 'technical-standards'
  | 'academic-research'
  | 'regulatory-advocacy'
  | 'case-studies'
  | 'educational-content'
  | 'other';

export interface GrantCategory {
  id: GrantCategoryId;
  name: string;
  description: string;
}

export interface GrantFAQ {
  question: string;
  answer: string;
}

export interface GrantApplication {
  // Contact Info
  name: string;
  email: string;
  organization: string;
  country: string;

  // Project Details
  category: GrantCategoryId;
  projectTitle: string;
  projectDescription: string;
  budget: number;
  timeline: string;

  // Impact & Background
  impact: string;
  background: string;

  // Optional
  references: string;
  source: string;

  // Acknowledgements (all must be true)
  ackBitcoin: boolean;
  ackOpenLicense: boolean;
  ackPublicShare: boolean;
  ackNoGuarantee: boolean;
  ackContact: boolean;
}

export const GRANT_CHAR_LIMIT = 3000;

import type { GrantCategory, GrantFAQ, GrantCategoryId } from '@/types/grants';

export const grantCategories: GrantCategory[] = [
  {
    id: 'technical-standards',
    name: 'Technical Standards & Certifications',
    description: 'Work toward safety certifications (UL, CE), ASHRAE standards, building code integration, and technical documentation.',
  },
  {
    id: 'academic-research',
    name: 'Academic Research & Publications',
    description: 'Peer-reviewed research, thermal efficiency studies, ASHRAE publications, and academic partnerships.',
  },
  {
    id: 'regulatory-advocacy',
    name: 'Regulatory & Policy Advocacy',
    description: 'Building code advocacy, permitting guidance, engagement with officials and policymakers worldwide.',
  },
  {
    id: 'case-studies',
    name: 'Case Studies & Documentation',
    description: 'Document installations, collect performance data, publish findings for industry reference.',
  },
  {
    id: 'educational-content',
    name: 'Educational Content & Training',
    description: 'Tutorials, training materials, workshops, content for HVAC professionals and builders.',
  },
];

// Derive dropdown options from grantCategories to avoid duplication
export const categoryOptions: { value: GrantCategoryId; label: string }[] = [
  ...grantCategories.map(cat => ({ value: cat.id, label: cat.name })),
  { value: 'other', label: 'Other' },
];

export const grantFAQs: GrantFAQ[] = [
  {
    question: 'Who can apply?',
    answer: 'Anyone - individuals, teams, companies, universities, and nonprofits from anywhere in the world.',
  },
  {
    question: 'Are there geographic restrictions?',
    answer: 'No. We welcome applications from anywhere globally. Hashrate heating is a worldwide opportunity.',
  },
  {
    question: 'What categories are funded?',
    answer: 'We fund work in technical standards, academic research, regulatory advocacy, case studies, and educational content. These categories are suggestions - we\'re open to other ideas that advance hashrate heating.',
  },
  {
    question: 'How much can I request?',
    answer: 'There are no fixed grant amounts. Request what you need for your project and justify it in your application.',
  },
  {
    question: 'How are grants paid?',
    answer: 'All grants are paid in Bitcoin.',
  },
  {
    question: 'What\'s the review process?',
    answer: 'We review applications on a rolling basis. There are no deadlines. If we\'re interested, we\'ll reach out to learn more.',
  },
  {
    question: 'Can I apply multiple times?',
    answer: 'Yes. There\'s no limit on the number of proposals you can submit.',
  },
  {
    question: 'What if my proposal is rejected?',
    answer: 'You can reapply immediately with a revised or new proposal.',
  },
  {
    question: 'What about intellectual property?',
    answer: 'Work funded by these grants must be released under an open/permissive license to benefit the broader community.',
  },
];

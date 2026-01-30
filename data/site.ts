export const siteConfig = {
  name: 'Hashrate Heatpunks',
  tagline: 'A community working on the emerging hashrate heating industry - Marrying the bitcoin mining and heating sectors to bring hashrate back to homes and businesses',
  description: 'A community of bitcoiners and heating industry specialists advancing the hashrate heating industry.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://heatpunks.org',

  links: {
    telegram: 'https://t.me/heatpunks',
    twitter: 'https://x.com/HashHeatpunks',
    forum: 'https://forum.heatpunks.org',
    foundation: 'https://256foundation.org',
    foundationGithub: 'https://github.com/256foundation',
  },

  contact: {
    email: 'admin@heatpunks.org',
  },

  foundation: {
    name: '256 Foundation',
    mission: 'dismantling the proprietary mining empire',
    url: 'https://256foundation.org',
    github: 'https://github.com/256foundation',
  },
};

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Education', href: '/education' },
  { name: 'Grants', href: '/grants' },
  {
    name: 'Summit',
    href: '/summit',
    children: [
      { name: 'Overview', href: '/summit' },
      { name: 'Schedule', href: '/summit/schedule' },
    ]
  },
  { name: 'Forum', href: 'https://forum.heatpunks.org', external: true },
  { name: 'Group Chat', href: 'https://t.me/heatpunks', external: true },
];

import type { Metadata } from 'next';
import { HeroSection } from '@/components/grants/HeroSection';
import { WhySection } from '@/components/grants/WhySection';
import { CategoriesSection } from '@/components/grants/CategoriesSection';
import { ApplicationSection } from '@/components/grants/ApplicationSection';
import { FAQSection } from '@/components/grants/FAQSection';
import { DonateSection } from '@/components/grants/DonateSection';
import { ContactSection } from '@/components/grants/ContactSection';

export const metadata: Metadata = {
  title: 'Grants',
  description: 'Apply for grants to advance hashrate heating adoption. The 256 Foundation funds technical standards, research, advocacy, case studies, and educational content.',
};

export default function GrantsPage() {
  return (
    <div className="bg-[var(--background)]">
      <HeroSection />
      <WhySection />
      <CategoriesSection />
      <ApplicationSection />
      <FAQSection />
      <DonateSection />
      <ContactSection />
    </div>
  );
}

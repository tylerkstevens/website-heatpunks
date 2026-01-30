import { HeroSection } from '@/components/landing/HeroSection';
import { ForumFeed } from '@/components/landing/ForumFeed';
import { CommunityGallery } from '@/components/landing/CommunityGallery';
import { LinksSection } from '@/components/landing/LinksSection';
import { GrantsSection } from '@/components/landing/GrantsSection';
import { ContactSection } from '@/components/landing/ContactSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ForumFeed />
      <CommunityGallery />
      <LinksSection />
      <GrantsSection />
      <ContactSection />
    </div>
  );
}

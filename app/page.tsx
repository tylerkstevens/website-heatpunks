import { HeroSection } from '@/components/landing/HeroSection';
import { ForumFeed } from '@/components/landing/ForumFeed';
import { LinksSection } from '@/components/landing/LinksSection';
import { ContactSection } from '@/components/landing/ContactSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ForumFeed />
      <LinksSection />
      <ContactSection />
    </div>
  );
}

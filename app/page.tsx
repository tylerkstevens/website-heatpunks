import { HeroSection } from '@/components/landing/HeroSection';
import { ForumFeed } from '@/components/landing/ForumFeed';
import { CommunityGallery } from '@/components/landing/CommunityGallery';
import { LinksSection } from '@/components/landing/LinksSection';
import { GrantsSection } from '@/components/landing/GrantsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { getDiscourseData } from '@/lib/discourse';

export default async function HomePage() {
  // Fetch all Discourse data once (topics + images from single API call)
  const discourseData = await getDiscourseData(8, 12);

  return (
    <div>
      <HeroSection />
      <ForumFeed topics={discourseData?.topics} />
      <CommunityGallery images={discourseData?.images} />
      <LinksSection />
      <GrantsSection />
      <ContactSection />
    </div>
  );
}

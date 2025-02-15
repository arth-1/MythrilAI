import FaqSection from "@/components/FaqSection";
import Footer from "@/components/footer";
import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNabvbar } from "@/components/landing-navbar";

function LandingPage() {
  return (
    <div className="h-full">
      <LandingNabvbar />
      <LandingHero />
      <LandingContent />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default LandingPage;

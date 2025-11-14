import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import IncentiveSection from '@/components/sections/IncentiveSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <IncentiveSection />
        <UseCasesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

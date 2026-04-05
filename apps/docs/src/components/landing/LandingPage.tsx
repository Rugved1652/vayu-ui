import { Hero } from './Hero';
import { ComponentShowcase } from './ComponentShowcase';
import { WhyVedUI } from './WhyVedUI';
import { GetStarted } from './GetStarted';

export function LandingPage() {
  return (
    <div className="bg-canvas text-canvas-content min-h-screen">
      <Hero />
      <ComponentShowcase />
      <WhyVedUI />
      <GetStarted />
    </div>
  );
}

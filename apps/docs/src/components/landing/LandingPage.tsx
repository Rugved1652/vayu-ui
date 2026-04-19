import { Hero } from './Hero';
import { ComponentShowcase } from './ComponentShowcase';
import { WhyVayuUI } from './WhyVayuUI';
import { GetStarted } from './GetStarted';

export function LandingPage() {
  return (
    <div className="bg-canvas text-canvas-content min-h-screen">
      <Hero />
      <ComponentShowcase />
      <WhyVayuUI />
      <GetStarted />
    </div>
  );
}

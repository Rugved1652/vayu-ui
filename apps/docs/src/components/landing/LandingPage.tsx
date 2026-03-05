import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { AIEraSection } from "./AIEraSection";
import { CodePreview } from "./CodePreview";
import { FinalCTA } from "./FinalCTA";

export function LandingPage() {
    return (
        <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
            <Hero />
            <ProblemSection />
            <Features />
            <HowItWorks />
            <AIEraSection />
            <CodePreview />
            <FinalCTA />
        </div>
    );
}

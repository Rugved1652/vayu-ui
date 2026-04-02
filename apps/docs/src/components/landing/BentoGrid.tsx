import {
  ArrowRight,
  Box,
  CreditCard,
  LayoutTemplate,
  MousePointerClick,
  Table,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';

function BentoCard({
  name,
  description,
  icon: Icon,
  className,
}: {
  name: string;
  description: string;
  icon: any;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-elevated dark:bg-surface/50 p-6 shadow-surface transition-all duration-medium hover:bg-surface dark:hover:bg-surface/50 hover:shadow-elevated ${className}`}
    >
      <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-lime-500/10 blur-3xl" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-control bg-lime-100 dark:bg-lime-500/10 text-lime-600 dark:text-lime-400">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-canvas-content">{name}</h3>
          <p className="text-sm text-surface-content">{description}</p>
        </div>

        <div className="mt-4 flex items-center text-sm font-medium text-lime-600 dark:text-lime-500 opacity-0 transition-opacity group-hover:opacity-100">
          See Details <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <div className="py-24 sm:py-32 bg-canvas transition-colors duration-medium">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-canvas-content sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-lg leading-8 text-surface-content">
            Explore our comprehensive suite of components designed for modern applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Card 1 - Large spanning */}
          <BentoCard
            name="Data Tables"
            description="Powerful tables with sorting, filtering, and pagination built-in."
            icon={Table}
            className="sm:col-span-2 lg:col-span-2"
          />
          <BentoCard
            name="Buttons & Inputs"
            description="Accessible interactive elements with various states and styles."
            icon={MousePointerClick}
            className=""
          />
          <BentoCard
            name="Layouts"
            description="Pre-built layouts for dashboards, landing pages, and more."
            icon={LayoutTemplate}
            className=""
          />
          <BentoCard
            name="Cards & Modals"
            description="Versatile containers for displaying content and capturing input."
            icon={CreditCard}
            className="sm:col-span-2 lg:col-span-2"
          />
          <BentoCard
            name="Utilities"
            description="A collection of helper functions and hooks."
            icon={Terminal}
            className=""
          />
          <BentoCard
            name="3D Components"
            description="Immersive 3D elements to make your app stand out."
            icon={Box}
            className=""
          />
        </div>
      </div>
    </div>
  );
}

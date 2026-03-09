"use client";

import React, { useState } from "react";
import { Badge } from "vayu-ui"; // Update path to match your project

export default function BadgeDemoPage() {
  // State for Dismissible Demos
  const [tags, setTags] = useState(["React", "Tailwind", "Typescript", "Next.js"]);
  const [filters, setFilters] = useState([
    { id: "f1", label: "Active" },
    { id: "f2", label: "Verified" },
  ]);

  // Handlers
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const resetDemo = () => {
    setTags(["React", "Tailwind", "Typescript", "Next.js"]);
    setFilters([
      { id: "f1", label: "Active" },
      { id: "f2", label: "Verified" },
    ]);
  };

  return (
    <div className="min-h-screen bg-ground-50 dark:bg-ground-950 p-8 md:p-16 font-secondary">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-h1 font-primary text-ground-950 dark:text-ground-50">
            Badge Component
          </h1>
          <p className="text-para text-ground-600 dark:text-ground-400 max-w-2xl">
            A flexible, accessible Badge component. Supports variants, interactive modes (onClick), 
            and dismissible states. Compliant with WCAG 2.2 target sizes.
          </p>
        </div>

        {/* Section 1: Variants */}
        <section className="space-y-4">
          <h2 className="text-h3 font-primary border-b border-ground-200 dark:border-ground-800 pb-2">
            Variants
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        {/* Section 2: Sizes */}
        <section className="space-y-4">
          <h2 className="text-h3 font-primary border-b border-ground-200 dark:border-ground-800 pb-2">
            Sizes
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge size="sm" variant="primary">Small (24px)</Badge>
            <Badge size="md" variant="primary">Medium (28px)</Badge>
            <Badge size="lg" variant="primary">Large (32px)</Badge>
          </div>
        </section>

        {/* Section 3: Interactive (Clickable) */}
        <section className="space-y-4">
          <h2 className="text-h3 font-primary border-b border-ground-200 dark:border-ground-800 pb-2">
            Interactive
          </h2>
          <p className="text-sm text-ground-500">Click to trigger an alert.</p>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge 
              variant="info" 
              onClick={() => alert("Badge clicked!")}
            >
              Click Me
            </Badge>
            
            <Badge 
              variant="secondary" 
              onClick={() => alert("Action triggered!")}
            >
              Action
            </Badge>
          </div>
        </section>

        {/* Section 4: Dismissible (Stateful) */}
        <section className="space-y-4">
          <h2 className="text-h3 font-primary border-b border-ground-200 dark:border-ground-800 pb-2">
            Dismissible
          </h2>
          <p className="text-sm text-ground-500">Click the X to remove tags.</p>
          
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  onDismiss={() => removeTag(tag)}
                  dismissLabel={`Remove ${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-ground-300 dark:border-ground-700 rounded-lg text-center">
              <p className="text-sm text-ground-500">All tags removed.</p>
            </div>
          )}
        </section>

        {/* Section 5: Interactive & Dismissible (Complex) */}
        <section className="space-y-4">
          <h2 className="text-h3 font-primary border-b border-ground-200 dark:border-ground-800 pb-2">
            Interactive + Dismissible
          </h2>
          <p className="text-sm text-ground-500">
            Click text to trigger filter, click X to remove.
          </p>

          {filters.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant="primary"
                  onClick={() => alert(`Filter applied: ${filter.label}`)}
                  onDismiss={() => removeFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-ground-300 dark:border-ground-700 rounded-lg text-center">
              <p className="text-sm text-ground-500">No filters active.</p>
            </div>
          )}
        </section>

        {/* Reset Button */}
        <div className="pt-8">
          <button
            onClick={resetDemo}
            className="px-4 py-2 text-sm font-primary bg-ground-900 text-ground-50 rounded-md hover:bg-ground-800 transition-colors"
          >
            Reset Demos
          </button>
        </div>

      </div>
    </div>
  );
}
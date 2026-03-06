// apps/docs/src/components/demos/spinner-demo.tsx

"use client";

import { Spinner } from "vayu-ui";

export default function SpinnerDemo() {
  return (
    <div className="w-full max-w-md not-prose space-y-8">
      {/* ── Sizes ── */}
      <div className="space-y-3">
        <h3
          id="spinner-demo-label"
          className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300"
        >
          Sizes
        </h3>
        <div className="flex items-center gap-6 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>

      {/* ── With Labels ── */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
          With Loading Text
        </h3>
        <div className="flex items-center gap-3 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg">
          <Spinner size="sm" />
          <span className="text-sm font-secondary text-ground-600 dark:text-ground-400">
            Loading data...
          </span>
        </div>
      </div>

      {/* ── Button Integration ── */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
          Button Integration
        </h3>
        <div className="flex items-center gap-3">
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-ground-900 font-primary font-medium rounded opacity-70 cursor-not-allowed"
          >
            <Spinner size="sm" className="border-ground-900 border-t-transparent" />
            Processing...
          </button>
        </div>
      </div>

      {/* ── Custom Color ── */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
          Custom Color
        </h3>
        <div className="flex items-center gap-6 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg">
          <Spinner size="md" className="border-info-500 border-t-transparent dark:border-info-400 dark:border-t-transparent" />
          <Spinner size="md" className="border-success-500 border-t-transparent dark:border-success-400 dark:border-t-transparent" />
          <Spinner size="md" className="border-warning-500 border-t-transparent dark:border-warning-400 dark:border-t-transparent" />
          <Spinner size="md" className="border-error-500 border-t-transparent dark:border-error-400 dark:border-t-transparent" />
        </div>
      </div>
    </div>
  );
}

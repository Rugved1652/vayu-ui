import { Spinner } from "vayu-ui";

export default function SpinnerDemo() {
    return (
        <div className="w-full max-w-md not-prose space-y-8">
            {/* ── Sizes ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    Sizes
                </h3>
                <div className="flex items-center gap-6 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg">
                    <Spinner size="sm" aria-label="Loading (small)" />
                    <Spinner size="md" aria-label="Loading (medium)" />
                    <Spinner size="lg" aria-label="Loading (large)" />
                </div>
            </div>

            {/* ── With Labels ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    With Loading Text
                </h3>
                <div
                    className="flex items-center gap-3 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg"
                    role="status"
                    aria-live="polite"
                >
                    <Spinner size="sm" aria-label="Fetching user data" />
                    <span className="text-sm font-secondary text-ground-600 dark:text-ground-400">
                        Fetching user data...
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
                        aria-busy="true"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-ground-900 font-primary font-medium rounded opacity-70 cursor-not-allowed"
                    >
                        <Spinner
                            size="sm"
                            className="border-ground-900 border-t-transparent"
                            aria-label="Processing payment"
                        />
                        Processing...
                    </button>
                </div>
            </div>

            {/* ── Custom Colors ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    Custom Colors
                </h3>
                <div className="flex items-center gap-6 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg">
                    <Spinner
                        size="md"
                        className="border-info-500 border-t-transparent dark:border-info-400 dark:border-t-transparent"
                        aria-label="Loading info"
                    />
                    <Spinner
                        size="md"
                        className="border-success-500 border-t-transparent dark:border-success-400 dark:border-t-transparent"
                        aria-label="Loading success"
                    />
                    <Spinner
                        size="md"
                        className="border-warning-500 border-t-transparent dark:border-warning-400 dark:border-t-transparent"
                        aria-label="Loading warning"
                    />
                    <Spinner
                        size="md"
                        className="border-error-500 border-t-transparent dark:border-error-400 dark:border-t-transparent"
                        aria-label="Loading error"
                    />
                </div>
            </div>

            {/* ── Accessibility Example ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    Accessibility (Screen Reader)
                </h3>
                <div className="flex items-center gap-3 p-4 bg-ground-100 dark:bg-ground-800 rounded-lg">
                    <Spinner
                        size="md"
                        aria-label="Loading your dashboard preferences"
                    />
                    <span className="text-sm font-secondary text-ground-600 dark:text-ground-400">
                        Screen readers announce "Loading your dashboard preferences"
                    </span>
                </div>
            </div>
        </div>
    );
}

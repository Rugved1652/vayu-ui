// ============================================================================
// Template Registry
// Maps template slugs to GitHub repos for `vayu-ui create`
// ============================================================================

export interface TemplateInfo {
    /** Display name */
    name: string;
    /** CLI identifier — what user types: vayu-ui create starter */
    slug: string;
    /** Short description */
    description: string;
    /** GitHub repo in owner/repo format */
    repo: string;
    /** Default branch */
    branch: string;
}

export const templates: TemplateInfo[] = [
    {
        name: "Starter",
        slug: "starter",
        description: "Minimal Next.js + Vayu UI starter",
        repo: "Rugved1652/vayuui-template-starter",
        branch: "main",
    },
    {
        name: "Dashboard",
        slug: "dashboard",
        description: "Admin dashboard template with Vayu UI components",
        repo: "Rugved1652/vayuui-template-dashboard",
        branch: "main",
    },
    {
        name: "Landing Page",
        slug: "landing-page",
        description: "Marketing landing page with Vayu UI",
        repo: "Rugved1652/vayuui-template-landing-page",
        branch: "main",
    },
];

export function findTemplate(slug: string): TemplateInfo | undefined {
    return templates.find((t) => t.slug === slug);
}

/**
 * Resolve a template argument to a repo + branch.
 * Supports:
 *   - Registered slug: "dashboard"
 *   - GitHub owner/repo: "Rugved1652/my-template"
 *   - Full GitHub URL: "https://github.com/Rugved1652/my-template"
 */
export function resolveTemplate(input: string): { repo: string; branch: string; name: string } | null {
    // 1. Try registered slug first
    const registered = findTemplate(input);
    if (registered) {
        return { repo: registered.repo, branch: registered.branch, name: registered.name };
    }

    // 2. GitHub URL: https://github.com/owner/repo
    const urlMatch = input.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)\/?$/);
    if (urlMatch) {
        const repo = urlMatch[1].replace(/\.git$/, "");
        return { repo, branch: "main", name: repo.split("/")[1] };
    }

    // 3. owner/repo format
    if (/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(input)) {
        return { repo: input, branch: "main", name: input.split("/")[1] };
    }

    return null;
}

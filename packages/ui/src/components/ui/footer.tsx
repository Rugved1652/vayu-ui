import React, { forwardRef } from "react";
import { clsx } from "clsx";

// ==================== Types ====================

type FooterVariant = "default" | "minimal" | "centered";

interface FooterRootProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: FooterVariant;
}

interface FooterSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
}

interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    external?: boolean;
}

interface FooterLogoProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    href?: string;
}

interface FooterSocialProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface FooterCopyrightProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface FooterDividerProps extends React.HTMLAttributes<HTMLHRElement> { }

// ==================== Main Footer Component ====================

const FooterRoot = forwardRef<HTMLElement, FooterRootProps>(
    ({ children, variant = "default", className = "", ...props }, ref) => {
        return (
            <footer
                ref={ref}
                data-variant={variant}
                className={clsx(
                    "group/footer", // Group marker for children to target
                    "bg-neutral-50 dark:bg-neutral-950",
                    "text-neutral-900 dark:text-neutral-100",
                    "font-sans",
                    "transition-colors duration-300",
                    className
                )}
                role="contentinfo"
                {...props}
            >
                {children}
            </footer>
        );
    }
);
FooterRoot.displayName = "Footer";

// ==================== Footer Container ====================

const FooterContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
FooterContainer.displayName = "Footer.Container";

// ==================== Footer Grid ====================

const FooterGrid = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "grid gap-8",
                    // Default behavior: 4 columns
                    "group-data-[variant=default]/footer:grid-cols-1 group-data-[variant=default]/footer:md:grid-cols-2 group-data-[variant=default]/footer:lg:grid-cols-4",
                    // Centered behavior: 1 column, centered text
                    "group-data-[variant=centered]/footer:grid-cols-1 group-data-[variant=centered]/footer:text-center group-data-[variant=centered]/footer:justify-items-center",
                    // Minimal behavior: 1 column
                    "group-data-[variant=minimal]/footer:grid-cols-1 group-data-[variant=minimal]/footer:md:grid-cols-2",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
FooterGrid.displayName = "Footer.Grid";

// ==================== Footer Section ====================

const FooterSection = forwardRef<HTMLElement, FooterSectionProps>(
    ({ children, title, className = "", ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={clsx("flex flex-col gap-4", className)}
                {...props}
            >
                {title && (
                    <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 uppercase tracking-wide transition-colors duration-300">
                        {title}
                    </h3>
                )}
                <nav
                    className="flex flex-col gap-2"
                    aria-label={title ? `${title} links` : "Footer navigation"}
                >
                    {children}
                </nav>
            </section>
        );
    }
);
FooterSection.displayName = "Footer.Section";

// ==================== Footer Link ====================

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
    ({ children, external = false, className = "", href, ...props }, ref) => {
        const linkText = typeof children === "string" ? children : "link";

        return (
            <a
                ref={ref}
                href={href}
                className={clsx(
                    "text-neutral-600 dark:text-neutral-400", // Accessible text color
                    "hover:text-primary-600 dark:hover:text-primary-400",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950",
                    "rounded-sm",
                    "inline-flex items-center gap-1.5",
                    "underline-offset-4 hover:underline",
                    className
                )}
                {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                })}
                aria-label={external ? `${linkText} (opens in new tab)` : undefined}
                {...props}
            >
                {children}
                {external && (
                    <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                )}
            </a>
        );
    }
);
FooterLink.displayName = "Footer.Link";

// ==================== Footer Logo ====================

const FooterLogo = forwardRef<HTMLDivElement, FooterLogoProps>(
    ({ children, href = "/", className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx("flex items-center gap-3", className)}
                {...props}
            >
                {href ? (
                    <a
                        href={href}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950 rounded-sm"
                        aria-label="Home"
                    >
                        {children}
                    </a>
                ) : (
                    children
                )}
            </div>
        );
    }
);
FooterLogo.displayName = "Footer.Logo";

// ==================== Footer Social ====================

const FooterSocial = forwardRef<HTMLDivElement, FooterSocialProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <nav
                ref={ref}
                className={clsx("flex gap-4 items-center", className)}
                aria-label="Social media links"
                {...props}
            >
                {children}
            </nav>
        );
    }
);
FooterSocial.displayName = "Footer.Social";

// ==================== Footer Social Link ====================

const FooterSocialLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
    (
        {
            children,
            href,
            className = "",
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        return (
            <a
                ref={ref}
                href={href}
                className={clsx(
                    "text-neutral-600 dark:text-neutral-400",
                    "hover:text-primary-600 dark:hover:text-primary-400",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-900", // Fixed bg color names
                    "transition-all duration-200",
                    "p-2.5 rounded-full min-w-[44px] min-h-[44px]", // Min touch target
                    "flex items-center justify-center",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950",
                    className
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                {...props}
            >
                {children}
            </a>
        );
    }
);
FooterSocialLink.displayName = "Footer.SocialLink";

// ==================== Footer Copyright ====================

const FooterCopyright = forwardRef<HTMLDivElement, FooterCopyrightProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "text-neutral-600 dark:text-neutral-400",
                    "text-sm transition-colors duration-300",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
FooterCopyright.displayName = "Footer.Copyright";

// ==================== Footer Divider ====================

const FooterDivider = forwardRef<HTMLHRElement, FooterDividerProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <hr
                ref={ref}
                className={clsx(
                    "border-neutral-200 dark:border-neutral-800", // Subtle divider
                    "my-8 transition-colors duration-300",
                    className
                )}
                role="separator"
                aria-orientation="horizontal"
                {...props}
            />
        );
    }
);
FooterDivider.displayName = "Footer.Divider";

// ==================== Footer Bottom ====================

const FooterBottom = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-col md:flex-row gap-4",
                    // Style adjustments based on parent variant via group-data
                    "group-data-[variant=centered]/footer:justify-center group-data-[variant=centered]/footer:items-center group-data-[variant=centered]/footer:text-center",
                    "group-data-[variant=default]/footer:justify-between group-data-[variant=default]/footer:items-center",
                    "group-data-[variant=minimal]/footer:justify-between group-data-[variant=minimal]/footer:items-center",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
FooterBottom.displayName = "Footer.Bottom";

// ==================== Attach Compound Components ====================

export const Footer = Object.assign(FooterRoot, {
    Container: FooterContainer,
    Grid: FooterGrid,
    Section: FooterSection,
    Link: FooterLink,
    Logo: FooterLogo,
    Social: FooterSocial,
    SocialLink: FooterSocialLink,
    Copyright: FooterCopyright,
    Divider: FooterDivider,
    Bottom: FooterBottom,
});

export default Footer;
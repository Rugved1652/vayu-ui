// footer.tsx
// TRUE Server Component (No "use client" needed!)

import React from "react";
import { clsx } from "clsx";

// ==================== Types ====================

type FooterVariant = "default" | "minimal" | "centered";

interface FooterRootProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: FooterVariant;
}

interface FooterSectionProps extends React.HTMLAttributes<HTMLElement> {
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

function FooterRoot({ children, variant = "default", className = "", ...props }: FooterRootProps) {
    return (
        <footer
            data-variant={variant}
            className={clsx(
                "group/footer",
                "bg-ground-50 dark:bg-ground-950",
                "text-ground-900 dark:text-ground-100",
                "font-secondary",
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
FooterRoot.displayName = "Footer";

// ==================== Footer Container ====================

function FooterContainer({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
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
FooterContainer.displayName = "Footer.Container";

// ==================== Footer Grid ====================

function FooterGrid({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "grid gap-8",
                "group-data-[variant=default]/footer:grid-cols-1 group-data-[variant=default]/footer:md:grid-cols-2 group-data-[variant=default]/footer:lg:grid-cols-4",
                "group-data-[variant=centered]/footer:grid-cols-1 group-data-[variant=centered]/footer:text-center group-data-[variant=centered]/footer:justify-items-center",
                "group-data-[variant=minimal]/footer:grid-cols-1 group-data-[variant=minimal]/footer:md:grid-cols-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
FooterGrid.displayName = "Footer.Grid";

// ==================== Footer Section ====================

function FooterSection({ children, title, className = "", ...props }: FooterSectionProps) {
    return (
        <section
            className={clsx("flex flex-col gap-4", className)}
            {...props}
        >
            {title && (
                <h3 className="font-primary font-semibold text-lg text-ground-900 dark:text-ground-50 uppercase tracking-wide transition-colors duration-300">
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
FooterSection.displayName = "Footer.Section";

// ==================== Footer Link ====================

function FooterLink({ children, external = false, className = "", href, ...props }: FooterLinkProps) {
    const isStringChild = typeof children === "string";

    const computedAriaLabel = 
        external && !props['aria-label'] && isStringChild 
        ? `${children} (opens in new tab)` 
        : props['aria-label'];

    return (
        <a
            href={href}
            className={clsx(
                "text-ground-600 dark:text-ground-400",
                "hover:text-primary-600 dark:hover:text-primary-400",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950",
                "rounded-sm",
                "inline-flex items-center gap-1.5",
                "underline-offset-4 hover:underline",
                className
            )}
            {...(external && {
                target: "_blank",
                rel: "noopener noreferrer",
            })}
            aria-label={computedAriaLabel}
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
FooterLink.displayName = "Footer.Link";

// ==================== Footer Logo ====================

function FooterLogo({ children, href = "/", className = "", ...props }: FooterLogoProps) {
    return (
        <div
            className={clsx("flex items-center gap-3", className)}
            {...props}
        >
            {href ? (
                <a
                    href={href}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950 rounded-sm"
                >
                    {children}
                </a>
            ) : (
                children
            )}
        </div>
    );
}
FooterLogo.displayName = "Footer.Logo";

// ==================== Footer Social ====================

function FooterSocial({ children, className = "", ...props }: FooterSocialProps) {
    // FIX: Changed from <nav> to <div role="list"> to prevent nested navigation landmarks
    // when used inside FooterSection.
    return (
        <div
            className={clsx("flex gap-4 items-center", className)}
            role="list"
            aria-label="Social media links"
            {...props}
        >
            {children}
        </div>
    );
}
FooterSocial.displayName = "Footer.Social";

// ==================== Footer Social Link ====================

function FooterSocialLink(
    { children, href, className = "", "aria-label": ariaLabel, ...props }: FooterLinkProps
) {
    return (
        <a
            href={href}
            className={clsx(
                "text-ground-600 dark:text-ground-400",
                "hover:text-primary-600 dark:hover:text-primary-400",
                "hover:bg-ground-100 dark:hover:bg-ground-900",
                "transition-all duration-200",
                "p-2.5 rounded-full min-w-11 min-h-11",
                "flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950",
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
FooterSocialLink.displayName = "Footer.SocialLink";

// ==================== Footer Copyright ====================

function FooterCopyright({ children, className = "", ...props }: FooterCopyrightProps) {
    return (
        <div
            className={clsx(
                "text-ground-600 dark:text-ground-400",
                "text-sm transition-colors duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
FooterCopyright.displayName = "Footer.Copyright";

// ==================== Footer Divider ====================

function FooterDivider({ className = "", ...props }: FooterDividerProps) {
    return (
        <hr
            className={clsx(
                // FIX: ground-300 for WCAG 1.4.11 Non-text Contrast
                "border-ground-300 dark:border-ground-700",
                "my-8 transition-colors duration-300",
                className
            )}
            role="separator"
            aria-orientation="horizontal"
            {...props}
        />
    );
}
FooterDivider.displayName = "Footer.Divider";

// ==================== Footer Bottom ====================

function FooterBottom({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "flex flex-col md:flex-row gap-4",
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
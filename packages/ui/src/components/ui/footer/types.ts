// types.ts
// Types

import React from "react";

export type FooterVariant = "default" | "minimal" | "centered";

export interface FooterRootProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: FooterVariant;
}

export interface FooterSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    title?: string;
}

export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    external?: boolean;
}

export interface FooterLogoProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    href?: string;
}

export interface FooterSocialProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface FooterCopyrightProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface FooterDividerProps extends React.HTMLAttributes<HTMLHRElement> { }

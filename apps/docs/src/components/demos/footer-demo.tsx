"use client";
import React from "react";
import { Footer } from "vayu-ui";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function FooterDemo() {
    return (
        <div className="w-full space-y-12 p-6 border border-ground-200 dark:border-ground-800 rounded-xl bg-ground-50 dark:bg-ground-950 overflow-hidden">

            {/* Default Footer */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider">Default Variant</h3>
                <div className="border border-ground-200 dark:border-ground-800 rounded-lg overflow-hidden bg-white dark:bg-ground-900">
                    <Footer>
                        <Footer.Container>
                            <Footer.Grid>
                                <Footer.Section>
                                    <Footer.Logo href="#">
                                        <span className="text-xl font-bold bg-linear-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Vayu UI</span>
                                    </Footer.Logo>
                                    <p className="text-sm text-ground-500 dark:text-ground-400 mt-2">
                                        Building beautiful user interfaces with modern web technologies.
                                    </p>
                                    <Footer.Social className="mt-4">
                                        <Footer.SocialLink href="#" aria-label="Twitter"><Twitter size={18} /></Footer.SocialLink>
                                        <Footer.SocialLink href="#" aria-label="GitHub"><Github size={18} /></Footer.SocialLink>
                                        <Footer.SocialLink href="#" aria-label="Instagram"><Instagram size={18} /></Footer.SocialLink>
                                    </Footer.Social>
                                </Footer.Section>

                                <Footer.Section title="Product">
                                    <Footer.Link href="#">Features</Footer.Link>
                                    <Footer.Link href="#">Integrations</Footer.Link>
                                    <Footer.Link href="#">Pricing</Footer.Link>
                                    <Footer.Link href="#">Changelog</Footer.Link>
                                </Footer.Section>

                                <Footer.Section title="Resources">
                                    <Footer.Link href="#">Documentation</Footer.Link>
                                    <Footer.Link href="#">API Reference</Footer.Link>
                                    <Footer.Link href="#">Community</Footer.Link>
                                    <Footer.Link href="#">Blog</Footer.Link>
                                </Footer.Section>

                                <Footer.Section title="Company">
                                    <Footer.Link href="#">About</Footer.Link>
                                    <Footer.Link href="#">Careers</Footer.Link>
                                    <Footer.Link href="#">Legal</Footer.Link>
                                    <Footer.Link href="#">Contact</Footer.Link>
                                </Footer.Section>
                            </Footer.Grid>

                            <Footer.Divider />

                            <Footer.Bottom>
                                <Footer.Copyright>
                                    © {new Date().getFullYear()} Vayu UI. All rights reserved.
                                </Footer.Copyright>
                                <div className="flex gap-4">
                                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                                    <Footer.Link href="#">Terms of Service</Footer.Link>
                                </div>
                            </Footer.Bottom>
                        </Footer.Container>
                    </Footer>
                </div>
            </div>

            {/* Centered Footer */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider">Centered Variant</h3>
                <div className="border border-ground-200 dark:border-ground-800 rounded-lg overflow-hidden bg-white dark:bg-ground-900">
                    <Footer variant="centered">
                        <Footer.Container>
                            <Footer.Grid>
                                <Footer.Section>
                                    <div className="flex flex-col items-center gap-4">
                                        <Footer.Logo href="#">
                                            <span className="text-xl font-bold bg-linear-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Vayu UI</span>
                                        </Footer.Logo>
                                        <nav className="flex flex-wrap justify-center gap-6 mt-4">
                                            <Footer.Link href="#">Home</Footer.Link>
                                            <Footer.Link href="#">About</Footer.Link>
                                            <Footer.Link href="#">Services</Footer.Link>
                                            <Footer.Link href="#">Contact</Footer.Link>
                                        </nav>
                                        <Footer.Social className="mt-4">
                                            <Footer.SocialLink href="#" aria-label="Twitter"><Twitter size={18} /></Footer.SocialLink>
                                            <Footer.SocialLink href="#" aria-label="GitHub"><Github size={18} /></Footer.SocialLink>
                                            <Footer.SocialLink href="#" aria-label="Linkedin"><Linkedin size={18} /></Footer.SocialLink>
                                        </Footer.Social>
                                    </div>
                                </Footer.Section>
                            </Footer.Grid>
                            <Footer.Divider />
                            <Footer.Bottom>
                                <Footer.Copyright>
                                    © {new Date().getFullYear()} Vayu UI. All rights reserved.
                                </Footer.Copyright>
                            </Footer.Bottom>
                        </Footer.Container>
                    </Footer>
                </div>
            </div>

            {/* Minimal Footer */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider">Minimal Variant</h3>
                <div className="border border-ground-200 dark:border-ground-800 rounded-lg overflow-hidden bg-white dark:bg-ground-900">
                    <Footer variant="minimal">
                        <Footer.Container>
                            <Footer.Bottom>
                                <Footer.Logo href="#">
                                    <span className="font-bold">Vayu UI</span>
                                </Footer.Logo>
                                <Footer.Copyright>
                                    © {new Date().getFullYear()} Vayu UI. Inc.
                                </Footer.Copyright>
                                <Footer.Social>
                                    <Footer.SocialLink href="#"><Github size={16} /></Footer.SocialLink>
                                    <Footer.SocialLink href="#"><Twitter size={16} /></Footer.SocialLink>
                                </Footer.Social>
                            </Footer.Bottom>
                        </Footer.Container>
                    </Footer>
                </div>
            </div>

        </div>
    );
}

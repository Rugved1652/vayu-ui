'use client';
import React from 'react';
import { Footer, Typography, Divider, Button } from 'vayu-ui';
import { Twitter, Github, Instagram, Linkedin } from 'lucide-react';

export default function FooterDemo() {
  return (
    <div className="w-full space-y-12 p-6 border border-border rounded-surface bg-canvas overflow-hidden">
      {/* Default Footer */}
      <div className="space-y-4">
        <Typography.Label variant="secondary" className="uppercase tracking-wider">
          Default Variant
        </Typography.Label>
        <div className="border border-border rounded-surface overflow-hidden bg-surface">
          <Footer>
            <Footer.Container>
              <Footer.Grid>
                <Footer.Section>
                  <Footer.Logo href="#">
                    <Typography.H5 variant="gradient" className="font-bold">
                      Vayu UI
                    </Typography.H5>
                  </Footer.Logo>
                  <Typography.P variant="secondary" className="mt-2">
                    Building beautiful user interfaces with modern web technologies.
                  </Typography.P>
                  <Footer.Social className="mt-4">
                    <Footer.SocialLink href="#" aria-label="Twitter">
                      <Twitter size={18} />
                    </Footer.SocialLink>
                    <Footer.SocialLink href="#" aria-label="GitHub">
                      <Github size={18} />
                    </Footer.SocialLink>
                    <Footer.SocialLink href="#" aria-label="Instagram">
                      <Instagram size={18} />
                    </Footer.SocialLink>
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

              <Divider />

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
        <Typography.Label variant="secondary" className="uppercase tracking-wider">
          Centered Variant
        </Typography.Label>
        <div className="border border-border rounded-surface overflow-hidden bg-surface">
          <Footer variant="centered">
            <Footer.Container>
              <Footer.Grid>
                <Footer.Section>
                  <div className="flex flex-col items-center gap-4">
                    <Footer.Logo href="#">
                      <Typography.H5 variant="gradient" className="font-bold">
                        Vayu UI
                      </Typography.H5>
                    </Footer.Logo>
                    <nav className="flex flex-wrap justify-center gap-6 mt-4">
                      <Footer.Link href="#">Home</Footer.Link>
                      <Footer.Link href="#">About</Footer.Link>
                      <Footer.Link href="#">Services</Footer.Link>
                      <Footer.Link href="#">Contact</Footer.Link>
                    </nav>
                    <Footer.Social className="mt-4">
                      <Footer.SocialLink href="#" aria-label="Twitter">
                        <Twitter size={18} />
                      </Footer.SocialLink>
                      <Footer.SocialLink href="#" aria-label="GitHub">
                        <Github size={18} />
                      </Footer.SocialLink>
                      <Footer.SocialLink href="#" aria-label="Linkedin">
                        <Linkedin size={18} />
                      </Footer.SocialLink>
                    </Footer.Social>
                  </div>
                </Footer.Section>
              </Footer.Grid>
              <Divider />
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
        <Typography.Label variant="secondary" className="uppercase tracking-wider">
          Minimal Variant
        </Typography.Label>
        <div className="border border-border rounded-surface overflow-hidden bg-surface">
          <Footer variant="minimal">
            <Footer.Container>
              <Footer.Bottom>
                <Footer.Logo href="#">
                  <Typography.Label className="font-bold">Vayu UI</Typography.Label>
                </Footer.Logo>
                <Footer.Copyright>© {new Date().getFullYear()} Vayu UI. Inc.</Footer.Copyright>
                <Footer.Social>
                  <Footer.SocialLink href="#">
                    <Github size={16} />
                  </Footer.SocialLink>
                  <Footer.SocialLink href="#">
                    <Twitter size={16} />
                  </Footer.SocialLink>
                </Footer.Social>
              </Footer.Bottom>
            </Footer.Container>
          </Footer>
        </div>
      </div>

      {/* Footer with CTA Button */}
      <div className="space-y-4">
        <Typography.Label variant="secondary" className="uppercase tracking-wider">
          With CTA Button
        </Typography.Label>
        <div className="border border-border rounded-surface overflow-hidden bg-surface">
          <Footer>
            <Footer.Container>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="flex flex-col gap-2">
                  <Typography.H5 variant="gradient" className="font-bold">
                    Ready to get started?
                  </Typography.H5>
                  <Typography.P variant="secondary">
                    Join thousands of developers building with Vayu UI.
                  </Typography.P>
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" size="medium">
                    <Button.Text>Get Started</Button.Text>
                  </Button>
                  <Button variant="outline" size="medium">
                    <Button.Text>Documentation</Button.Text>
                  </Button>
                </div>
              </div>
              <Divider />
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
    </div>
  );
}

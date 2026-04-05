// Footer.tsx
// Composition: UI + wiring

import { FooterRoot } from './FooterRoot';
import { FooterContainer, FooterGrid, FooterBottom } from './FooterLayout';
import { FooterSection, FooterLink, FooterLogo } from './FooterContent';
import { FooterSocial, FooterSocialLink } from './FooterSocial';
import { FooterCopyright, FooterDivider } from './FooterUtilities';

// Attach compound components
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

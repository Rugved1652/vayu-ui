import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/components/Logo';
import { ColorThemePanel } from '@/components/landing/hero/ColorThemePanel';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Logo />
          {/* <span className="font-bold text-xl tracking-tight hidden md:block">Vayu UI</span> */}
        </>
      ),
      transparentMode: 'top',
    },
    searchToggle: {
      components: {
        lg: <ColorThemePanel variant="navbar" />,
      },
    },
    githubUrl: 'https://github.com/Rugved1652/vayu-ui',
  };
}

import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/components/Logo';
import { ColorThemePanel } from '@/components/landing/hero/ColorThemePanel';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Logo />
          <ColorThemePanel variant="navbar" />
          {/* <span className="font-bold text-xl tracking-tight hidden md:block">Vayu UI</span> */}
        </div>
      ),
      transparentMode: 'top',
    },
    searchToggle: {
      components: {},
    },
    githubUrl: 'https://github.com/Rugved1652/vayu-ui',
  };
}

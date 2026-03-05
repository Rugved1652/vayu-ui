import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/components/Logo';

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
    githubUrl: 'https://github.com',
  };
}

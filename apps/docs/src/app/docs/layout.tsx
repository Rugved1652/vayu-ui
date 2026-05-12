import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { ColorThemePanel } from '@/components/landing/hero/ColorThemePanel';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        footer: <ColorThemePanel variant="sidebar" />,
      }}
    >
      {children}
    </DocsLayout>
  );
}

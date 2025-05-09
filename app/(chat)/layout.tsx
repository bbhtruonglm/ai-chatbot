import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from '@/components/app-sidebar';
import Script from 'next/script';
import { auth } from '../(auth)/auth';
import { cookies } from 'next/headers';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={session?.user} />
        <SidebarInset className="w-full">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}

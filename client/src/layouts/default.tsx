import AppSidebar from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, useParams } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { handleGetParentFolders } from '@/actions/folderActions';
import { Loader2 } from 'lucide-react';
const Default = () => {
  const { parentId } = useParams<{ parentId?: string }>();

  const { data: parentFolders, isPending } = useQuery({
    queryKey: ['parentFolders'],
    queryFn: () => handleGetParentFolders(1),
  });

  return (
    <SidebarProvider>
      <AppSidebar parentFolders={parentFolders} isPending={isPending} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {parentId && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{parentId}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Outlet context={{ parentFolders }} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Default;

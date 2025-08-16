import AppSidebar from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Link, Outlet, useParams } from 'react-router-dom';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { handleGetParentFolders } from '@/actions/folderActions';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { handleLogout } from '@/actions/userActions';
import { setToken, setUser } from '@/store/slices/userSlice';

const Default = () => {
  const { parentId } = useParams<{ parentId?: string }>();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { data: parentFolders, isPending } = useQuery({
    queryKey: ['parentFolders', user?.id],
    queryFn: () => {
      if (!user?.id) return [];
      return handleGetParentFolders(user?.id);
    },
  });

  const mutation = useMutation({
    mutationFn: () => handleLogout(),
    onSuccess: () => {
      dispatch(setUser(null));
      dispatch(setToken(null));
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar parentFolders={parentFolders} isPending={isPending} />
      <SidebarInset>
        <header className="flex items-center justify-between h-16 gap-2 pr-4 shrink-0">
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
          <div className="flex gap-2">
            {user ? (
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Logging out...' : 'logout'}
              </Button>
            ) : (
              <>
                <Button size={'sm'} variant={'link'} asChild>
                  <Link to={'/login'}>login</Link>
                </Button>
                <Button size={'sm'} asChild>
                  <Link to={'/signup'}>signup</Link>
                </Button>
              </>
            )}
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

import { Folder, Loader2, NotebookText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from './ui/sidebar';
import { Separator } from './ui/separator';
import NewItemButton from './NewItemButton';
import type { TFolder } from '@/types/folder';
import { Link } from 'react-router-dom';

const AppSidebar = ({
  parentFolders,
  isPending,
}: {
  parentFolders: TFolder[];
  isPending: boolean;
}) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to={'/'} className="flex items-center gap-1 p-3">
          <NotebookText size={20} />
          <h1>PaperTrail</h1>
        </Link>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2 px-4">
          <NewItemButton />
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <p className="text-sm">Folders</p>
          <Separator className="my-2" />
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            parentFolders.map((item, i) => (
              <Link
                to={`/folder/${item.id}`}
                key={i}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden hover:bg-accent hover:text-accent-foreground"
              >
                <Folder size={15} />
                <span>{item.name}</span>
              </Link>
            ))
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;

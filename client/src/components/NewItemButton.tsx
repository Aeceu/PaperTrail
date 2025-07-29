import { CirclePlus, FileImage, FileText, FileVideo } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarMenuButton } from './ui/sidebar';
import CreateFolder from './NewItemDialog/CreateFolder';

const NewItemButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear cursor-pointer">
          <span>new</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <CirclePlus size={15} />
          <span>Add new</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CreateFolder />

          <DropdownMenuItem>
            <FileImage />
            <span>Image</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileVideo />
            <span>Video</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText />
            <span>Document</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewItemButton;

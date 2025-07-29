import {
  handleDeleteFolder,
  handleEditFolderName,
} from '@/actions/folderActions';
import type { TFolder } from '@/types/folder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Folder, Loader2, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { useState } from 'react';

const Folders = ({ folders }: { folders: TFolder[] }) => {
  return (
    <>
      {folders.map((item: TFolder, i: number) => (
        <FolderCard key={i} folder={item} />
      ))}
    </>
  );
};

export default Folders;

export const FolderCard = ({ folder }: { folder: TFolder }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subFolders'] });
      queryClient.invalidateQueries({ queryKey: ['parentFolders'] });
    },
  });
  return (
    <Card className="relative w-[200px] h-[200px] flex flex-col items-center justify-center gap-0">
      <span className="flex items-center absolute top-1 right-1">
        <UpdateFolder folder={folder} />
        <Button
          size={'icon'}
          variant={'link'}
          disabled={mutation.isPending}
          onClick={() => mutation.mutate(folder.id)}
          className=" p-0 hover:bg-red-500 cursor-pointer"
        >
          {mutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash size={20} />
          )}
        </Button>
      </span>
      <Link to={`/folder/${folder.id}`} className="w-full h-full">
        <CardContent className="w-full h-full flex flex-col items-center justify-center">
          <Folder size={80} />
          <h1>{folder.name}</h1>
        </CardContent>
      </Link>
    </Card>
  );
};

export const UpdateFolder = ({ folder }: { folder: TFolder }) => {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState(folder.name);
  const mutation = useMutation({
    mutationFn: () => handleEditFolderName(folder.id, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subFolders'] });
      queryClient.invalidateQueries({ queryKey: ['parentFolders'] });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'link'}
          className=" p-0 hover:bg-emerald-500 cursor-pointer"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update folder name</DialogTitle>
          <DialogDescription className="mt-2">
            <Input
              value={newName}
              onChange={(val) => setNewName(val.target.value)}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={'sm'} variant={'destructive'}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            size={'sm'}
            className="bg-emerald-500"
          >
            {mutation.isPending ? 'updating...' : 'update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

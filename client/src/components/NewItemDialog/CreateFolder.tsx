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
import { Folder } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleCreateFolder } from '@/actions/folderActions';
import { useParams } from 'react-router-dom';

const CreateFolder = () => {
  const { parentId } = useParams<{ parentId?: string }>();
  const [folderName, setFolderName] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      handleCreateFolder({
        userId: 1,
        name: folderName,
        parentId: Number(parentId),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subFolders'] });
      queryClient.invalidateQueries({ queryKey: ['parentFolders'] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden hover:bg-accent hover:text-accent-foreground">
          <Folder size={15} />
          <span className="cursor-default">Folder</span>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new folder name</DialogTitle>
          <DialogDescription className="mt-2">
            <Input
              value={folderName}
              onChange={(val) => setFolderName(val.target.value)}
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
            size={'sm'}
            className="bg-emerald-500"
            onClick={() => {
              mutation.mutate();
            }}
          >
            {mutation.isPending ? 'creating...' : 'create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolder;

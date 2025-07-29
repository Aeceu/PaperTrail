import { handleGetSubFolders } from '@/actions/folderActions';
import Folders from '@/components/Folders';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

const Folder = () => {
  const { parentId } = useParams<{ parentId?: string }>();

  const parentIdNum = Number(parentId);
  const { data, isPending, error } = useQuery({
    queryKey: ['subFolders', parentId],
    queryFn: () =>
      handleGetSubFolders({
        userId: 1,
        parentId: parentIdNum,
      }),
    enabled: !!parentId,
  });

  if (error) return <div>Error loading subfolders</div>;

  return (
    <main className="flex flex-wrap items-center gap-4 p-4">
      <p>Folders</p>
      <Separator className="my-2" />
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Folders folders={data} />
      )}
    </main>
  );
};

export default Folder;

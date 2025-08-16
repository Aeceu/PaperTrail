import { handleGetSubFolders } from '@/actions/folderActions';
import Folders from '@/components/Folders';
import { Separator } from '@/components/ui/separator';
import type { RootState } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Folder = () => {
  const { parentId } = useParams<{ parentId?: string }>();
  const { user } = useSelector((state: RootState) => state.user);
  const parentIdNum = Number(parentId);

  const { data, isPending, error } = useQuery({
    queryKey: ['subFolders', parentId],
    queryFn: () =>
      handleGetSubFolders({
        userId: user?.id,
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

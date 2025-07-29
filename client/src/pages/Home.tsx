import Folders from '@/components/Folders';
import { Separator } from '@/components/ui/separator';
import type { TFolder } from '@/types/folder';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { parentFolders } = useOutletContext<{ parentFolders: TFolder[] }>();

  return (
    <main className="flex flex-wrap items-center gap-4 p-4">
      <p>Folders</p>
      <Separator />
      <Folders folders={parentFolders} />
    </main>
  );
};

export default Home;

import Folder from '../models/folder.model';

type CreateFolderProps = {
  name: string;
  parentId: number | null;
  userId: number;
};

export const createFolder = async ({
  name,
  parentId,
  userId,
}: CreateFolderProps) => {
  const res = await Folder.create({
    name,
    parentId,
    userId,
  });
  res.save();
  return res;
};

export const getParentFolders = async (userId: number | undefined) => {
  const parentFolders = await Folder.findAll({
    where: {
      userId,
      parentId: null,
    },
  });
  return parentFolders;
};

export const getSubFolders = async (
  parentId: number,
  userId: number | undefined
) => {
  const subfolders = await Folder.findAll({
    where: {
      parentId,
      userId,
    },
  });
  return subfolders;
};

export const deleteFolderById = async (folderId: string) => {
  const deletedFolder = await Folder.destroy({
    where: {
      id: folderId,
    },
  });
  return deletedFolder;
};

export const editFolderName = async (folderId: string, newName: string) => {
  const updatedFolderName = await Folder.findByPk(folderId);

  if (!updatedFolderName) {
    throw new Error('folder does not exists!');
  }

  updatedFolderName.name = newName;
  updatedFolderName.save();
  return updatedFolderName;
};

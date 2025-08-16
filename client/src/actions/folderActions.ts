import axios from '../api/axios';

type CreateFolderTypes = {
  name: string;
  parentId: number | undefined;
  userId?: number;
};
export const handleCreateFolder = async ({
  name,
  parentId,
  userId,
}: CreateFolderTypes) => {
  if (!name || !userId) {
    return console.log('name and userId is required!');
  }
  try {
    const res = await axios.post('/folders', {
      name,
      parentId,
      userId,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetParentFolders = async (userId?: number | undefined) => {
  if (!userId) {
    return console.error('No user id is inputed!');
  }
  try {
    const res = await axios.get(`/folders/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetSubFolders = async ({
  parentId,
  userId,
}: {
  parentId: number;
  userId?: number;
}) => {
  if (!userId) {
    return console.log('user id is required!');
  }
  try {
    const res = await axios.post(`/folders/${parentId}/subfolders`, {
      userId,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteFolder = async (folderId: number) => {
  try {
    const res = await axios.delete(`/folders/${folderId}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const handleEditFolderName = async (
  folderId: number,
  newName: string
) => {
  try {
    const res = await axios.patch(`/folders/${folderId}`, { newName });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

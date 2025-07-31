import { Request, Response } from 'express';
import {
  createFolder,
  deleteFolderById,
  editFolderName,
  getParentFolders,
  getSubFolders,
} from '../services/folder.services';

export const handleCreateFolder = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newFolder = await createFolder({
      name: data.name,
      parentId: data.parentId,
      userId: data.userId,
    });
    res.status(200).json(newFolder);
  } catch (error) {
    console.log(error);
    console.log('Failed to create folder!');
    res.status(500).json(error);
  }
};

export const handleGetALlParentFolders = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;
  try {
    const folders = await getParentFolders(Number(userId));
    res.status(200).json(folders);
  } catch (error) {
    console.log(error);
    console.log('Failed to fetch all folders');
    res.status(500).json(error);
  }
};

export const handeGetAllSubFolders = async (req: Request, res: Response) => {
  const parentId = req.params.parentId;
  const data = req.body;
  // const user = req.user;
  try {
    const subfolders = await getSubFolders(
      Number(parentId),
      Number(data.userId)
    );
    res.status(200).json(subfolders);
  } catch (error) {
    console.log(error);
    console.log('Failed to get all sub folders!');
    res.status(500).json(error);
  }
};

export const handleDeleteFolder = async (req: Request, res: Response) => {
  const folderId = req.params.folderId;
  try {
    const deletedFolder = await deleteFolderById(folderId);
    res.status(200).json(deletedFolder);
  } catch (error) {
    console.log(error);
    console.log('Failed to delete folder!');
    res.status(500).json(error);
  }
};

export const handleUpdateFolderName = async (req: Request, res: Response) => {
  const folderId = req.params.folderId;
  const data = req.body;
  try {
    const updatedName = await editFolderName(folderId, data.newName);
    res.status(200).json(updatedName);
  } catch (error) {
    console.log(error);
    console.log('failed to update folder name!');
    res.status(500).json(error);
  }
};

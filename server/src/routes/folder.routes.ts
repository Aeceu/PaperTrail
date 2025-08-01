import express from 'express';
import {
  handleCreateFolder,
  handleGetAllParentFolders,
  handleGetAllSubFolders,
  handleDeleteFolder,
  handleUpdateFolderName,
} from '../controllers/folder.controller';

const router = express.Router();

router.post('/folders', handleCreateFolder);
router.get('/folders/:userId', handleGetAllParentFolders);
router.post('/folders/:parentId/subfolders', handleGetAllSubFolders);
router.delete('/folders/:folderId', handleDeleteFolder);
router.patch('/folders/:folderId', handleUpdateFolderName);
export default router;

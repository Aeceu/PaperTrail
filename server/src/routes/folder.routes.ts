import express from 'express';
import {
  handleCreateFolder,
  handleGetALlParentFolders,
  handeGetAllSubFolders,
  handleDeleteFolder,
  handleUpdateFolderName,
} from '../controllers/folder.controller';

const router = express.Router();

router.post('/folders', handleCreateFolder);
router.get('/folders/:userId', handleGetALlParentFolders);
router.post('/folders/:parentId/subfolders', handeGetAllSubFolders);
router.delete('/folders/:folderId', handleDeleteFolder);
router.patch('/folders/:folderId', handleUpdateFolderName);
export default router;

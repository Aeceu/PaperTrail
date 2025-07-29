import Folder from './folder.model';
import User from './user.model';

// Folder → User
Folder.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner',
  onDelete: 'CASCADE',
});

// User → Folders
User.hasMany(Folder, {
  foreignKey: 'userId',
  as: 'folders',
  onDelete: 'CASCADE',
});

// Folder → Parent Folder (self-relation)
Folder.belongsTo(Folder, {
  foreignKey: 'parentId',
  as: 'parent',
  onDelete: 'CASCADE',
});

// Folder → Subfolders (self-relation)
Folder.hasMany(Folder, {
  foreignKey: 'parentId',
  as: 'subfolders',
  onDelete: 'CASCADE',
});

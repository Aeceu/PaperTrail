import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connectDB";

class Folder extends Model {
  declare id: number;
  declare name: string;
  declare parentId: number | null;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Folder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: "FolderModel",
    tableName: "FolderTable"
  }
);

export default Folder;

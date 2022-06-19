import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class Room extends Model {}
Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'room',
  },
);

export default Room;

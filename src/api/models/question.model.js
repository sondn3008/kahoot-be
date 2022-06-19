import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class Question extends Model {}
Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_A: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_B: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_C: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_D: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_true: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'question',
  },
);

export default Question;

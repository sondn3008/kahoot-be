import questionModel from '../models/question.model';
import roomModel from '../models/room.model';

const createQuestion = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const room = await roomModel.findOne({ where: { id: data.room_id }, raw: true });
  if (room === null) {
    result.statusCode = 400;
    result.json = {
      message: 'Room is not Exist',
    };
    return result;
  }

  if (room.locked === 1) {
    result.statusCode = 400;
    result.json = {
      message: 'Room has locked',
    };
    return result;
  }

  const add = await questionModel.create(data);

  result.statusCode = 200;
  result.json = {
    data: data,
    message: 'Create Question Success',
  };

  return result;
};

const getAllQuestionByRoomId = async (room_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const listQuestion = await questionModel.findAll({ where: { room_id: room_id }, raw: true });

  result.statusCode = 200;
  result.json = {
    data: listQuestion,
    message: 'Get All Question By Id Success',
  };

  return result;
};

const getQuestionById = async (id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const question = await questionModel.findAll({ where: { id: id }, raw: true });

  result.statusCode = 200;
  result.json = {
    data: question,
    message: 'Get Question By Id Question Success',
  };

  return result;
};

const deleteQuestion = async (id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const ret = await questionModel.destroy({ where: { id: id }, raw: true });
  if (ret === 0) {
    result.statusCode = 400;
    result.json = {
      message: 'Question is not Exist!',
    };
    return result;
  }

  result.statusCode = 200;
  result.json = {
    message: 'Delete Question Success!',
  };

  return result;
};

export default {
  createQuestion,
  getAllQuestionByRoomId,
  getQuestionById,
  deleteQuestion,
};

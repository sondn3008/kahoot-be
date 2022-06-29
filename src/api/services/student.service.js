import studentModel from '../models/student.model';
import roomModel from '../models/room.model';
import questionModel from '../models/question.model';

const createStudent = async (data) => {
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

  const question = await questionModel.findOne({ where: { id: data.question_id }, raw: true });
  if (question === null) {
    result.statusCode = 400;
    result.json = {
      message: 'Question is not Exist',
    };
    return result;
  }

  const add = await studentModel.create(data);

  result.statusCode = 200;
  result.json = {
    message: 'Add Student Success!',
  };

  return result;
};

export default {
  createStudent,
};

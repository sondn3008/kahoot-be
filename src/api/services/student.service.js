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
    message: 'Add Answer of Student Success!',
  };

  return result;
};

const getStudentByName = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const list = await studentModel.findAll({
    where: {
      room_id: data.room_id,
      name: data.name,
    },
  });

  let score = 0;
  let questionTrue = 0;
  let questionFalse = 0;
  list.map((x) => {
    score += x.score;
    if (x.result === 1) {
      questionTrue++;
    } else {
      questionFalse++;
    }
  });

  let data2 = {
    name: data.name,
    questionTrue: questionTrue,
    questionFalse: questionFalse,
    total: score,
  };

  result.statusCode = 200;
  result.json = {
    data: list,
    data2: data2,
  };

  return result;
};

const getStudentByQuestionIdAndName = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const list = await studentModel.findAll({
    where: {
      room_id: data.room_id,
      name: data.name,
      question_id: data.question_id,
    },
  });

  result.statusCode = 200;
  result.json = list;

  return result;
};

const getStudentByQuestionId = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const list = await studentModel.findAll({
    where: {
      room_id: data.room_id,
      question_id: data.question_id,
    },
  });

  let numerOfAnswerTrue = 0;
  let numerOfAnswerFalse = 0;

  list.map((x) => {
    if (x.result === 1) {
      numerOfAnswerTrue++;
    } else {
      numerOfAnswerFalse++;
    }
  });

  result.statusCode = 200;
  result.json = {
    data: list,
    numerOfAnswerTrue: numerOfAnswerTrue,
    numerOfAnswerFalse: numerOfAnswerFalse,
  };

  return result;
};

const getStudentByRoomId = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const list = await studentModel.findAll({
    where: {
      room_id: data.room_id,
    },
  });

  result.statusCode = 200;
  result.json = list;

  return result;
};

const checkRoomByPin = async (pin) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const list = await roomModel.findOne({
    where: {
      pin: pin,
    },
  });

  if (!list) {
    result.statusCode = 400;
    result.json = {
      message: 'Room is not exist',
    };
    return result;
  }

  result.statusCode = 200;
  result.json = list;

  return result;
};

export default {
  createStudent,
  getStudentByName,
  getStudentByQuestionIdAndName,
  getStudentByQuestionId,
  getStudentByRoomId,
  checkRoomByPin,
};

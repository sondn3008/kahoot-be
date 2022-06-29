import joi from 'joi';

const createStudentValidate = (data) => {
  const student = joi.object({
    room_id: joi.number().optional().required(),
    question_id: joi.number().optional().required(),
    name: joi.string().min(1).max(255).optional().required(),
    result: joi.number().optional().required(),
    time: joi.number().optional().required(),
    score: joi.number().optional().required(),
  });
  return student.validate(data);
};

export default {
  createStudentValidate,
};

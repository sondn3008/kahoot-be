import joi from 'joi';

const creatQuestionValidate = (data) => {
  const question = joi.object({
    room_id: joi.number().required(),
    question: joi.string().min(1).max(600).optional().required(),
    time: joi.number().optional().required(),
    answer_A: joi.string().min(1).max(255).optional().required(),
    answer_B: joi.string().min(1).max(255).optional().required(),
    answer_C: joi.string().min(1).max(255).optional().required(),
    answer_D: joi.string().min(1).max(255).optional().required(),
    answer_true: joi.string().optional().required(),
  });
  return question.validate(data);
};

export default {
  creatQuestionValidate,
};

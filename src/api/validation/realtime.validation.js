import joi from 'joi';

const createRealtimeValidate = (data) => {
  const question = joi.object({
    room_id: joi.number().required(),
    name: joi.string().min(1).max(255).optional().required(),
  });
  return question.validate(data);
};

const deleteRealtimeValidate = (data) => {
  const question = joi.object({
    room_id: joi.number().required(),
  });
  return question.validate(data);
};

export default {
  createRealtimeValidate,
  deleteRealtimeValidate,
};

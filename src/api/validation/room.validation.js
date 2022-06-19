import joi from 'joi';

const createRoomValidate = (data) => {
  const room = joi.object({
    user_id: joi.number().required(),
    pin: joi.string().min(1).max(255).required(),
  });
  return room.validate(data);
};

export default {
  createRoomValidate,
};

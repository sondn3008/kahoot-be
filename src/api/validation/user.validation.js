import joi from 'joi';

const registerValidate = (data) => {
  const user = joi.object({
    email: joi.string().max(255).email().required(),
    password: joi.string().min(1).max(255).required(),
    image: joi.string().max(255),
    name: joi.string().max(255).required(),
    address: joi.string().max(255),
    phone: joi.number().min(9),
  });
  return user.validate(data);
};

const loginValidate = (data) => {
  const user = joi.object({
    email: joi.string().max(255).email().required(),
    password: joi.string().max(255).required(),
  });
  return user.validate(data);
};

const updateValidate = (data) => {
  const user = joi.object({
    name: joi.string().max(255).required(),
    student_id: joi.number(),
    phone: joi.number(),
  });
  return user.validate(data);
};

const rfTokenValidate = (data) => {
  const obj = joi.object({
    accessToken: joi.string().required(),
    rfToken: joi.string().required(),
  });
  return obj.validate(data);
};

export default {
  registerValidate,
  loginValidate,
  updateValidate,
  rfTokenValidate,
};

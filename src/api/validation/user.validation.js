import joi from 'joi';

const registerValidate = (data) => {
  const user = joi.object({
    email: joi.string().max(255).email().required(),
    password: joi.string().min(6).max(255).required(),
    confirmPassword: joi.string().max(255).required(),
    name: joi.string().max(255).required(),
    address: joi.string().max(255).required(),
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

const updateUserValidate = (data) => {
  const user = joi.object({
    name: joi.string().max(255).required(),
    student_id: joi.number(),
    phone: joi.number(),
  });
  return user.validate(data);
};

export default {
  registerValidate,
  loginValidate,
  updateUserValidate,
};

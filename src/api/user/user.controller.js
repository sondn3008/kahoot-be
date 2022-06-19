import userService from './user.service.js';
import validate from './user.validation.js';

const login = async (req, res, next) => {
  try {
    const data = req.body;
    const checkData = validate.loginValidate(data);
    if (checkData.error != null) {
      res.status(400).json({ message: checkData.error.details[0].message });
    }
    const result = await userService.loginUser(data);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    const data = req.body;
    const checkData = validate.registerValidate(data);
    if (checkData.error != null) {
      res.status(400).json({ message: checkData.error.details[0].message });
    }
    const result = await userService.registerUser(data);

    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
  }
};

// const getOne = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const result = await userService.getOne(id);
//     res.status(result.statusCode).json(result.json);
//   } catch (error) {
//     console.log(error);
//   }
// };

export default {
  login,
  register,
};

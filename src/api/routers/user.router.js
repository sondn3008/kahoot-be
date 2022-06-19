import express from 'express';
import validate from '../validation/user.validation';
import userService from '../services/user.service';
const router = express.Router();

// router.post('/register', userController.register);
// router.post('/login', userController.login);
// router.get('/:id', userController.getOne);

router.post('/register', async (req, res) => {
  const data = req.body;
  const checkData = validate.registerValidate(data);
  if (checkData.error != null) {
    res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await userService.registerUser(data);
  console.log(result);
  res.status(result.statusCode).json(result.json);
});

router.post('/login', async (req, res) => {
  const data = req.body;
  const checkData = validate.loginValidate(data);
  if (checkData.error != null) {
    res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await userService.loginUser(data);
  res.status(result.statusCode).json(result.json);
});

export default router;

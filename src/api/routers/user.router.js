import express from 'express';
import validate from '../validation/user.validation';
import userService from '../services/user.service';
import authMdw from '../middlewares/auth.mdw';
const router = express.Router();

router.post('/register', async (req, res) => {
  const data = req.body;
  const checkData = validate.registerValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await userService.registerUser(data);
  return res.status(result.statusCode).json(result.json);
});

router.post('/login', async (req, res) => {
  const data = req.body;
  const checkData = validate.loginValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await userService.loginUser(data);
  return res.status(result.statusCode).json(result.json);
});

router.post('/refresh', async function (req, res) {
  const data = req.body;

  const checkData = validate.rfTokenValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }

  const result = await userService.refeshTokenUser(data);
  return res.status(result.statusCode).json(result.json);
});

// chưa chặn jwt
router.get('/profile/:id', async (req, res) => {
  const id = req.params.id;
  const result = await userService.getProfile(id);
  return res.status(result.statusCode).json(result.json);
});

router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userService.update(id, data);
  return res.status(result.statusCode).json(result.json);
});

export default router;

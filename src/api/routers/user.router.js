import express from 'express';
import validate from '../validation/user.validation';
import userService from '../services/user.service';
import authMdw from '../middlewares/auth.mdw';
import fileSaveHelper from '../helpers/file/FileSaveHelper';
import multer from 'multer';
const upload = multer();

const router = express.Router();

router.post('/register', upload.single('image'), async (req, res) => {
  const data = req.body;
  const file = req.file;
  const checkData = validate.registerValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  if (file) {
    const saveImage = await fileSaveHelper.saveImage(file);
    data.image = saveImage.url;
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
  const id = req.params.id || 0;
  const result = await userService.getProfile(id);
  return res.status(result.statusCode).json(result.json);
});

router.put('/update/:id', async (req, res) => {
  const id = req.params.id || 0;
  const data = req.body;
  const result = await userService.update(id, data);
  return res.status(result.statusCode).json(result.json);
});

export default router;

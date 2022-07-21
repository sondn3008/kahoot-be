import express from 'express';
import validate from '../validation/question.validation';
import questionService from '../services/question.service';
import fileSaveHelper from '../helpers/file/FileSaveHelper';
import authMdw from '../middlewares/auth.mdw';
import multer from 'multer';
const upload = multer();

const router = express.Router();
// chưa chặn jwt
router.post('/', authMdw, upload.single('image'), async (req, res) => {
  const file = req.file;
  const data = req.body;
  const checkData = validate.createQuestionValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  if (file) {
    const saveImage = await fileSaveHelper.saveImage(file);
    data.image = saveImage.url;
  }
  const result = await questionService.createQuestion(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/all/:room_id', authMdw, async (req, res) => {
  const room_id = req.params.room_id || 0;

  const result = await questionService.getAllQuestionByRoomId(room_id);
  return res.status(result.statusCode).json(result.json);
});

router.get('/:id', authMdw, async (req, res) => {
  const id = req.params.id || 0;

  const result = await questionService.getQuestionById(id);
  return res.status(result.statusCode).json(result.json);
});

router.delete('/:id', authMdw, async (req, res) => {
  const id = req.params.id || 0;

  const result = await questionService.deleteQuestion(id);
  return res.status(result.statusCode).json(result.json);
});

router.put('/:id', authMdw, upload.single('image'), async (req, res) => {
  const id = req.params.id || 0;
  const data = req.body;
  const file = req.file;

  if (file) {
    const saveImage = await fileSaveHelper.saveImage(file);
    data.image = saveImage.url;
  }

  const result = await questionService.updateQuestion(id, data);
  return res.status(result.statusCode).json(result.json);
});

export default router;

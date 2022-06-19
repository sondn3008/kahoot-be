import express from 'express';
import validate from '../validation/question.validation';
import questionService from '../services/question.service';

const router = express.Router();
// chưa chặn jwt
router.post('/', async (req, res) => {
  const data = req.body;
  const checkData = validate.creatQuestionValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await questionService.createQuestion(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/all/:room_id', async (req, res) => {
  const room_id = req.params.room_id;

  const result = await questionService.getAllQuestionByRoomId(room_id);
  return res.status(result.statusCode).json(result.json);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await questionService.getQuestionById(id);
  return res.status(result.statusCode).json(result.json);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await questionService.deleteQuestion(id);
  return res.status(result.statusCode).json(result.json);
});

export default router;

import express from 'express';
import studentService from '../services/student.service';
import validate from '../validation/student.validation';

const router = express.Router();
// chưa chặn jwt
router.post('/', async (req, res) => {
  const data = req.body;
  const checkData = validate.createStudentValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await studentService.createStudent(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/room/name', async (req, res) => {
  const data = req.body;
  const checkData = validate.getStudentByNameValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await studentService.getStudentByName(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/room/name/question', async (req, res) => {
  const data = req.body;
  const checkData = validate.getStudentByQuestionIdAndNameValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await studentService.getStudentByQuestionIdAndName(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/room/question', async (req, res) => {
  const data = req.body;
  const checkData = validate.getStudentByQuestionIdValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await studentService.getStudentByQuestionId(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/room', async (req, res) => {
  const data = req.body;
  const checkData = validate.getStudentByRoomIdValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }
  const result = await studentService.getStudentByRoomId(data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/:pin', async (req, res) => {
  const pin = req.params.pin;

  const result = await studentService.checkRoomByPin(pin);
  return res.status(result.statusCode).json(result.json);
});

export default router;

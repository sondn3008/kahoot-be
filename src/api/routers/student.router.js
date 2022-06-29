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

export default router;

import express from 'express';
import validate from '../validation/realtime.validation';
import realtimeService from '../services/realtime.service';

const router = express.Router();

//chưa chặn jwt

router.get('/:room_id', async (req, res) => {
  const room_id = req.params.room_id || 0;

  const result = await realtimeService.getRealtimeByRoomId(room_id);
  return res.status(result.statusCode).json(result.json);
});

router.post('/', async (req, res) => {
  const data = req.body;

  const checkData = validate.createRealtimeValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }

  const result = await realtimeService.createRealtime(data);
  return res.status(result.statusCode).json(result.json);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id || 0;

  const result = await realtimeService.deletePeopleById(id);
  return res.status(result.statusCode).json(result.json);
});

export default router;

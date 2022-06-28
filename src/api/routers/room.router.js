import express from 'express';
import validate from '../validation/room.validation';
import roomService from '../services/room.service';

const router = express.Router();
// chưa chặn jwt
router.post('/create/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const result = await roomService.createRoom(user_id);
  return res.status(result.statusCode).json(result.json);
});

router.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id || 0;

  const result = await roomService.getAllRoomByUserId(user_id);
  return res.status(result.statusCode).json(result.json);
});

router.delete('/:pin', async (req, res) => {
  const pin = req.params.pin || 0;

  const result = await roomService.deleteRoom(pin);
  return res.status(result.statusCode).json(result.json);
});

export default router;

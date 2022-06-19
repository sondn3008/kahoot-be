import express from 'express';
import validate from '../validation/room.validation';
import roomService from '../services/room.service';

const router = express.Router();

router.post('/create/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const result = await roomService.createRoom(user_id);
  res.status(result.statusCode).json(result.json);
});

router.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const result = await roomService.getAllRoomByUserId(user_id);
  res.status(result.statusCode).json(result.json);
});

router.delete('/:pin', async (req, res) => {
  const pin = req.params.pin;

  const result = await roomService.deleteRoom(pin);
  res.status(result.statusCode).json(result.json);
});

export default router;

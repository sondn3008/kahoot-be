import express from 'express';
import roomService from '../services/room.service';
import authMdw from '../middlewares/auth.mdw';

const router = express.Router();
// chưa chặn jwt
router.post('/create/:user_id', authMdw, async (req, res) => {
  const user_id = req.params.user_id;

  const result = await roomService.createRoom(user_id);
  return res.status(result.statusCode).json(result.json);
});

router.get('/:user_id', authMdw, async (req, res) => {
  const user_id = req.params.user_id || 0;

  const result = await roomService.getAllRoomByUserId(user_id);
  return res.status(result.statusCode).json(result.json);
});

router.delete('/:pin', authMdw, async (req, res) => {
  const pin = req.params.pin || 0;

  const result = await roomService.deleteRoom(pin);
  return res.status(result.statusCode).json(result.json);
});

router.post('/lock/:room_id', authMdw, async (req, res) => {
  const room_id = req.params.room_id;
  const result = await roomService.lockRoom(room_id);
  return res.status(result.statusCode).json(result.json);
});

router.post('/unlock/:room_id', authMdw, async (req, res) => {
  const room_id = req.params.room_id;
  const result = await roomService.unlockRoom(room_id);
  return res.status(result.statusCode).json(result.json);
});

export default router;

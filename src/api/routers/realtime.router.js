import express from 'express';
import validate from '../validation/realtime.validation';
import realtimeService from '../services/realtime.service';
import moment from 'moment';

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
  const data = req.body;

  const checkData = validate.deleteRealtimeValidate(data);
  if (checkData.error != null) {
    return res.status(400).json({ message: checkData.error.details[0].message });
  }

  const result = await realtimeService.deletePeopleById(id, data);
  return res.status(result.statusCode).json(result.json);
});

router.get('/', async (req, res) => {
  const ts = req.query.ts || 0;
  const room_id = req.query.room_id || 0;

  let loop = 0;
  const fn = async function () {
    const list = await realtimeService.findLoop(ts, room_id);
    if (list.length > 0) {
      res.json({
        list,
        return_ts: moment().unix(),
      });
    } else {
      loop++;
      // console.log(`loop: ${loop}`);
      if (loop < 4) {
        setTimeout(fn, 2500);
      } else {
        res.json({
          list: [],
          return_ts: moment().unix(),
        });
      }
    }
  };

  await fn();
});

export default router;

import realtimeModel from '../models/realtime.model';
import roomModel from '../models/room.model';
import { broadcastAll } from '../../server';

const createRealtime = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const room = await roomModel.findOne({ where: { id: data.room_id } });
  if (!room) {
    result.statusCode = 400;
    result.json = {
      message: 'Room is not exist!',
    };
    return result;
  }

  const add = await realtimeModel.create(data);

  const listJoin = await realtimeModel.findAll({ where: { room_id: data.room_id } });
  broadcastAll(JSON.stringify(listJoin));

  result.statusCode = 200;
  result.json = {
    data: add,
    message: 'Create Realtime Success',
  };

  return result;
};

const deletePeopleById = async (id, data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const ret = await realtimeModel.destroy({ where: { id: id }, raw: true });

  const listJoin = await realtimeModel.findAll({ where: { room_id: data.room_id } });
  broadcastAll(JSON.stringify(listJoin));

  result.statusCode = 200;
  result.json = {
    message: 'Delete Realtime Success',
  };

  return result;
};

const getRealtimeByRoomId = async (room_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const list = await realtimeModel.findAll({ where: { room_id: room_id }, raw: true });

  result.statusCode = 200;
  result.json = list;

  return result;
};

export default {
  createRealtime,
  deletePeopleById,
  getRealtimeByRoomId,
};

import realtimeModel from '../models/realtime.model';
import roomModel from '../models/room.model';
import { broadcastAll } from '../../server';
import moment from 'moment';
import sequelize from 'sequelize';

const Op = sequelize.Op;

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

  const listJoin = await realtimeModel.findAll({ where: { room_id: data.room_id, isDelete: 0 } });
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

  const dataUpdate = {
    isDelete: 1,
  };

  const ret = await realtimeModel.update(dataUpdate, { where: { id: id }, raw: true });

  const listJoin = await realtimeModel.findAll({ where: { room_id: data.room_id, isDelete: 0 } });
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

const findLoop = async (ts, room_id) => {
  const mts = moment.unix(ts);
  const str_ts = mts.format('YYYY-MM-DD HH:mm:ss');

  const list = await realtimeModel.findAll({
    where: { room_id: room_id, updatedAt: { [Op.gt]: str_ts } },
    raw: true,
  });

  console.log(list);

  return list;
};

export default {
  createRealtime,
  deletePeopleById,
  getRealtimeByRoomId,
  findLoop,
};

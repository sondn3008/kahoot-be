import roomModel from '../models/room.model';
import helper from '../helpers/utility';

const createRoom = async (user_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const pin = await helper.createPin();

  const room = await roomModel.findOne({ where: { pin: pin.toString() }, raw: true });
  if (room != null) {
    result.statusCode = 400;
    result.json = {
      message: 'Room has already Exist.',
    };
    return result;
  }

  const newRoom = {
    user_id: user_id,
    pin: pin,
  };

  const add = await roomModel.create(newRoom);

  result.statusCode = 200;

  result.json = {
    data: newRoom,
    message: 'Create Room Success',
  };

  return result;
};

const getAllRoomByUserId = async (user_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const listRoom = await roomModel.findAll({ where: { user_id: user_id }, raw: true });

  result.statusCode = 200;

  result.json = {
    data: listRoom,
    message: 'Get All Room Success',
  };

  return result;
};

const deleteRoom = async (pin) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const room = await roomModel.findOne({ where: { pin: pin }, raw: true });

  if (room === null) {
    result.statusCode = 4000;
    result.json = {
      message: 'Room is not Exist!',
    };
  }

  const ret = await roomModel.destroy({ where: { pin: pin }, raw: true });

  result.statusCode = 200;
  result.json = {
    message: 'Delete Room Success!',
  };

  return result;
};

export default {
  createRoom,
  getAllRoomByUserId,
  deleteRoom,
};

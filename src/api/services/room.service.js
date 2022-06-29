import roomModel from '../models/room.model';
import userModel from '../models/user.model';
import helper from '../helpers/utility';

const createRoom = async (user_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const pin = await helper.createPin();

  const user = await userModel.findOne({ where: { id: user_id }, raw: true });
  if (user === null) {
    result.statusCode = 400;
    result.json = {
      message: 'User is not Exist.',
    };
    return result;
  }

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

  const ret = await roomModel.destroy({ where: { pin: pin }, raw: true });

  if (ret === 0) {
    result.statusCode = 400;
    result.json = {
      message: 'Room is not Exist!',
    };
    return result;
  }

  result.statusCode = 200;
  result.json = {
    message: 'Delete Room Success!',
  };

  return result;
};

const lockRoom = async (room_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const room = await roomModel.findOne({ where: { id: room_id } });
  if (!room) {
    console.log(room);
    result.json = {
      message: 'Room is not Exist!',
    };
    return result;
  }

  const ret = await roomModel.update({ locked: 1 }, { where: { id: room_id } });

  result.statusCode = 200;
  result.json = {
    message: 'Lock Room Success!',
  };

  return result;
};

const unlockRoom = async (room_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const room = await roomModel.findOne({ where: { id: room_id } });
  if (!room) {
    result.statusCode = 400;
    result.json = {
      message: 'Room is not Exist!',
    };
    return result;
  }

  const ret = await roomModel.update({ locked: 0 }, { where: { id: room_id } });

  result.statusCode = 200;
  result.json = {
    message: 'UnLock Room Success!',
  };

  return result;
};

export default {
  createRoom,
  getAllRoomByUserId,
  deleteRoom,
  lockRoom,
  unlockRoom,
};

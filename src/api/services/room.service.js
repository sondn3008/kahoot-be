import roomModel from '../models/room.model';
import helper from '../helpers/utility';

const createRoom = async (user_id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const pin = await helper.createPin();
  console.log(pin);

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

export default {
  createRoom,
};

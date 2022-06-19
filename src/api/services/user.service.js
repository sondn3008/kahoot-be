import userModel from '../models/user.model';
import helper from '../helpers/utility';

const loginUser = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  //check mail
  const user = await userModel.findOne({ where: { email: data.email }, raw: true });
  if (user === null) {
    result.statusCode = 400;
    result.json = {
      message: 'The email you entered is not registered.',
      authenticated: false,
    };
    return result;
  }

  //check pass
  const isValid = await helper.validPassword(data.password, user.password);
  if (!isValid) {
    result.statusCode = 400;
    result.json = {
      authenticated: false,
      message: 'The password you entered is not correct.',
    };
    return result;
  }

  //JWT
  const token = await helper.makeAccessToken({ id: user.id });
  const rfToken = await helper.createRftoken();

  const ret = userModel.update({ rfToken: rfToken }, { where: { id: user.id } });

  delete user.password;
  result.statusCode = 200;
  result.json = {
    authenticated: true,
    data: user,
    accessToken: token,
    rfToken: rfToken,
  };

  return result;
};

const registerUser = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const user = await userModel.findOne({ where: { email: data.email }, raw: true });
  if (user != null) {
    result.statusCode = 400;
    result.json = {
      message: 'Email has already registered.',
    };
    return result;
  }

  const pass = await helper.hashPassword(data.password);

  const newUser = {
    email: data.email,
    name: data.name,
    password: pass,
    image: data.image,
    address: data.address,
    phone: data.phone,
  };

  const add = await userModel.create(newUser);

  result.statusCode = 200;
  delete newUser.password;
  result.json = {
    data: newUser,
    message: 'Register Success',
  };

  return result;
};

const getProfile = async (id) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const user = await userModel.findOne({ where: { id: id }, raw: true });
  if (user === null) {
    result.statusCode = 400;
    result.json = {
      message: 'Email is not Exist',
    };
    return result;
  }

  result.statusCode = 200;
  delete user.password;
  result.json = user;
  return result;
};

const update = async (id, data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  const ret = await userModel.update(data, { where: { id: id }, raw: true });

  result.statusCode = 200;
  result.json = { message: 'Update Success!' };
  return result;
};

export default {
  loginUser,
  registerUser,
  getProfile,
  update,
};

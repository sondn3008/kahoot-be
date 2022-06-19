import userModel from './user.model.js';
import helper from '../helpers/utility.js';
const loginUser = async (data) => {
  const result = {
    statusCode: null,
    json: null,
  };

  //check mail
  const user = await userModel.findOne({ where: { email: data.email }, raw: true });
  if (user === null) {
    result.statusCode == 400;
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

  delete user.password;
  result.statusCode = 200;
  result.json = {
    authenticated: true,
    user: user,
    accessToken: token,
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
    result.statusCode == 400;
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
    address: data.address,
    phone: data.phone,
  };

  const add = await userModel.create(newUser);
  console.log(add);

  result.statusCode = 200;
  delete newUser.password;
  result.json = {
    user: newUser,
    message: 'Register Success',
  };

  return result;
};

export default {
  loginUser,
  registerUser,
};

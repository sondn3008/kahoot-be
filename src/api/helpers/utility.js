import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import randomstring from 'randomstring';
import randomNumber from 'random-number';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-.]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const salt = 10;

const validPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const makeCode = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const makeAccessToken = async (payload) => {
  const opts = {
    expiresIn: 10 * 60, // seconds
  };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, opts);
  return token;
};

const verifyAccessToken = async (accessToken) => {
  const opts = {
    ignoreExpiration: true,
  };
  const user = await jwt.verify(accessToken, process.env.SECRET_KEY, opts);
  return user;
};

const createRftoken = async (accessToken) => {
  return randomstring.generate(80);
};

const createPin = async () => {
  return randomNumber({
    min: 100000,
    max: 999999,
    integer: true,
  });
};

export default {
  slugify,
  validPassword,
  hashPassword,
  makeCode,
  makeAccessToken,
  verifyAccessToken,
  createRftoken,
  createPin,
};

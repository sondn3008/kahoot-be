import jwt from 'jsonwebtoken';
import { isJwtExpired } from 'jwt-check-expiration';
import 'dotenv/config';

// còn trường hợp expire
export default function (req, res, next) {
  const accessToken = req.headers['kahootapp-access-token'];
  console.log(isJwtExpired(accessToken));
  if (accessToken) {
    if (isJwtExpired(accessToken) === false) {
      try {
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
        // console.log(decoded);
        req.accessTokenPayload = decoded;
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).json({
          message: 'Invalid accessToken',
        });
      }
    } else {
      return res.status(401).json({
        message: 'AccessToken has expired',
      });
    }
  } else {
    return res.status(401).json({
      message: 'AccessToken not found.',
    });
  }
}

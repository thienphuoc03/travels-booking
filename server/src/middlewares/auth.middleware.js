import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

export const generateAccessToken = (id, role) => {
  const secretKey = process.env.ACCESS_JWT_SECRET;
  const tokenPayload = {
    id,
    role,
  };
  const options = {
    algorithm: 'HS256',
    expiresIn: '30m',
  };

  return jwt.sign(tokenPayload, secretKey, options);
};

const authMiddleware = allowedRoles => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) return responseHandler.unauthorized(res);

    try {
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_JWT_SECRET
      );

      if (!allowedRoles.includes(decodedToken.role))
        return responseHandler.forbidden(res);

      req.user = decodedToken;

      next();
    } catch (error) {
      responseHandler.unauthorized(res);
    }
  };
};

export default authMiddleware;

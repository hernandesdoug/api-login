const jwt = require('jsonwebtoken');

function verifyToken(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({
      message: 'Token not provided!',
      type: 'error',
    });
  }
  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return response.status(403).json({
        message: 'Invalid or expired Token!',
        type: 'error',
      });
    }
    request.user = decoded;
    next();
  });
}

module.exports = verifyToken;

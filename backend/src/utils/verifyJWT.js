const jwt = require('jsonwebtoken');

module.exports = function verifyJWT(request, response, next) {
  const token = request.headers['x-access-token'];
  
  if(!token) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return response.status(403).json({ error: 'Forbidden' });

    if(request.headers.authorization !== decoded.id) {
      return response.status(403).json({ error: 'Forbidden' });
    };

    // If everything is OK, continue
    next();
  });
};

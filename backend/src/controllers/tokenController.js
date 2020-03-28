const connection = require('../database/connection');
const jwt = require('jsonwebtoken');

module.exports = {
  verify(request, response) {
    const ongId = request.headers.authorization;
    const token = request.headers['x-access-token'];

    if(!token) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return response.json({ auth: false });
  
      if(request.headers.authorization !== decoded.id) {
        return response.json({ auth: false });
      };
  
      return response.json({ auth: true });
    });
  }
}
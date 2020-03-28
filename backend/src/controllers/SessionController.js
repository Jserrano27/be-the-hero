const connection = require('../database/connection');
const jwt = require('jsonwebtoken');


module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('id', 'name')
      .first();

    if (!ong) {
      return response.status(404).json({ error: 'ONG not found with the ID provided' });
    }

    const token = jwt.sign({ id: ong.id }, process.env.SECRET, {
      expiresIn: 604800 // expires in 1 week
    });

    return response.json({ong, auth: true, token: token});
  }

}
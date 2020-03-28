const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(404).json({ error: 'ONG not found with the ID provided' });
    }

    return response.json(ong);
  }

}
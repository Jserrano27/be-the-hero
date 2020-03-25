const connection = require('../connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json({ ongs })
  },

  async create(request, response) {
    // Pego os dados da ONG do corpo da requisiçao
    const { name, email, whatsapp, city, uf } = request.body;
    // Crio um ID aleatorio
    const id = crypto.randomBytes(4).toString('HEX');

    // Inserto a nova ONG na tabela "ongs"
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id })
  }
}
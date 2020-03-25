
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments() //cria uma chave primaria e autoincremental (1, 2, 3, etc)

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); // Criamos coluna para chave estrangeira

    table.foreign('ong_id').references('id').inTable('ongs'); // Definimos e vinculamos chave estrangeira com id da ong
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};

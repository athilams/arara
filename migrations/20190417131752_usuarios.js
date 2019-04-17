
exports.up = function(knex, Promise) {
  return knex.public.createTable('usuarios', (table) => {
  	table.increments()
  	table.text('nome')
  	table.integer('cpf')
  	table.date('nascimento')
  	table.text('email')
  	table.integer('telefone')
  	table.text('password')
  	table.text('password2')
  })
};

exports.down = function(knex, Promise) {
  return knex.public.dropTable('usuarios')
};

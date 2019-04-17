// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'araramaker',
      user:     'postgres',
      password: 'senha123'
    },
    migrations: {
      tableName: 'usuarios'
    }
  }

};

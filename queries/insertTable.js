const knex = require('knex')
const createUser = (request, response) => {
	knex('usuarios')
		.insert(req.body)
}

module.exports = createUser
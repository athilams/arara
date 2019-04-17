const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const knex	= require('knex')({
	client: 'pg',
	connection: {
		host:'localhost',		
		user:'postgres',
		password:'senha123',
		database: 'araramaker'
	}
})


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended:true
}))

//rota para pagina de login
router.get('/login', (req,res) => res.render('login'))

//rota para pagina de registro
router.get('/register', (req,res) => res.render('register'))

//verifica se os campos estao preenchidos 
function validaUsuario(usuario){
	const emailValido = typeof usuario.email == 'string' && 
							   usuario.email.trim() != '';
	const senhaValida = typeof usuario.password == 'string' &&
							   usuario.password.trim() != '';
	const senha2 = usuario.password == usuario.password2;

	const nome = typeof usuario.nome == 'string' && usuario.nome.trim() != '';

	return emailValido && senhaValida && senha2 && nome
}

//pega informacoes do formulario
router.post('/register', (req, res, next)=>{

	if(validaUsuario(req.body)){
		knex('usuarios').insert(req.body).then(res.render('login'))
	}
	else {
		next(new Error('Informacoes invalidas'))
	}
})

module.exports = router
				
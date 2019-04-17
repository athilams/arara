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

function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

//pega informacoes do formulario
router.post('/register', (req, res, next)=>{

	if(validaUsuario(req.body) && validarCPF(req.body.cpf) && verificaEmail(req.body.email)){
		knex('usuarios').insert(req.body).then(res.send('Passou na verificacao'))
	}
	else {
		next(new Error('Informacoes invalidas'))
	}
})

function verificaEmail(email){
	knex('usuarios').select().where('email', email).then((rows)=>{
			if(rows.length === 0){
				console.log('criando novo usuario')
				return true

			}
			else{
				console.log('Ja existe um usuario com este Email')
			}
		})
}


module.exports = router
				

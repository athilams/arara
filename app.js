const express        = require('express')
const expressLayouts = require('express-ejs-layouts')
const pg 			 = require('pg')
const bodyParser   	 = require ('body-parser')
const app            = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', require('./routes/users.js'), (req) => {
	router.req
})
//Define a porta a ser utilizada
const PORT = 5009

//Inicia o servidor na porta especificada
app.listen(PORT, console.log(`Servidor na porta ${PORT}`))
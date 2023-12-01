// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
const crypto = require('./crypto');

const corsOp = {
  //cliente q fara o acesso
  origin: "http://localhost:3000",
  //metodo q o cliente pode executar
  methods: "GET,PUT,POST,DELETE",

  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();
app.use(cors(corsOp))

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/user/authenticated", "/deslogar", "/usuarios/cadastrar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('usuarios/cadastrar')
})


app.post('/usuarios/cadastrar', async function(req, res){
  try {
    const dados = {
      nome: req.body.nome,
      senha: crypto.encrypt(req.body.senha)
    }
    if(req.body.senha == req.body.senhaagain){
      const criado = await usuario.create(dados);
      res.redirect('/usuarios/listar')
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'As senhas não são iguais!✧' });
}
})

app.get('/usuarios/listar', async function(req, res){
 try {
  var criado = await usuario.findAll();
  res.json(criado);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
}
})

app.post('/user/authenticated', async function(req, res) {
  const login = await usuario.findOne({ where: { nome: req.body.nome, senha: crypto.encrypt(req.body.senha) } })
  if(login){
    const id = login.id;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3000
    })
    return res.cookie('token', token, {httpOnly:true}).json({
      nome: login.nome,
      token: token
    });
  }
    res.status(500).json({mensagem: "login invalido!"})
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly:true});
  res.json({deslogar:true})
})

app.listen(3001, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});
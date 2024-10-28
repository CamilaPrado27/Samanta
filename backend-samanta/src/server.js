require('dotenv').config({path:'variaveis.env'});
const express = require('express');
//permissão de acesso como API para acessar recursos de domínios diferentes
const cors = require('cors');
//módulo que converte o body em outros formatos
const bodyParser = require('body-parser');

const routes = require('./routers.js');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));


// código do thiago com /api
server.use('/', routes);

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
})
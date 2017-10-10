
//criando as variaveis express e app, pedidas pelo desafio
var express  = require('express');
var app      = express();

//criando variáveis para o proxy
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

//pega o número de processadores, diz quantos são e diz quantos processos serão lançados.
var numCPU = require('os').cpus().length;

//criando lista de serviços
var servers = new Array();
var i;

//porta inicial definida no index.js
porta=3000;

link = ('http://localhost:'+porta).toString();

app.all('/', function(req, res) {
		console.log('Redirecionamento ativado!');
		apiProxy.web(req, res, {target: link});
});

app.listen(8000);
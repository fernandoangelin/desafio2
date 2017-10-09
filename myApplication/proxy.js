
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
port=3000
//criar as localhosts
for(i=0;i<numCPU;i++){
	//gerar a string para ser passada como parâmetro
	(servers[i] = 'http://localhost:'+(port+i)).toString();
	console.log(servers[i]);
	temp = servers[i];
	app.all('/', function(req, res) {
	console.log('Redirecting to Server'+i);
	apiProxy.web(req, res, {target: temp});
	//LOCALBASEADO NO BALANCEADOR DE CARGA
});
}

app.listen(8000);
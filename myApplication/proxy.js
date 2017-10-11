
//criando as variaveis express e app, pedidas pelo desafio
var express  = require('express');
var app      = express();

//criando variáveis para o proxy
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

//pega o número de processadores, diz quantos são e diz quantos processos serão lançados.
var numCPU = require('os').cpus().length;

//criando lista de serviços
var addresses = new Array();
var i;

//porta inicial definida no index.js
porta=3000;

for (i=0; i<numCPU; i++){
	addresses[i]  = ('http://localhost:'+(porta+i)).toString();
	//porta+i cria para portas diferentes. deixei para apenas uma porta.

//	link = addresses[i];
	console.log(addresses[i]);

	app.all('/', function(req, res) {
			//implementa um round robin para o balanceamento para links e portas diferentes
			link=addresses.shift();

			console.log('Redirecionamento ativado para '+link);
						
			apiProxy.web(req, res, {target: link});
			addresses.push(link);
	});
}
app.listen(8000);
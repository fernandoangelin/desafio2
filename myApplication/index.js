
//criando a variavel cluster, para realizar o balanceamento de carga.
var cluster = require('cluster');

//criando as variaveis express e app, pedidas pelo desafio
var express = require('express');
var app = express();

//pega o número de processadores, diz quantos são e diz quantos processos serão lançados.
numCPU=require('os').cpus().length;
//console.log('O número de processadores é:', numCPU);
//console.log('Então, serão lançados', numCPU, 'serviços.');

//teste para saber se o processo é o principal.
//Caso positivo, ele cria os forks para o número de CPUs encontrados na máquina.
if(cluster.isMaster) {
  //laço para criar o fork.
  for (var i = 0; i < numCPU; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.pid + ' died');
  });

  return;
}

//função que apresenta a mensagem para quem acessar a porta 3000
app.get('/', function (req, res) {
res.send('Hello World!');
});

//porta onde o serviço está ouvindo.
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
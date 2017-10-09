 
//criando a variavel cluster, para realizar o balanceamento de carga.
var cluster = require('cluster');
 
//criando a variavel http para receber requisições.
var http = require('http');
 
//criando as variaveis express e app, pedidas pelo desafio
var express = require('express');
 
//pega o número de processadores, diz quantos são e diz quantos processos serão lançados.
var numCPU = require('os').cpus().length;
//console.log('O número de processadores é:', numCPU);
//console.log('Então, serão lançados', numCPU, 'serviços.');
 
//teste para saber se o processo é o principal.
//Caso positivo, ele cria os forks para o número de CPUs encontrados na máquina.
if(cluster.isMaster) {
    //laço para criar o fork.
    for (var i = 0; i < numCPU; i++) {
        cluster.fork({ port: 3000 + i });
    }
    //mensagem para caso o processo é encerrado inesperadamente
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.pid + ' died');
    });
} else {
    var workerPort = cluster.worker.process.env.port;
 
    var app = express();
    app.get('/', function (req, res) {
        //função que apresenta a mensagem para quem acessar a porta 3000
        res.send('Hello World from port ' + workerPort);
    });
 
    app.listen(workerPort, function() {
        console.log('Example app listening on port ' + workerPort);
    });
}
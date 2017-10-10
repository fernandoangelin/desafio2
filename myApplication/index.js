 
//criando a variavel cluster, para realizar o balanceamento de carga.
var cluster = require('cluster');

//pega o número de processadores, diz quantos são e diz quantos processos serão lançados.
var numCPUs = require('os').cpus().length;
//console.log('O número de processadores é:', numCPU);
//console.log('Então, serão lançados', numCPU, 'serviços.');
 
//criando a variavel express
var express = require('express');
 
//porta de início setada em 3000 e a variável i índice.
var porta = 3000;
var i;

//teste para saber se o processo é o principal.
//Caso positivo, ele cria os forks para o número de CPUs encontrados na máquina.
if(cluster.isMaster) {
	console.log('Processo Master rodando...')
    //laço para criar o fork ouvindo em portas diferentes.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ port: porta+i});
        //caso queira ouvir em portas diferentes, soma +i na porta
    }
    //mensagem para caso o processo é encerrado inesperadamente
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.pid + ' faleceu...');
        console.log('Iniciando novo Worker...');
        cluster.fork();
    });
} else {
	//pega a porta do worker
    var portaWorker = cluster.worker.process.env.port;

    //cria a variável app com base na biblioteca Express.
    var app = express();

    app.get('/', function (req, res) {
        //função que apresenta a mensagem para quem acessar X
        res.send('Hello World da porta ' + portaWorker + ' e do Worker' + cluster.worker.id);
        console.log('Hello World da porta ' + portaWorker + ' e do Worker' + cluster.worker.id);
    });
 
    app.listen(portaWorker, function() {
    	//funçao que apresenta no console a porta em que está escutando
        console.log('APP exemplo listening na porta ' + portaWorker + ' e no Worker' + cluster.worker.id);
    });
}
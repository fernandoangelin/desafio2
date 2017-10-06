
//adicionando a biblioteca express
var express = require('express');
var app = express();

//recebe o número de processadores via argumento
numCPU=(process.argv[2]);

app.get('/', function (req, res) {
res.send('Hello World!');
});

console.log('O número de processadores é:', numCPU);


//CRIAR UM FORZÃO COM O ARGUMENTO

 
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});

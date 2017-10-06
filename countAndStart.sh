#!/bin/bash

#comando para contar o número de processadores (com threads)
numCPU=$(nproc)

cd myApplication

#comando para rodar o nodeJS, sendo que as instâncias para cada processador serão instanciadas
node index.js $numCPU

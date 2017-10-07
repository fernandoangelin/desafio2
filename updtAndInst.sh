#!/bin/bash

#comando para atualizar o sistema
echo "####################################################################"
echo "#                    Atualização do Ambiente...                    #"
echo "####################################################################"

sudo apt update && sudo apt upgrade -y

#comando para instalar programas necessários
echo "####################################################################"
echo "#               Instalação de Programas Essenciais...              #"
echo "####################################################################"

sudo apt install -y curl

#comandos para instalar a versão LTS do NodeJS e a biblioteca pedida
echo "####################################################################"
echo "#          Instalação do NodeJS e Biblioteca Necessária...         #"
echo "####################################################################"

#baixar a versão LTS do NodeJS
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

#instala o node e as principais bibliotecas
sudo apt-get install -y nodejs build-essential

cd /myApplication

#instalação da Biblioteca Express
sudo npm install express --save

node index.js &

clear
clear
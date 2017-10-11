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
echo "#         Instalação do NodeJS e Bibliotecas Necessárias...        #"
echo "####################################################################"

#baixar a versão LTS do NodeJS
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

#instala o node e as principais bibliotecas
sudo apt install -y nodejs build-essential

cd myApplication/

#instalação da Biblioteca Express
sudo npm install express --save

#instalação da http proxy
sudo npm install --save express http-proxy

#instalação da pm2
sudo npm install pm2@latest -g --save

#instalação request para testar carga
sudo npm install request --save

#instalar o winston e outra biblioteca adicional
sudo npm install winston@2.4.0 --save
sudo npm install --save winston-daily-rotate-file

#rodar em background com o PM2 o serviço criado.
pm2 start index.js

#rodar o proxy também em background..
pm2 start proxy.js

echo "####################################################################"
echo "#                   Tudo instalado e executando...                 #"
echo "####################################################################"
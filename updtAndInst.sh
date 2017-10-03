#!/bin/bash

#comando 
echo "####################################################################"
echo "#                    Atualização do Ambiente...                    #"
echo "####################################################################"

sudo apt update && sudo apt upgrade -y

echo "####################################################################"
echo "#               Instalação de Programas Essenciais...              #"
echo "####################################################################"

sudo apt install -y git wget

echo "####################################################################"
echo "#          Instalação do NodeJS e Biblioteca Necessária...         #"
echo "####################################################################"

#criar a pasta para o nodeJS no /opt/
sudo mkdir -p /opt/nodejs

#baixar a versão LTS
wget https://nodejs.org/dist/v6.11.3/node-v6.11.3-linux-x64.tar.xz

#descompactar e mover o nodeJS para /opt/
sudo tar -Jxf node-v6.11.3-linux-x64.tar.xz -C /opt/nodejs/

#remover arquivo baixado
rm node-v6.11.3-linux-x64.tar.xz

#criar o link para para a versão atual
cd /opt/nodejs
sudo ln -s node-v6.11.3-linux-x64 current

#criar o link para o binário atual
sudo ln -s /opt/nodejs/current/bin/node /bin/node

#instalação do NPM
sudo apt install npm

cd /opt/nodejs

#instalação da Biblioteca Express
sudo npm install express --save

cd
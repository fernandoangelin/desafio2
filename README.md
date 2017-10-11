# desafio2

Segundo Desafio proposto pelo time de recrutamento da **Linx+Neemu+Chaordic**.

Este repositório contém os arquivos referentes ao segundo desafio.

Por _Fernando Angelin_

## Configuração do Ambiente, Instalação de Programas e Inicialização do serviço NodeJS.

Por favor, clone o repositório para a pasta do usuário atual.

Para dar início à configuração do ambiente (a partir da pasta do usuário), caso precise dar permissão de execução para o _script_ updtAndInst.sh, com o seguinte comando (sem aspas):

**"chmod +x updtAndInst.sh"**

Se não precisar, deve-se executar o _script_ updtAndInst.sh (sem aspas):

**"./updtAndInst.sh"**

Este _script_ irá primeiramente atualizar o ambiente com os pacotes mais recentes.

Após esta atualização, são instalados programas essenciais durante a configuração, incluindo o NodeJS e as bibliotecas pedida, que é a ExpressJS.

Depois disso, este _script_ já inicia o serviço NodeJS e o Proxy reverso.

### index.js

Este _script_ cria dinâmicamente, conforme o número de CPUs e threads no sistema, instâncias do serviço nodeJS, ouvindo na mesma porta, a 3000.

Utilizando a biblioteca cluster, o algoritmo padrão de balanceamento de carga é o _Round-Robin_, que irá balancear a carga do processo com seus filhos criados dinamicamente.

### proxy.js

Este _script_ cria um serviço de proxy reverso onde ele direciona o acesso para o serviço instanciado no _script_ anterior.

O balanceamento de carga implementado foi um round robin para os links disponiveis, conforme o número de processadores da máquina.

### Tentativa realizada

Ouve uma tentativa onde eram criados forks dos serviços em _index.js_ onde os serviços ouviam em portas diferentes.

Porém, em _proxy.js_ não havia balanceamento de carga, sendo que todas as requisições eram enviadas para o último localhost criado.

Então deixei por conta do sistema o balanceamento de processos, já que os forks são feitos em cluster.

## Teste de conexão

Executar o _script_ test.js da seguinte maneira:

node test.js

Ele faz requests para a porta 8000. esta direciona para a porta 3000 e diz qual worker recebeu a conexão.

# CheckBox
[ X ] Script para Instalação das dependências (NodeJS LTS, ExpressJS...) e inicialização dos serviços.

[ X ] Index que instancia os serviços NodeJS de forma dinâmica aos números de CPUs e Threads, em portas diferentes, começando na 3000 somando o número de CPU - 1, ex: no caso de quatro CPUs as portas 3000, 3001, 3002 e 3003 serão ocupadas.

[:'( ] Deploy e rollback ainda não.

[ X ] Proxy Reverso que ouve na porta 8000 e redireciona para as portas dos serviços NodeJS instanciados anteriormente, partindo da porta 3000 somando o número de CPUs - 1, vide exemplo anterior. Por enquanto apenas HTTP.

[ X ] Balanceamento de carga implementado em proxy.js. Seu funcionamento é igual ao _Round-Robin_.

[:'( ] Monitoramento dos serviços Node e Web (são lançados apenas pelo PM2), mas ainda não.

[ :| ] Teste utilizando requests para acessar o proxy e saber qual worker está lidando com a conexão. Ainda sem throughput máximo que o sistema consegue aguentar.

[:'( ] Script que parseia o log de acesso do serviço web rodar diariamente e enviar por email um simples relatório, com frequência de requisições e o respectivo código de resposta (ex:5 /index.html 200).. Ainda não.

[:'( ] Parser de log para os logs gerados pelo teste de carga, garantindo que o script terá performance mesmo em logs gigantescos. Ainda não.

PS: Consegui capturar logs da execução, mas não está muito bonito..
Este código eu coloquei no final de index e proxy (não na versão comitada), trocando apenas o nome do arquivo. Vou comitá-lo separado.

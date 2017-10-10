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

O balanceamento de carga padrão atua para o balancemanto de carga nos CPUs e threads disponíveis.

### Tentativa realizada

Ouve uma tentativa onde eram criados forks dos serviços em _index.js_ onde os serviços ouviam em portas diferentes.

Porém, em _proxy.js_ não havia balanceamento de carga, sendo que todas as requisições eram enviadas para o último localhost criado.
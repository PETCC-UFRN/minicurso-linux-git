---
layout: layoutGit
title: Minicurso de Linux e Git
---

[comment]: <> (Essas páginas que estão vazias são porque elas utilizam layouts que já importam o menu de navegação e o menu dos dias. Você pode ver isso na pasta _includes)
[comment]: <> (Sendo assim, basta escrever em markdown mesmo que vai ser tudo estilizado pelos layouts)


<div id="sumario" class="sumario-git">
    <h1>Sumário</h1>
<ul>
  <li><a href="#básico-sobre-processos">Básico Sobre Processos</a></li>
  <ul>
    <li><a href="#o-que-é-um-processo">O que é um processo?</a></li>
    <li><a href="#interrompendo-e-listando-processos">Interrompendo e listando processos</a></li>
    <li><a href="#rodando-processos-em-background">Rodando processos em background</a></li>
  </ul>

  <li><a href="#uso-de-programas-de-compatação-para-compartilhar-e-receber-arquivos">Compactação e Descompactação de Arquivos</a></li>
  <ul>
    <li><a href="#compactação">Compactação</a></li>
    <li><a href="#descompactação">Descompactação</a></li>
  </ul>

  <li><a href="#versionadores-e-git-fundamentos-e-conceitos">Versionadores e Git: Fundamentos e Conceitos</a></li>
  <ul>
    <li><a href="#introdução-aos-versionadores">Introdução aos Versionadores</a></li>
    <li><a href="#introdução-ao-git">Introdução ao Git</a></li>
    <li><a href="#hospedagem-remota-e-conexões-ssh">Hospedagem Remota e Conexões SSH</a></li>
    <li><a href="#workflow-e-primeiro-repositório">Workflow e primeiro repositório</a></li>
    <li><a href="#comandos-e-práticas-do-git">Comandos e Práticas do Git</a></li>
  </ul>
  <li><a href="#exercícios">Exercícios</a></li>
</ul>


  <button class="toggle-button" id="toggle-button">
  
      Esconder Sumário
  
  </button>
  
  
  </div>



# Processos, compactação e introdução ao GIT

## Básico sobre processos

### O que é um processo?

Um processo é um programa em execução.

O sistema operaçional lida com uma infinidade de processos, que possuem as seguintes características:

- Proprietário do processo;
- Estado do processo (em espera, em execução, etc);
- Prioridade de execução;
- Recursos de memória.

Cada processo possui um número identificador, chamado de PID (Process Identifier), que é utilizado para controlá-lo.

#### Estados dos processos
- Executável: o processo pode ser executado imediatamente;
- Dormente: o processo precisa aguardar algo para ser executado. Só depois desse "algo" acontecer é que ele passa para o estado executável;
- Zumbi: o processo é considerado "morto", mas, por alguma razão, ainda existe;
- Parado: o processo está "congelado", ou seja, não pode ser executado.


### Interrompendo e listando processos

#### Visualizando processos estaticamente com `ps`

O comando `ps` mostra quais os processos em execução atualmente, mostrando quais os UIDs e PIDs de cada processo.

Ao executar o `ps` sem nenhuma opção, serão apresentados os processos em execução no terminal.

```bash
$ ps
 PID TTY           TIME CMD
 1234 pts/0    00:00:02 bash
 9101 pts/0    00:00:00 ps
```
As opções mais importantes para o comando `ps` são:

- a - mostra os processos existentes de todos os usuários;
- f - exibe a árvore de execução dos processos;
- l - exibe mais campos no resultado;
- m - mostra a quantidade de memória ocupada por cada processo;
- u - exibe o nome do usuário que iniciou determinado processo e a hora em que isso ocorreu;
- x - exibe os processos que não foram iniciados no console do terminal;´

##### O uso do `ps` com o `grep`
O `ps` é uma ferramente essencial e corriqueira, e já usamos quase que automaticamente com o `grep`, porém, somos limitados a filtrar um processo por vez.
Por exemplo, para ver os processos systemd e sshd (serviço SSH):

```shell
$ ps aux | grep systemd  
```

Primeiro, o  comando `ps aux` mostra todos os processos em execução, enquanto grep systemd filtra apenas os processos que contêm "systemd" em sua descrição.

#### Uso do `kill`

O comando `kill` é usado no Linux para enviar sinais a processos. Esses sinais podem instruir o processo a realizar várias ações, como terminar, parar ou continuar a execução. Quando usamos `kill` para matar um processo, estamos enviando um sinal específico que informa o processo que ele deve encerrar.

##### Como ver os possíveis sinais?

Existem múltiplos sinais disponíveis no Linux que podem ser utilizados para interromper, encerrar ou pausar processos. O comando pode ser usado como mostrado abaixo:

```shell
    $ kill -l
```
Este comando irá mostrar uma página do manual com diferentes sinais do comando kill e seus respectivos números. Embora existam muitos sinais disponíveis, na maioria das vezes utilizamos o SIGKILL (9) e SIGTERM (15).

##### Significados dos principais sinais

SIGHUP (1): Costuma ser utilizado para reiniciar processos (o processo ler novamente os seus arquivos de configuração), bem como desconectar um processo do processo pai.

SIGINT (2): Interrompe ou para um processo, geralmente gerado pelo usuário pressionando Ctrl+C no terminal.

SIGKILL (9): Força a parada imediata de um processo, não pode ser capturado ou ignorado pelo processo.

SIGTERM (15): Solicita a terminação "elegante"" do processo, permitindo que ele libere recursos antes de encerrar, termine o que está fazendo e feche.

SIGTSTP (20): Solicita ao terminal a interrupção temporária do processo(parar/pausar), geralmente gerado pelo usuário pressionando Ctrl+Z.

SIGCONT (18): Retoma um processo pausado pelo sinal SIGTSTP (ou SIGSTOP).

##### Como realmente matar processos?

Por padrão, é enviado o sinal SIGTERM, que requisita a finalização do processo, por isso o nome *kill* (matar). Em geral é usado desta forma:

```shell
$ kill PID
```
Você tamvém pode usar o comando kill seguido pelo número do sinal e o PID (Process ID) do processo que deseja terminar.

```shell
    $ kill -8 <PID>
```

#### Uso do killall

O comando `killall` no Linux envia sinais para os processos e recebe como parâmetro não o PID do processo, mas seu nome. Ele é usado geralmente para terminar a execução de processos que possuem diversos processos filhos executando ao mesmo tempo. 

##### Sintaxe básica

```shell
$ killall [opções] nome_do_processo
```

Você pode enviar um sinal específico para os processos de mesmo nome como:

```shell
$ killall -9 firefox
```

##### Verificando antes de Encerrar

Para verificar quais processos seriam encerrados sem realmente matá-los, use a opção -i para interação

```shell
$ killall -i firefox
```

##### Encerrando Processos de um Usuário Específico

Para encerrar processos de um usuário específico, use a opção -u:
```shell
$ killall -u usuario firefox
```

#### Uso e visualização processos dinâmicamente com htop

O comando HTOP é um utilitário de linha de comando que tem como objetivo auxiliar o usuário a monitorar de forma interativa e em tempo real os recursos de seu sistema operacional Linux.

##### Instalar htop no Ubuntu

```shell
$ sudo apt install htop
```

**Iniciar a ferramenta**

```shell
$ htop
```
<img style="display: block;margin: 0 auto;" src="https://blog.ironlinux.com.br/images/blog-posts/uploads/2022/05/htop1.png" width="100%">

### Rodando processos em background

#### Uso do & comercial no shell.

No Linux, um processo pode estar em foreground ou em background, ou seja, em primeiro plano ou em segundo plano. Por exemplo, ao digitar o comando:

```bash
$ ping google.com
```
Quando você executa o comando ping em primeiro plano (sem o & no final), ele ocupa o terminal até que você interrompa manualmente a execução. Isso significa que você não poderá usar o terminal para outros comandos até que o ping termine ou seja interrompido.

Seu terminal ficará assim:

```bash
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.045 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.032 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.030 ms
```
Para interromper o ping em primeiro plano, use Ctrl + C. Isso envia um sinal de interrupção (SIGINT) para o processo ping, fazendo com que ele termine a execução e exiba um resumo das estatísticas:

```shell
^C
--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1999ms
rtt min/avg/max/mdev = 0.030/0.035/0.045/0.007 ms
```

Para o exemplo acima, é possível liberar o shell para outras atividades enquanto o o processo gerado pelo comando fica em segundoplano. Basta que você digite:

```bash
$ ping google.com &
```
O símbolo & indica que o comando deve ser executado em background, ou seja, em segundo plano.

Você verá uma mensagem que indica o número do trabalho ([1]) e o PID do processo (1234):

##### Ver lista de processos em segundo Plano

Para poder ver quais processos em segundo plano é só digitar 

```shell
$ jobs
```

Irá aparecer algo como:

```bash
$ [1]+  Running          ping 127.0.0.1 &
```

Note que se você fizer CTRL + C  o processo não será interrompido, pois ele não está em primeiro plano(foreground).

##### Trazer para foreground

Vamos supor que você pretende trazer o processo para primeiro plano. Para isso utilize o seguinte comando :

```bash
$ fg %1
```

Agora você pode matálo diretamente utilizando o CTRL + c , que manda o sinal SIGINT, que faz com que ele termine a execução e exiba um resumo das estatísticas :

```bash
^C
--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1999ms
rtt min/avg/max/mdev = 0.030/0.035/0.045/0.007 ms
```

##### Retomando processos suspensos em background

Vamos agora digitar o seguinte comando:
```bash
$ ping 127.0.0.1
```

Agora vamos pressionar  `CTRL + Z` para suspender o comando bing. Esse comando pausa o processo e o colocar em segundo plano em estado de pausa(suspenso).

```bash
^Z
[1]+  Stopped                 ping 127.0.0.1
```
Para retomar o Processo em segundo plano é necessário utilizar o comando bg da seguinte forma.

```bash
$ bg %1
```

agora vamos digitar o comando jobs para ver o estado dos processos em background.


```bash
$ jobs
 [1]+  Running                 ping 127.0.0.1 &
```
#### Uso do nohup

Mesmo que um processo esteja em segundo plano, ele pode ser interrompido por vários motivos.

Digamos que você tenha terminado seu trabalho e feche sua sessão de SSH. Lembra daquele processo de longa duração que você iniciou? Sumiu! Quando você sai da sessão, o sistema envia um sinal especial para cada processo iniciado que ainda está em execução chamado "SIGHUP". Esse sinal desliga o processo mesmo quando ele ainda tem trabalho a fazer. Isso é o que o comando `nohup` pretende corrigir.

Há outras maneiras, é claro, para um processo ser encerrado, mas o comando nohup refere-se especificamente aos encerrados devido ao sinal SIGHUP.

Nohup - abreviação de '*no hang up*' - é um comando em sistemas Linux que mantém os processos em execução mesmo depois de sair do shell ou terminal. O Nohup impede que os processos ou trabalhos recebam o sinal SIGHUP (Signal Hang UP). Este é um sinal que é enviado para um processo ao fechar ou sair do terminal. 

##### Sintaxe do comando Nohup
A sintaxe para usar o comando Nohup é direta:
```bash
$ nohup command [options] &
```
'command': especifica o comando ou script que você deseja executar.
'[options]': argumentos opcionais ou sinalizadores que modificam o comportamento do comando.
`&`: Colocar este símbolo ao final de um comando instrui o shell a executar esse comando em segundo plano.

##### Iniciando um processo usando o Nohup

Para iniciar um processo usando o Nohup, basta preceder o comando desejado com . Por exemplo, se você deseja executar um script bash chamado usando Nohup, você deve usar o seguinte comando:

```bash
$ nohup sleep 60 &
```
Com o comando acima, o sistema executa um comando "sleep", que normalmente bloqueia todas as entradas, mas isso as envia para o segundo plano, graças ao parâmetro "&". Executá-lo tem a seguinte aparência:
```bash
$ nohup sleep 60 &
[1] 4003
$ nohup : ignoring input and appending output to 'nohup.out'
```

##### Deixando de fora o caractere '&'

Você pode até mesmo usar o comando nohup sem o caractere "&" enviando o processo para o segundo plano. Mas isso simplesmente significa que o processo será executado em primeiro plano e que você não poderá fazer nenhum outro trabalho no terminal até que ele seja concluído. Geralmente, para tarefas de longa duração, o usuário sempre envia para segundo plano, porque quem quer esperar por aí sem fazer nada por longos períodos?

Mas caso você use o nohup mantendo o processo em primeiro plano, pode ter certeza de que, se fechar o terminal, ou perder a conectividade com a Internet, ou algo mais acontecer, o processo não será interrompido. Mas, como mencionado acima, você quase sempre vai querer executar o comando em segundo plano.

#### Uso do wait

O comando "wait" é uma ferramenta poderosa no  Linux que permite que os scripts aguardem a conclusão de outros processos antes de continuar a execução.

Por exemplo:
 ```shell
 $ nohup sleep 30 &
 [1] 5010
$ wait 5010
 ```
 
 Depois de digitar o comando  ` wait <PID>`, o terminal irá esperar o proceso ser finalizado.

## Uso de programas de compatação para compartilhar e receber arquivos
### Compactação
#### Compactando diretórios com zip

Compactar arquivos significa juntar todos em um único arquivo de modo que ocupem um espaço menor.

Provavelmente você já viu algum arquivo com a extensão .zip. No Linux, para compactar arquivos no formato .zip é utilizado o comando `zip`.

Vamos supor que temos a pasta chamada "projetos" e dentro dela tenha dois subdiretórios chamados "ITP" e "PC", com todos os programas que você fez durante as disciplinas. O seguinte problema surgiu : você gostaria de mandar pelo whats up para um colega recém chegado no curso, porém o Whats UP não permite mandar devido ao tamanho dos arquivos e, por isso, você descidiu compactar os projetos.

Para isso fez o seguinte comando :
```shell
    $ zip projetos.zip projetos/
```
depois executou o seguinte comando para poder visualizar se todos os diretórios foram armazenados no arquivo compactado "projetos.zip" :
```shell
    $ unzip -l projetos.zip 
```
e viu o senguinte:

```shell
  $ Archive:  projetos.zip
    Length      Date    Time    Name
    ---------  ---------- -----   ----
            0  2023-07-09 12:00   projetos/
    ---------                     -------
            0                     1 file
```
Note que ocorreu um problema, pois os subdiretórios não foram inseridos na compactação e isso ocorre, porque por padrão o comando `zip` não inclui os arquivos e subdiretórios de um diretório, por isso nosso .zip contém apenas o diretório Projetos/ vazio. Para resolver isso é fácil: basta passar o argumento -r (recursive).

O -r vai fazer com que o comando zip processe recursivamente todos os subdiretórios e arquivos dentro do diretório especificado, garantindo que tudo seja incluído no arquivo compactado. Vamos corrigir o comando para incluir o argumento -r:

```shell
    $ zip -r projetos.zip projetos/
```

Agora vamos ver se tudo foi compactado
```shell
    $ unzip -l projetos.zip 
    Archive:  projetos.zip
    Length      Date    Time    Name
    ---------  ---------- -----   ----
            0  2023-07-09 12:00   projetos/
            0  2023-07-09 12:00   projetos/ITP/
        2048  2023-07-09 12:00   projetos/ITP/programa1.c
        1024  2023-07-09 12:00   projetos/ITP/programa2.c
            0  2023-07-09 12:00   projetos/PC/
        5120  2023-07-09 12:00   projetos/PC/programa1.py
    ---------                     -------
        8192                     6 files
```

#### Compactando arquivos e diretórios com tar e gzip

Outra forma de compactar arquivo é utilizando tar e gzip. Quando nos deparamos com arquivos do tipo "arquivo.tar.gz, siguinifica que ocorreram dois processos. 
- Primeiramente ocorreu o empacotamento dos arquivos no formato `.tar ` e depois foi feita a compactação dos arquivo no formato `gzip`.

##### Qual a vantagem do tar?

A vantagem é que o tar consegue manter as permissões dos arquivos, bem como links diretos e simbólicos, sendo interessante por exemplo para realizar backups.

Utilizamos o comando tar para realizar as compactações. A compactação do diretório "projetos/" ficaria da seguinte forma:

```shell
$ tar -czf projetos.tar.gz projetos/
```

- -c - create: indica que desejamos criar um arquivo

- -z - gzip: indica que queremos compactar com gzip

-  -f - file: especifica o nome do arquivo compactado


Note que não precisamos usar o `-r` e isso acontece, pois o `tar` age de forma recursiva por padrão.

### Descompactação 
#### Descompactando diretórios com unzip

Vamos supor que seu colega, que recebeu o arquivo projetos.zip, deseja descompactar os arquivos. Para isso, ele erá executar os seguintes passos :

```shell
$ unzip projetos.zip
```
Isso irá extrair todos os arquivos e diretórios contidos no arquivo "projetos.zip" para o diretório atual. Se desejar extrair para um diretório específico, você pode usar a opção `-d`:

```shell
$ unzip projetos.zip -d /home/ubuntu/Music
```

Se você não quiser que apareça o progresso e sua tela fique cheia de informações, pode utilizar o -q, que significa quiet, para que ele apenas descompacte e não mostre cada coisa que fez:

```shell
$ unzip -q projetos.zip -d /home/ubuntu/Music
```

#### Descompactando arquivos e diretórios com tar e gunzip

Para descompactar um arquivo tarball comprimido com gzip, utilizamos o comando tar novamente, desta vez com a opção -x para extrair o conteúdo. Vamos supor que você recebeu o arquivo "projetos.tar.gz" e deseja extrair seu conteúdo:

```shell
$ tar -xzf projetos.tar.gz
```

- -x - extract: extrai o conteúdo do arquivo tar
- -z - gzip: descomprime o arquivo usando gzip
- -f - file: especifica o nome do arquivo tar

## Versionadores e Git: Fundamentos e Conceitos

### Introdução aos Versionadores
#### Contextualização com a história do Linux
A criação do Linux foi um marco importante na história do desenvolvimento de software, principalmente por sua natureza colaborativa e open-source. Linus Torvalds, o criador do Linux, enfrentou desafios significativos ao coordenar as contribuições de inúmeros desenvolvedores ao redor do mundo. Para gerenciar essas contribuições e manter a integridade do código, Torvalds desenvolveu o Git, um sistema de controle de versão distribuído. Essa necessidade de um sistema robusto e eficiente de versionamento deu origem a ferramentas que são agora essenciais no desenvolvimento de software moderno.

#### O que são Versionadores?

Versionadores são sistemas que registram alterações em um arquivo ou conjunto de arquivos ao longo do tempo, permitindo lembrar versões específicas mais tarde. Surgiram devido à necessidade de aumentar a eficiência, gerenciar um número maior de colaboradores e projetos de software moderno.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/ryblu7zSR.png" width="70%">

#### Tipos de Versionadores

##### 1. Sistemas Locais

Utilizam um banco de dados simples para manter todas as alterações nos arquivos sob controle de versão.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJv-sbGHA.png" width="70%">

##### 2. Sistemas Centralizados

Têm um único servidor que contém todos os arquivos de controle de versão e um número de clientes que usam esses arquivos a partir desse lugar central.
Desvantagens incluem a necessidade de estar sempre conectado ao servidor e a paralisação em caso de falha do servidor.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/By_qMTBHR.png" width="70%">

- **Vantagens dos Sistemas Centralizados**

    - Simples de utilizar, ideal para equipes pequenas.

    - Utilizados por plataformas como a Wikipédia.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/HJUGsZzB0.png" width="70%">


##### 3. Sistemas Distribuídos

Cada cliente possui uma cópia completa do repositório, funcionando como um backup completo de todos os dados.

Não dependem de um servidor central, oferecendo maior eficiência e segurança contra ataques.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

**Vantagens dos Sistemas Distribuídos**

**Escalabilidade:** Suporta um grande número de colaboradores.

**Independência:** Não depende de um servidor central.

**Eficiência:** Processos mais rápidos e eficientes.

**Segurança:** Maior proteção contra falhas e ataques.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/S12LXpBHA.png" width="70%">

## Introdução ao Git

### Surgimento do Git

A história do Git está profundamente ligada ao desenvolvimento do Linux Kernel, um dos projetos de software livre mais importantes e complexos do mundo. Durante os anos iniciais, as mudanças no kernel do Linux eram gerenciadas através do envio de arquivos entre desenvolvedores. Posteriormente, passou-se a usar o versionador BitKeeper. No entanto, quando o BitKeeper se tornou pago, a comunidade Linux, liderada por Linus Torvalds, decidiu criar uma nova ferramenta de versionamento, aprendendo com as lições adquiridas durante o uso do BitKeeper.

Os objetivos principais para o novo sistema incluíam:

**Velocidade**

**Design simples**

**Forte suporte para o desenvolvimento não linear** (milhares de branches paralelas)

**Alta distribuição**

**Capacidade de lidar com grandes projetos** como o kernel do Linux de forma eficiente

### De onde vem o nome "Git"?

O nome "Git" tem uma origem curiosa. Em uma entrevista, Linus Torvalds explicou sarcasticamente que ele nomeia todos os seus projetos em sua homenagem, sendo "Linux" o primeiro e "Git" o segundo. Na gíria britânica, "git" significa "pessoa desagradável". Além disso, há uma interpretação alternativa em que "Git" pode significar "Global Information Tracker" quando você estiver de bom humor.

Para mais detalhes, você pode consultar o manual do Git no terminal usando o comando `man git`.

### Git como um Versionador

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

O Git é um dos sistemas de controle de versão mais utilizados no mundo, conhecido por ser:

1. **Open Source**
2. **Ideal para trabalho em equipe**
3. **Adequado para o desenvolvimento de todos os tipos de software**
4. **O versionador mais utilizado atualmente**

### Como o Git Funciona?

O Git é uma ferramenta de versionamento que gerencia diferentes versões de um arquivo ou conjunto de arquivos. Sempre que você salva o estado do projeto, o Git "tira uma foto" dos arquivos naquele momento e salva uma referência a esse snapshot. Por eficiência, se um arquivo não foi modificado, o Git não o salva novamente, mas cria um "link" para a versão anterior que já está salva.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SkYli-6zR.png" width="70%">

O Git, em geral, apenas **adiciona** informações. É difícil que o sistema apague dados ou faça algo irreversível, especialmente se você enviar suas alterações para o servidor remoto regularmente (push). Esse comportamento garante a integridade e a segurança do histórico do projeto.


## Hospedagem Remota e Conexões SSH

### Introdução a plataformas de hospedagem remota 
#### Gancho com a parte de versionadores
A utilização de versionadores como o Git se torna ainda mais poderosa quando combinada com plataformas de hospedagem remota. 

Essas plataformas permitem que você armazene, compartilhe e colabore em projetos de software com desenvolvedores de todo o mundo. Elas não só armazenam o código, mas também oferecem ferramentas para gerenciamento de projetos, integração contínua, e muito mais.

#### Algumas diferentes plataformas: GitLab, BitBucket, Codeberg.
Existem várias plataformas de hospedagem remota que suportam Git, cada uma com suas características únicas.

**GitLab**

**BitBucket**

**Codeberg**

#### Git e Github : diferenças.
Embora Git e GitHub sejam frequentemente mencionados juntos, eles não são a mesma coisa. Aqui estão as principais diferenças:

##### Git
    - Git é um sistema de controle de versão distribuído.
    - Ferramenta de linha de comando utilizada para gerenciar o histórico de versões de arquivos.
    - Funciona localmente, independentemente de uma plataforma de hospedagem remota.

##### GitHub
    - Hospedagem de Repositórios
    - Se utiliza do Git para fazer o controle de versão dos respositórios hospedados
    - Comunidade ativa
    - Vários outros serviços
    - Um dos maiores repositórios de projetos open source do mundo

### Chave SSH

#### Para que serve a chave SSH?

As chaves SSH (Secure Shell) são utilizadas para autenticar conexões seguras entre computadores, permitindo uma comunicação criptografada. Elas substituem a necessidade de senhas tradicionais, proporcionando uma maneira mais segura e conveniente de acessar sistemas remotos e serviços, como repositórios Git.

Ao configurar uma chave SSH, você cria um par de chaves: uma chave privada, que deve ser mantida em segredo no seu computador, e uma chave pública, que é adicionada ao servidor ou serviço remoto. Quando uma conexão é iniciada, o servidor usa a chave pública para verificar a identidade do usuário, sem que a chave privada precise ser transmitida pela rede, garantindo assim a segurança.

No contexto do Git, a autenticação via chave SSH é especialmente útil ao interagir com repositórios remotos hospedados em plataformas como GitHub, GitLab e Bitbucket. Essas plataformas suportam autenticação por chave SSH, permitindo que os desenvolvedores enviem (push) e busquem (pull) alterações de forma segura, sem precisar digitar senhas repetidamente.

## Workflow e primeiro repositório

### Um pouco mais sobre Git

O Git é um sistema de controle de versão distribuído que gerencia informações armazenando cada versão do projeto como um snapshot completo, em vez de apenas as diferenças entre versões. Ele utiliza uma estrutura de objetos que inclui blobs (conteúdo de arquivos), trees (diretórios), commits (mudanças com metadados) e tags (marcadores de versão). Cada objeto é identificado por um hash SHA-1, garantindo a integridade dos dados. Git permite a criação de branches para desenvolvimento paralelo e merges para combinar mudanças. As modificações são preparadas na staging area antes de serem commitadas. Com funcionalidades robustas de colaboração e resolução de conflitos, Git suporta operações offline e sincronização com repositórios remotos através de comandos como push e pull, facilitando o trabalho simultâneo de múltiplos desenvolvedores.

#### Workflow básico

1) Você **modifica arquivos** na sua árvore de trabalho

2) Você **seleciona apenas as mudanças que você quer** que façam parte do seu próximo commit, e apenas essas mudanças serão adicionadas à staging area

3) Você **faz um commit**: os arquivos como eles estão na staging area são armazenados em forma de snapshot permanentemente no seu diretório  Git.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/HJKOTMTGC.png" width="70%">

Assim, podemos perceber que um arquivo pode estar em um dos 3 estados:

***modified***

***staged***

***commited***

### Comandos e Práticas do Git
#### Inicializando o git no repositório `git init`.

```sh
    $ cd OneDrive/Documentos/projeto
    $ git init
```

Agora, temos um subdiretório chamado .git que contém todos os arquivos necessários de seu repositório – um esqueleto de repositório Git. Nada em seu projeto é monitorado ainda.

```sh
    $ cd OneDrive/Documentos/projeto
    $ git init
    Initialized empty Git repository in /home/anna/OneDrive/Documentos/projeto/.git/
```
#### Gravando alterações em seu repositório

Cada arquivo em seu repsitório pode estar em um dos seguintes estados: rastreado e não-rastreado. Arquivos rastreados são arquivos que foram incluídos no último snapshot; eles podem ser não modificados, modificados ou preparados (adicionados ao stage). Em resumo, arquivos rastreados são os arquivos que o Git conhece.

Quando você clona um repositório pela primeira vez, todos os seus arquivos serão rastreados e não modificados já, que o Git acabou de obtê-los e você ainda não editou nada.

Assim que você edita alguns arquivos, Git os considera modificados, porque você os editou desde o seu último commit. Você prepara os arquivos editados e então faz commit das suas alterações, e o ciclo se repete.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJWWiARzC.png" width="70%">

#### Verificando o status dos arquivos `git status`.
    
A principal ferramenta que você vai usar para determinar quais arquivos estão em qual estado é o comando git status.

```sh
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working directory clean
```
Digamos que você adiciona um novo arquivo no seu projeto, um simples arquivo chamado chat. Se o arquivo não existia antes, e você executar git status, você verá seu arquivo não rastreado da seguinte forma:

```sh
    $ echo 'código do chat' > chat
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Untracked files:
    (use "git add <file>..." to include in what will be committed)

        chat

    nothing added to commit but untracked files present (use "git add" to track)
```


Nós queremos incluir esse arquivo 'chat', então vamos rastreá-lo.


#### Rastreando arquivos novos 
Para começar a rastrear um novo arquivo, você deve usar o comando git add
```sh
    $ git add chat
``` 
Executando o comando status novamente, você pode ver que seu README agora está sendo rastreado e preparado (staged) para o commit:
```sh
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   chat
```     
É possível saber que o arquivo está preparado porque ele aparece sob o título “Changes to be committed”. Se você fizer um commit neste momento, a versão do arquivo que existia no instante em que você executou git add, é a que será armazenada no histórico de snapshots.

#### Preparando Arquivos Modificados (Adicionando arquivos modificados à staging area)
Vamos modificar um arquivo que já está sendo rastreado.

Se por exemplo adicionarmos mais uma linha de código ao arquivo 'feed' que já era rastreado e estava dentro do projeto, e executarmos o `git status`, teremos isso:
```sh
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   chat

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   feed
``` 
Isso significa que o arquivo rastreado foi modificado no diretório mas ainda não foi mandado para o stage (preparado).

Para isso, vamos usar o `git add`.

Pode ser útil pensar nesse comando mais como “adicione este conteúdo ao próximo commit”.
```sh
    $ git add .
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   chat
        modified:   feed
```        

#### Fazendo o **commit** do que foi feito `git commit`.
Agora que a área de stage está preparada, podemos fazer commit nas alterações.

O jeito mais simples de fazer commit é digitar o seguinte comando:
```sh
    $ git commit
```
e adicionar uma mensagem no editor de texto.

Alternativamente, podemos fazer:
```sh
    $ git commit -m "mensagem"
```
Lembre-se de que o commit grava o snapshot que você deixou na área de stage. Qualquer alteração que você não tiver mandado para o stage permanecerá como estava, em seu lugar; você pode executar outro commit para adicioná-la ao seu histórico. Toda vez que você executa um commit, você está gravando um snapshot do seu projeto que você pode usar posteriormente para fazer comparações, ou mesmo restaurá-lo.
#### Como ver todos os commit feitos com `git log`

É um comando feito para exibir os históricos de commits do projeto.

Aparece nome, hora, data e a mensagem relacionada a cada commit.
```sh
    $ git log
    commit 9fceb02d0ae598e95dc970b74767f19372d61af8
    Author: Jane <jane.doe@example.com>
    Date:   Fri Jun 30 14:32:16 2024 +0000

        Adicionando modificação no feed 

    commit 3ad45c37a9f1b251545b8b2f4a3db7b683ed8e53
    Author: John Smith <john.smith@example.com>
    Date:   Thu Jun 29 09:12:10 2024 +0000

        adicionando a funcionalidade chat
```
##### Uma flag eficiente
```sh 
    $git log --oneline
```

```sh
    $ git log --oneline
    9fceb02 (HEAD -> main) Adicionando modificação no feed 
    b75f610 adicionando a funcionalidade chat
    c1b4d83 Commit inicial com arquivos de configuração do projeto   
```
#### Subindo alterações para o repositório remoto `git push`
Se você tem um commit pronto e quer adiciona-lo ao repositório remoto, podemos fazer:
```sh
    $ git push 
```
Fazendo o git push os seus commits irão subir para o seu repositório remoto.


## Exercícios 

### Exercício 01

#### Iniciando um novo repositório Git

1. Crie um novo diretório chamado calculadora_python.

2. Entre no diretório calculadora_pyhon.

3. Inicialize um repositório Git vazio no diretório.

4. Como resolução, descreva todos os comandos que você fez para inicializar o repositório em um arquivo de texto com o nome dia3exercicio1.txt

### Exercício 02

1. Adicione arquivos ao seu repositório Git

2. Crie um arquivo chamado 'README.md' dentro do diretório calculadora_pyton.

3. Adicione o conteúdo "Este é um projeto de uma calculadora em Python que realiza operações básicas." ao README.md.

4. Adicione o arquivo README.md ao repositório Git.

5.Faça um commit no repositório Git  com a mensagem "Adicionei o README.md".


6. Como resolução, descreva os passos que você fez para adicionar o arquivo ao repositório em um arquivo de texto com o nome dia3exercicio2.txt


### Exercício 03

#### Configurando um repositório remoto e enviando os commits

1. No GitHub crie um novo repositório chamado calculadora_pyton.

2. No terminal, dentro do diretório calculadora_pyton, configure seu repositório Git local para apontar para este repositório remoto.

3. Envie seus commits para o repositório remoto:


Como resolução, descreva os passos que você fez para configurar o repositório remoto e enviar seus commits em um arquivo de texto com o nome dia3exercicio3.txt e coloque também no arquivo o link para o seu repositório.

### Exercício 04

#### Adicionando funções de soma e multiplicação à calculadora

1. Adicione um novo arquivo chamado calculadora.py com a função de soma:

Copie o seguinte código:
```py
def soma(a, b):
    return a + b
```

2. Adicione o arquivo ao repositório:


3. Faça um commit com a mensagem "Adiciona função de soma".

4. Adicione a função de multiplicação ao arquivo calculadora.py:
Copie o código da mesma forma que está aqui abaixo (mesmo com o erro): 
```py
def multiplicacao(a, b):
    c+b=4
    return a * b
```
5. Adicione e comite as mudanças com a seguinte mentagem "Adicionei a função de multiplicação"

6. Verifique o erro após o commit e corrija-o apagando o "c+b=4" no arquivo.

7. adicione a modificação ao repositório e faça o commit com a mensagem "Correção de bug na função de multiplicação"

6. Use o comando que sobe as auterações locais para o repositório remoto para subir os seus commits.

Como resolução, descreva os passos que você fez para adicionar e comitar os arquivos em um arquivo de textocom o nome dia3exercicio4.txt


### Exercício 05

#### Clonando um repositório

1. Clone o repositório que está neste link: [link do repositório central]

2. crie uma pasta com o seu numero de matrícula e seu primeiro nome como 201003948_luiz

3. Adicione a pasta ao git depois comite com a mensagem "Adicionei a pasta 201003948_luiz"

4. Aqui você poderá fazer o projeto que almejar, aplicando o que foi  aprendido

    - Você pode criar uma história fictícia com 3 capítulos, fazendo commits a cada capítulo, a cada erro ortográfico corrigido ou modificação de personagem.

    - Você pode fazer uma calculadora ou qualquer outro programa, em qualquer linguagem de programação, fazendo commits a cada funcionalidade implementada.

    - Você pode fazer um mini-site básico, fazendo commits a cada funcionalidade implementada.

5. Traga para o seu repositório as auterações que estão no remoto(para ver se alguém já subiu algum arquivo).

6. Após isso, suba todas os commits para o nosso repositório remoto.

O que será avaliado aqui são os commits (faça no mínimo uns 3 commits)

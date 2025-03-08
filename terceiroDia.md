---
layout: layoutGit
title: Minicurso de Linux e Git
---


<div id="sumario" class="sumario-git">
    <h1>Sumário</h1>
    <ul>
    <details>
        <summary><a href="#básico-sobre-processos">Básico Sobre Processos</a></summary>
        <ul class="section-content">
            <li><a href="#o-que-é-um-processo">O que é um processo?</a></li>
            <li><a href="#interrompendo-e-listando-processos">Interrompendo e listando processos</a></li>
            <li><a href="#rodando-processos-em-background">Rodando processos em background</a></li>
        </ul>
    </details>
    <details>
  <summary><a href="#uso-de-programas-de-compatação-para-compartilhar-e-receber-arquivos">Compactação e Descompactação de Arquivos</a></summary>
    <ul class="section-content">
        <li><a href="#compactação">Compactação</a></li>
        <li><a href="#descompactação">Descompactação</a></li>
    </ul>
  </details>
    <details>
  <summary><a href="#versionadores-e-git-fundamentos-e-conceitos">Versionadores e Git: Fundamentos e Conceitos</a></summary>
  <ul class="section-content">
    <li><a href="#introdução-aos-versionadores">Introdução aos Versionadores</a></li>
    <li><a href="#introdução-ao-git">Introdução ao Git</a></li>
    <li><a href="#hospedagem-remota-e-conexões-ssh">Hospedagem Remota e Conexões SSH</a></li>
    <li><a href="#workflow-e-primeiro-repositório">Workflow e primeiro repositório</a></li>
    <li><a href="#comandos-e-práticas-do-git">Comandos e Práticas do Git</a></li>
  </ul>
  </details>
  <details>
  <summary><a href="#exercícios">Exercícios</a></summary>
  <ul class="section-content">
   <li><a href="#exercícios-obrigatórios">Exercícios Obrigatórios</a></li>
  </ul>
  </details>
</ul>

  <button class="toggle-button" id="toggle-button">
  
      Esconder Sumário
  
  </button>
  
  </div>

# Processos, compactação e introdução ao GIT

## Básico sobre processos

### O que é um processo?

Um processo é um <span class="destaque">programa em execução</span> .

Um sistema operacional lida com uma infinidade de processos, que possuem as seguintes características:

- Proprietário do processo;
- Estado do processo (em espera, em execução, etc);
- Prioridade de execução;
- Recursos de memória.

Cada processo possui um número identificador, chamado de <span class="destaque">PID</span> (Process Identifier), que é utilizado para controlá-lo.

#### Estados dos processos

- <span class="destaque">Executável</span>(R): o processo pode ser executado imediatamente;
- <span class="destaque">Dormente</span>(S): o processo precisa <span class="destaque">aguardar</span> algo para ser executado. Só depois desse "algo" acontecer é que ele passa para o estado executável;
- <span class="destaque">Zumbi</span>(Z): o processo é considerado <span class="destaque">"morto"</span>, mas, por alguma razão, ainda existe;
- <span class="destaque">Parado</span>(T): o processo está <span class="destaque">"congelado"</span>, ou seja, não pode ser executado.

### Interrompendo e listando processos

#### Visualizando processos estaticamente com "ps"

O comando `ps` mostra os processos em execução atualmente e exibe os UIDs e PIDs de cada um.

Ao executar o `ps` sem nenhuma opção, serão apresentados os processos em execução no terminal.

```bash
$ ps
 PID TTY           TIME CMD
 1234 pts/0    00:00:02 bash
 9101 pts/0    00:00:00 ps
```

As opções mais importantes para o comando `ps` são:

<span class="destaque"> -u [username]</span> - mostra os processos existentes de um <span class="destaque">usuário</span> específico;

<span class="destaque"> -f</span> -  Exibe uma lista completa com informações adicionais como <span class="destaque">PPID</span> (ID do processo pai).

<span class="destaque"> -l</span> - exibe mais <span class="destaque">campos</span> no resultado;

<span class="destaque"> -e</span> ou <span class="destaque">-A</span> : Lista <span class="destaque">todos</span> os processos no sistema.

<span class="destaque"> -x</span> - exibe os processos que <span class="destaque">não iniciados</span>  no console do terminal junto com os inicializados no console.

<span class="destaque">aux</span>: Exibe uma listagem detalhada com o uso de memória por cada processo.

##### O uso do "ps" com o "grep"

O `ps` é uma ferramenta essencial e corriqueira. Já a usamos quase que automaticamente com o `grep`, porém, somos limitados a filtrar um processo por vez.
Por exemplo, para ver os processos systemd:

```shell
ps aux | grep systemd  
```

Primeiro, o  comando <span class="destaque">`ps aux`</span> mostra <span class="destaque">todos os processos em execução</span>, enquanto grep systemd filtra apenas os processos que contêm "systemd" em sua descrição.

#### Uso do "kill"

O comando `kill` é usado no Linux para <span class="destaque">enviar sinais a processos</span>. Esses sinais podem instruir o processo a realizar várias ações, como <span class="destaque">terminar</span>, <span class="destaque">parar</span> ou <span class="destaque">continuar</span> a execução. Quando usamos `kill` para matar um processo, estamos enviando um sinal específico que informa o processo que ele deve encerrar.

##### Como ver os possíveis sinais?

Existem múltiplos sinais disponíveis no Linux que podem ser utilizados para interromper, encerrar ou pausar processos. O comando pode ser usado como mostrado abaixo:

```shell
    kill -l
```

Este comando irá mostrar uma página do <span class="destaque">manual</span> com diferentes sinais do comando kill e seus respectivos números. Embora existam muitos sinais disponíveis, na maioria das vezes utilizamos o SIGKILL (9) e SIGTERM (15).

##### Significados dos principais sinais

<span class="destaque">SIGHUP (1)</span>: Ocorre <span class="destaque">quando o terminal fecha</span> ou quando o processo pai finaliza sua execução.

<span class="destaque">SIGINT (2)</span>: <span class="destaque">Interrompe</span> ou <span class="destaque">para</span> um processo, geralmente gerado pelo usuário pressionando <span class="destaque">Ctrl+C</span> no terminal.

<span class="destaque">SIGKILL (9)</span>: Força a <span class="destaque">parada imediata</span> de um processo, não pode ser capturado ou ignorado pelo processo.

<span class="destaque">SIGTERM (15)</span>: Solicita a <span class="destaque">terminação "elegante"</span> do processo, permitindo que ele libere recursos antes de encerrar, termine o que está fazendo e feche.

<span class="destaque">SIGTSTP (20)</span>: Solicita ao terminal a <span class="destaque">interrupção temporária</span> do processo (parar/pausar), geralmente gerado pelo usuário pressionando <span class="destaque">Ctrl+Z</span>.

<span class="destaque">SIGCONT (18)</span>: <span class="destaque">Retoma</span> um processo pausado pelo sinal SIGTSTP (ou SIGSTOP).

##### Como realmente matar processos?

Por padrão, é enviado o sinal <span class="destaque">SIGTERM</span>, que requisita a finalização do processo, por isso o nome *kill* (matar). Em geral é usado desta forma:

```shell
kill PID
```

Você tamvém pode usar o comando kill seguido pelo número do sinal e o PID (Process ID) do processo que deseja terminar.

```shell
    kill -8 <PID>
```

#### Uso do killall

O comando `killall` no Linux envia sinais para os processos e recebe como parâmetro não o PID do processo, mas seu nome. Ele é usado geralmente para terminar a execução de processos que possuem diversos <span class="destaque">processos filhos</span> executando ao mesmo tempo.

##### Sintaxe básica

```shell
killall [opções] nome_do_processo
```

Você pode enviar um sinal específico para os processos de mesmo nome como:

```shell
killall -9 firefox
```

##### Verificando antes de Encerrar

Para <span class="destaque">verificar</span> quais processos seriam encerrados sem realmente matá-los, use a opção <span class="destaque">-i</span> para interação

```shell
killall -i firefox
```

##### Encerrando Processos de um Usuário Específico

Para encerrar processos de um <span class="destaque">usuário específico</span>, use a opção -u:

```shell
killall -u usuario firefox
```

#### Uso e visualização processos dinâmicamente com "htop"

O comando HTOP é um utilitário de linha de comando que tem como objetivo auxiliar o usuário a monitorar de forma interativa e em <span class="destaque">tempo real</span> os recursos de seu sistema operacional Linux.

##### Instalar "htop" no Ubuntu

```shell
sudo apt install htop
```

**Iniciar a ferramenta**

```shell
htop
```

<img style="display: block;margin: 0 auto;" src="https://blog.ironlinux.com.br/images/blog-posts/uploads/2022/05/htop1.png" width="100%">

### Rodando processos em background

#### Uso do & comercial no shell

No Linux, um processo pode estar em <span class="destaque">foreground</span> ou em <span class="destaque">background</span>, ou seja, em primeiro plano ou em segundo plano. Por exemplo, ao digitar o comando:

```bash
ping google.com
```

Quando você executa o comando ping em <span class="destaque">primeiro plano</span> (sem o '&' no final), ele ocupa o terminal até que você interrompa manualmente a execução. Isso significa que você <span class="destaque">não poderá usar o terminal</span> para outros comandos até que o ping termine ou seja interrompido.

Seu terminal ficará assim:

```bash
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.045 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.032 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.030 ms
```

Para interromper o ping em primeiro plano, use <span class="destaque">Ctrl + C</span>. Isso envia um sinal de interrupção (<span class="destaque">SIGINT</span>) para o processo ping, fazendo com que ele termine a execução e exiba um resumo das estatísticas:

```shell
^C
--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1999ms
rtt min/avg/max/mdev = 0.030/0.035/0.045/0.007 ms
```

Para o exemplo acima, é possível liberar o shell para outras atividades enquanto o o processo gerado pelo comando fica em segundo plano. Basta que você digite:

```bash
ping google.com &
```

O símbolo <span class="destaque"> & </span> indica que o comando deve ser executado em background, ou seja, em <span class="destaque">segundo plano</span>.

Você verá uma mensagem que indica o <span class="destaque">número do trabalho</span> ([1]) e o <span class="destaque">PID</span> do processo (1234):

##### Ver lista de processos em segundo plano

Para poder ver quais processos em segundo plano, digite:

```shell
jobs
```

Irá aparecer algo como:

```bash
[1]+  Running          ping 127.0.0.1 &
```

Note que, se você fizer <span class="destaque">CTRL + C</span>, o processo <span class="destaque">não será interrompido</span>, pois ele não está em primeiro plano(foreground).

##### Trazer para "foreground"

Vamos supor que você pretende trazer o processo para primeiro plano. Para isso, utilize o seguinte comando :

```bash
fg %1
```

Agora você pode matá-lo diretamente utilizando o <span class="destaque">CTRL + c</span> , que manda o sinal SIGINT, que faz com que ele <span class="destaque">termine a execução</span> e exiba um resumo das estatísticas :

```bash
^C
--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1999ms
rtt min/avg/max/mdev = 0.030/0.035/0.045/0.007 ms
```

##### Retomando processos suspensos em background

Agora, digite o seguinte comando:

```bash
ping 127.0.0.1
```

Em seguida, digite  <span class="destaque">`CTRL + Z`</span> para <span class="destaque">suspender</span> o comando bing. Esse comando pausa o processo e o colocar em <span class="destaque">segundo plano</span> em estado de pausa(suspenso).

```bash
^Z
[1]+  Stopped                 ping 127.0.0.1
```

Para retomar o processo em segundo plano, é necessário utilizar o comando bg da seguinte forma:

```bash
bg %1
```

Agora, vamos digitar o comando <span class="destaque">jobs</span> para ver o estado dos processos em background.

```bash
$ jobs
 [1]+  Running                 ping 127.0.0.1 &
```

#### Uso do "nohup"

Mesmo que um processo esteja em <span class="destaque">segundo plano</span>, ele pode ser <span class="destaque">interrompido</span> por vários motivos.

Digamos que você tenha terminado seu trabalho e feche sua sessão de SSH. Lembra daquele processo de longa duração que você iniciou? Sumiu! Quando você <span class="destaque">sai da sessão</span>, o sistema envia um sinal especial para cada processo iniciado que ainda está em execução chamado <span class="destaque">"SIGHUP"</span>. Esse sinal <span class="destaque">desliga</span> o processo mesmo quando ele ainda tem trabalho a fazer. Isso é o que o comando <span class="destaque">`nohup`</span> pretende corrigir.

Há outras maneiras, é claro, para um processo ser encerrado, mas o comando nohup refere-se especificamente aos encerrados devido ao sinal SIGHUP.

Nohup - abreviação de '*no hang up*', ou 'não desligar', em Português - é um comando em sistemas Linux que <span class="destaque">mantém os processos em execução</span> mesmo depois de <span class="destaque">sair do shell ou terminal</span>. O Nohup impede que os processos ou trabalhos recebam o sinal SIGHUP (Signal Hang UP). Este é um sinal que é enviado para um processo ao fechar ou sair do terminal.

##### Sintaxe do comando nohup

A sintaxe para usar o comando Nohup é direta:

```bash
nohup command [options] &
```

<span class="destaque">command</span>: especifica o <span class="destaque">comando</span> ou script que você deseja executar.

<span class="destaque">[options]</span>: argumentos opcionais ou sinalizadores que modificam o <span class="destaque">comportamento</span>  do comando.

<span class="destaque">&</span>: Colocar este símbolo ao final de um comando instrui o shell a executar esse comando em <span class="destaque">segundo plano</span>.

##### Iniciando um processo usando o Nohup

Para iniciar um processo usando o Nohup, basta preceder o comando desejado com `nohup`. Por exemplo, se você deseja executar o comando `sleep 60`(que faz o sistema esperar 60 segundos) chamado usando Nohup, você deve usar o seguinte comando:

```bash
nohup sleep 60 &
```

Com o comando acima, o sistema executa um comando "sleep", que normalmente <span class="destaque">bloqueia todas as entradas</span>, mas isso as envia para o segundo plano, graças ao parâmetro "&". Executá-lo tem a seguinte aparência:

```bash
$ nohup sleep 60 &
[1] 4003
$ nohup : ignoring input and appending output to 'nohup.out'
```

##### Deixando de fora o caractere '&'

Você pode até mesmo usar o comando nohup sem o caractere "&" enviando o processo para o segundo plano. Mas isso simplesmente significa que o <span class="destaque">processo será executado</span> em primeiro plano e que você <span class="destaque">não poderá fazer nenhum outro trabalho no terminal</span> até que ele seja concluído. Geralmente, para tarefas de <span class="destaque">longa duração</span>, o usuário envia para segundo plano, já que não faz sentido esperar sem necessidade.

Caso você use o nohup mantendo o processo em primeiro plano, pode ter certeza de que, se <span class="destaque">o terminal for fechado</span>, ou a <span class="destaque">conectividade com a Internet for perdida</span>, ou algo mais acontecer, o processo <span class="destaque">não será interrompido</span>. Mas, como mencionado acima, você quase sempre vai querer executar o comando em segundo plano.

#### Uso do "wait"

O comando <span class="destaque">"wait"</span> é uma ferramenta poderosa no  Linux que permite que os scripts <span class="destaque">aguardem a conclusão</span> de outros processos antes de <span class="destaque">continuar a execução</span>.

Por exemplo:

 ```shell
 $ nohup sleep 30 &
 [1] 5010
$ wait 5010
 ```

 Depois de digitar o comando  <span class="destaque">`wait <PID>`</span>, o terminal irá esperar o proceso ser finalizado.

## Uso de programas de compatação para compartilhar e receber arquivos

### Compactação

#### Compactando diretórios com zip

Compactar arquivos significa <span class="destaque">juntar</span> todos eles em um único arquivo de modo que eles ocupem um <span class="destaque">espaço menor</span>.

Provavelmente você já viu algum arquivo com a <span class="destaque">extensão .zip</span>. No Linux, para compactar arquivos no formato .zip, é utilizado o comando <span class="destaque">`zip`</span>.

Vamos supor que temos uma pasta chamada "projetos" e, dentro dela, dois subdiretórios chamados "ITP" e "PC", onde estão todos os programas que você fez durante as disciplinas. Surgiu o seguinte problema: você gostaria de enviar esses arquivos pelo WhatsApp para um colega recém-chegado no curso, mas o WhatsApp não permite o envio devido ao tamanho dos arquivos. Por isso, você decidiu compactar os projetos.

Para isso, digitou:

```shell
    zip projetos.zip projetos/
```

depois, executou o seguinte comando para poder <span class="destaque">visualizar</span> se todos os <span class="destaque">diretórios </span>foram armazenados no arquivo compactado "projetos.zip":

```shell
    unzip -l projetos.zip 
```

e viu o seguinte:

```shell
  $ Archive:  projetos.zip
    Length      Date    Time    Name
    ---------  ---------- -----   ----
            0  2023-07-09 12:00   projetos/
    ---------                     -------
            0                     1 file
```

Note que ocorreu um problema, pois <span class="destaque">os subdiretórios não foram inseridos</span> na compactação. Isso ocorre pois, por padrão, o comando `zip` não inclui os arquivos e subdiretórios de um diretório. Assim, nosso .zip contém apenas o diretório Projetos/ vazio. Para resolver, basta passar o argumento <span class="destaque">-r</span>(recursive).

O -r fará com que o comando zip <span class="destaque">processe recursivamente</span> todos os subdiretórios e arquivos dentro do diretório especificado, garantindo que <span class="destaque">tudo seja incluído</span> no arquivo compactado. Vamos corrigir o comando para incluir o argumento -r:

```shell
    zip -r projetos.zip projetos/
```

Agora, vamos ver se tudo foi compactado:

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

Outra forma de compactar arquivos é utilizando <span class="destaque">tar</span> e <span class="destaque">gzip</span>. Quando nos deparamos com arquivos do tipo <span class="destaque">arquivo.tar.gz</span>, significa que ocorreram <span class="destaque">dois processos</span>.

- Primeiro, ocorreu o <span class="destaque">empacotamento dos arquivos</span> no formato `.tar` e depois foi feita a <span class="destaque">compactação dos arquivo</span> no formato `gzip`.

##### Qual a vantagem do tar?

A vantagem é que o tar consegue manter as <span class="destaque">permissões dos arquivos</span>, bem como <span class="destaque">links diretos</span> e <span class="destaque">simbólicos</span>, sendo interessante, por exemplo, para realizar <span class="destaque">backups</span>.

Utilizamos o comando tar para realizar as compactações. A compactação do diretório "projetos/" ficaria da seguinte forma:

```shell
tar -czf projetos.tar.gz projetos/
```

- <span class="destaque">-c</span> - create: indica que desejamos <span class="destaque">criar</span> um arquivo.

- <span class="destaque">-z</span> - gzip: indica que queremos <span class="destaque">compactar</span> com gzip.

- <span class="destaque">-f</span> - file: especifica o <span class="destaque">nome</span> do arquivo compactado.

Note que não precisamos usar o `-r`. Isso acontece pois o `tar` age de forma <span class="destaque">recursiva por padrão</span>.

### Descompactação

#### Descompactando diretórios com unzip

Vamos supor que seu colega, que recebeu o arquivo <span class="destaque">projetos.zip</span>, deseja <span class="destaque">descompactá-los </span>. Para isso, ele executará os seguintes passos:

```shell
unzip projetos.zip
```

Isso irá <span class="destaque">extrair</span> todos os <span class="destaque">arquivos</span> e <span class="destaque">diretórios</span> contidos no arquivo "projetos.zip" para o <span class="destaque">diretório atual</span>. Se desejar extrair para um diretório <span class="destaque">específico</span>, você pode usar a opção <span class="destaque">`-d`</span>:

```shell
unzip projetos.zip -d /home/ubuntu/Music
```

Se você quiser que <span class="destaque">o progresso não apareça</span> e sua tela fique cheia de informações, é possível utilizar o <span class="destaque">-q</span>, que significa <span class="destaque">quiet</span>, para que ele apenas descompacte e não mostre cada coisa que fez:

```shell
unzip -q projetos.zip -d /home/ubuntu/Music
```

#### Descompactando arquivos e diretórios com tar e gunzip

Para descompactar um arquivo <span class="destaque">tarball comprimido com gzip</span>, utilizamos o comando tar novamente, desta vez com a opção <span class="destaque">-x</span> para <span class="destaque">extrair</span> o conteúdo. Vamos supor que você recebeu o arquivo "projetos.tar.gz" e deseja extrair seu conteúdo:

```shell
tar -xzf projetos.tar.gz
```

- <span class="destaque">-x</span> - extract: <span class="destaque">extrai</span> o conteúdo do arquivo tar.
- <span class="destaque">-z</span> - gzip: <span class="destaque">descomprime</span> o arquivo usando gzip.
- <span class="destaque">-f</span> - file: especifica o <span class="destaque">nome</span> do arquivo tar.

## Versionadores e Git: Fundamentos e Conceitos

### Introdução aos Versionadores

#### O que são Versionadores?

Versionadores são sistemas que registram <span class="destaque">alterações</span> em um arquivo ou conjunto de arquivos ao longo do tempo, permitindo lembrar <span class="destaque">versões</span> específicas mais tarde. Eles surgiram devido à necessidade de aumentar a <span class="destaque">eficiência</span>, gerenciar um número maior de <span class="destaque">colaboradores</span> e projetos de <span class="destaque">software moderno</span>.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/ryblu7zSR.png" width="70%">

#### Tipos de Versionadores

##### 1. Sistemas Locais

Utilizam um <span class="destaque">banco de dados simples</span> para manter todas as alterações nos arquivos sob controle de versão.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJv-sbGHA.png" width="70%">

##### 2. Sistemas Centralizados

Têm um <span class="destaque">único servidor</span> que contém todos os arquivos de controle de versão e um número de clientes que usam esses arquivos a partir desse lugar central.
Suas <span class="destaque">desvantagens</span> incluem a necessidade de estar <span class="destaque">sempre conectado</span> ao servidor e a paralisação em caso de <span class="destaque">falha do servidor</span>.

São utilizados por plataformas como a Wikipédia.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/By_qMTBHR.png" width="70%">

- **Vantagens dos Sistemas Centralizados**

  - <span class="destaque">Simples</span> de utilizar, ideal para <span class="destaque">equipes pequenas</span>.

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

A criação do <span class="destaque">Linux</span> foi um marco importante na história do desenvolvimento de software, principalmente por sua natureza <span class="destaque">colaborativa</span> e <span class="destaque">open-source</span>. <span class="destaque">Linus Torvalds</span>, o criador do Linux, enfrentou desafios significativos ao <span class="destaque">coordenar as contribuições</span> de inúmeros desenvolvedores ao redor do mundo.

Durante os anos iniciais do <span class="destaque">Linux Kernel</span>, as mudanças eram gerenciadas através do envio de arquivos entre desenvolvedores. Posteriormente, usou-se o versionador BitKeeper, mas quando este se tornou pago, a comunidade Linux, liderada por <span class="destaque">Torvalds</span>, decidiu criar o Git, aprendendo com as lições adquiridas durante o uso do BitKeeper e com um desafio de fazer um sistema de versionamento mais eficiente e com funcionalidades que acelerassem o processo de desenvolvimento de software.

Os objetivos principais para o novo sistema incluíam:

- <span class="destaque">**Velocidade**</span>;

- <span class="destaque">**Design simples**</span>;

- **Forte suporte para o <span class="destaque">desenvolvimento não linear </span>** (milhares de branches paralelas);

- **<span class="destaque">Alta distribuição</span>**;

- **Capacidade de lidar com <span class="destaque">grandes projetos</span>**, como o kernel do Linux, de forma eficiente.

### De onde vem o nome "Git"?

O nome "Git" tem uma origem curiosa. Em uma entrevista, Linus Torvalds explicou sarcasticamente que ele nomeia todos os seus projetos <span class="destaque">em sua homenagem</span> , sendo "Linux" o primeiro e "Git" o segundo. Na gíria britânica, "git" significa <span class="destaque">"pessoa desagradável"</span>. Além disso, há uma interpretação alternativa em que "Git" pode significar <span class="destaque">"Global Information Tracker"</span>  quando você estiver de bom humor.

Para mais detalhes, você pode consultar o manual do Git no terminal usando o comando `man git`.

### Git como um Versionador

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

O Git é um dos sistemas de controle de versão mais utilizados no mundo, conhecido por ser:

- **Open Source**
- **Ideal para trabalho em equipe**
- **Adequado para o desenvolvimento de todos os tipos de software**
- **O versionador mais utilizado atualmente**

### Como o Git Funciona?

O Git é uma ferramenta de versionamento que gerencia diferentes versões de um arquivo ou conjunto de arquivos. Sempre que você salva o estado do projeto, o Git <span class="destaque">"tira uma foto"</span> dos arquivos naquele momento e <span class="destaque">salva uma referência</span> a esse snapshot. Por eficiência, se um arquivo <span class="destaque">não foi modificado</span>, o Git <span class="destaque">não o salva novamente</span>, mas cria um "link" para a versão anterior que já está salva.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SkYli-6zR.png" width="70%">

O Git, em geral, apenas **adiciona** informações. É <span class="destaque">difícil</span> que o sistema <span class="destaque">apague dados</span> ou <span class="destaque">faça algo irreversível</span>, especialmente se você enviar suas alterações para o servidor remoto regularmente (push). Esse comportamento garante a integridade e a segurança do histórico do projeto.

## Hospedagem Remota e Conexões SSH

### Introdução a plataformas de hospedagem remota

#### Voltando aos versionadores

A utilização de versionadores como o Git se torna ainda mais poderosa quando combinada com plataformas de hospedagem remota.

Essas plataformas permitem que você <span class="destaque">armazene</span>, <span class="destaque">compartilhe</span> e <span class="destaque">colabore</span> em projetos de software com desenvolvedores de todo o mundo. Elas não só armazenam o código, mas também oferecem ferramentas para <span class="destaque">gerenciamento de projetos</span>, <span class="destaque">integração contínua</span>, e muito mais.

#### Algumas diferentes plataformas: GitLab, BitBucket, Codeberg

Existem várias plataformas de hospedagem remota que suportam Git, cada uma com suas características únicas.

- **GitLab**

- **BitBucket**

- **Codeberg**

#### Git e Github : diferenças

Embora Git e GitHub sejam frequentemente mencionados juntos, eles não são a mesma coisa. Aqui estão as principais diferenças:

##### Git

- Git é um <span class="destaque">sistema de controle de versão</span> distribuído.
- Ferramenta de linha de comando utilizada para <span class="destaque">gerenciar</span> o histórico de versões de arquivos.
- Funciona localmente, <span class="destaque">independentemente</span> de uma plataforma de <span class="destaque">hospedagem remota</span>.

##### GitHub

- Hospedagem de Repositórios
- Se utiliza do Git para fazer o controle de versão dos respositórios hospedados
- Comunidade ativa
- Vários outros serviços
- Um dos maiores repositórios de projetos open source do mundo

### Chave SSH

#### Para que serve a chave SSH?

As chaves SSH (Secure Shell) são utilizadas para <span class="destaque">autenticar conexões seguras</span> entre computadores, permitindo uma comunicação <span class="destaque">criptografada</span>. Elas substituem a necessidade de senhas tradicionais, proporcionando uma maneira mais segura e conveniente de acessar sistemas remotos e serviços, como repositórios Git.

Ao configurar uma chave SSH, você cria um <span class="destaque">par de chaves</span>: uma <span class="destaque">chave privada</span>, que deve ser mantida em segredo no seu computador, e uma <span class="destaque">chave pública</span>, que é adicionada ao servidor ou serviço remoto. Quando uma conexão é iniciada, o servidor usa a chave pública para verificar a identidade do usuário, sem que a chave privada precise ser transmitida pela rede, garantindo assim a segurança.

No contexto do Git, a autenticação via chave SSH é especialmente útil ao interagir com repositórios remotos hospedados em plataformas como GitHub, GitLab e Bitbucket. Essas plataformas suportam autenticação por chave SSH, permitindo que os desenvolvedores <span class="destaque">enviem </span>(push) e <span class="destaque">busquem</span> (pull) alterações de forma segura.

<p><a style="background: #fff;padding:10px;  color: black;" href="https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent">CLique aqui para ver o manual de como configurar a chave SSH para a sua máquina</a></p>

## Workflow e primeiro repositório

### Um pouco mais sobre Git

O Git é um sistema de controle de versão <span class="destaque">distribuído</span> que gerencia informações armazenando cada versão do projeto como um snapshot completo, em vez de apenas as diferenças entre versões. Ele utiliza uma estrutura de objetos que inclui <span class="destaque">blobs</span> (conteúdo de arquivos), <span class="destaque">trees</span> (diretórios), <span class="destaque">commits</span> (mudanças com metadados) e <span class="destaque">tags</span> (marcadores de versão).

<span class="destaque">Cada objeto</span> é identificado por um <span class="destaque">hash SHA-1</span>, garantindo a integridade dos dados. Git permite a criação de <span class="destaque">branches</span> para <span class="destaque">desenvolvimento paralelo</span> e <span class="destaque">merges</span> para combinar mudanças.

As modificações são preparadas na <span class="destaque">staging area</span> antes de serem commitadas.

Com funcionalidades robustas de colaboração e resolução de conflitos, o Git suporta <span class="destaque">operações offline</span> e <span class="destaque">sincronização</span> com repositórios <span class="destaque">remotos</span> através de comandos como push e pull, facilitando o trabalho simultâneo de <span class="destaque">múltiplos desenvolvedores</span>.

#### Workflow básico

1) Você <span class="destaque">**modifica arquivos**</span> na sua árvore de trabalho

2) Você <span class="destaque">**seleciona apenas as mudanças que você quer**</span> que façam parte do seu próximo commit, e apenas essas mudanças serão adicionadas à staging area

3) Você <span class="destaque">**faz um commit**</span>: os arquivos como eles estão na <span class="destaque">staging area</span> são armazenados em forma de <span class="destaque">snapshot permanentemente</span> no seu diretório  Git.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/HJKOTMTGC.png" width="70%">

Assim, podemos perceber que um arquivo pode estar em um dos 3 estados:

<span class="destaque">***modified***</span> - quando o arquivo foi modificado e não está rastreado pelo Git.

<span class="destaque">***staged***</span> - quando a modificação foi colocada na 'staging area' - uma área na qual armazenamos as mudanças antes de tê-las como definitiva para a próxima versão, ou seja, para o próximo commit.

<span class="destaque">***commited***</span> - Mudanças que são definitivas, ou seja, a snapshot permanente foi guardada na linha do tempo do Git.

### Comandos e Práticas do Git

#### Inicializando o git no repositório: "git init"

Para criar um repositório local, vamos ir ao diretório onde queremos criar o resositório Git e, em seguida, vamos inicializar o Git com o comando <span class="destaque"> git init </span>

```shell
cd OneDrive/Documentos/projeto
git init
```

Agora, temos um <span class="destaque">subdiretório</span> chamado <span class="destaque">.git</span> que contém todos os arquivos necessários de seu repositório – um esqueleto de repositório Git.

Nada em seu projeto é monitorado ainda.

```shell
cd OneDrive/Documentos/projeto
git init
Initialized empty Git repository in /home/anna/OneDrive/Documentos/projeto/.git/
```

#### Gravando alterações em seu repositório

Cada arquivo em seu repsitório pode estar em um dos seguintes estados: <span class="destaque">rastreado</span> e <span class="destaque">não-rastreado</span>. Arquivos rastreados são arquivos que foram incluídos no último snapshot; eles podem ser não modificados, modificados ou preparados (adicionados ao stage). Em resumo, arquivos rastreados são os arquivos que o Git conhece.

Quando você <span class="destaque">clona</span> um repositório pela <span class="destaque">primeira vez</span>, todos os seus arquivos <span class="destaque">serão rastreados</span> e <span class="destaque">não modificados</span>, já que o Git acabou de obtê-los e você ainda não editou nada.

Assim que você <span class="destaque">edita</span> alguns arquivos, Git os considera <span class="destaque">modificados</span>, porque você os editou desde o seu último commit. Você prepara os arquivos editados e então faz commit das suas alterações, e o <span class="destaque">ciclo</span> se repete.

<img style="display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/SJWWiARzC.png" width="70%">

#### Verificando o status dos arquivos: "git status"

A principal ferramenta que você vai usar para determinar quais arquivos estão em qual <span class="destaque">estado</span> é o comando git status.

```sh
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

Digamos que você adicionou um simples arquivo chamado 'chat' ao seu projeto. Se o arquivo não existia antes, e você executar git status, você verá seu arquivo não rastreado da seguinte forma:

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
git add chat
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

É possível saber que o arquivo <span class="destaque">está preparado</span> porque ele aparece sob o título <span class="destaque">“Changes to be committed”</span>. Se você fizer um commit neste momento, a versão do arquivo que existia no instante em que você executou git add, é a que será armazenada no histórico de snapshots.

#### Preparando Arquivos Modificados (Adicionando arquivos modificados à staging area)

Vamos modificar um arquivo que já está sendo rastreado.

Se, por exemplo, adicionarmos mais uma linha de código ao arquivo 'feed' que já era rastreado e estava dentro do projeto, e executarmos o `git status`, teremos isso:

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

Para isso, vamos usar o <span class="destaque">`git add`</span>.

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

#### Fazendo o **commit** do que foi feito: "git commit"

Agora que a <span class="destaque">área de stage está preparada</span>, podemos fazer <span class="destaque">commit</span> nas alterações.

O jeito mais simples de fazer commit é digitar o seguinte comando:

```sh
git commit
```

e adicionar uma mensagem no editor de texto.

Alternativamente, podemos fazer:

```sh
git commit -m "mensagem"
```

Lembre-se que o commit grava a <span class="destaque">snapshot</span> que você deixou na <span class="destaque">área de stage</span>. Qualquer alteração que você não tiver mandado para o stage permanecerá como estava, em seu lugar; você pode executar outro commit para adicioná-la ao seu histórico. Sempre que você executa um commit, você está gravando uma snapshot do seu projeto que você pode usar posteriormente para fazer comparações, ou mesmo restaurá-lo.

<a href="#exercício-01---iniciando-um-novo-repositório-git"><spam class="destaque" style="font-size:20px;">Exercícios : 1-2</spam></a>

#### Configurando o Repositório Remoto: "git remote"

Depois de inicializar o repositório local, você pode querer vinculá-lo a um repositório remoto para facilitar a colaboração e o backup. Para isso, vamos usar o comando <span class="destaque">git remote</span>

```shell
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
```

##### Como verificar os repositórios remotos configurados?

Basta utilizar a opção -v

```shell
git remote -v
```

note o que seguinte aparecerá:

```shell
origin  git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git (fetch)
origin  git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git (push)
```

Isso indica que o repositório remoto chamado origin está configurado para <span class="destaque">buscar (fetch)</span> e <span class="destaque">enviar (push)</span> atualizações para a URL especificada, que é onde o seu repositório remoto está.

##### Como desconectar o repositório local do remoto?

```shell
git remote remove origin
```

Depois de executar esses comandos, o repositório local estará desconectado do repositório remoto.

##### Como renomear o repositório remoto

Use o comando 'git remote rename' para alterar o nome do repositório remoto. No exemplo abaixo, vamos renomear 'origin' para 'novo-nome'.

```shell
git remote rename origin novo-nome
```

Note que:

```shell
$ git remote -v
novo-nome  git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git (fetch)
novo-nome  git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git (push)
```

<a href="#exercício-03---configurando-um-repositório-remoto-e-enviando-os-commits"><spam class="destaque" style="font-size:20px;">Exercício : 3</spam></a>

#### Como ver todos os commit feitos com "git log"

É um comando feito para exibir os <span class="destaque">históricos de commits</span> do projeto.

Aparece <span class="destaque">nome</span>, <span class="destaque">hora</span>, <span class="destaque">data</span> e a <span class="destaque">mensagem</span> relacionada a cada commit.

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

Utilizando o comando <span class="destaque">"git log --oneline"</span>, podemos ver os commits de forma mais simplificada.

Ele irá mostrar o número <span class="destaque">hash</span> ou sha que é o <span class="destaque">identificador (ID)</span> do commit e em seguida a sua <span class="destaque">mensagem</span>.

```sh
git log --oneline
```

```sh
$ git log --oneline
9fceb02 (HEAD -> main) Adicionando modificação no feed 
b75f610 adicionando a funcionalidade chat
c1b4d83 Commit inicial com arquivos de configuração do projeto   
```

#### Clonando um repositório

Para começar a trabalhar com um repositório que já existe em um servidor remoto, você pode cloná-lo para o seu ambiente local usando o comando <span class="destaque">git clone</span>. Este comando cria uma cópia completa do repositório, incluindo todo o histórico de commits e branches.

Para clonar um repositório que está por exemplo no GitHub, faça:

1. No GitHub.com, navegue até a página principal do repositório e faça o seguinte:

    - Para clonar o repositório usando HTTPS, em "HTTPS", clique no ícone de cópia
    - Para clonar o repositório usando uma chave SSH, clique em "SSH" e depois no ícone de cópia.
    - Para clonar um repositório usando a GitHub CLI, clique em "GitHub CLI" e depois no ícone de cópia.

2. Abra o Terminal.

3. Altere o diretório de trabalho atual para o local em que deseja ter o diretório clonado.

4. Digite `git clone` e cole a URL já copiada.

5. Pressione ENTER para criar seu clone local.

```shell
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `YOUR-REPOSITORY`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remote: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

#### Subindo alterações para o repositório remoto: "git push"

Se você tem um commit pronto e quer <span class="destaque">adiciona-lo ao repositório remoto</span>, podemos fazer:

```sh
git push 
```

Fazendo o git push os seus commits irão subir para o seu repositório remoto que foi configurado inicialmente por padrão.

```shell
git push origin master
```

Vamos supor que o nome no repositório remoto seja <spam class="destaque">main</spam>, mas sua cópia local é chamada de <spam class="destaque">master</spam>. Para corrigir essa diferença, você pode <spam class="destaque">referenciar diretamente</spam> a branch (que é o local onde estamos desenvolvendo e enviando as modificações para o Git) do repositório remoto usando o seguinte comando:

```shell
git push origin master:main
```

Dessa forma, você está enviando o conteúdo da sua <spam class="destaque">cópia local</spam> chamada <spam class="destaque">master</spam> para a <spam class="destaque">cópia no repositório remoto</spam> que é chamada de <spam class="destaque">main</spam>.

#### Trazendo alterações para o repositório local: "git pull"

Se foram feitas alterações no repositório remoto por outros desenvolvedores ou por você mesmo e você deseja trazê-las para o seu repositório local, basta digitar o comando <span class="destaque">git pull</span>:

```sh
git pull
```

Por padrão, esse comando irá puxar as alterações do <span class="destaque">origin</span>, que é o nome padrão do repositório remoto referenciado quando você conectou o repositório local com o remoto pela primeira vez. No caso de um clone, o <span class="destaque">origin</span> é o repositório de onde você fez o <span class="destaque">git clone</span>.

Para atualizar uma <span class="destaque">branch</span> local com as alterações da branch remota sem usar diretamente <span class="destaque">git pull</span>, você pode usar o comando <span class="destaque">git pull</span> com a especificação direta da branch remota, o que é na prática uma forma direta de realizar a operação. Aqui está como fazer isso:

```sh
git pull origin nome-da-branch:nome-da-branch-local
```

<a href="#exercício-04---adicionando-funções-de-soma-e-multiplicação-à-calculadora"><spam class="destaque" style="font-size:20px;">Exercícios : 4- 5</spam></a>

## Exercícios

### Orientações sobre os exercícios

Envie os exercícios de cada dia *separados* para o email `linuxgitpetcc@gmail.com` com o assunto sempre sendo: `Dia (dia de aula) - (Nome do aluno)`

### Exercícios Obrigatórios

#### Exercício 01 - Iniciando um novo repositório Git

<a href="#fazendo-o-commit-do-que-foi-feito-git-commit">Clique para voltar ao conteúdo</a>

1. Crie um novo diretório chamado projetos.

2. Entre no diretório projetos e crie outro diretório chamado calculadora_pyton.

3. Inicialize um repositório Git vazio no diretório calculadora_pyton.

4. Faça o comando para visualizar a pasta oculta que foi criada.

Como resolução, descreva os passos que você fez em um arquivo de texto com o nome dia3exercicio1.txt para o email "<linuxgitpetcc@gmail.com>".
Lembre-se de adicionar seu nome ao arquivo!

#### Exercício 02 - Adicionando arquivos ao seu repositório Git

<a href="#fazendo-o-commit-do-que-foi-feito-git-commit">Clique para voltar ao conteúdo</a>

1. Crie um arquivo chamado 'README.md' dentro do diretório calculadora_pyton.

2. Adicione o conteúdo "Este é um projeto de uma calculadora em Python que realiza operações básicas." ao README.md.

4. Adicione o arquivo README.md ao repositório Git.

5.Faça um commit no repositório Git com a mensagem "Adicionei o README.md".

#### Exercício 03 - Configurando um repositório remoto e enviando os commits

<a href="#como-desconectar-o-repositório-local-do-remoto">Clique para voltar ao conteúdo</a>

1. No GitHub, crie um novo repositório chamado calculadora_pyton.

2. No terminal, dentro do diretório calculadora_pyton, configure seu repositório Git local para apontar para este repositório remoto.

3. Envie seus commits para o repositório remoto.

Para a avaliação, mande o link do repositório pelo email "<linuxgitpetcc@gmail.com>".

#### Exercício 04 - Adicionando funções de soma e multiplicação à calculadora

<a href="#trazendo-alterações-para-o-repositório-local-git-pull">Clique para voltar ao conteúdo</a>

1. Adicione um novo arquivo chamado calculadora.py com a função de soma:

Copie o seguinte código:

```py
def soma(a, b):
    return a + b
```

2. Adicione o arquivo ao repositório:

3. Faça um commit com a mensagem "Adicionei a função de soma".

4. Adicione a função de multiplicação ao arquivo calculadora.py:
Copie o código da mesma forma que está aqui abaixo (mesmo com o erro):

```py
def multiplicacao(a, b):
    c+b=4
    return a * b
```

5. Adicione e "comite" as mudanças com a seguinte mentagem: "Adicionei a função de multiplicação"

6. Verifique o erro após o commit e corrija-o apagando o "c+b=4" no arquivo.

7. Adicione a modificação ao repositório e faça o commit com a mensagem "Correção de bug na função de multiplicação"

6. Use o comando que sobe as alterações locais para o repositório remoto para subir os seus commits.

#### Exercício 05 - Clonando um repositório

<a href="#trazendo-alterações-para-o-repositório-local-git-pull">Clique para voltar ao conteúdo</a>

1. **Criar e clonar o repositório:**
   - O aluno responsável pelo primeiro repositório remoto deve criar um novo repositório no GitHub com o nome "projeto 02" e compartilhar o link com o colega de dupla.
   - O colega deve clonar esse repositório usando o comando `git clone [link do repositório]`.

2. **Criar uma pasta no repositório:**
   - Cada aluno deve criar uma pasta com seu número de matrícula e primeiro nome, seguindo o formato `201003948_luiz`.
   - Adicione a pasta ao Git com `git add [nome da pasta]` e "comite" com a mensagem "Adicionei a pasta 201003948_luiz".

3. **Desenvolver o projeto individualmente:**
   - Dentro da pasta criada, cada aluno pode desenvolver o projeto que quiser, aplicando o que foi aprendido:
     - Criar uma história fictícia em um arquivo `.txt` com 3 capítulos, fazendo commits a cada capítulo, a cada erro ortográfico corrigido ou a cada modificação de personagem.
     - Fazer uma calculadora ou qualquer outro programa em qualquer linguagem de programação, fazendo commits a cada funcionalidade implementada.
     - Fazer um site pequeno e básico, fazendo commits a cada funcionalidade implementada.

4. **Sincronizar as alterações com o repositório remoto:**
   - Traga para o repositório local as alterações que estão no remoto com `git pull` (para verificar se o colega já subiu algum arquivo).
   - Após isso, suba todos os commits para o repositório remoto com `git push`.

5. **Criar o segundo repositório:**
   - O outro aluno da dupla deve criar um novo repositório no GitHub com o nome **"projeto 03"** e repetir os passos 1 a 4, criando sua própria pasta no novo repositório do colega.

6. **Envio dos links dos repositórios:**
   - Ao final do exercício, cada aluno deve enviar por e-mail os links de ambos os repositórios (**projeto 02** e **projeto03**) para a avaliação.

O que será avaliado aqui são os commits, e não se os códigos estão corretos. Cada aluno deve fazer, no mínimo, 3 commits em cada projeto
---

<script>
const dataDia3 = new Date('2025-03-12');
const agora = new Date();

if (agora < dataDia3) {
    document.body.innerHTML = '<h1 style="text-align:center; margin-top:20%;">Página Indisponível</h1>' +
                              '<p style="text-align:center;">Esta página estará disponível a partir de ' + dataDia3.toLocaleDateString() + '.</p>';
}
</script>
{% include petcccopyright.html %}

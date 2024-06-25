---
layout: oldschool
title: Minicurso de Linux e Git
---

[comment]: <> (Essas páginas que estão vazias são porque elas utilizam layouts que já importam o menu de navegação e o menu dos dias. Você pode ver isso na pasta _includes)
[comment]: <> (Sendo assim, basta escrever em markdown mesmo que vai ser tudo estilizado pelos layouts)


# 1ᵒ Dia (Linux)

Atualmente, os computadores estão em todos os lugares, desde pequenos relógios até gigantescos data centers, conectando tudo entre eles. Nesses computadores, temos a presença de um **Sistema Operacional**, que serve como um mediador do *hardware* e do *software* do computador. Os sistemas operacionais mais conhecidos são o Windows, o MacOS e o sistema que trataremos sobre no curso (que não é exatamente um sistema por si só, como você verá depois): o **Linux**.

Como programadores ou aspirantes, é essencial que tenhamos autocontrole sobre os softwares que construimos, as ferramentas que usamos e o ambiente em que trabalhamos, e é nisso que entra o Linux. O Linux como projeto de software é um dos mais ricos ecossistemas que nasceram do esforço coletivo de desenvolvedores do mundo inteiro, com um objetivo em comum: um Sistema Operacional onde o usuário possui liberdade total.

## O que é o Linux?
Como dito antes, o Linux não é um sistema operacional por si só, mas sim o que chamamos de um **kernel**, que num sentido mais literal representa um programa que controla os recursos do computador, permite que os usuários rodem programas, controlem os periféricos controlados e, também, provê um sistema de arquivos que gerencia o armazenamento a longo prazo de informação, como programas, dados e documentos.

Num sentido um pouco mais amplo, quando falamos "Linux", nos referimos a um combo chamado "GNU/Linux", onde "GNU" (**G**NU is **N**ot **U**nix; mais sobre o UNIX depois) é uma camada superficial do programa que corresponde a compiladores, editores de texto, programas etc.

Num sentido ainda mais amplo, quando falamos "GNU/Linux" ou apenas "Linux", falamos de uma família de sistemas os quais implementaram essa "interface" por assim dizer. Cada membro da familia é o que chamamos de distro Linux (mais sobre isso no futuro), que agora, de fato, é um sistema operacional completo, pois empacota o que é oferecido pelo Linux e GNU, e torna seu sistema utilizável sem que você tenha que compilar todas as dependências e montar seu sistema do absoluto zero.

Esses detalhes não são realmente importantes para esse curso, pois o nosso objetivo é apenas ensinar como se localizar, investigar e usar diversas ferramentas que são genéricas a uma família ainda maior de sistemas, chamados de "Unix-like", onde um dos herdeiros dessa família é o Linux.

## O que é um Unix e o que são os "Unix-Like"?

Inicialmente, vamos falar um pouco sobre quem começou essa gigantesca família de sistemas chamadas Unix-Like. Era uma vez o Unix, um sistema operacional que foi desenvolvido no início dos anos 1970 como uma alternativa flexível e portátil aos sistemas da época, que eram grandes, caros e difíceis de manter, especialmente porque eram programados em linguagem de máquina específica para cada tipo de hardware. Sendo um dos primeiros sistemas operacionais escritos na linguagem C — possivelmente o primeiro —, o Unix se destacou pela adaptabilidade e facilidade de implementação em diferentes tipos de hardware. Apesar de ser um ótimo sistema para a época, o Unix foi construido para propósitos educaionais e sua licensa era muito cara, talvez por esse motivo ele não tenha sido muito atrativo para a população geral. Independentemente disso, ele trouxe inovações que estabeleceram um modelo e uma filosofia de desenvolvimento de software que ainda influencia inúmeras outras plataformas e sistemas operacionais subsequentes, como o MacOS, sistemas BSDs e os Linux. Esse conjunto de inovações e filosofia, futuramente estabeleceu até um padrão, que é o que chamamos de POSIX.

## Distros

Como foi dito anteriormente, Linux é apenas uma família de sistemas, e cada sistema é chamado de distro Linux. Existem uma série de diferenças entre essas distros, que dependem da implementação de quem os gerencia. Além disso, pelo GNU e o Linux serem "software livre" qualquer uso e implementação do Kernel Linux e do projeto GNU tem que ser gratuita e código aberto. Mas então, qual é a principal diferença entre essas distribuições?

As distros são coleções de software que incluem o kernel Linux, software GNU e, muitas vezes, outros pacotes que podem ser de outras origens. Estas distribuições são adaptadas para atender a diferentes tipos de usuários e podem incluir desde versões muito leves para hardware antigo até sistemas completamente equipados para uso corporativo. Algumas das mais populares são [Ubuntu](https://ubuntu.com/desktop), [Mint](https://linuxmint.com/), [Fedora](https://fedoraproject.org/), [Debian](https://www.debian.org/index.pt.html) e [Arch](https://archlinux.org/), cada uma oferece uma experiência de usuário diferente, ferramentas específicas e um sistema de gerenciador de pacotes que facilita a instalação e a manutenção de software.

### Outros sistemas Unix-Like: BSD's

Ao lado das distribuições Linux, existem os sistemas operacionais [BSD](https://pt.wikipedia.org/wiki/Berkeley_Software_Distribution), que são outra família de sistemas Unix-like. BSD, que significa Berkeley Software Distribution, refere-se a uma série de distribuições de software que foram originalmente desenvolvidas e distribuídas pela Universidade da Califórnia em Berkeley. Assim como o Linux, os sistemas BSD têm um núcleo e ferramentas de usuário, mas são desenvolvidos e licenciados de maneira diferente. Exemplos notáveis de sistemas BSD incluem [FreeBSD](https://www.freebsd.org/), [NetBSD](https://www.netbsd.org/) e [OpenBSD](https://www.openbsd.org/). 

Os sistemas BSD e as distribuições Linux compartilham muitas das filosofias básicas de sistemas Unix-like, mas cada família tem suas próprias comunidades, filosofias de desenvolvimento, e escolhas técnicas que os diferenciam significativamente. 

## Se aprofundando nos Unix-Like: Um pouco sobre o Shell

Note que nós temos um material inteiro apenas relacionado ao Shell, porém existem alguns conceitos inseparáveis entre o Shell e os sistemas Unix-Like que precisam ser abordados antes disso.

Para entender um pouco melhor do que se trata o shell, note que na época em que o Unix se popularizou (final da década de 70 e início da de 80) não existia uma interface gráfica (GUI) e toda interação era feita via comandos com a ajuda de um terminal. Os caracteres inseridos no teclado eram enviados ao hardware, que enviava uma instrução ao software para que eles aparecessem na tela e o usuário pudesse ver o que estava digitando.

<div style="text-align: center;">
<img alt="Imagem de um DEC VT100 rodando Unix" src="https://hackmd.io/_uploads/HkxmAtRVR.jpg" width="80%">
</div>

- *Imagem de um DEC VT100 rodando Unix (1978), fonte: <https://en.wikipedia.org/wiki/VT100>*

Essa linha de comando e interface de texto na época era única e exclusiva responsabilidade do Shell, que em síntese é um programa que interpreta a entrada do usuário e a repassa para o sistema, fazendo com que este gerencie o processo (comando) executado.

Atualmente, com o advento das interfaces gráficas, o Shell perdeu muito do seu papel de protagonista e hoje pode ser invocado a partir de o que chamamos de emulador de terminal. Entretanto, caso tenha resolvido não instalar e configurar uma interface gráfica (ao instalar o Arch, por exemplo), o Shell será seu único companheiro.

<div style="text-align: center;">
<img alt="Imagem do emulador gnome-terminal rodando no ubuntu 24.04 LTS" src="https://hackmd.io/_uploads/BkL7RK04A.png" width="80%">
</div>

- *Imagem do emulador gnome-terminal rodando no ubuntu 24.04 LTS, fonte: <https://canaltech.com.br/linux/ubuntu-2404-lts-e-liberado-veja-as-principais-novidades-286919/>*

A maioria das distros linux vêm com o shell do projeto GNU, **B**ourne **A**gain **Sh**ell (Bash) pré instalado, não é um padrão e se você quiser, existem diversos outros que você pode instalar e utilizar. Quando o shell é iniciado, o usuário se depara com uma tela do seguinte tipo:

```sh
[user@hostname ~]$
```

Vamos entender o que significa cada símbolo desse.


```sh
[user@hostname ~]$
  ^      ^     ^ ^
  │      │     │ └─ O cifrão diz que você não é o usuário `root` (mais sobre isso depois)
  │      │     └── Seu «Working Directory», o diretório que o shell está operando no momento
  │      └── Nome do computador, também conhecido como o nome do host
  └── Nome do usuário que está usando o shell nessa sessão 
``````sh
[user@hostname ~]$
  ^      ^     ^ ^
  │      │     │ └─ O cifrão diz que você não é o usuário `root` (mais sobre isso depois)
  │      │     └── Seu «Working Directory», o diretório que o shell está operando no momento
  │      └── Nome do computador, também conhecido como o nome do host
  └── Nome do usuário que está usando o shell nessa sessão 
```

A maneira mais simples de usar o shell, é digitando comandos!.

## Comandos e argumentos

Os comandos escritos no shell quase sempre precisam vir junto de um **argumento**. Nesse sentido, no shell é necessário muito cuidado no uso de espaços, pois eles são reservados a função de separar argumentos. Por exemplo, ao digitar `tudo bem?` em um terminal, a interpretação que o sistema fará é que você está tentando executar o comando `tudo` com o argumento `bem?`, o que resultará em erro. Os argumentos podem ser o nome de uma pasta, de um arquivo ou até coisas especiais que veremos mais para a frente na aula, como **operadores lógicos** e **flags**.

**Veja alguns comandos:**

- Sem muitas surpresas o comando `date` diz o dia de hoje.

```sh
[user@hostname ~]$ date
Sat Jun  1 06:53:57 PM -03 2024
[user@hostname ~]$
```

- E o comando `cal` mostra o calendário: 

```sh
[user@hostname ~]$ cal
      June 2024     
Su Mo Tul We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30                  
[user@hostname ~]$
```

- Tente também o `echo`, que repete o argumento com o qual você chamou o comando (fazendo um eco).

```sh
[user@hostname ~]$ echo lfjdslkfdjlsafkds
lfjdslkfdjlsafkds

[user@hostname ~]$
```

## Histórico de comandos

Se você pressionar `↑`, o nosso comando `ablueblauebluebalbbeu` vai reaparecer para podermos usa-lo novamente, se você continuar pressionan. Isso é chamado de histórico de comandos e a maioria das distribuições Linux armazenam por padrão pelo menos os últimos 1000 comandos. Se você pressionar `↓`, você avança para o presente no histórico até o comando desaparecer.

Agora que aprendemos o básico sobre comandos, vamos entender um pouco sobre o Sistema de Arquivos do Linux e como navegar por ele usando o shell.

# Entendendo o Sistema de Arquivos

Que nem o Windows, um Unix-Like organiza seus arquivos no que é chamado de Estrutura de dirétorios hierárquica. Isso significa que é possível visualizar esse sistema como uma árvore de diretórios, também chamados de pastas. Esses diretórios funcionam exatamente como pastas de escritório que você pode ter em casa, onde cada uma pode ter outra pasta e/ou um arquivo, onde cada arquivo tem um nome, junto com informações extras como a quem ele pertence ou o quão grande ele é.

A principal diferença filosófica entre o sistema de arquivos fundado pelo Unix é que, ao contrário do Windows, que tem um arvóre de arquivos diferente para cada dispositivo de armazenamento, um Unix-like tem apenas uma árvore, que independe da quantidade de dispositivos de armazenamento conectados ao computador.

Além disso, vale ressaltar, que o sistema de arquivos não é capaz de diferenciar entre tipos diferentes de arquivo, ele não impõe nenhuma estrutura a ser seguida por esses arquivos, o significado dos bytes que ali estão sendo armazenados dependem única e exclusivamente dos programas que lidam e interpretam com esse arquivo. Isso não é apenas verdade para arquivos genéricos, mas também para caracteres digitados no seu teclado, dispositivos conectados e tudo que você pode imaginar.


## Current working directory

O sistema de arquivos funciona como uma árvore: você possui um diretório de origem, o `/` (chamado de **root**) e os galhos acima dele, que são os outros diretórios do computador. A partir de um diretório, é possível ver os diretórios diretamente ligados a ele seja "descendo" ou "subindo" a árvore. Quando você acessa um diretório e passa a ter acesso a todos os arquivos dentro dele, aquele passa a ser seu **Working Directory**

<div style="text-align: center;">
<img alt="Imagem exemplo de um sistema de arquivos do Linunx" src="https://hackmd.io/_uploads/B15voEO80.png" width="80%">
</div>
<br>

Utilizando o comando `pwd`, que é uma sigla para **P**ath to **W**orking **D**irectory, é possível saber o caminho de todos os diretórios da root até o seu diretório atual:

```sh 
[eu@hostname ~]$ pwd
/home/eu
```

Além do working directory nós temos também o home directory, que é o único lugar que usuários comuns são autorizados a escrever em ou um arquivo. Para cada usuário é dado um home directory, ou seja por padrão você apenas capaz de ver outros diretórios além do seu, se quiser editar algo que não é seu, você precisará de algo que chamamos de permissões de superusuário, ou sudo (mais sobre isso no futuro).

# Utilizando comandos e navegando pelo Sistema de Arquivos

## Caminhos absolutos e caminhos relativos

Ao navegar pelo sistema utilizando o shell, geralmente utilizamos caminhos absolutos como o do exemplo anterior. Estando no diretório `/home`, você pode utilizar o comando `cd` (que significa Change Directory) para acessar o diretório `/eu`, da seguinte forma:
```sh
# Perceba o primeiro nome mudando!
# V
[user@hostname ~]$ cd eu
[eu@hostname ~]$
```

Porém, digamos que você está na pasta `/downloads` e deseja ir até a pasta `/escola` ! Para isso, é necessário se utilizar do **caminho relativo** `..`

Os dois pontos representam o **diretório anterior** de forma relativa, e podem ser utilizados para *voltar* enquanto navegando pelo sistema de arquivos:

```sh
[downloads@hostnname ~]$ cd ..
[eu@hostname ~]$ cd escola
[escola@hostname ~]$
```
Também temos o caminho relativo `.` que representa o **diretório atual**. Na parte de navegação de arquivos esse caminho não é tão interessante, mas é crucial quando estamos tratando de **executar comandos**.

## Mexendo nos diretórios

Podemos manipular diretórios e arquivos a partir de comandos:

Usando o comando `mkdir` (de Make Directory), é possível criar uma nova pasta. A sintaxe do comando é: `mkdir <nome_da_pasta>`. Digamos que você acabou de criar na pasta `/escola` a pasta `/minicurso_linux_git`:

```sh
[escola@hostname ~]$ mkdir minicurso_linux_git
[escola@hostname ~]$ cd minicurso_linux_git
[minicurso_linux_git@hostname ~]$
```

Vamos adicionar também um arquivo de texto para anotações da aula, usando o comando `touch`:

```sh
[minicurso_linux_git@hostname ~]$ touch anotacoes.txt
```

Você criou essa pasta assim que chegou em casa, logo após a primeira aula do minicurso. Você colocou na pasta esse arquivo de texto com as anotações da aula e um arquivo de imagem, com uma *selfie* que você tirou com um colega no dia da aula.

 Um tempo se passou, você já se formou na faculdade e você encontra esse diretório novamente, você se pergunta, qual o conteúdo dele?

Com o comando `ls`, é possível listar todo o conteúdo de um diretório:

```sh
[minicurso_linux_git@hostname ~]$ ls
anotacoes.txt  selfie.jpg
```

Porém, você está trocando de computador e o computador no qual essa pasta foi criada não será mais utilizado. Ainda muito saudoso pelo seu tempo de novato nesse mundo do Linux, você decide levar o conteúdo dessa pasta para o seu novo computador. Você move os arquivos para um *pen-drive*, deixando a pasta agora vazia, e então decide removê-la, utilizando o comando `rmdir` (note que o comando só funciona se a pasta estiver vazia):

```sh
[minicurso_linux_git@hostname ~]$ cd ..
[escola@hostname ~]$ rmdir minicurso_linux_git
```

E... pronto! A pasta agora não existe mais no computador, e você está pronto para iniciar um novo ciclo.

Agora que começamos a ver todos esses comandos, provavelmente uma dúvida veio à sua mente: e se eu precisar utilizar um comando que eu não sei ainda o que faz?

## Como investigar comandos

O Linux vem com ferramentas que podem ser utilizadas quando se quer saber mais sobre um comando, sem ter que ficar pesquisando na internet toda hora. Usando o comando `man`, é possível ver o manual de um comando. Até para comandos mais simples, há uma quantidade absurda de informação, mas não se desespere, vamos dar uma olhada em cada parte do manual:

<div style="text-align: center;">
<img alt="Uma explicação sobre o que mostra o comando 'man'" src="https://hackmd.io/_uploads/ryhfmIdUR.png" width="80%">
</div>
<br>

O manual de um comando tem tudo que é necessário para se entender como um comando funciona e como ele pode se utilizado. Com o conhecimento adquirido até agora, podemos entender perfeitamente as seções vermelha e verde da imagem, mas a seção azul pode ser um pouco confusa, pois mostra todas as **flags** que podem ser utilizadas com o comando.

## Argumentos de comando: flags

As flags são um tipo de argumento que podem ser utilizadas quando invocamos um comando e que muda diretamente a forma como aquele comando se comporta. Uma flag simples, para entendermos o conceito, é a flag de **formato** `-F`, ao utilizar o comando `ls`, que especifica o tipo de cada arquivo listado:

```sh
[eu@hostname ~]$ ls -F
escola/ downloads/ arquivo.pdf* 
```

A flag **-F** especifica o formato do conteúdo de um diretório adicionando por exemplo / para diretórios e * para arquivos executáveis.

Uma flag muito utilizada com o comando ls é a flag **-l**, que lista uma série de informações sobre o conteúdo de um diretório. Vejamos um exemplo:

<div style="text-align: center;">
<img alt="Um exemplo da flag -l no comando ls" src="https://hackmd.io/_uploads/H1VcqIOUC.png" width="80%">
</div>
<br>

Da direita para a esquerda, temos algumas informações:

- O nome do arquivo
- A data de criação
- O tamanho do arquivo em bytes
- O **grupo** ao qual o arquivo pertence
- O **autor** do arquivo
- O número de **hardlinks**
- As **permissões** do arquivo (Da esquerda pra direita: autor, grupo e usuário genérico)

Muitas dessas informações ainda são difíceis de entender, mas vamos por partes:

## Permissões

O Linux possui um sistema de permissões separadas por três categorias: permissão de escrita (**w**), permissão de leitura (**r**) e permissão de execução (**x**).

Dependendo do seu tipo de usuário, você pode ter mais ou menos permissões. No caso do **ls -l**, temos os três tipos:

- Autor do arquivo, Grupo do arquivo e Usuário genérico.

Intuitivamente, quem costuma ter mais permissões sobre um arquivo é o seu autor, e quem costuma ter menos permissões é o usuário genérico. Vamos dizer por exemplo que exista um grupo de programadores trabalhando em um projeto, sendo um desses programadores o autor.

O autor será responsável por testar a aplicação principal do projeto, portanto ele terá as permissões **w**, **r** e **x** (escrita, leitura e execução).

Os programadores precisam se preocupar apenas com o desenvolvimento do projeto, portanto terão as permissões **w** e **r** (escrita e leitura).

Já o usuário genérico pode apenas ver projeto, pois ele ainda não está terminado, logo ele possui a permissão **r** (leitura), apenas.

Agora que entendemos a ideia geral das permissões no Linux, vamos a um conceito que será muito utilizado em toda sua trajetória nesse sistema: o **super usuário**.

O conceito de super usuário, ou root, no Linux é muito semelhante ao conceito de administrador no Windows. Você utiliza do super usuário para realizar mudanças no sistema como instalar arquivos, mudar permissões, etc. Entretanto, o usuário root deve ser usado pontualmente, pois o uso indevido pode danificar o sistema de diversas formas, justamente por não ter permissões para pará-lo. Você pode utilizar um comando como super usuário utilizando o prefixo **sudo** (que significa **S**uper **U**ser **Do**), porém é necessário saber a senha do computador.

## Hardlinks e Symlinks

TO-DO

##
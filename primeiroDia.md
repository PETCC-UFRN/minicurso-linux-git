---
layout: oldschool
title: Minicurso de Linux e Git
---
# 1ᵒ Dia

## Sumário

[TOC]

## Introdução

### O que é o Linux?

O Linux não é um sistema operacional por si só, mas sim o que chamamos de um **kernel**, que num sentido mais literal representa um programa que controla os recursos do computador, permite que os usuários rodem programas, controlem os periféricos controlados e, também, provê um sistema de arquivos que gerencia o armazenamento a longo prazo de informação, como programas, dados e documentos.

Num sentido um pouco mais amplo, quando falamos "Linux", nos referimos a um combo chamado "GNU/Linux", onde "GNU" (**G**NU is **N**ot **U**nix; mais sobre o UNIX depois) é uma camada superficial do programa que corresponde a compiladores, editores de texto, programas etc.

Num sentido ainda mais amplo, quando falamos "GNU/Linux" ou apenas "Linux", falamos de uma família de sistemas os quais implementaram essa "interface" por assim dizer. Cada membro da familia é o que chamamos de distro Linux (mais sobre isso no futuro), que agora, de fato, é um sistema operacional completo, pois empacota o que é oferecido pelo Linux e GNU, e torna seu sistema utilizável sem que você tenha que compilar todas as dependências e montar seu sistema do absoluto zero.

Esses detalhes não são realmente importantes para esse curso, pois o nosso objetivo é apenas ensinar como se localizar, investigar e usar diversas ferramentas que são genéricas a uma família ainda maior de sistemas, chamados de "Unix-like", onde um dos herdeiros dessa família é o Linux.

### Família Unix e Unix-Like

Inicialmente, vamos falar um pouco sobre quem começou essa gigantesca família de sistemas chamadas Unix-Like. Era uma vez o Unix, um sistema operacional que foi desenvolvido no início dos anos 1970 como uma alternativa flexível e portátil aos sistemas da época, que eram grandes, caros e difíceis de manter, especialmente porque eram programados em linguagem de máquina específica para cada tipo de hardware. Sendo um dos primeiros sistemas operacionais escritos na linguagem C — possivelmente o primeiro —, o Unix se destacou pela adaptabilidade e facilidade de implementação em diferentes tipos de hardware. Apesar de ser um ótimo sistema para a época, o Unix foi construido para propósitos educaionais e sua licensa era muito cara, talvez por esse motivo ele não tenha sido muito atrativo para a população geral. Independentemente disso, ele trouxe inovações que estabeleceram um modelo e uma filosofia de desenvolvimento de software que ainda influencia inúmeras outras plataformas e sistemas operacionais subsequentes, como o MacOS, sistemas BSDs e os Linux. Esse conjunto de inovações e filosofia, futuramente estabeleceu até um padrão, que é o que chamamos de POSIX.

### Distros

#### Linux

Como foi dito anteriormente, Linux é apenas uma família de sistemas, e cada sistema é chamado de distro Linux. Existem uma série de diferenças entre essas distros, que dependem da implementação de quem os gerencia. Além disso, pelo GNU e o Linux serem "software livre" qualquer uso e implementação do Kernel Linux e do projeto GNU tem que ser gratuita e código aberto. Mas então, qual é a principal diferença entre essas distribuições?

As distros são coleções de software que incluem o kernel Linux, software GNU e, muitas vezes, outros pacotes que podem ser de outras origens. Estas distribuições são adaptadas para atender a diferentes tipos de usuários e podem incluir desde versões muito leves para hardware antigo até sistemas completamente equipados para uso corporativo. Algumas das mais populares são [Ubuntu](https://ubuntu.com/desktop), [Mint](https://linuxmint.com/), [Fedora](https://fedoraproject.org/), [Debian](https://www.debian.org/index.pt.html) e [Arch](https://archlinux.org/), cada uma oferece uma experiência de usuário diferente, ferramentas específicas e um sistema de gerenciador de pacotes que facilita a instalação e a manutenção de software.

#### BSD's

Ao lado das distribuições Linux, existem os sistemas operacionais [BSD](https://pt.wikipedia.org/wiki/Berkeley_Software_Distribution), que são outra família de sistemas Unix-like. BSD, que significa Berkeley Software Distribution, refere-se a uma série de distribuições de software que foram originalmente desenvolvidas e distribuídas pela Universidade da Califórnia em Berkeley. Assim como o Linux, os sistemas BSD têm um núcleo e ferramentas de usuário, mas são desenvolvidos e licenciados de maneira diferente. Exemplos notáveis de sistemas BSD incluem [FreeBSD](https://www.freebsd.org/), [NetBSD](https://www.netbsd.org/) e [OpenBSD](https://www.openbsd.org/).

Os sistemas BSD e as distribuições Linux compartilham muitas das filosofias básicas de sistemas Unix-like, mas cada família tem suas próprias comunidades, filosofias de desenvolvimento, e escolhas técnicas que os diferenciam significativamente.

## Shell

### Intro

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
```

A maneira mais simples de usar o shell, é digitando comandos!.

### Primeiros passos

#### Comando `date` e `echo`

Agora que ja demos nosso primeiro comando, vamos conhecer mais alguns comandos legais, tente:

```sh
[user@hostname ~]$ date
```

e

```sh
[user@hostname ~]$ cal
```

Sem muitas surpresas deve ter aparecido a data e o horário de hoje, e um calendário do mês, agora vamos testar o seguinte comando com um argumento:

```sh
[user@hostname ~]$ echo Hello 
                          ^
                          └─ Argumento passado para o programa (input)
```

Seu terminal provalvemente ficou assim:

```sh
[user@hostname ~]$ echo Hello 
Hello
```

O programa `echo` apenas imprime o argumento que você passou para ele em uma *stream* (falaremos mais sobre no futuro).

Você também pode usar o `echo` das seguintes formas, teste e veja o resultado:

```sh
[user@hostname ~]$ echo "Hello World"
```

```sh
[user@hostname ~]$ echo Hello\ World
```

O que acabamos de presenciar aqui são **inputs** e **outputs** de um programa, o input é o argumento que você deu para determinado programa e o output é a resposta que você recebeu.

Imagine que estamos de volta num restaurante sem botões e qr code. Aqui, o input é como fazer seu pedido ao garçom, você pode especificar não apenas o prato que deseja, mas também detalhes como o ponto da carne, ausência de algum ingrediente ao qual você é alérgico, ou até mesmo pedir acompanhamentos extras. Esse pedido, ou comando, é passado ao garçom, que aqui atua como uma interface entre você (o usuário) e a cozinha (o sistema operacional ou o programa em execução).

O output, por outro lado, é o prato que você recebe após a cozinha processar seu pedido. Assim como em um sistema de computador, o output depende diretamente do input: se você pedir uma pizza de calabresa, não receberá uma feijoada (provavelmente :P).

Teste digitar qualquer coisa no terminal e veja o que acontece.

```sh
[user@hostname ~]$ ablueblauebluebalbbeu
```

Porque esse comando não faz sentido, o shell vai nos dizer que deu errado e vai nos dar outra chance:

```sh
bash: ablueblauebluebalbbeu: command not found
[user@hostname ~]$
```

#### Histórico de comandos

Se você pressionar `↑`, o nosso comando `ablueblauebluebalbbeu` vai reaparecer para podermos usa-lo novamente, se você continuar pressionan. Isso é chamado de histórico de comandos e a maioria das distribuições Linux armazenam por padrão pelo menos os últimos 1000 comandos. Se você pressionar `↓`, você avança para o presente no histórico até o comando desaparecer.

### Navegando com o Shell

Que nem o Windows, um Unix-Like organiza seus arquivos no que é chamado de Estrutura de dirétorios hierárquica. Isso significa que é possível visualizar esse sistema como uma árvore de diretórios, também chamados de pastas. Esses diretórios funcionam exatamente como pastas de escritório que você pode ter em casa, onde cada uma pode ter outra pasta e/ou um arquivo, onde cada arquivo tem um nome, junto com informações extras como a quem ele pertence ou o quão grande ele é.

A principal diferença filosófica entre o sistema de arquivos fundado pelo Unix é que, ao contrário do Windows, que tem um arvóre de arquivos diferente para cada dispositivo de armazenamento, um Unix-like tem apenas uma árvore, que independe da quantidade de dispositivos de armazenamento conectados ao computador.

Além disso, vale ressaltar, que o sistema de arquivos não é capaz de diferenciar entre tipos diferentes de arquivo, ele não impõe nenhuma estrutura a ser seguida por esses arquivos, o significado dos bytes que ali estão sendo armazenados dependem única e exclusivamente dos programas que lidam e interpretam com esse arquivo. Isso não é apenas verdade para arquivos genéricos, mas também para caracteres digitados no seu teclado, dispositivos conectados e tudo que você pode imaginar.

#### Current working directory

O sistema de arquivos funciona como uma árvore: você possui um diretório de origem, o `/` (chamado de **root**) e os galhos acima dele, que são os outros diretórios do computador. A partir de um diretório, é possível ver os diretórios diretamente ligados a ele seja "descendo" ou "subindo" a árvore. Quando você acessa um diretório e passa a ter acesso a todos os arquivos dentro dele, aquele passa a ser seu **Working Directory**

<div style="text-align: center;">
<img alt="Imagem exemplo de um sistema de arquivos do Linunx" src="assets/images/linux_dia1_imagem5.png" width="80%">
</div>
<br>

Utilizando o comando `pwd`, que é uma sigla para **P**ath to **W**orking **D**irectory, é possível saber o caminho de todos os diretórios da root até o seu diretório atual:

```sh
[eu@hostname ~]$ pwd
/home/eu
```

Além do working directory nós temos também o home directory, que é o único lugar que usuários comuns são autorizados a escrever em ou um arquivo. Para cada usuário é dado um home directory, ou seja por padrão você apenas capaz de ver outros diretórios além do seu, se quiser editar algo que não é seu, você precisará de algo que chamamos de permissões de superusuário, ou sudo (mais sobre isso no futuro).

#### Caminhos absolutos e caminhos relativos

Ao navegar pelo sistema utilizando o shell, geralmente utilizamos caminhos absolutos como o do exemplo anterior. Estando no diretório `/home`, você pode utilizar o comando `cd` (que significa Change Directory) para acessar o diretório `/eu`, da seguinte forma:

```sh
# Perceba o (~) mudando
[user@hostname ~]$ cd eu
[user@hostname ]$
```

Porém, digamos que você está na pasta `/downloads` e deseja ir até a pasta `/escola` ! Para isso, é necessário se utilizar do **caminho relativo** `..`

Os dois pontos representam o **diretório anterior** de forma relativa, e podem ser utilizados para *voltar* enquanto navegando pelo sistema de arquivos:

```sh
[downloads@hostnname ~]$ cd ..
[eu@hostname ~]$ cd escola
[escola@hostname ~]$
```

Também temos o caminho relativo `.` que representa o **diretório atual**. Na parte de navegação de arquivos esse caminho não é tão interessante, mas é crucial quando estamos tratando de **executar comandos**.

#### Listando e criando diretórios

Podemos manipular diretórios e arquivos a partir de comandos:

Usando o comando `mkdir` (de Make Directory), é possível criar uma nova pasta. A sintaxe do comando é: `mkdir <nome_da_pasta>`. Digamos que você acabou de criar na pasta `escola` a pasta `minicurso_linux_git`:

```sh
[user@hostname escola]$ mkdir minicurso_linux_git
[user@hostname escola]$ cd minicurso_linux_git
[user@hostname minicurso_linux_git]$
```

Vamos adicionar também um arquivo de texto para anotações da aula, usando o comando `touch`
(Divine **touch**):

```sh
[user@hostname minicurso_linux_git]$ touch anotacoes.txt
```

Você criou essa pasta assim que chegou em casa, logo após a primeira aula do minicurso. Você colocou na pasta esse arquivo de texto com as anotações da aula e um arquivo de imagem, com uma *selfie* que você tirou com um colega no dia da aula.

 Um tempo se passou, você já se formou na faculdade e você encontra esse diretório novamente, você se pergunta, qual o conteúdo dele?

Com o comando `ls` (**L**i**s**t), é possível listar todo o conteúdo de um diretório:

```sh
[user@hostname minicurso_linux_git]$ ls
anotacoes.txt  selfie.jpg
```

Porém, você está trocando de computador e o computador no qual essa pasta foi criada não será mais utilizado. Ainda muito saudoso pelo seu tempo de novato nesse mundo do Linux, você decide levar o conteúdo dessa pasta para o seu novo computador. Você move os arquivos para um *pen-drive*, deixando a pasta agora vazia, e então decide removê-la, utilizando o comando `rmdir` (**R**e**m**ove **Dir**ectory)(note que o comando só funciona se a pasta estiver vazia):

```sh
[user@hostname minicurso_linux_git]$ cd ..
[user@hostname escola]$ rmdir minicurso_linux_git
```

E... pronto! A pasta agora não existe mais no computador, e você está pronto para iniciar um novo ciclo.

Agora que começamos a ver todos esses comandos, provavelmente uma dúvida veio à sua mente: e se eu precisar utilizar um comando que eu não sei ainda o que faz?

### Opções e argumentos de comando

Recapitulando, um pouco, usamos diversos comandos com uma extra informação, para que eles realizassem uma tarefa em específico, por exemplo, o `cd` com o dietório que queriamos ir, o `ls` com o diretório que queremos listar, e o `echo` com alguma mensagem especial que queriamos "echoar". Perceba que mesmo sem receber nenhuma informação eles funcionam normalmente, apenas sem ter o resultado que você desejou -- Mas e o comando `date`, `cal` e `pwd` que também vimos? Eles não vão funcionar se tentarmos passar o que chamamos de argumento para esses comandos.

Essa careterísitica vária de comando para comando assim como o que chamamos de opções de comanos, que são configurações específicas que podemos fazer que altera o comportamento padrão do comando, e eles sempre começam com um '-' antes do nome. Por exemplo:

Teste o comando `ls` com a opção`-F` (abreviação para `--classify`), que especifica o tipo de cada arquivo listado:

```sh
[user@hostname ~]$ ls -F
escola/ downloads/ Minecraft* 'Pequeno Príncipe.pdf'
```

A opção `-F` decora o `ls` com esses símbolos para que possamos saber que tipo de
arquivo estamos vendo, isto é, o `/` é para diretórios, `*` é para arquivos
executáveis e o `@` são links para outros arquivos (ou atalhos, mais sobre
isso no futuro).

#### Dotfiles

Outra opção que usamos muito em conjunto com o `ls` é a opção `-a/--all`,
que lista os arquivos "ocultos" do seu computador, conhecidos mais comumente
como *dotfiles*. São chamados

### Long listing format e permissões

Uma flag muito utilizada com o comando `ls` é a flag`-l`
(**L**ong listing format), que lista uma série de informações sobre o conteúdo
de um diretório. Vejamos um exemplo:

```sh
[user@hostname ~]
total 28
drwxr-xr-x 7 user user 4096 Jun 28 07:32 escola
drwxr-xr-x 5 user user 4096 Jun 28 09:33 downloads
-rwxr-xr-x 1 user user 4096 May 15 19:35 Minecraft
-rwxr-xr-x 1 user user   69 Jun 10 19:23 'Pequeno Príncipe.pdf'
```

Da direita para a esquerda, temos algumas informações:

- O nome do arquivo.
- A data de criação.
- O tamanho do arquivo em bytes.
- O **grupo** ao qual o arquivo pertence.
- O **autor** do arquivo.
- O número de **hardlinks** (mais sobre isso no futuro).
- As **permissões** do arquivo (Da esquerda pra direita: autor, grupo e usuário genérico).

Muitas dessas informações ainda são difíceis de entender, mas vamos por partes:

### Como investigar comandos

O Linux vem com ferramentas que podem ser utilizadas quando se quer saber mais sobre um comando, sem ter que ficar pesquisando na internet toda hora. Usando o comando `man`, é possível ver o manual de um comando. Até para comandos mais simples, há uma quantidade absurda de informação, mas não se desespere, vamos dar uma olhada em cada parte do manual:

<div style="text-align: center;">
<img alt="Uma explicação sobre o que mostra o comando 'man'" src="https://hackmd.io/_uploads/ryhfmIdUR.png" width="80%">
</div>
<br>

O manual de um comando tem tudo que é necessário para se entender como um comando funciona e como ele pode se utilizado. Com o conhecimento adquirido até agora, podemos entender perfeitamente as seções vermelha e verde da imagem, mas a seção azul pode ser um pouco confusa, pois mostra todas as **flags** que podem ser utilizadas com o comando.

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


---
layout: oldschool
title: Minicurso de Linux e Git
---


# Shell Avançado

<!--toc:start-->
- [Expandindo a ideia de comandos](#expandindo-a-ideia-de-comandos)
  - [Aliases](#aliases)
  - [Vendo um comando como arquivo](#vendo-um-comando-como-arquivo)
- [Instalando programas no Linux](#instalando-programas-no-linux)
  - [Manualmente](#manualmente)
  - [Gerenciadores de pacote](#gerenciadores-de-pacote)
- [Shell scripting e editores de texto](#shell-scripting-e-editores-de-texto)
  - [Escolhendo um editor de texto](#escolhendo-um-editor-de-texto)
  - [Variáveis](#variáveis)
  - [Condicionais](#condicionais)
  - [Funções](#funções)
  - [Loops](#loops)
- [Exercícios](#exercícios)
<!--toc:end-->

## Tabela de conteúdos

## Expandindo a ideia de comandos

### Aliases

No decorrer do dia anterior, espero que tenha notado que a maioria dos comandos é uma abreviação de alguma
palavra em inglês, que passa uma ideia inicial do que determinado comando faz, por exemplo: temos os `ls`
que significa **L**i**S**t, o `cp` que significa **C**o**P**y, o `rm` que significa **R**e**M**ove e assim
por diante. Mas, espero que seja fácil de notar que se é uma coisa que você usa muito, é inconveniente
digitar uma palavra gigantesca toda vez que você precisa invocar essa coisa, e esse sentimento é o mesmo que
motivou os criadores do sistema tanto a abreviar o nome dos comandos quanto criar o que chamamos de *alias*.

Imagine-se na seguinte situação, existe uma configuração de comando que você usa muito, este seria:

```sh
ls --color=auto --almost-all --classify -l --human-readable
```

E a maioria das vezes que você quer listar algo, você usa essa variação do `ls`. Se você não tem a capacidade
de digitar instantaneamente o que você ta pensando, provavelmente deve ser uma chatice ter que digitar isso
muitas vezes. Logo, o que nós podemos fazer é dar para o shell, um apelido para este comando, então em vez
de ter que digitar essa coisa toda nós gostaríamos apenas de falar `meuls` e o shell saber exatamente o que
fazer. A maneira de fazer isso é a seguinte:

```sh
alias meuls='ls --color=auto --almost-all --classify -l --human-readable'
```

E agora durante essa sessão do shell, toda vida que eu digitar `meuls`, o shell vai "expandir" esse apelido
e vai invocar seu real significado. E de certa forma, conseguimos criar com isso um "novo comando".

### Vendo um comando como arquivo

Agora, uma reflexão interessante a se fazer, é refletir como que o shell sabe quais são os apelidos que eu
dei, ou até mesmo o que é comando ou não.
[Relembrando quando a gente tava começando a usar o shell](/primeiroDia.md#comando-date-e-echo), nós não
podemos simplesmente digitar qualquer coisa aleatória do tipo `balubslbeuaba` e esperar que ele entenda e
faça alguma coisa, logo, o que o shell faz é, assim como aquela variável `$?` armazena o status de saída do
último programa, existe outras variáveis especiais que armazenam o lugar o qual o shell deve procurar pelos
executáveis dos comandos que a gente anda utilizando.

Como os comandos/programas são simplesmente executáveis que estão em uma pasta "especial", nós podemos
perguntar aonde eles estão com a seguinte linha:

```terminal
[user@hostname ~]$ whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
```

O comando `whereis` mostra a localização do executável de programas e a localização da sua página no `man`. Sabendo disso, você pode executar o `ls` ou qualquer outro comando passando o caminho inteiro para seu
executável, da mesma forma que você usaria normalmente:

```terminal
[user@hostname ~]$ /usr/bin/ls -l
```

A variável que o shell usa para saber onde procurar esses comandos é a variável `$PATH`, e assim como a `$?`
nós podemos ver o valor que ela armazena digitando a seguinte linha:

```terminal
[user@hostname ~]$ echo $PATH
/usr/local/bin:/usr/bin:/home/user/.local/share/bin
```

A saída pode parecer estranha, mas isso representa vários diretórios separados `:`, e o shell vai em cada um
deles procurando o que você digitou no terminal.

## Instalando programas no Linux

### Manualmente

Agora que já sabemos o que de fato são os comandos que utilizamos no terminal e como o shell busca esses
comandos, nós somos (finalmente) capazes de instalar quer programa no nosso computador, e a ideia é
bem intuitiva:

1. Primeiro, a gente pega nosso executável pra colocar no `$PATH`:

    <div style="text-align: center;">
    <img alt="Meme muito engraçado sobre arquivos do sistema" src="assets/images/linux_dia2_imagem1.jpeg" width="80%">
    </div>
    <br>

2. Segundo, a gente quer colocar o executável em dos diretórios do `$PATH`:

    <div style="text-align: center;">
    <img alt="Meme muito engraçado sobre arquivos do sistema" src="assets/images/linux_dia2_imagem2.jpeg" width="80%">
    </div>
    <br>

3. Terceiro, **a gente coloca ele `$PATH`**!!!:

    <div style="text-align: center;">
    <img alt="Meme muito engraçado sobre arquivos do sistema" src="assets/images/linux_dia2_imagem3.jpeg" width="80%">
    </div>
    <br>

4. **E pronto!!!** Instalamos um programa!

É simples assim mesmo, mas trabalhar dessa maneira é um pouco desajeitado, existem programas que dependem
de outros arquivos para funcionar, como arquivos de configuração, de dados, coisas gráficas, não podemos
simplesmente colocar o executável desse programa em um dos diretórios do `$PATH` e esperar que ocorra tudo
bem.

O que fazemos então?

[Lembra dos symlinks?](/primeiroDia.md#links-simbólicos-sym-links) Podemos usá-los para colocar apenas
o atalho do executável no `PATH` e aí quando o shell tentar rodar o programa, ele na verdade vai rodar o
original que está no diretório (de preferência bem acessível e fácil de gerenciar) que você quiser.

Mas, isso não significa que não existam peculiaridades de programa para programa, as vezes precisaremos
descompactar o arquivo que contém o executável do programa que baixamos da internet, as vezes precisaremos
compilar o executável do programa, as vezes vamos baixar só o executável, enfim, varia  de programa para
programa. O que precisa ser feito, provavelmente (95% das vezes) vai estar na documentação do que você quer
instalar.

### Gerenciadores de pacote

Existem maneiras mais simples de instalar coisas no seu sistema sem ter que fazer o download do programa na
internet, compilá-lo e adicioná-lo ao `PATH`, mas você vai precisar de permissões de superusuário para
conseguir fazer isso, a maneira, sem dúvidas, mais utilizada hoje em dia é utilizando o gerenciador de
pacote da sua distribuição Linux.

Esses gerenciadores de pacote abstraem o processo de baixar da internet, instalar, atualizar (se futuramente houver atualização), pesquisar programas, e desinstalá-los, no alcance de um comando.
Essa, inclusive, é uma das grandes vantagens de usar o Linux no âmbito da computação, o processo de
configurar programas e suas depedências é muito fácil e você tem total autonomia para investigar e resolver
problemas que possam vir a aparecer.

Como mencionado anteriormente o uso do gerenciador de pacote vária de distribuição para distribuição, mas
vamos pegar como exemplo o gerenciador de pacote da distruibuição que originou o Ubuntu, o Debian.

#### Exemplo com o uso do `apt`

Distribuições que nasceram do Debian, como o Ubuntu, usam o gerenciador de pacotes chamado `apt`, que nada
mais é que um programa que vem instalado no computador assim como todos os outros que vimos até agora.
Logo, podemos investigar seu uso usando o `man` como amigo

##### TL;DR (To Long Didn't Read the manual)

Mas se estiver com preguiça de ler o `man`, aqui vai uma ajudinha:

- **Atualizar a lista de pacotes**: Este comando atualiza a lista de pacotes disponíveis a partir dos
repositórios configurados.

  ```bash
  sudo apt update
  ```

- **Instalar um pacote**: Para instalar um pacote, você usa o sub-comando `install` seguido do nome do
pacote.

  ```bash
  sudo apt install nome-do-pacote
  ```

- **Remover um pacote**: Para remover um pacote, você usa o sub-comando `remove`.

  ```bash
  sudo apt remove nome-do-pacote
  ```

- **Atualizar todos os pacotes instalados**: Este comando atualiza todos os pacotes instalados para as
versões mais recentes disponíveis nos banco de dados do gerenciador.

  ```bash
  sudo apt upgrade
  ```

- **Pesquisar por um pacote**: Você pode usar o `search` para procurar pacotes específicos.

  ```bash
  apt search termo-de-busca
  ```

- **Limpar pacotes desnecessários**: Após uma atualização ou remoção de pacotes, você pode liberar espaço
removendo pacotes que não são mais necessários.

  ```bash
  sudo apt autoremove
  ```

Na maioria das distribuições, vão existir comandos ou combinações de comandos equivalentes aos do `apt` e
e conforme o uso esse processo de instalação, atualização e remoção se torna bem natural.

## Shell scripting e editores de texto

Recapitulando um pouco, vimos bastante sobre shell, diferentes formas de como combinar comandos, abrevia-los e nos
exercícios do dia anterior vocês escreveram em diversos arquivos determinadas sequências de comandos e depois foram
capazes de realizar alguma ação. Nesse tópico, quero formalizar o que foi feito e expandir um pouco mais esse escopo.

Um shell é uma linguagem de programação, mais específicamente uma linguagem de scripting assim como Python, Ruby e outras. Por ser uma linguagem de programação, um script em shell nada mais é do que uma sequência de comandos que
existem no seu computador escritos num arquivo linha por linha, e quando você executa o arquivo, seu sistema invoca o
shell para interpretar o que ali foi escrito.

Com o que já vimos, somos plenamente capazes de escrever scripts simples, mas ainda falta dar mais alguns passos de
complexidade e aprender ferramentas que nos permitam trabalhar de maneira mais confortável, isto é, escrever em arquivos
sem depender de redirecionamento de streams (*stdin*, *stdout*, *stderr*) ou combinação de comandos. Para conseguir
fazer isso precisamos escolher o nosso editor de texto favorito e colocar a mão na massa.

### Escolhendo um editor de texto

Provavelmente, seu sistema Linux já veio com alguns editores de texto para experimentar, uns mais difícies de aprender
do que outros, mas todos com suas próprias especialidades.

- [(neo)](https://neovim.io/)[**vim**](https://www.vim.org/) (**V**i **IM**proved): Pessoalmente, meu favorito, mas com certeza dos que vou listar a diante o mais
    difícil para começar a usar. Entretanto, passado a curva de aprendizado inicial, é com certeza um dos editores de
    texto mais prazerosos de se usar. A lógica de modos de teclado, configuração (isso se for o neovim), e os atalhos
    pré-configurado tornam a escrita muito produtiva e divertida.

- [**vscode**](https://code.visualstudio.com/) (**V**isual **S**tudio **CODE**): Todo programador já usou pelo menos ou vai usar alguma vez na vida o
    vscode, é um editor de texto da Microsoft, muito configurável e facílimo de começar usar, além de já vim com vários
    recursos que abstraem sua configuração e recursos para diferentes tipos de linguagem. Enquanto essa abstração eu
    considero sua maior vantagem, também considero sua maior desvantagem, visto que pode ser muito estressante
    solucionar problemas sem conseguir enxergar muito bem a sua causa.

- [**GNU nano**](https://www.nano-editor.org/): Assim como vim, é editor de texto leve que roda no terminal, porém sua proposta é se manter simples.
    Logo, você não consegue configurar extensivamente o editor, mas é muito fácil de começar a usá-lo devido a sua
    interface informativa e pouca complexidade envolvendo o teclado.

Existem também muitos outros editores de texto muito populares, mas que infelizmente não tenho experiência o bastante
usando-os para te ajudar nessa jornada. Entretanto, aqui estão alguns deles:

- [**GNU emacs**](https://www.gnu.org/software/emacs/)
- [**Sublime Text**](https://www.gnu.org/software/emacs/)
- [**Zed**](https://zed.dev/)
- [**Notepad++**](https://notepad-plus-plus.org/downloads/)

Entre outros...

### Variáveis

### Condicionais

### Funções

### Loops

## Exercícios

<!-- 
     TODO: Variáveis, Condicionais, Funções e loops 
     TODO: Exercícios (existem vários relacionados na internet e em livros, esse vai ser mais fácil :amem:)
--->

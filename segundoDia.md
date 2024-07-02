---
layout: oldschool
title: Minicurso de Linux e Git
---


# 2ᵒ Dia

## Tabela de conteúdos

[TOC]

## Expandindo a ideia de comandos

### Aliases

No decorrer do dia anterior, espero que tenham notado que a maioria dos comandos é uma abreviação de alguma
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

```sh
[user@hostname ~]$ whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
```

O comando `whereis` mostra a localização do executável de programas e a localização da sua página no `man`. Sabendo disso, você pode executar o `ls` ou qualquer outro comando passando o caminho inteiro para seu
executável, da mesma forma que você usaria normalmente:

```sh
[user@hostname ~]$ /usr/bin/ls -l
```

A variável que o shell usa para saber onde procurar esses comandos é a variável `$PATH`, e assim como a `$?`
nós podemos ver o valor que ela armazena digitando a seguinte linha:

```sh
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

### Usando gerenciadores de pacote

<!-- TODO: Instalando programas com gerenciadores de pacotes 
     TODO: Ideia de scripts e editores de texto
     TODO: Lidando formalmente com scripts a partir de editores de texto
     TODO: Exercícios (existem vários relacionados na internet e em livros, esse vai ser mais fácil :amem:)
--->

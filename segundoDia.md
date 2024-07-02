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

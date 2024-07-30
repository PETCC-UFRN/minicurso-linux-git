---
layout: default
title: Minicurso de Linux e Git
---


## GitHub e boas práticas de Git

Na aula anterior, começamos a trabalhar conceitos mais avançados de Git e Github, os quais permitem
trabalhar de forma colaborativa em projetos de software. Nesta aula, vamos explorar boas práticas envolvendo
esses conceitos além de descobrir algumas novas funcionalidades do Git.

### Pull requests

Primeiramente, gostaria de começar relembrando o que sabemos sobre branches e o workflow tradicional
do Git, onde temos uma branch principal e criamos branches paralelas para desenvolver novas funcionalidades
que são posteriormente integradas à branch principal. Num workflow tradicional, o processo de integração
ocorre através de merges, e esses merges são executados primeiro localmente e depois publicados no
repositório remoto. Entretanto, essa não é a única forma de integrar novas funcionalidades ao projeto,
ferramentas de hospedagem remota como o GitHub, por exemplo, permitem que os desenvolvedores criem o que
chamamos de pull requests.

O Pull request (Merge requests), ou PR, nada mais é que uma solicitação para que as alterações feitas em uma
branch sejam incorporadas a outra branch do projeto, e a grande vantagem do PR é que ele favorece
comunicação e transparência entre os desenvolvedores. Pois, quando um pull request é criado, dentro da
plataforma de hospedagem, os colaboradores são notificados e podem visualizar, comentar e revisar as
alterações feitas na branch.

O processo de pull request é muito simples e pode ser quebrado em alguns passos

1. Crie uma branch local e faça as alterações desejadas.
2. Publique a branch local no repositório remoto.
3. Acesse o repositório remoto e crie um pull request.
4. Peça para um mais colaboradores revisar seu código e faça alguma alteração se necessário.
5. Após aprovado e revisado, o pull request pode ser integrado ao projeto.
5. Delete a branch remota e local.

E algumas boas práticas envolvendo a criação de pull requests são:

1. Revisar bem seu código e pull request antes de submetê-lo.
2. Escrever um bom título e descrição concisa e com propósito claro.
3. Prover contexto e informações adicionais que possam ajudar o revisor.

## Rebase

## Squash

## Issues

## Forks

## Changelog e README

## Projeto final pt.2

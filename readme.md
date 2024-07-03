# Repositório Oficial do Site do Minicurso de Linux e Git ofertado pelo PET de Ciência da Computação

Este é o repositório onde é hospedado o site via GitHub Pages do Minicurso de férias de Linux e Git. Neste arquivo você verá um tutorial de como utilizar o gerador de páginas estáticas **Jekyll** para alterar os recursos deste projeto.

# Instalando o Jekyll

#### OBS: Esse tutorial cobre a utilização do Jekyll exclusivamente neste projeto. Para um tutorial mais aprofundado visite o site: <https://jekyllrb.com/docs/>

## Requisitos

| Instalações | Versões | Local de Download |
|----------|----------|----------|
| Ruby   | Ruby+Devkit 3.3.3 (Recomendada)  | <https://rubyinstaller.org/downloads/>   |
| Jekyll   |  Mais recente  | Instalação pelo terminal   |

## Instalação

1. Vá no site do RubyInstaller e instale a versão recomendada
2. Depois de instalado o Ruby, abra um terminal e digite `gem install jekyll bundler` para instalar o Jekyll

Sempre que for rodar comandos do jekyll, use junto o comando `bundle exec`.

## Rodando o site localmente

Para construir o site dê `bundle exec jekyll build` e para hospedar o site localmente dê `bundle exec jekyll serve`. Com o ***serve*** rodando, qualquer alteração feita nos arquivos do site já irá alterar o localhost.

# Utilizando o Jekyll

## Páginas em Markdown

Usando o Jekyll, é possível criar uma página em Markdown e ela será automaticamente *portada* para HTML usando a ferramenta. Sendo assim, para criar uma página para o site, basta criar um arquivo .md no diretório principal do site e alterá-lo como desejar, como se estivesse escrevendo algo no HackMD ou Notion.

Todavia, existem alguns pontos importantes que vão ser abordados abaixo.

## Front Matter

O front matter é declarado no início de um arquivo em um projeto Jekyll e pode ser usado para declarar variáveis para aquela página (Exemplo: **titulo_da_pagina: Minicurso de Linux e Git**) e, principalmente, para definir o layout que a página irá usar.

O front matter possui o seguinte formato:

```
---
title: Minicurso de Linux e Git
layout: default
---
```

Os hífens são necessários para separar o conteúdo do front matter do resto da página e ele deve ser declarado no início da página.

## Layouts

Existem 5 layouts nesse projeto até o momento:

- default: layout padrão
- home: layout da homepage
- licoes: layout da página que lista todas as lições
- sobre: layout da página que fala sobre o curso
- oldschool: em html é o mesmo layout da página de lições, apenas com classes diferentes para mudar a paleta de cores

Para adicionar um novo layout, basta criar um arquivo html na pasta `/_layouts` que tem no projeto. Todo o esqueleto da página em HTML vai ser usado na hora de importar uma página Markdown e a tag `{{ content }}` denota o conteúdo exclusivo dá página que você está usando o layout.

## Includes

Os *includes* são arquivos html guardados na pasta `/_includes` e representam estruturas em html que podem ser incluídas em qualquer layout. Os *includes* são utilizados para evitar a monotonia de escrever a mesma estrutura inteira em cada layout, e eles podem ser importados em um layout utilizando a tag `{% include arquivo.html %}` no local desejado. Um exemplo de include nesse projeto é o **menu de navegação** que fica no topo do site.

## Assets

Sendo algo em comum para qualquer projeto de website, os *assets* do projeto, isto é, as imagens, os estilos de página, as fontes não nativas usadas, etc, são guardados na página `/assets`. É importante prestar atenção para que as alterações sejam feitas na pasta `/assets` e não na pasta `/_site/assets`.

## Outros arquivos

- **Gemfile e Gemfile.lock**: São arquivos gerados pelo ruby que especificam os pacotes que estão sendo usados nesse projeto.
- **_config.yml**: É o arquivo de configuração do Jekyll, onde pode-se alterar o gerador de Markdown (a ferramenta usada para transformar páginas Markdown em HTML) entre outras configurações do projeto.


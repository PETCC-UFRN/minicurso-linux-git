---
layout: layoutGit
title: Minicurso de Linux e Git
---

[TOC]

# Git avançado

## Desfazendo alterações

No [último tópico](/terceiroDia.md), tivemos o nosso primeiro contato com o `git`, e aprendemos a criar
repositórios para nos ajudar a rastrear as alterações feitas no nosso projeto localmente e remotamente.
Entretanto, durante o desenvolvimento de um projeto, não é incomum cometer erros ou fazer alterações
indesejáveis. Por exemplo, alterar um arquivo sem querer, ou adicionar um arquivo que não deveria ser
adicionado, ou até mesmo fazer um commit com uma mensagem errada.

Além disso, quando ainda estamos desenvolvendo certa maturidade em relação ao uso do `git` é muito comum
tomar medidas extremas, para solucionar diferentes tipos de problemas, sem de fato usar os meios que a
ferramenta nos oferece. Por exemplo, quem nunca deletou e baixou o repositório novamente para se livrar de
um simples `commit` errado?

Por isso, gostaria de apresentar algumas formas seguras e mais "elegantes" de lidar com alguns tipos de
problemas que podem surgir durante o desenvolvimento de um projeto.

### Desfazendo *commits* sem ter publicado

Imagine, por exemplo, que você tem um repositório com seguinte histórico de commits:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem1.jpg" width="70%">
<br>

Você estava desenvolvendo a funcionalidade `E`, e agora é momento de finalmente fazer o *commit* e salvar
essa mudança:

```terminal
$ git status
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
 E

nothing added to commit but untracked files present (use "git add" to track)

$ git add E ; git commit -m R
[main 0156e00] R
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 E
```

Porém, imediatamente após fazer o *commit*, você percebe que cometeu um erro e que o nome do commit na
verdade deveria ser "E" ao invés de "R". E agora, o que fazer?

Revisitando o nosso histórico de commits (podemos fazer isso com o comando `git log --oneline`), urge
a necessidade de voltar para o commit anterior e corrigir o nome do commit.

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem2.jpeg" width="70%">
<br>

Para isso, existem algumas possibilidades, dentre as quais:

#### `git reset`

A primeira ideia é usar o comando `git reset`, visto que, ele tem a capacidade de mover o `HEAD`, para um
commit anterior, onde por padrão, arquivos alterados são preservados mas não ficam na *stagin area*.

Então, para simplesmente voltar para o commit anterior, podemos fazer:

```terminal
git reset HEAD~1
```

onde, o `~1` indica a quantidade de commits que queremos voltar, no caso, 1 commit. Agora, nosso histórico
de commits fica assim:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem3.jpeg" width="70%">
<br>

Note que, o commit "R" fica inacessível, mas o arquivo `E` continua presente no nosso diretório de trabalho.
Naturalmente, podemos corrigir o nome do commit e fazer um novo commit:

```terminal
git add E ; git commit -m E
```

### `git commit --amend`

Alternativamente, podemos usar o comando `git commit --amend`, que nos permite alterar o commit mais
recente, inclusive os arquivos que foram adicionados a ele.

```terminal
git commit --amend
```

Será aberto um editor de texto, onde você poderá alterar a mensagem do commit e após salvar e fechar o
editor, o commit será alterado.

## Workflow avançado

Todas essas funcionalidades que vimos até agora sobre o `git` são muito úteis, mas, até então, só
trabalhamos individualmente em pequenos projetos num ambiente controlado. Nesse sentido, é dada a hora
de finalmente começarmos a apreciar todo o potencial das ferramentas oferecidas pelo `git` para trabalhar
em ambientes de coloboração, onde, a primeira dessas ferramentas que vamos explorar são as *branches*.

### Git branching

Se você pensar no seu histórico de commits como uma árvore, você pode visualizar *branches* como
ramificações ou galhos dessa árvore, e a ideia por trás das *branches* é permitir que você e seus
companheiros de projeto, trabalhem em diferentes partes do projeto, sem interferir diretamente no trabalho
dos outros.

O uso dessa ferramenta pode variar a depender da necessidade e política de desenvolvimento de cada projeto,
entretanto, uma pratica comum é definir uma *branch* principal, geralmente chamada de `master` ou `main`,
e a cada nova funcionalidade ou correção de bug, criar uma nova *branch* a partir da principal.
Essas *branches* secundárias são o que chamamos de *topic branches* ou *feature branches*, e assim que elas
cumprem o seu propósito, são incorporadas na *branch* principal e deletadas.

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem4.jpeg" width="70%">
<br>

* A branch `main` é a linha de desenvolvimento principal, e as branches `feature1` e `feature2` são
ramificações que foram criadas para desenvolver novas funcionalidades.

Como você já deve ter visto, por padrão, o quando usamos o comando `git init`, o programa cria
automaticamente uma branch principal chamada de `master`. Uma vez criada, podemos tanto alterar o nome dela
para um nome mais significativo, por exemplo, `main`, quanto criar novas branches a partir dela e trabalhar
em novas funcionalidades para o projeto.

1. Podemos iniciar o repositório com a branch principal chamada de `main`:

  ```terminal
  git init --initial-branch=main
  ```

2. Logo após, podemos criar uma nova branch a partir dela com o `git branch <nome_da_branch> <branch_base>`:

  ```terminal
  git branch feature-legal main
  ```

* Alternativamente, podemos omitir o nome da *branch* base, e o `git` vai assumir que queremos criar a nova branch a partir da qual estamos atualmente.

3. Precisamos mudar para a nova branch para começar a trabalhar nela, então usamos o comando `git switch <branch>` (que serve apenas para trocar de branches) ou `git checkout` (mais sobre ele no futuro):

  ```terminal
  git switch feature-legal
  ```

Pronto! Já temos quase tudo que precisamos para trabalhar efetivamente com *branches*, podemos "commitar"
e fazer tudo que já sabemos fazer, mas agora, de forma isolada do restante do projeto, sem correr grandes
riscos. Contudo, ainda falta algumas nuances que precisamos tomar conhecimento, estas seriam como incorpar
as mudanças feitas numa branch em outra e como criar *branches* remotas.

#### Branches locais e remotas

Quando estamos trabalhando com repositórios remotos, é importante ficar claro que existem duas referências
a *branch* que estamos trabalhando atualmente, uma local e outra remota, e quando criamos uma nova branch
essa referência remota não é criada automaticamente, então, cabe a nós fazer isso manualmente.

Por exemplo, suponha que criamos uma nova branch local chamada `feature-legal` e fizemos alguns commits nela, e
então, quero compartilhar essa branch com meus colegas de trabalho ou apenas salvar o progresso na nuvem.
Para isso, podemos criar a referência remota com o seguinte comando:

```terminal
git push -u origin feature-legal
```

(Se o nome do repositório remoto for `origin`)

## Git merging

Nos últimos tópicos, vimos um punhado sobre *branches*, e como elas podem ser úteis para trabalhar em
equipe, mas, como que podemos concretizar um projeto usando *branches*, se não sabemos como juntar o
que foi feito em cada uma delas?

Dada essa preocupação, o `git` nos oferece o `git merge` que serve para integrar as alterações feitas em
uma *branch* a outra. Em qualquer "merge" ou mescla, a *branch* que está sendo mesclada é chamada de *
source branch*  e a *branch* que está recebendo as alterações é chamada de *target branch*, e seu uso
consiste em:

* Estando na *target branch*:

  ```terminal
  git merge <source_branch> 
  ```

Mas, nem sempre é tão simples assim, e existem diferentes formas em que o `git` pode realizar essa
mesclagem, as quais impactam diretamente no seu histórico de commits.

### Fast-forward merge

Uma das formas que o `merge` ocorre é *fast-foward*, e a ideia é que a *target branch* vai apenas avançar o seu histórico em relação a *source branch*, por exemplo, imagine o seguinte histórico de commits:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem5.jpeg" width="70%">
<br>

Suponha que a *branch* vermelha (`feature`) cumpriu seu propósito e agora você quer mesclar o que foi feito
nela a linha de desenvolvimento principal (`main`). Pensando de forma lúdica, o `git` realizaria a
mesclagem  apenas descendo essas bolinhas vermelhas e deixando equiparadas com a `main` e avançando o
`HEAD` para o commit mais recente da `feature`. Visualmente, isso ocorre da seguinte maneira:

1. E alinhado a linha de desenvolvimento principal:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem6.jpeg" width="70%">
<br>

2. Os commits da *branch* `feature` são incorporados a `main`, e o `HEAD` avança:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem7.jpeg" width="70%">
<br>

Mas e se a divergência não for assim tão simples e seu histórico estiver análogo a 
[essa figura](#git-branching), seria possível fazer esse avanço?

### Three-way merge

A outra forma que o `git` realiza merges é o *three-way merge*, que acontece quando é impossível alcançar a 
cabeça da *target branch*, seguindo os commits parentes a partir da cabeça da *source branch*, visualmente, 
isso seria:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem8.jpeg" width="70%">
<br>

- Note que, de fato, é impossível alcançar o commit F, a partir do commit E, logo, isso significa que as branches 
divergiram e que o `git` precisará realizar o *three-way merge*.

Para conseguir realizar a mesclagem, o `git` precisa criar um novo commit que tenha como parente os dois 
últimos commits da *source* e *target* branch, de forma que o histórico das duas fiquem acessíveis a partir
da mesma branch.

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem9.jpeg" width="70%">
<br>

E esse processo só ocorre, se alterações feitas em uma branch não interferirem diretamente nas alterações 
feitas na outra, caso contrário, o `git` não conseguirá realizar a mesclagem e você terá que resolver 
cada conflito manualmente, para consolidar o *merge commit*.

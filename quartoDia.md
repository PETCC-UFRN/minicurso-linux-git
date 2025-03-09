---
layout: layoutGit
title: Minicurso de Linux e Git
---


# Git avançado

<div id="sumario" class="sumario-git">
    <h1>Sumário</h1>
    <summary><a href="#git-avancado">Git avançado</a></summary>
    <ul>
      <li>
        <details>
          <summary><a href="#desfazendo-alteracoes">Desfazendo alterações</a></summary>
          <ul>
            <li><a href="#desfazendo-commits-sem-ter-publicado">Desfazendo commits sem ter publicado</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary><a href="#workflow-avancado">Workflow avançado</a></summary>
          <ul>
            <li><a href="#git-branching">Git branching</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary><a href="#git-merging">Git merging</a></summary>
          <ul>
            <li><a href="#fast-forward-merge">Fast-forward merge</a></li>
            <li><a href="#three-way-merge">Three-way merge</a></li>
            <li><a href="#lidando-com-conflitos">Lidando com conflitos</a></li>
          </ul>
        </details>
      </li>
      <li><a href="#projeto-pt1">Projeto pt.1</a></li>
    </ul>
  <button class="toggle-button" id="toggle-button">
  
      Esconder Sumário
  
  </button>
  </div>
## Desfazendo alterações

No [último tópico](/terceiroDia.md), tivemos o nosso primeiro contato com o `git`, e aprendemos a criar
repositórios para nos ajudar a <span class="destaque">rastrear as alterações feitas no nosso projeto localmente e remotamente</span>.
Entretanto, durante o desenvolvimento de um projeto, é comum que ocorram <span class="destaque">erros ou alterações
indesejáveis</span>. Por exemplo, podemos alterar um arquivo sem querer, ou adicionar um arquivo que não deveria
ser adicionado, ou até mesmo fazer um commit com uma mensagem errada.

Além disso, quando ainda estamos desenvolvendo certa maturidade em relação ao uso do `git`, é muito comum
tomar <span class="destaque">medidas extremas</span> para solucionar diferentes tipos de problemas, <span class="destaque">sem de fato usar os meios que a
ferramenta nos oferece </span>. Quem nunca deletou e baixou o repositório novamente para se livrar de
um simples `commit` errado?

Por isso, vamos apresentar algumas formas <span class="destaque">seguras</span> e mais "elegantes" de <span class="destaque">lidar com alguns tipos de
problemas</span> que podem surgir durante o desenvolvimento de um projeto.

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

Porém, imediatamente após fazer o *commit*, você percebe que <span class="destaque">cometeu um erro</span> e que <span class="destaque">o nome do commit</span> na
verdade deveria ser "E" ao invés de "R". E agora, o que fazer?

Revisitando o nosso histórico de commits (podemos fazer isso com o comando `git log --oneline`), urge
a necessidade de <span class="destaque">voltar para o commit anterior</span> e corrigir o nome do commit.

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem2.jpeg" width="70%">
<br>

Para isso, existem algumas possibilidades, dentre as quais:

#### "git reset"

A primeira ideia é usar o comando `git reset`, visto que ele tem a capacidade de <span class="destaque">mover o `HEAD` para um
commit anterior </span>, onde, por padrão, arquivos alterados são preservados mas não ficam na *stagin area*.

Então, para simplesmente voltar para o commit anterior, podemos fazer:

```terminal
git reset HEAD~1
```

aqui, o `~1` indica a <span class="destaque">quantidade de commits</span> que queremos voltar, no caso, 1 commit. Agora, nosso histórico
de commits fica assim:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem3.jpeg" width="70%">
<br>

Note que o commit "R" fica inacessível, mas o arquivo `E` continua presente no nosso diretório de trabalho.
Naturalmente, podemos corrigir o nome do commit e fazer um novo commit:

```terminal
git add E ; git commit -m E
```

Note que também podemos usar o comando `git restore` para restaurar qualquer arquivo que esteja no estado `staged` para fazer alterações antes de commitar novamente.

#### "git commit --amend"

Alternativamente, podemos usar o comando `git commit --amend`, que nos permite alterar o commit mais
recente, inclusive os arquivos que foram adicionados a ele.

```terminal
git commit --amend
```

Será aberto um editor de texto, onde você poderá alterar a mensagem do commit e, após salvar e fechar o
editor, o commit será alterado.

## Workflow avançado

Todas essas funcionalidades que vimos até agora sobre o `git` são muito úteis, mas, até então, só
trabalhamos individualmente em pequenos projetos num ambiente controlado. Nesse sentido, é dada a hora
de finalmente começarmos a apreciar todo o potencial das ferramentas oferecidas pelo `git` para trabalhar
em <span class="destaque">ambientes de coloboração</span>. A primeira dessas ferramentas que vamos explorar são as <span class="destaque">*branches*</span>.

### Git branching

Se você pensar no seu histórico de commits como uma árvore, você pode visualizar *branches* como
ramificações ou galhos dessa árvore. A ideia por trás das *branches* é permitir que você e seus
companheiros de projeto <span class="destaque">trabalhem em diferentes partes do projeto, sem interferir diretamente no trabalho
dos outros</span>.

O uso dessa ferramenta pode variar a depender da necessidade e política de desenvolvimento de cada projeto,
entretanto, uma pratica comum é <span class="destaque">definir uma *branch* principal</span>, geralmente chamada de `master` ou `main`,
e <span class="destaque">a cada nova funcionalidade</span> ou correção de bug, <span class="destaque">criar uma nova *branch* a partir da principal.</span>
Essas *branches* secundárias são o que chamamos de *topic branches* ou *feature branches*, e assim que elas
cumprem o seu propósito, são <span class="destaque">incorporadas na *branch* principal e deletadas.</span>

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem4.jpeg" width="70%">
<br>

- A branch `main` é a linha de desenvolvimento principal, e as branches `feature1` e `feature2` são
ramificações que foram criadas para desenvolver novas funcionalidades.

Como você já deve ter visto, por padrão, o quando usamos o comando `git init`, o programa <span class="destaque">cria
automaticamente uma branch principal</span> chamada de `master`. Uma vez criada, podemos alterar o nome dela
para um nome mais significativo, como `main`, e criar novas branches a partir dela e trabalhar
em novas funcionalidades para o projeto.

- 1) Podemos iniciar o repositório com a branch principal chamada de `main`:

  ```terminal
  git init --initial-branch=main
  ```

- 2) Em seguida, podemos criar uma nova branch a partir dela com o `git branch <nome_da_branch> <branch_base>`:

  ```terminal
  git branch feature-legal main
  ```

- Alternativamente, podemos omitir o nome da *branch* base, e o `git` vai assumir que queremos criar a nova branch <span class="destaque">a partir da qual estamos</span> atualmente.

- 3) Precisamos <span class="destaque"> mudar para a nova branch para começar a trabalhar nela</span>, então usamos o comando `git switch <branch>` (que serve apenas para trocar de branches) ou `git checkout` (mais sobre ele no futuro):

  ```terminal
  git switch feature-legal
  ```

Pronto! Já temos quase tudo que precisamos para trabalhar efetivamente com *branches*, podemos "commitar"
e fazer tudo que já sabemos fazer, mas agora, de forma isolada do restante do projeto, sem correr grandes
riscos. Porém, ainda não sabemos <span class="destaque">como incorporar mudanças feias numa branch</span> e <span class="destaque">como criar branches remotas.</span>

#### Branches locais e remotas

Quando trabalhamos com <span class="destaque">repositórios remotos</span>, é importante saber que existem <span class="destaque">duas referências
à *branch*</span> que estamos trabalhando atualmente: <span class="destaque">uma local e outra remota</span>. Quando criamos uma nova branch,
essa referência remota <span class="destaque">não é criada automaticamente</span>, então, cabe a nós fazer isso manualmente.

Por exemplo, suponha que <span class="destaque">criamos uma nova branch local</span> chamada `feature-legal', fizemos alguns commits nela, e,
então, queremos compartilhar essa branch com colegas de trabalho ou apenas salvar o progresso na nuvem.
Para isso, podemos <span class="destaque">criar a referência remota</span> com o seguinte comando:

```terminal
git push -u origin feature-legal
```

(Se o nome do repositório remoto for `origin`)

## Git merging

Nos últimos tópicos, vimos um punhado sobre *branches*, e como elas podem ser úteis para trabalhar em
equipe, mas, como que podemos concretizar um projeto usando *branches*, se não sabemos <span class="destaque">como juntar o
que foi feito em cada uma delas?</span>

Dada essa preocupação, o `git` nos oferece o `git merge` que serve para <span class="destaque">integrar as alterações feitas em
uma *branch* a outra.</span> Em qualquer "merge" ou "mesclagem", a *branch* que está <span class="destaque">sendo mesclada</span> é chamada de *
source branch* (ou "ramificação fonte", em Português) e a *branch* que está <span class="destaque">recebendo as alterações</span> é chamada
de *target branch* (ou "ramificação alvo"), e seu uso consiste em:

- Estando na *target branch*:

  ```terminal
  git merge <source_branch> 
  ```

Mas, nem sempre é tão simples assim, e existem diferentes formas que o `git` pode realizar essa
mesclagem, as quais impactam diretamente no seu <span class="destaque">histórico de commits.</span>

### Fast-forward merge

Uma das formas que o `merge` ocorre é *fast-foward*, e a ideia é que a *target branch* vai apenas <span class="destaque">avançar o seu histórico</span> em relação a *source branch*, por exemplo, imagine o seguinte histórico de commits:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem5.jpeg" width="70%">
<br>

Suponha que a *branch* vermelha (`feature`) cumpriu seu propósito e agora você quer <span class="destaque"> mesclar o que foi feito
nela a linha de desenvolvimento principal (`main`).</span> Pensando de forma lúdica, o `git` realizaria a
mesclagem  apenas descendo essas bolinhas vermelhas e deixando <span class="destaque"> equiparadas com a `main` </span> e <span class="destaque"> avançando o
`HEAD`</span> para o commit mais recente da `feature`. Visualmente, isso ocorre da seguinte maneira:

1. É alinhado à linha de desenvolvimento principal:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem6.jpeg" width="70%">
<br>

2. Os commits da *branch* `feature` são incorporados a `main`, e o `HEAD` avança:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem7.jpeg" width="70%">
<br>

Mas, e se a divergência não for assim tão simples e seu histórico estiver análogo à figura abaixo, seria possível fazer esse avanço?

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem4.jpeg" width="70%">

### Three-way merge

A outra forma de o `git` realizar merges é o *three-way merge*. Ele acontece quando é <span class="destaque">impossível alcançar a
cabeça da *target branch*</span> seguindo os commits parentes a partir da cabeça da *source branch*. Visualmente,
isso seria:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem8.jpeg" width="70%">
<br>

- Note que, de fato, é impossível alcançar o commit F, a partir do commit E, logo, isso significa que <span class="destaque">as branches
divergiram</span> e que o `git` precisará realizar o *three-way merge*.

Para conseguir realizar a mesclagem, o `git` precisa <span class="destaque">criar um novo commit</span> que tenha como parente os dois
últimos commits da *source* e *target* branch, de forma que o histórico das duas fiquem acessíveis a partir
da mesma branch.

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem9.jpeg" width="70%">
<br>

E esse processo só ocorre se <span class="destaque">alterações feitas em uma branch não interferirem diretamente nas alterações
feitas na outra</span>, caso contrário, o `git` não conseguirá realizar a mesclagem e você terá que <span class="destaque">resolver
cada conflito manualmente</span>, para consolidar o *merge commit*.

### Lidando com conflitos

Para além do *three-way merge* e do `git`, um dos desafios mais clássicos que enfretamos ao <span class="destaque">trabalhar com
projetos e com outras pessoas</span> é a resolução de conflitos. Seja por <span class="destaque">falta de comunicação entre a equipe</span>,
planejamento, erro humano, ou qualquer outra razão, é muito comum que duas ou mais pessoas acabem
trabalhando na mesma parte do projeto ao mesmo tempo e isso resultar em conflitos.

Consequentemente, com o `git` não é diferente, e conflitos ocorrem no momento em que o `git` <span class="destaque">não consegue
mesclar duas branches automaticamente</span> via *three-way merge*. Para resolver o conflito, você precisa
intervir diretamente na parte do arquivo que é conflitante entre as *branches* e decidir o que será mantido.

Portanto, vamos investigar quais são algumas das principais causas de conflitos e como resolvê-los.

#### Alterações no mesmo arquivo

Um conflito no *three-way merge* é dado quando duas ou mais pessoas trabalham <span class="destaque">na mesma parte
de um arquivo</span>, visto que, ao mesclar as alterações, o `git` é incapaz de decidir <span class="destaque">qual versão manter.</span> Dessa
forma, o `git` vai te dizer em qual arquivo houve conflito, e vai decorar o arquivo com <span class="destaque">marcações especiais</span>
para lhe mostrar as diferentes versões de determinadas linhas do arquivo. Essas marcações são:

```terminal
<<<<<<< HEAD
{ Conteúdo da target branch }
=======
{ Conteúdo da source branch* }
>>>>>>> { source branch }
```

Para resolver esse tipo de conflito, voce vai precisar:

- <span class="destaque">Decidir o que manter<span>, editar o arquivo e remover a decoração de conflito.
- Adicionar o arquivo ao *stage* e consolidar o *merge commit*.

#### Estado do repositório local e repositório remoto

Em qualquer projeto que envolva mais de uma pessoa, naturalmente, ocorrerão mudanças recorrentes no
repositório, e sempre alguém vai terminar antes ou depois de outra pessoa. Nesse sentido, tente visualizar
comigo o seguinte cenário:

- Você e seu colega estão trabalhando em duas <span class="destaque">funcionalidades diferentes</span> no mesmo projeto, e o histórico
de commits se parece com isso:

<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem010.jpeg" width="70%">
<br>

- Seu colega terminou antes de você e <span class="destaque">publicou a branch dele remotamente</span>, e já incorporou as alterações
dele na `main`.

  | Sua versão local| Versão remota |
  | -------------- | --------------- |
  | <img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem010.jpeg" width="70%"> |<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem011.jpeg" width="70%"> |

- Você terminou a sua parte e você incorporou as alterações dele na sua branch, e agora você quer publicar
o que foi feito remotamente.

  | Sua versão local| Versão remota |
  | -------------- | --------------- |
  | <img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem012.jpeg" width="70%"> |<img style=" display: block;margin: 0 auto;" src="assets/images/git_dia4_imagem011.jpeg" width="70%">

- Entretanto, o `git` não vai permitir que você publique as alterações remotamente, visto que, o histórico
de commits da sua branch `main` divergiu completamente da versão remota.

Dada a problemática, o que fazer?

O `git` vai te dar a oportunidade de mesclar a sua branch local com a remota via *three-way merge*, para
que você consiga publicar as alterações com sucesso. Mas, note que será criado <span class="destaque">um commit desnecessário
por descuido</span>, além da alta chance de haverem <span class="destaque">conflitos por possíveis alterações no mesmo arquivo.</span>

Num cenário ideal, sempre antes e depois de trabalhar, <span class="destaque">atualize o seu repositório local</span> com os comandos que
já aprendeu, para evitar esse tipo de problema.

#### Divergências significativas

É mais comum do que se imagina, especialmente em equipes grandes ou entre novatos no uso do git, a
criação de <span class="destaque">divergências significativas em uma ou mais branches.</span> Por exemplo, se você está trabalhando em
uma branch feature enquanto seu colega está na main e ambos fazem mudanças significativas que afetam <span class="destaque">o
mesmo arquivo</span>, é provável que não será possível incorporar suas alterações na branch principal sem enfrentar
conflitos.

A causa desse tipo de conflito, é, principalmente, a falta de comunicação e planejamento entre as partes.

#### Prevenindo conflitos

A maioria dos conflitos no `git` não fogem muito do que foi apresentado até agora, então, para previnir
esses tipos de conflitos, alguma práticas são recomendadas:

- <span class="destaque">**Comunique-se constatemente e abertamente com a equipe**</span> sobre quais partes do projeto cada um está trabalhando.

- Faça <span class="destaque">**commits frequentes**</span> e pequenos assim como a
[filosofia do Unix](/primeiroDia.md#filosofia-unix-programas-simples-e-combináveis) sugere para o
desenvolver de software. Isso mantém o repositório atualizado, diminui a chance de conflitos e facilita
revisitar o commit no futuro.

- <span class="destaque">**Mantenha suas branches de *feature* curtas e mescle-as na `main` frequentemente**,</span> pois branches de
longa-duração tendem a se desviar significantemente de outras e criar conflitos.

# Exercícios

### Exercício 1

1. Baixe o arquivo [exercicio1.zip](./assets/downloads/exercicio1.zip)

2. Descompacte o arquivo onde preferir

3. Vá até a pasta `exercicio1/` e tente executar o arquivo `exercicio1.sh` para ver o que acontece.

4. O arquivo está cheio de erros! Sua missão é corrigir o arquivo sem alterá-lo diretamente em um editor de texto, apenas com os conhecimentos que aprendemos hoje em sala. Quando terminar, insira os comandos utilizados num arquivo `resposta.txt` para a submissão do exercício.

### Exercício 2

1. Baixe o arquivo [exercicio2.zip](./assets/downloads/exercicio2.zip)

2. Descompacte o arquivo onde preferir

3. Execute o arquivo `responderpergunta.sh`

4. Explore os *branches* do repositório utilizando os comandos `git branch` para ver os *branches* disponíveis e `git checkout` para navegar entre eles.

5. Após analisar o conteúdo de cada *branch*, utilize os aprendizados da aula de hoje para responder corretamente a pergunta feita pelo arquivo!

6. Insira os comandos utilizados num arquivo .txt para a submissão do exercício.

---
<script>
const dataDia4 = new Date('2025-03-13');
const agora = new Date();

if (agora < dataDia4) {
    document.body.innerHTML = '<h1 style="text-align:center; margin-top:20%;">Página Indisponível</h1>' +
                              '<p style="text-align:center;">Esta página estará disponível a partir de ' + dataDia4.toLocaleDateString() + '.</p>';
}
</script>
{% include petcccopyright.html %}

---
layout: layoutGit
title: Minicurso de Linux e Git
---

[comment]: <> (Essas páginas que estão vazias são porque elas utilizam layouts que já importam o menu de navegação e o menu dos dias. Você pode ver isso na pasta _includes)
[comment]: <> (Sendo assim, basta escrever em markdown mesmo que vai ser tudo estilizado pelos layouts)

# 4ᵒ Dia

## Revisão 

Vamos recapitular os conceitos essenciais:

**Ideia de Versionadores:**
  Os versionadores são sistemas que registram alterações em um arquivo ou conjunto de arquivos ao longo do tempo, permitindo lembrar versões específicas mais tarde.

  Revisão dos tipos de versionadores: sistemas locais, centralizados e distribuídos.

<img src="https://hackmd.io/_uploads/SkYli-6zR.png" width="70%">

**Workflow Básico do Git:**
  Modificação de arquivos na árvore de trabalho.
  Utilização da staging area para preparar alterações.
  Realização de commits para salvar alterações no histórico.
  Uso do `git log` para visualizar o histórico de commits.

  <img src="https://hackmd.io/_uploads/HJKOTMTGC.png" width="70%">


## Workflow um Pouco Mais Avançado (20min)

Nesta parte, vamos explorar conceitos avançados do Git:

### Introduzindo a Ideia de Branches e Colaboração:
  - Branches são ramificações do desenvolvimento que permitem trabalhar em funcionalidades separadamente sem interferir no branch principal (normalmente `master` ou `main`).

  - Vantagens de utilizar branches: isolamento de alterações, experimentação de novas funcionalidades sem afetar o código principal, e paralelismo no desenvolvimento.
  

### Vendo o Git como uma Árvore e Mesclagem:
  - A estrutura de dados do Git pode ser visualizada como uma árvore de commits, onde cada commit registra um snapshot do projeto em um determinado momento.

  - Operações de mesclagem (merge): integração de alterações de um branch para outro, como mesclar uma feature branch de volta ao branch principal.

  - Resolução de conflitos durante a mesclagem: como lidar com situações onde o Git não consegue automaticamente mesclar alterações devido a conflitos no código.
  
## Git branching

Branches são ramificações para criar ramos de desenvolvimento, tipo versões. Nessas ramificações podemos criar diferentes recursos que depois serão mesclados.

![334154431-2eb608f8-a923-4ca5-8f1f-d1f63471febe](https://hackmd.io/_uploads/HJ82XGzBC.png)

Conforme ilustrado na imagem fornecida, os pontos azuis representam uma branch criada especificamente para desenvolver a funcionalidade de chat de um app como o facebook. Esta branch está separada do projeto principal, permitindo que os desenvolvedores trabalhem no novo recurso sem interferir na base de código principal.
Isso nos permite evitar de causar problemas no ramo principal, em quanto estamos desenvolvendo novas funcionalidades.
 
### As vantagens do uso de branchs:

**Isolamento**: Encapsular o desenvolvimento de novos recursos em uma branch separada evita alterações acidentais no projeto principal, garantindo estabilidade e integridade.

**Desenvolvimento Paralelo**: Múltiplos desenvolvedores podem trabalhar em diferentes recursos simultaneamente sem conflitos ou interrupções, aumentando a produtividade e a eficiência.

**Teste e Refinamento**: Novos recursos podem ser testados e refinados minuciosamente dentro da branch antes de serem mesclados na base de código principal, garantindo uma experiência do usuário de alta qualidade.

### Práticas Recomendadas para o Uso de Branches:

**Revisão de Código**: Antes de mesclar uma branch de volta à principal, realizar revisões de código ajuda a garantir a qualidade e a consistência do código.

**Nomenclatura Descritiva**: Usar nomes claros e descritivos para branches facilita a identificação do objetivo de cada ramificação no repositório.

**Eliminar Branches Obsoletas**: Depois de mesclar ou resolver um problema específico, eliminar branches que não são mais necessárias mantém o repositório limpo e organizado.

## Comando para criar uma nova branch
    
    $ git branch teste
    
Este comando criou uma branch chamada 'teste'

## Mudando de branch 

Observe que o comando *git branch* apenas criou uma nova branch.
    Para mudar de branch, devemos executar o comando
    
    $ git checkout teste
    

## Git merging

### Ramificação e mesclagem simples

Primeiramente, digamos que você esteja trabalhando em seu projeto e já tenha alguns commits na branch principal (geralmente chamada de `master`).

Você decidiu que vai trabalhar na criação de uma nova funcionalidade de chat para o site.

Para criar uma nova branch e mudar para ela ao mesmo tempo, você pode executar o comando `git checkout` com a opção `-b`:

```bash
$ git checkout -b chat-feature
Switched to a new branch "chat-feature"
```

Isso é equivalente a:

```bash
$ git branch chat-feature
$ git checkout chat-feature
```

Ao fazer isso, você cria e muda para a nova branch `chat-feature` onde começará a trabalhar na funcionalidade de chat.

```bash
$ echo "Chat feature versão 1" > chat.txt
$ git add chat.txt
$ git commit -m 'Create basic chat feature file'
```

Porém, um problema importante surgiu e precisamos corrigi-lo imediatamente. Vamos voltar para a branch `master` e criar uma nova branch a partir dela para fazer essa correção.

Antes de mudar de branch, é importante garantir que seu trabalho atual esteja salvo (commitado), pois o Git não permite mudar de branch se houver mudanças não salvas que possam conflitar.

Agora podemos mudar para a branch `master`:

```bash
$ git checkout master
Switched to branch 'master'
```

Neste ponto, o projeto estará exatamente como estava antes de você começar a trabalhar na funcionalidade de chat. Agora podemos nos concentrar na correção urgente.

Vamos criar uma branch chamada `hotfix` para trabalhar na correção:

```bash
$ git checkout -b hotfix
Switched to a new branch 'hotfix'
```

Depois de corrigir o problema, vamos fazer o commit:

```bash
$ echo "Fix critical bug" > bugfix.txt
$ git add bugfix.txt
$ git commit -m 'Fix critical bug'
[hotfix 1fb7853] Fix critical bug
1 file changed, 1 insertion(+)
```

Agora, você pode testar e garantir que a correção está correta. Em seguida, vamos mesclar a branch `hotfix` de volta para a branch `master`:

```bash
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
bugfix.txt | 1 +
1 file changed, 1 insertion(+)
```

A expressão “fast-forward” significa que a mesclagem foi simples e direta, sem conflitos. O Git apenas moveu a linha do tempo para incluir as mudanças da branch `hotfix`.

Após a mesclagem, podemos deletar a branch `hotfix` pois não é mais necessária:

```bash
$ git branch -d hotfix
Deleted branch hotfix (3a0874c).
```

Agora podemos voltar para a branch `chat-feature` e continuar trabalhando na funcionalidade de chat:

```bash
$ git checkout chat-feature
Switched to branch "chat-feature"
$ echo "Chat feature finalizado" >> chat.txt
$ git add chat.txt
$ git commit -m 'Terminei o chat feature'
[chat-feature ad82d7a] Finish chat feature
1 file changed, 1 insertion(+)
```

Se precisar das mudanças da correção (`hotfix`) na sua branch `chat-feature`, você pode mesclar a branch `master` na `chat-feature` com:

```bash
$ git merge master
```

### Outra forma de mesclagem

Quando terminar o trabalho na funcionalidade de chat e estiver pronto para mesclar de volta para a branch `master`, você pode fazer o merge da mesma forma que fez com `hotfix`:

```bash
$ git checkout master
Switched to branch 'master'
$ git merge chat-feature
Merge made by the 'recursive' strategy.
chat.txt |    1 +
1 file changed, 1 insertion(+)
```

Este tipo de mesclagem é diferente porque as duas branches (`master` e `chat-feature`) têm históricos diferentes. O Git faz uma mesclagem de três vias, usando o último commit comum entre as duas branches e os commits mais recentes de cada uma para criar um novo commit que une as mudanças.

Depois da mesclagem, você pode excluir a branch `chat-feature`:


$ git branch -d chat-feature


### Conflitos básicos de mesclagem

Às vezes, o processo de mesclagem não ocorre sem problemas. Se você alterou a mesma parte de um arquivo em duas branches diferentes, o Git não conseguirá mesclar automaticamente. Isso gera um conflito de mesclagem:

```bash
$ git merge chat-feature
Auto-merging chat.txt
CONFLICT (content): Merge conflict in chat.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Para resolver o conflito, abra o arquivo e veja as partes conflitantes:

```plaintext
<<<<<<< HEAD
Chat feature finalizado
=======
Chat feature versão 1
>>>>>>> chat-feature
```

Edite o arquivo para resolver o conflito e salve as mudanças. Depois, adicione o arquivo ao stage:

```bash
$ git add chat.txt
```

Quando todos os conflitos forem resolvidos, finalize a mesclagem com um commit:

```bash
$ git commit
```

Se você acha que seria útil para outras pessoas olhar para este merge no futuro, você pode modificar esta mensagem de confirmação com detalhes sobre como você resolveu o conflito e explicar por que você fez as mudanças que você fez se elas não forem óbvias.


## Git rebasing
O Git Rebase é uma ferramenta poderosa do Git que permite reescrever o histórico de commits de um branch, trazendo-os para a ponta de outro branch. Isso pode ajudar a manter um histórico de commits mais linear e fácil de ler.

Ao utilizar o Git Rebase, você pode "mover" um branch para o topo de outro, reescrevendo o histórico no processo. Isso significa que todos os commits únicos do branch que está sendo rebased são adicionados ao topo do branch de base, criando essencialmente cópias desses commits. O resultado é um histórico de commits mais linear, o que facilita o review de código e a resolução de problemas.


### Merging vs Rebasing

#### Merging:
**Utilização**: Ideal para integração de branches independentes.

**Resultado**: Cria um novo commit de merge, preservando o histórico original de commits de cada branch.

**Vantagem**: Conserva a linha do tempo original do desenvolvimento.

#### Rebasing:
**Utilização**: Útil para manter um histórico linear e limpo do projeto.

**Resultado**: Reescreve o histórico de commits da branch atual, aplicando os commits de outra branch no topo dela.

**Vantagem**: Produz um histórico mais limpo e fácil de entender, pois elimina commits de merge.


```bash
$ git checkout feature-branch
$ git rebase master
```


### Exercicio 3

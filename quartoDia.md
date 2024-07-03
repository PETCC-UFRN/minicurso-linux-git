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

  - Operações de mesclagem (merge): integração de alterações de um branch para outro, como mesclar a funcionalidade chat que foi feita em uma branch de volta ao branch principal, me seria o local central onde está o nosso projeto.

## Git branching

Branches são ramificações para criar ramos de desenvolvimento, tipo versões. Nessas ramificações podemos criar diferentes recursos que depois serão mesclados.

<img style=" display: block;margin: 0 auto;" src="https://hackmd.io/_uploads/HJ82XGzBC.png" width="70%">

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
```sh   
    $ git branch primeirodia
```
Este comando criou uma branch chamada 'primeirodia'

## Mudando de branch 

Observe que o comando *git branch* apenas criou uma nova branch.
    Para mudar de branch, devemos executar o comando
```sh  
    $ git checkout primeirodia
```  

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
$ echo "código do chat versão 1" > chat.txt
$ git add chat.txt
$ git commit -m 'Criei a versão 1 do chat'
```

Porém, um problema importante surgiu e precisamos corrigi-lo imediatamente. Vamos voltar para a branch `master` e criar uma nova branch a partir dela para fazer essa correção.

Antes de mudar de branch, é importante garantir que seu trabalho atual esteja salvo (commitado), pois o Git não permite mudar de branch se houver mudanças não salvas que possam conflitar.

Agora podemos mudar para a branch `master`:

```bash
$ git checkout master
Switched to branch 'master'
```

Neste ponto, o projeto estará exatamente como estava antes de você começar a trabalhar na funcionalidade de chat. Agora podemos nos concentrar na correção urgente.

Vamos criar uma branch chamada `correcao-chat` para trabalhar na correção:

```bash
$ git checkout -b correcao-chat
Switched to a new branch 'correcao-chat'
```

Depois de corrigir o problema, vamos fazer o commit:

```bash
$ echo "Corrigir bug crítico" > correcaobug.txt
$ git add correcaobug.txt
$ git commit -m 'Corrigir bug crítico'
[correcao-chat 1fb7853] Corrigir bug crítico
1 file changed, 1 insertion(+)
```

Agora, você pode testar e garantir que a correção está correta. Em seguida, vamos mesclar a branch `correcao-chat` de volta para a branch `master`:

```bash
$ git checkout master
$ git merge correcao-chat
Updating f42c576..3a0874c
Fast-forward
correcaobug.txt | 1 +
1 file changed, 1 insertion(+)
```

A expressão “fast-forward” significa que a mesclagem foi simples e direta, sem conflitos. O Git apenas moveu a linha do tempo para incluir as mudanças da branch `correcao-chat`.

Após a mesclagem, podemos deletar a branch `correcao-chat` pois não é mais necessária:

```bash
$ git branch -d correcao-chat
Deleted branch correcao-chat (3a0874c).
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

Se precisar das mudanças da correção (`correcao-chat`) na sua branch `chat-feature`, você pode mesclar a branch `master` na `chat-feature` com:

```bash
$ git merge master
```

### Outra forma de mesclagem

Quando terminar o trabalho na funcionalidade de chat e estiver pronto para mesclar de volta para a branch `master`, você pode fazer o merge da mesma forma que fez com `correcao-chat`:

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

```bash
$ git branch -d chat-feature
```

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


### Exercicio 3

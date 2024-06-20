---
layout: licoes
title: Minicurso de Linux e Git
---

[comment]: <> (Essas páginas que estão vazias são porque elas utilizam layouts que já importam o menu de navegação e o menu dos dias. Você pode ver isso na pasta _includes)
[comment]: <> (Sendo assim, basta escrever em markdown mesmo que vai ser tudo estilizado pelos layouts)


# Sumário

[TOC]

# Versionadores

### O que são e por que surgiram? 
- São sistemas que registram alterações em um arquivo ou conjunto de arquivos ao longo do tempo para que você possa lembrar versões específicas mais tarde.

- Surgiram devido a necessidade do aumento da eficiência, do aumento do número de colaboradores e do gerenciamento de projetos de software moderno.

![Captura de tela 2024-06-04 094408](https://hackmd.io/_uploads/ryblu7zSR.png)

### Tipos de Versionadores

Sistemas de controle de versão podem ser: **locais**, **centralizados** ou **distribuídos**.

- Sistemas **locais** de controle de versão tem um banco de dados simples que mantêm todas as alterações nos arquivos sob controle de versão.

    ![Captura de tela 2024-06-04 101220](https://hackmd.io/_uploads/SJv-sbGHA.png)

- Sistemas **centralizados** de controle de versão têm um **único servidor** que contém todos os arquivos de controle de versão, e um número de clientes que usam arquivos a partir desse lugar central. Por muitos anos, este foi o padrão para controle de versão. Um **defeito grave** desses versionadores é que se o servidor der problema por uma hora, durante essa hora ninguém pode colaborar ou salvar as alterações de versão para o que quer que eles estejam trabalhando. 


    - Os primerios Modelos surgiram descentralizados
    - Necessidade de estar conectado ao servidor central
    - Para equiper pequenas
    - Mais simples de Utilizar
    - Wikipédia se utiliza desse modelo

![Captura de tela 2024-06-11 092630](https://hackmd.io/_uploads/By_qMTBHR.png)



![Captura de tela 2024-06-04 101557](https://hackmd.io/_uploads/HJUGsZzB0.png)

- Já em sistemas **distribuídos** de controle de versão, os clientes não somente usam o estado mais recente dos arquivos, mas também duplicam localmente o repositório completo. Cada clone é um backup completo de todos os dados.
![descentralizado](https://hackmd.io/_uploads/SJpghZzrA.png)
Nesse curso estudaremos um dos sistemas de versionamento mais usados do mundo: o Git.

    - Escalabilidade
    - Não depende de um servidor central
    - Maior eficiência
    - Maior segurança a ataques 

![Captura de tela 2024-06-11 092957](https://hackmd.io/_uploads/S12LXpBHA.png)

![upscayledImage](https://hackmd.io/_uploads/ry_kclLHA.png)

# História do Git:
### Como surgiu?

Como vimos durante o curso, Linux kernel é um projeto de software livre de grande prote. Durante os anos iniciais de criação e manutenção desse sistema, mudanças do software eram feitas a partir do envio de arquivos entre os desenvolvedores e, um tempo depois, passaram a serem feitas usando o versionador BitKeeper.
    
Na época em que o BitKeeper passou a ser pago, a comunidade Linux (em especial, Linus Torvalds) passou a desenvolver sua própria ferramenta baseada em lições que haviam aprendido durante os anos usando o BitKeeper. Esses eram alguns dos objetivos do sistema:
- Velocidade
- Design simples
- Forte suporte para o desenvolvimento não linear (milhares de branches paralelas)
- Altamente distribuído
- Ter a capacidade de lidar com grandes projetos como o Linux kernel de forma eficiente
### De onde vem o nome "Git"?
Git é uma gíria britânica para "pessoa desagradável".
   
Linus Torvalds disse sarcasticamente em uma entrevista: "eu sou um egoísta e nomeio todos os meus projetos em minha homenagem. Primeiro 'Linux' e agora 'git'".
    
Se você estiver de bom humor, pode significar 'Global Information Tracker'.
    
Vejam o manual do git usando o terminal ('man git').



### Git como um versionador
![descentralizado](https://hackmd.io/_uploads/SJpghZzrA.png)


1.   Open Source
2.   Trabalho em equipe
3.   Desenvolvimento de softwares de todos os tipos
4.   O mais utilizado atualmente


- Como o Git funciona?
Sabemos que o Git é um versionador, ou seja, é uma ferramenta que tem a finalidade de gerenciar diferentes versões no desenvolvimento de um arquivo ou conjunto de arquivos.
    - Com o Git, sempre que você salta o estado do projeto, é "tirada uma foto" de como os arquivos estavam naquele momento e salva uma referência a esse snapshot. Por eficiência, se um arquivo não foi modificado, ele não o salva o arquivo novamente, mas apenas um "link" para a versão anterior que já está salva.
    
![image](https://hackmd.io/_uploads/SkYli-6zR.png)
    
- Quase todas as operações são locais
    -Com o Git, todo o histórico do projeto é armazenado localmente, fazendo com que as operações sejam quase intantâneas. Comparar versões antigas do seu projeto pode ser feito localmente sem a necessidade de interagir com o servidor remoto.

- O Git, no geral, apenas **adiciona** informações
    -É difícil fazer com que o sistema apague dados ou faça algo irreversível, principalmente se você der pushes regulares do seu trabalho(enviar as suas alterações para o servidor remoto constantemente).

# Github & Shell
### Introdução a plataformas de hospedagem remota
-  Git Lab, Codeberg e BitBucket

 - ![Design sem nome](https://hackmd.io/_uploads/rJ9yYGwH0.png)
 
 - O que eles têm em comum? 
     - Todos são plataformas onde é possível hospedar repositórios. 

### Github
- Hospedagem de Repositórios
- Se utiliza do git para fazer o controle de versão dos respositórios hospedados
- Comunidade ativa
- Vários outros serviços
- Um dos maiores repositórios de projetos open source do mundo

Github é a maior plataforma de hospedagem para repositórios Git, além de ser o ponto central de colaboração para milhões de desenvolvedores.
Grande parte dos repositórios Git estão hospedados no Github e muitos projetos de código aberto o usam para hospedagem, monitoramento de problemas e tarefas, revisão de código etc.

> O git e o github são a mesma coisa? 
>> Não, Github e similares como GitLab e Bitbucket, são provedores que utilizam o git, fornecendo uma interface visual, além de armazenamento na nuvem para os projetos.


### Chave SSH 

-  **Para que serve a chave SSH?**

    As chaves SSH (Secure Shell) são utilizadas para autenticar conexões seguras entre computadores, permitindo uma comunicação criptografada. Elas substituem a necessidade de senhas tradicionais, proporcionando uma maneira mais segura e conveniente de acessar sistemas remotos e serviços, como repositórios Git.

    Ao configurar uma chave SSH, você cria um par de chaves: uma chave privada, que deve ser mantida em segredo no seu computador, e uma chave pública, que é adicionada ao servidor ou serviço remoto. Quando uma conexão é iniciada, o servidor usa a chave pública para verificar a identidade do usuário, sem que a chave privada precise ser transmitida pela rede, garantindo assim a segurança.

    No contexto do Git, a autenticação via chave SSH é especialmente útil ao interagir com repositórios remotos hospedados em plataformas como GitHub, GitLab e Bitbucket. Essas plataformas suportam autenticação por chave SSH, permitindo que os desenvolvedores enviem (push) e busquem (pull) alterações de forma segura, sem precisar digitar senhas repetidamente.


# Um pouco mais sobre Git
### Como ele lida com informações



### Workflow básico
1) Você **modifica arquivos** na sua árvore de trabalho
2) Você **seleciona apenas as mudanças que você quer** que façam parte do seu próximo commit, e apenas essas mudanças serão adicionadas à staging area
3) Você **faz um commit**: os arquivos como eles estão na staging area são armazenados em forma de snapshot permanentemente no seu diretório  Git.

    ![image](https://hackmd.io/_uploads/HJKOTMTGC.png)

Assim, podemos perceber que um arquivo pode estar em um dos 3 estados:
* modified
* staged
* commited


### Lidando com repositórios
No final desta sessão, você será capaz de **configurar** e **inicializar** um repositório, iniciar e interromper o **rastreamento de arquivos**, usar a **área de stage** e realizar **commits** das alterações. 

Também mostraremos como configurar o Git para ignorar certos arquivos e padrões de arquivo,como desfazer erros de maneira rápida e fácil, como navegar no histórico do seu projeto e visualizar alterações entre commits e como fazer push e pull em repositórios remotos.

- **Obtendo um repositório Git**

Você pode obter um repositório de duas formas principais:
    1) Pegando um diretório local que não está sob controle de versão e transaformando-o em um repositório
    2) Fazendo um clone de um repositório Git existente em outro lugar
    
Por enquanto, vamos lidar apenas com repositórios locais.

**Inicializando um repositório em um diretório existente:**

```
 cd new_repository
 git init
```

Agora, temos um subdiretório chamado .git que contém todos os arquivos necessários de seu repositório – um esqueleto de repositório Git. Nada em seu projeto é monitorado ainda.
![Captura de tela 2024-06-11 094114](https://hackmd.io/_uploads/BJL-L6rHA.png)

> Quando fazemos o comando git init no local/diretório onde queremos criar um repositório, uma pasta oculta é criada chamada".git", que vai ter as configurações necessárias para o monitoramento do git naquele diretório.

![Captura de tela 2024-06-11 094203](https://hackmd.io/_uploads/SyhQUaSB0.png)

-  **Gravando alterações em seu repositório**

Cada arquivo em seu repsitório pode estar em um dos seguintes estados: rastreado e não-rastreado. Arquivos rastreados são arquivos que foram incluídos no último snapshot; eles podem ser não modificados, modificados ou preparados (adicionados ao stage). Em resumo, arquivos rastreados são os arquivos que o Git conhece.

Quando você clona um repositório pela primeira vez, todos os seus arquivos serão rastreados e não modificados já, que o Git acabou de obtê-los e você ainda não editou nada.

Assim que você edita alguns arquivos, Git os considera modificados, porque você os editou desde o seu último commit. Você prepara os arquivos editados e então faz commit das suas alterações, e o ciclo se repete.

![image](https://hackmd.io/_uploads/SJWWiARzC.png)

<!-- Aqui será feito o primeiro repositório remoto seguindo os passos do github -->

# Lidando com o git

### Verificando os status de seus arquivos

A principal ferramenta que você vai usar para determinar quais arquivos estão em qual estado é o comando git status.

    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working directory clean

Digamos que você adiciona um novo arquivo no seu projeto, um simples arquivo README. Se o arquivo não existia antes, e você executar git status, você verá seu arquivo não rastreado da seguinte forma:

    $ echo 'My Project' > README
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Untracked files:
      (use "git add <file>..." to include in what will be committed)

        README

    nothing added to commit but untracked files present (use "git add" to track)

Nós queremos incluir esse arquivo README, então vamos rastreá-lo.

### Rastreando arquivos novos
Para começar a rastrear um novo arquivo, você deve usar o comando git add

    $ git add README
    
Executando o comando status novamente, você pode ver que seu README agora está sendo rastreado e preparado (staged) para o commit:

    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   README
        
É possível saber que o arquivo está preparado porque ele aparece sob o título “Changes to be committed”. Se você fizer um commit neste momento, a versão do arquivo que existia no instante em que você executou git add, é a que será armazenada no histórico de snapshots.

### Preparando Arquivos Modificados (Adicionando arquivos modificados à staging area)

Vamos modificar um arquivo que já está sendo rastreado.

Se modificarmos o CONTRIBUTING.md que já era rastreado, e executarmos o `git status`, teremos isso:

    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   README

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   CONTRIBUTING.md
        
Isso significa que o arquivo rastreado foi modificado no diretório mas ainda não foi mandado para o stage (preparado).

Para isso, vamos usar o `git add`.

Pode ser útil pensar nesse comando mais como “adicione este conteúdo ao próximo commit”.

    $ git add CONTRIBUTING.md
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   README
        modified:   CONTRIBUTING.md
        
:::info
Ao mesmo tempo que a saída do git status é bem completa, ela também é bastante verbosa. O Git também tem uma flag para status compacto.

    $ git status -s
     M README
    MM Rakefile
    A  lib/git.rb
    M  lib/simplegit.rb
    ?? LICENSE.txt
:::

### Fazendo commit das suas alterações
Agora que a área de stage está preparada, podemos fazer commit nas alterações.

O jeito mais simples de fazer commit é digitar o seguinte comando:

    $ git commit

e adicionar uma mensagem no editor de texto.

Alternativamente, podemos fazer:

    $ git commit -m "mensagem"
    
Lembre-se de que o commit grava o snapshot que você deixou na área de stage. Qualquer alteração que você não tiver mandado para o stage permanecerá como estava, em seu lugar; você pode executar outro commit para adicioná-la ao seu histórico. Toda vez que você executa um commit, você está gravando um snapshot do seu projeto que você pode usar posteriormente para fazer comparações, ou mesmo restaurá-lo.

###  Como ver todos os commit feitos? - O comando git log

É um comando feito para exibir os históricos de commits do projeto.

Aparece nome, hora, data e a mensagem relacionada a cada commit.
![Captura de tela 2024-06-08 164219](https://hackmd.io/_uploads/ByYVV4MHC.png)
> Dica: para sair da tela é só digitar "q"

- **Uma flag eficiente**
 
    ```
    $git log --oneline
    ``` 
    
![Captura de tela 2024-06-08 164718](https://hackmd.io/_uploads/BJJOrVGSR.png)

Essa flag apresenta os commits feitos de uma forma bem mais simples: apresenta o código referente ao commit e a respectiva mensagem.

### Subindo auterações para o repositório remoto `git push`

Se você tem um commit pronto e quer adiciona-lo ao repositório remoto, podemos fazer:

    $ git push 
    
Fazendo o git push os seus commits irão subir para o seu repositório remoto.



<!--Primeiro exercício usando git commit-->

### Visualizando commits anteriores
- Git checkout <endereço do commit> 
    
Ao utilizar `git checkout` você consegue visualizar como estavam os seus arquivos para um commit específico.
    ![Captura de tela 2024-06-11 101121](https://hackmd.io/_uploads/BJ7zaaHSR.png)
    
- Note que agora quando fazemos o comando git log --oneline ele mosta apenas os commits anteriores ao escolhido para visualizar.
    
- Não perdemos as outras alterações, apenas voltamos no tempo para ver como estava o nosso projeto naquele commit em específico.
    
![Captura de tela 2024-06-11 101214](https://hackmd.io/_uploads/HyjraprHR.png)

- Para voltar ao commit de onde paramos, precisamos fazer o commando `git  checkout <nomedabranch>`, como feito na imagem abaixo.
    
![Captura de tela 2024-06-11 101719](https://hackmd.io/_uploads/HyJFCprBA.png)

## 3ᵒ Dia (Linux & Git)

- **Revisão geral** (10min)
    > - Linux & Unix
    
> **10min**
> 
---
### Git

- **Versionadores** (15min)
    > - Contextualização com a história do Linux e importância.
    > - O que são?
    > - Centralizado vs Descentralizado. -- Aqui vem a primeira ideia do que é um repositório e uma plataforma de hospedagem.

> **35min**

- **Introdução ao Git** (10min)
    > - Surgimento do Git.
    > - De onde veio o nome?
    > - Git como um(o) versionador.

> **45min**

---
### Github & Shell

- **Introdução a plataformas de hospedagem remota** (10min)
    > - Gancho com a parte de versionadores.
    > - Algumas diferentes plataformas: GitLab, BitBucket, Codeberg.
    > - Git e Github : diferenças.

> **55min**

- **Criação da conta no Github** (20min)

> **1h15min**

- **Chave SSH** (15min)
    > - Se conectando  remotamente a outra máquina.
    > - Criaçao da chave SSH, em conjunto com os alunos.
    > - Usando a chave para se conectar ao Github.

> **1h30min**

---

### Git & Github

- **Um pouco mais sobre Git** (10min)
    > - Como ele lida com informações.
    > - Workflow básico (téorico, sem incluir branches).

> **1h40min**

- **Criando o primeiro repositório** (15min)
    > - Criando o reposítorio remoto no github.
    > - Seguindo os passos dados pelo github.
    >   - `init, remote add, add, commit, push`.

> **1h55min**

---
### Git

- **Lidando com o git** (30min)
    > - Verificando o status dos arquivos `git status`.
    > - Entendendo o staging area.
    > - Rastreando arquivos novos e modificados `git add`.
    > - Fazendo o **commit** do que foi feito `git commit`.
    > - Como ver todos os commit feitos com `git log`
    > - Subindo auterações para o repositório remoto `git push`

> **2h25min**

- [**Git#1**](https://hackmd.io/K-KTS27ITaOj5rhVWp66zg?view#Exerc%C3%ADcio-11) (20min) 
    > - Exercício utilizando `git status`, `git commit`, `git add`, `git log` e`git push` 
    > - Tempo para os alunos resolverem **(20min)**
    > - Resolução **(10min)**



- **Desfazendo coisas (20 min)**
    > - Ajustando commits
    > - Retirando um arquivo do stage
    > - Desfazendo modificações em um arquivo
    
> **2h45min**    

- **Lanche** (20min)
     
- [**Git#1-2**](https://hackmd.io/K-KTS27ITaOj5rhVWp66zg?both#Exerc%C3%ADcio-11) (20min) 
    > - Tempo para os alunos resolverem **(20min)**
    > - Resolução **(10min)**
     
> **3h45min**

---

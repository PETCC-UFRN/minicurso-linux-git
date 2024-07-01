---
layout: layoutGit
title: Minicurso de Linux e Git
---

[comment]: <> (Essas páginas que estão vazias são porque elas utilizam layouts que já importam o menu de navegação e o menu dos dias. Você pode ver isso na pasta _includes)
[comment]: <> (Sendo assim, basta escrever em markdown mesmo que vai ser tudo estilizado pelos layouts)


# 3ᵒ Dia 

## Versionadores e Git: Fundamentos e Conceitos

### Introdução aos Versionadores
#### Contextualização com a história do Linux
A criação do Linux foi um marco importante na história do desenvolvimento de software, principalmente por sua natureza colaborativa e open-source. Linus Torvalds, o criador do Linux, enfrentou desafios significativos ao coordenar as contribuições de inúmeros desenvolvedores ao redor do mundo. Para gerenciar essas contribuições e manter a integridade do código, Torvalds desenvolveu o Git, um sistema de controle de versão distribuído. Essa necessidade de um sistema robusto e eficiente de versionamento deu origem a ferramentas que são agora essenciais no desenvolvimento de software moderno.

#### O que são Versionadores?

Versionadores são sistemas que registram alterações em um arquivo ou conjunto de arquivos ao longo do tempo, permitindo lembrar versões específicas mais tarde. Surgiram devido à necessidade de aumentar a eficiência, gerenciar um número maior de colaboradores e projetos de software moderno.

<img src="https://hackmd.io/_uploads/ryblu7zSR.png" width="70%">

#### Tipos de Versionadores

##### 1. Sistemas Locais

Utilizam um banco de dados simples para manter todas as alterações nos arquivos sob controle de versão.

<img src="https://hackmd.io/_uploads/SJv-sbGHA.png" width="70%">

##### 2. Sistemas Centralizados

Têm um único servidor que contém todos os arquivos de controle de versão e um número de clientes que usam esses arquivos a partir desse lugar central.
Desvantagens incluem a necessidade de estar sempre conectado ao servidor e a paralisação em caso de falha do servidor.
<img src="https://hackmd.io/_uploads/By_qMTBHR.png" width="70%">

**Vantagens dos Sistemas Centralizados**

Simples de utilizar, ideal para equipes pequenas.

Utilizados por plataformas como a Wikipédia.

<img src="https://hackmd.io/_uploads/HJUGsZzB0.png" width="70%">


##### 3. Sistemas Distribuídos

Cada cliente possui uma cópia completa do repositório, funcionando como um backup completo de todos os dados.

Não dependem de um servidor central, oferecendo maior eficiência e segurança contra ataques.

<img src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

**Vantagens dos Sistemas Distribuídos**

**Escalabilidade:** Suporta um grande número de colaboradores.

**Independência:** Não depende de um servidor central.

**Eficiência:** Processos mais rápidos e eficientes.

**Segurança:** Maior proteção contra falhas e ataques.

<img src="https://hackmd.io/_uploads/S12LXpBHA.png" width="70%">

## Introdução ao Git

### Surgimento do Git

A história do Git está profundamente ligada ao desenvolvimento do Linux Kernel, um dos projetos de software livre mais importantes e complexos do mundo. Durante os anos iniciais, as mudanças no kernel do Linux eram gerenciadas através do envio de arquivos entre desenvolvedores. Posteriormente, passou-se a usar o versionador BitKeeper. No entanto, quando o BitKeeper se tornou pago, a comunidade Linux, liderada por Linus Torvalds, decidiu criar uma nova ferramenta de versionamento, aprendendo com as lições adquiridas durante o uso do BitKeeper.

Os objetivos principais para o novo sistema incluíam:

**Velocidade**

**Design simples**

**Forte suporte para o desenvolvimento não linear** (milhares de branches paralelas)

**Alta distribuição**

**Capacidade de lidar com grandes projetos** como o kernel do Linux de forma eficiente

### De onde vem o nome "Git"?

O nome "Git" tem uma origem curiosa. Em uma entrevista, Linus Torvalds explicou sarcasticamente que ele nomeia todos os seus projetos em sua homenagem, sendo "Linux" o primeiro e "git" o segundo. Na gíria britânica, "git" significa "pessoa desagradável". Além disso, há uma interpretação alternativa em que "Git" pode significar "Global Information Tracker" quando você estiver de bom humor. Para mais detalhes, você pode consultar o manual do Git no terminal usando o comando `man git`.

### Git como um Versionador
<img src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

O Git é um dos sistemas de controle de versão mais utilizados no mundo, conhecido por ser:

1. **Open Source**
2. **Ideal para trabalho em equipe**
3. **Adequado para o desenvolvimento de todos os tipos de software**
4. **O versionador mais utilizado atualmente**

### Como o Git Funciona?

O Git é uma ferramenta de versionamento que gerencia diferentes versões de um arquivo ou conjunto de arquivos. Sempre que você salva o estado do projeto, o Git "tira uma foto" dos arquivos naquele momento e salva uma referência a esse snapshot. Por eficiência, se um arquivo não foi modificado, o Git não o salva novamente, mas cria um "link" para a versão anterior que já está salva.

<img src="https://hackmd.io/_uploads/SkYli-6zR.png" width="70%">

O Git, em geral, apenas **adiciona** informações. É difícil que o sistema apague dados ou faça algo irreversível, especialmente se você enviar suas alterações para o servidor remoto regularmente (push). Esse comportamento garante a integridade e a segurança do histórico do projeto.


## Hospedagem Remota e Conexões SSH

### Introdução a plataformas de hospedagem remota 
#### Gancho com a parte de versionadores
A utilização de versionadores como o Git se torna ainda mais poderosa quando combinada com plataformas de hospedagem remota. 

Essas plataformas permitem que você armazene, compartilhe e colabore em projetos de software com desenvolvedores de todo o mundo. Elas não só armazenam o código, mas também oferecem ferramentas para gerenciamento de projetos, integração contínua, e muito mais.

#### Algumas diferentes plataformas: GitLab, BitBucket, Codeberg.
Existem várias plataformas de hospedagem remota que suportam Git, cada uma com suas características únicas.

**GitLab**

**BitBucket**

**Codeberg**

#### Git e Github : diferenças.
Embora Git e GitHub sejam frequentemente mencionados juntos, eles não são a mesma coisa. Aqui estão as principais diferenças:

- **Git**
    - Git é um sistema de controle de versão distribuído.
    - Ferramenta de linha de comando utilizada para gerenciar o histórico de versões de arquivos.
    - Funciona localmente, independentemente de uma plataforma de hospedagem remota.

- **GitHub**
    - Hospedagem de Repositórios
    - Se utiliza do git para fazer o controle de versão dos respositórios hospedados
    - Comunidade ativa
    - Vários outros serviços
    - Um dos maiores repositórios de projetos open source do mundo

### Chave SSH

#### Para que serve a chave SSH?

As chaves SSH (Secure Shell) são utilizadas para autenticar conexões seguras entre computadores, permitindo uma comunicação criptografada. Elas substituem a necessidade de senhas tradicionais, proporcionando uma maneira mais segura e conveniente de acessar sistemas remotos e serviços, como repositórios Git.

Ao configurar uma chave SSH, você cria um par de chaves: uma chave privada, que deve ser mantida em segredo no seu computador, e uma chave pública, que é adicionada ao servidor ou serviço remoto. Quando uma conexão é iniciada, o servidor usa a chave pública para verificar a identidade do usuário, sem que a chave privada precise ser transmitida pela rede, garantindo assim a segurança.

No contexto do Git, a autenticação via chave SSH é especialmente útil ao interagir com repositórios remotos hospedados em plataformas como GitHub, GitLab e Bitbucket. Essas plataformas suportam autenticação por chave SSH, permitindo que os desenvolvedores enviem (push) e busquem (pull) alterações de forma segura, sem precisar digitar senhas repetidamente.

## Workflow e primeiro repositório

### Um pouco mais sobre Git

O Git é um sistema de controle de versão distribuído que gerencia informações armazenando cada versão do projeto como um snapshot completo, em vez de apenas as diferenças entre versões. Ele utiliza uma estrutura de objetos que inclui blobs (conteúdo de arquivos), trees (diretórios), commits (mudanças com metadados) e tags (marcadores de versão). Cada objeto é identificado por um hash SHA-1, garantindo a integridade dos dados. Git permite a criação de branches para desenvolvimento paralelo e merges para combinar mudanças. As modificações são preparadas na staging area antes de serem commitadas. Com funcionalidades robustas de colaboração e resolução de conflitos, Git suporta operações offline e sincronização com repositórios remotos através de comandos como push e pull, facilitando o trabalho simultâneo de múltiplos desenvolvedores.

#### Workflow básico

1) Você **modifica arquivos** na sua árvore de trabalho

2) Você **seleciona apenas as mudanças que você quer** que façam parte do seu próximo commit, e apenas essas mudanças serão adicionadas à staging area

3) Você **faz um commit**: os arquivos como eles estão na staging area são armazenados em forma de snapshot permanentemente no seu diretório  Git.

<img src="https://hackmd.io/_uploads/HJKOTMTGC.png" width="70%">

Assim, podemos perceber que um arquivo pode estar em um dos 3 estados:

*modified

*staged

*commited

### Comandos e Práticas do Git

#### Lidando com o git

##### Verificando o status dos arquivos `git status`.
    
A principal ferramenta que você vai usar para determinar quais arquivos estão em qual estado é o comando git status.

```sh
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working directory clean
```
Digamos que você adiciona um novo arquivo no seu projeto, um simples arquivo README. Se o arquivo não existia antes, e você executar git status, você verá seu arquivo não rastreado da seguinte forma:

```sh
    $ echo 'My Project' > README
    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Untracked files:
    (use "git add <file>..." to include in what will be committed)

        README

    nothing added to commit but untracked files present (use "git add" to track)
```


Nós queremos incluir esse arquivo README, então vamos rastreá-lo.


##### Rastreando arquivos novos 
Para começar a rastrear um novo arquivo, você deve usar o comando git add
```sh
    $ git add README
``` 
Executando o comando status novamente, você pode ver que seu README agora está sendo rastreado e preparado (staged) para o commit:

    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

        new file:   README
        
É possível saber que o arquivo está preparado porque ele aparece sob o título “Changes to be committed”. Se você fizer um commit neste momento, a versão do arquivo que existia no instante em que você executou git add, é a que será armazenada no histórico de snapshots.

#### Preparando Arquivos Modificados (Adicionando arquivos modificados à staging area)
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
        

##### Fazendo o **commit** do que foi feito `git commit`.
Agora que a área de stage está preparada, podemos fazer commit nas alterações.

O jeito mais simples de fazer commit é digitar o seguinte comando:

    $ git commit

e adicionar uma mensagem no editor de texto.

Alternativamente, podemos fazer:

    $ git commit -m "mensagem"
    
Lembre-se de que o commit grava o snapshot que você deixou na área de stage. Qualquer alteração que você não tiver mandado para o stage permanecerá como estava, em seu lugar; você pode executar outro commit para adicioná-la ao seu histórico. Toda vez que você executa um commit, você está gravando um snapshot do seu projeto que você pode usar posteriormente para fazer comparações, ou mesmo restaurá-lo.
##### Como ver todos os commit feitos com `git log`

É um comando feito para exibir os históricos de commits do projeto.

Aparece nome, hora, data e a mensagem relacionada a cada commit.

    $ git log
    commit 9fceb02d0ae598e95dc970b74767f19372d61af8
    Author: Jane Doe <jane.doe@example.com>
    Date:   Fri Jun 30 14:32:16 2024 +0000

        Corrigido bug no módulo de autenticação de usuários

    commit 3ad45c37a9f1b251545b8b2f4a3db7b683ed8e53
    Author: John Smith <john.smith@example.com>
    Date:   Thu Jun 29 09:12:10 2024 +0000

        Adicionada nova funcionalidade para exportar dados como CSV

**Uma flag eficiente**
    
    $git log --oneline

    $ git log --oneline
    9fceb02 (HEAD -> main) Corrigido bug no módulo de autenticação de usuários
    3ad45c3 Adicionada nova funcionalidade para exportar dados como CSV
    b75f610 Atualizado README com instruções de instalação
    c1b4d83 Commit inicial com arquivos de configuração do projeto   

##### Subindo alterações para o repositório remoto `git push`
Se você tem um commit pronto e quer adiciona-lo ao repositório remoto, podemos fazer:

    $ git push 
    
Fazendo o git push os seus commits irão subir para o seu repositório remoto.



<!--Primeiro exercício usando git commit-->

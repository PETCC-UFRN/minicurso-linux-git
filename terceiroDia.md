---
layout: licoes
title: Minicurso de Linux e Git
---

[comment]: <> (Essas páginas que estão vazias são porque elas utilizam layouts que já importam o menu de navegação e o menu dos dias. Você pode ver isso na pasta _includes)
[comment]: <> (Sendo assim, basta escrever em markdown mesmo que vai ser tudo estilizado pelos layouts)


## 3ᵒ Dia (Processos, compactação e introdução ao Git)

# Versionadores e Git: Fundamentos e Conceitos

## Introdução aos Versionadores
### Contextualização com a história do Linux
- A criação do Linux foi um marco importante na história do desenvolvimento de software, principalmente por sua natureza colaborativa e open-source. Linus Torvalds, o criador do Linux, enfrentou desafios significativos ao coordenar as contribuições de inúmeros desenvolvedores ao redor do mundo. Para gerenciar essas contribuições e manter a integridade do código, Torvalds desenvolveu o Git, um sistema de controle de versão distribuído. Essa necessidade de um sistema robusto e eficiente de versionamento deu origem a ferramentas que são agora essenciais no desenvolvimento de software moderno.

### O que são Versionadores?

- Versionadores são sistemas que registram alterações em um arquivo ou conjunto de arquivos ao longo do tempo, permitindo lembrar versões específicas mais tarde. Surgiram devido à necessidade de aumentar a eficiência, gerenciar um número maior de colaboradores e projetos de software moderno.

<img src="https://hackmd.io/_uploads/ryblu7zSR.png" width="70%">

### Tipos de Versionadores

### 1. Sistemas Locais

- Utilizam um banco de dados simples para manter todas as alterações nos arquivos sob controle de versão.

<img src="https://hackmd.io/_uploads/SJv-sbGHA.png" width="70%">

### 2. Sistemas Centralizados

- Têm um único servidor que contém todos os arquivos de controle de versão e um número de clientes que usam esses arquivos a partir desse lugar central.
- Desvantagens incluem a necessidade de estar sempre conectado ao servidor e a paralisação em caso de falha do servidor.
<img src="https://hackmd.io/_uploads/By_qMTBHR.png" width="70%">

#### Vantagens dos Sistemas Centralizados

- Simples de utilizar, ideal para equipes pequenas.
- Utilizados por plataformas como a Wikipédia.

<img src="https://hackmd.io/_uploads/HJUGsZzB0.png" width="70%">


### 3. Sistemas Distribuídos

- Cada cliente possui uma cópia completa do repositório, funcionando como um backup completo de todos os dados.
- Não dependem de um servidor central, oferecendo maior eficiência e segurança contra ataques.

<img src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

#### Vantagens dos Sistemas Distribuídos

- **Escalabilidade:** Suporta um grande número de colaboradores.
- **Independência:** Não depende de um servidor central.
- **Eficiência:** Processos mais rápidos e eficientes.
- **Segurança:** Maior proteção contra falhas e ataques.

<img src="https://hackmd.io/_uploads/S12LXpBHA.png" width="70%">

# Introdução ao Git

## Surgimento do Git

A história do Git está profundamente ligada ao desenvolvimento do Linux Kernel, um dos projetos de software livre mais importantes e complexos do mundo. Durante os anos iniciais, as mudanças no kernel do Linux eram gerenciadas através do envio de arquivos entre desenvolvedores. Posteriormente, passou-se a usar o versionador BitKeeper. No entanto, quando o BitKeeper se tornou pago, a comunidade Linux, liderada por Linus Torvalds, decidiu criar uma nova ferramenta de versionamento, aprendendo com as lições adquiridas durante o uso do BitKeeper.

Os objetivos principais para o novo sistema incluíam:

- **Velocidade**
- **Design simples**
- **Forte suporte para o desenvolvimento não linear** (milhares de branches paralelas)
- **Alta distribuição**
- **Capacidade de lidar com grandes projetos** como o kernel do Linux de forma eficiente

## De onde vem o nome "Git"?

O nome "Git" tem uma origem curiosa. Em uma entrevista, Linus Torvalds explicou sarcasticamente que ele nomeia todos os seus projetos em sua homenagem, sendo "Linux" o primeiro e "git" o segundo. Na gíria britânica, "git" significa "pessoa desagradável". Além disso, há uma interpretação alternativa em que "Git" pode significar "Global Information Tracker" quando você estiver de bom humor. Para mais detalhes, você pode consultar o manual do Git no terminal usando o comando `man git`.

## Git como um Versionador
<img src="https://hackmd.io/_uploads/SJpghZzrA.png" width="70%">

O Git é um dos sistemas de controle de versão mais utilizados no mundo, conhecido por ser:

1. **Open Source**
2. **Ideal para trabalho em equipe**
3. **Adequado para o desenvolvimento de todos os tipos de software**
4. **O versionador mais utilizado atualmente**

## Como o Git Funciona?

O Git é uma ferramenta de versionamento que gerencia diferentes versões de um arquivo ou conjunto de arquivos. Sempre que você salva o estado do projeto, o Git "tira uma foto" dos arquivos naquele momento e salva uma referência a esse snapshot. Por eficiência, se um arquivo não foi modificado, o Git não o salva novamente, mas cria um "link" para a versão anterior que já está salva.

<img src="https://hackmd.io/_uploads/SkYli-6zR.png" width="70%">

O Git, em geral, apenas **adiciona** informações. É difícil que o sistema apague dados ou faça algo irreversível, especialmente se você enviar suas alterações para o servidor remoto regularmente (push). Esse comportamento garante a integridade e a segurança do histórico do projeto.

---

# Hospedagem Remota e Conexões SSH

## Introdução a plataformas de hospedagem remota 
### Gancho com a parte de versionadores
A utilização de versionadores como o Git se torna ainda mais poderosa quando combinada com plataformas de hospedagem remota. 
Essas plataformas permitem que você armazene, compartilhe e colabore em projetos de software com desenvolvedores de todo o mundo. Elas não só armazenam o código, mas também oferecem ferramentas para gerenciamento de projetos, integração contínua, e muito mais.

### Algumas diferentes plataformas: GitLab, BitBucket, Codeberg.
Existem várias plataformas de hospedagem remota que suportam Git, cada uma com suas características únicas.
- **GitLab**

- **BitBucket**

- **Codeberg**



### Git e Github : diferenças.
Embora Git e GitHub sejam frequentemente mencionados juntos, eles não são a mesma coisa. Aqui estão as principais diferenças:

- **Git**
    - Git é um sistema de controle de versão distribuído.
    - Ferramenta de linha de comando utilizada para gerenciar o histórico de versões de arquivos.
    - Funciona localmente, independentemente de uma plataforma de hospedagem remota.

- **GitHub**
    - GitHub é uma plataforma de hospedagem remota para repositórios Git.
    - Oferece uma interface web amigável e ferramentas adicionais para colaboração e gerenciamento de projetos.
    - Permite hospedagem de repositórios públicos e privados.


> Momento de Criação da conta no Github** (20min)


- **Chave SSH** (15min)
    > - Explicando para que serve a chave SSH
    > - Se conectando  remotamente a outra máquina.
    > - Criaçao da chave SSH, em conjunto com os alunos.
    > - Usando a chave para se conectar ao Github.

> **1h45min**

- **Lanche/Descanso** (20min)

> **2h05min**

---
### Workflow e primeiro repositório

- **Um pouco mais sobre Git** (10min)
    > - Como ele lida com informações.
    > - Workflow básico (téorico, sem incluir branches).

> **2h15min**

- **Criando o primeiro repositório** (15min)
    > - Criando o reposítorio remoto no github.
    > - Seguindo os passos dados pelo github.
    > - `init, remote add, add, commit, push`.
    > - O nome do reposittório que eles devem criar é `projeto 01` - que será utilizado no exercício de fixação

> **2h30min**

---
### Comandos e Práticas do Git

- **Lidando com o git** (30min)
    > - Verificando o status dos arquivos `git status`.
    > - Entendendo o staging area.
    > - Rastreando arquivos novos e modificados `git add`.
    > - Fazendo o **commit** do que foi feito `git commit`.
    > - Como ver todos os commit feitos com `git log`
    > - Subindo alterações para o repositório remoto `git push`

> **3h**

- [**Git$1**](https://hackmd.io/K-KTS27ITaOj5rhVWp66zg?view#Exerc%C3%ADcio-11) (20min) 
    > - Exercício utilizando `git status`, `git commit`, `git add`, `git log` e `git push`.
    > - Projeto para criar 2 capítulos de uma história.
    > - Tempo para os alunos resolverem. **(20min)**
    > - Resolução. **(10min)**

> **3h20min**

- [**Git#1**](https://hackmd.io/K-KTS27ITaOj5rhVWp66zg?both#Exerc%C3%ADcio-1-1) (20min) 
    > - Exercício utilizando `git status`, `git commit`, `git add`, `git log`, `git push` e `git remote`
    > - Projeto para criar uma biografia engraçada.
    > - Tempo para os alunos resolverem **(30min)**

> **3h50min**

---
---
layout: layoutGit
title: Projeto Final
---

# Projeto final

### Visão geral

Nessa altura, você provavelmente já deve estar familiarizado com o `git`, como usar e investigar comandos no terminal e até mesmo criar seus próprios comandos. Portanto, para se familiarizar mais com o workflow da ferramenta, lhe convido a desenvolver um gerador de senhas simples. Este projeto deverá ser realizado em duplas, e deve ser feito usando o `git` como versionador e GitHub como serviço de hospedagem.

### Sumário

- [Definição do projeto](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
- [Requisitos do projeto](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
- [Funcionalidades](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
  - [Geração de senhas](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
  - [Armazenamento seguro](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
- [Interface e como usar o script](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
- [Estrutura do código](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)
- [Submissão](https://www.notion.so/Rascunho-da-explica-o-do-projeto-final-1b5bbc5ec31a80b89dcbdbf4c3e4fd85?pvs=21)

### Definição do projeto

O nosso gerador de senhas deve permitir ao usuário gerar senhas simples de 8 dígitos que incluam:

Letras maiúsculas

Letras minúsculas

Números

Símbolos

Explicaremos no início desse texto as funcionalidades e certas coisas que devem, obrigatoriamente estar inseridas em seu código e, no fim da página, disponibilizaremos o esqueleto básico do programa, denotando com comentários onde implementar cada parte do programa.

### Requisitos do projeto

- O programa deve ser escrito em Shell script.
- Os autores devem usar o `git` e o GitHub para versionar o projeto.
- Os autores devem incluir um arquivo `README.md` com uma descrição do projeto instruções de uso e exemplos. Caso o trabalho seja feito em mais de uma sessão (por ex. começar em sala e terminar em casa) os autores também devem incluir um arquivo `CHANGELOG.md` com a descrição das mudanças feitas em cada commit.

## Funcionalidades

### Geração de senhas

Caso o script seja executado da forma normal (sem nenhum argumento), ele deve gerar uma senha aleatória, usando um arquivo especial do nosso computador, o `/dev/urandom`, um arquivo que se atualiza com bytes aleatórios.

O comando para gerar uma senha é:
`cat /dev/urandom | tr -dc "$UPPERCASE$LOWERCASE$DIGITS$SYMBOLS" | fold -w 10 | head -n 1`

Você pode apenas copiar e colar o comando no seu script que ele irá funcionar normalmente, mas vamos nos aprofundar um pouco no que cada coisa do comando faz para entender como ele funciona:

- `cat /dev/urandom` manda o conteúdo de `/dev/urandom` para o próximo comando usar como entrada
- `tr -dc "$UPPERCASE$LOWERCASE$DIGITS$SYMBOLS"` recebe como entrada o conteúdo do arquivo `/dev/urandom` e filtra apenas os caracteres que **podem** ser inclusos na senha gerada, e manda essa informação para o próximo comando usar como entrada
- `fold -w 10` aqui a saída é quebrada em várias linhas de no máximo 10 caracteres, o que também é mandado para o próximo comando como entrada
- `head -n 1` por fim, das várias linhas que foram geradas, com várias senhas diferentes (conjuntos aleatórios de caracteres), imprime apenas a primeira linha.

O comando por si só não imprime a senha, portanto vamos armazenar o conteúdo do comando em uma variável e imprimí-la ao fim do código:

```bash
senha=$(cat /dev/urandom | tr -dc "$CARACTERES" | fold -w 10 | head -n 1)
echo "$senha"
```

### Armazenar senhas em um arquivo

Implemente a funcionalidade de armazenar as senhas geradas em um arquivo chamado `passwords.txt`, e caso o arquivo não exista (ou seja, seja a primeira vez que você está executando o script), o código deve criar o arquivo.

### Limpar as senhas do arquivo

Adicione uma funcionalidade para limpar o arquivo `passwords.txt` caso o usuário informe o argumento “-c”. Dica: você pode limpar o conteúdo de um arquivo usando o comando `> arquivo`

### Listar senhas armazenadas

Adicione uma funcionalidade para listar as senhas armazenadas nesse arquivo caso o usuário informe o argumento “-p”.

```
$ ./password-generator.sh -p
Senhas Geradas:
K?hN=jfK20
l9jlnna3gu
sbNea^R9ZU
```

### Interface de como usar o script

O script deve exibir a seguinte mensagem quando usado com o argumento “-h”. Se baseie em como essa funcionalidade é implementada no código para fazer as outras funções do programa

```
$ ./password-generator.sh -h
Bem vindo ao password-generator! Versão 1.0, (c) 2025, Fulano de Tal, DIMAp, UFRN
Uso: ./password-generator.sh [OPÇÕES]:
Opções:
-p : Listar as senhas geradas
-c : Limpar as senhas do arquivo passwords.txt
-h : Exibir esse menu

O comportamento padrão do script é gerar uma senha de 8 caracteres minúsculos.
```

### Estrutura do código

```bash
#!/bin/bash

# Definir conjuntos de caracteres
CARACTERES="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/~"

# Essa linha gera uma senha quando o script é executado
senha=$(cat /dev/urandom | tr -dc "$CARACTERES" | fold -w 10 | head -n 1)

# Interpretar os argumentos:
# (Complete o código com as outras funcionalidades usando o elif)
if [ "$1" = "-h" ]; then
  echo -e "Bem vindo ao password-generator! Versão 1.0, (c) 2025, Fulano de Tal,DIMAp, UFRN
Uso: ./password-generator.sh [OPÇÕES]:

Opções:

-p : Listar as senhas geradas
-c : Limpar as senhas do arquivo passwords.txt
-h : Exibir esse menu

O comportamento padrão do script é gerar uma senha de 8 caracteres minúsculos."
fi

# Imprime a senha gerada
# Adicione aqui também a implementação do código que salva a senha no passwords.txt e cria o arquivo caso ele não exista
# Dica: lembre-se de utilizar o operador "-e" junto com a condicional "if"!
echo "Senha gerada: $senha"
```

### Submissão

Um email para [linuxgitpetcc@gmail.com](mailto:linuxgitpetcc@gmail.com), com o link do repositório e nome completo dos autores é suficiente.
Apenas um membro da dupla deve realizar a submissão

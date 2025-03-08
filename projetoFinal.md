---
layout: layoutGit
title: Projeto Final
---

# Projeto Final

<div id="sumario" class="sumario-git">
    <h1>Sumário</h1>
    <summary><a href="#projeto-final">Projeto Final</a></summary>
    <ul>
      <li>
        <details>
          <summary><a href="#definição-do-projeto">Definição do projeto</a></summary>
          <ul>
            <li><a href="#requisitos-do-projeto">Requisitos do projeto</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary><a href="#funcionalidades">Funcionalidades</a></summary>
          <ul>
            <li><a href="#geração-de-senhas">Geração de senhas</a></li>
            <li><a href="#armazenar-senhas-em-um-arquivo">Armazenamento de senhas</a></li>
            <li><a href="#nomear-senhas">Nomear Senhas</a></li>
            <li><a href="#listar-senhas-armazenadas">Listar senhas</a></li>
            <li><a href="#armazenamento-seguro">Armazenamento Seguro</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary><a href="#interface-e-como-usar-o-script">Implementação do Projeto</a></summary>
          <ul>
            <li><a href="#exemplos-de-uso">Exemplos de uso do Script</a></li>
            <li><a href="#estrutura-do-código">Estrutura do código</a></li>
            <li><a href="#colaboração">Colaboração</a></li>
            <li><a href="#submissão">Submissão</a></li>
          </ul>
        </details>
      </li>
    </ul>
  <button class="toggle-button" id="toggle-button">
  
      Esconder Sumário
  
  </button>
  </div>

### Visão geral

Nessa altura, você provavelmente já deve estar familiarizado com o `git`: como usar, investigar comandos
no terminal e até mesmo criar seus próprios comandos. Portanto, para se familiarizar mais com o workflow
da ferramente, lhe convido a desenvolver um gerador de senhas seguras com base em critérios definidos pelo
usuário. Este projeto deverá ser realizado em duplas, e deve ser feito usando o `git` como versionador
e GitHub como serviço de hospedagem.

### Sumário

- [Definição do projeto](#definição-do-projeto)
- [Requisitos do projeto](#requisitos-do-projeto)
- [Funcionalidades](#funcionalidades)
  - [Geração de senhas](#geração-de-senhas)
  - [Armazenamento seguro](#armazenamento-seguro)
- [Interface e como usar o script](#interface-e-como-usar-o-script)
  - [Exemplos de uso](#exemplos-de-uso)
- [Estrutura do código](#estrutura-do-código)
- [Colaboração](#colaboração)
- [Submissão](#submissão)

### Definição do projeto

O nosso gerador de senhas deve permitir ao usuário especificar o comprimento da senha e os tipos de
caracteres a serem incluídos (letras maiúsculas, minúsculas, números e símbolos). Além disso, deve fornecer
uma simples interface de `help` no terminal, para que o usuário possa entender como o programa pode ser
usado.

### Requisitos do projeto

- O programa deve ser escrito em Shell script.
- Os autores devem usar o `git` e o GitHub para versionar o projeto.
- Os autores devem incluir um arquivo `README.md` com uma descrição do projeto instruções de uso e exemplos. Caso o trabalho seja feito em mais de uma sessão (por ex. começar em sala e terminar em casa) os autores também devem incluir um arquivo `CHANGELOG.md` com a descrição das mudanças feitas em cada commit.

### Funcionalidades

#### Geração de senhas

O script deve permitir a geração de senhas aleatórias com base nos seguintes critérios:

- Comprimento da senha.
- Inclusão de letras maiúsculas.
- Inclusão de letras minúsculas.
- Inclusão de números.
- Inclusão de símbolos.

Para gerar a senha, faça uso do `/dev/urandom`, um arquivo que se atualiza com bytes aleatórios. Uma
vez filtrados, esses bytes podem se tornar uma senha segura. Para isso, pesquise sobre o comando `tr` e o
`head` para traçar um plano de como fazer isso.

#### Armazenar senhas em um arquivo

Implemente a funcionalidade de armazenar as senhas geradas em um arquivo, por exemplo, um arquivo `.txt`.

```terminal
$ ./pwd-gen.bash -o
weebvicv
Senha salva em passwords.txt
```

Alternativamente, não é necessário passar o feedback de que a senha foi salva em um arquivo.

#### Nomear senhas

Implemente uma funcionalidade para nomear as senhas geradas.

```terminal
$ ./pwd-gen.bash -n SIGAA
zaaugxkh
```

#### Listar senhas armazenadas

Adicione uma funcionalidade para listar as senhas armazenadas nesse arquivo.

```terminal
$ ./pwd-gen.bash -p
miogptoy
Netflix: tzccfdlj
PrimeVideo: jroucqus
SIGAA: wohzsrhe
SitePet: nommyigz
```

#### Armazenamento seguro

Opcionalmente, o script deve permitir armazenar senhas de forma criptografada em um arquivo. Para isso,
investigue o uso da ferramenta `openssl`.

### Interface e como usar o script

```terminal
$ ./password-generator.sh -h
Bem vindo ao password-generator! Versão 1.0, (c) 2024, Fulano de Tal, DIMAp, UFRN
Uso: ./password-generator.sh [OPÇÕES]
Opções:
  -l [COMPRIMENTO] : comprimento da senha
  -u               : incluir letras maiúsculas
  -d               : incluir números
  -s               : incluir símbolos
  -h               : exibir essa mensagem de ajuda

O comportamento padrão do script é gerar uma senha de 8 caracteres minúsculos.
```

#### Exemplos de uso

- Gerar uma senha de 8 caracteres com letras minúsculas:

    ```terminal
    $ ./password-generator.sh
    Senha gerada: drmeaypb
    ```

- Gerar uma senha de 12 caracteres com letras maiúsculas:

    ```terminal
    $ ./password-generator.sh -l 12 -u
    Senha gerada: jQaAukomyhkS
    ```

- Gerar uma senha com tamanho 42 com letras maiúsculas, números e símbolos:

    ```terminal
    $ ./password-generator.sh -l 42 -u -d -s
    Senha gerada: d5,|J-sB,$+=KiV/dSs6CpV35OmI]c9|cZk.Qzpq8M
    ```

### Estrutura do código

```bash
#!/bin/bash
# Função para exibir a ajuda
show_help() {
  # Implementação vai aqui
}

# Definir variáveis padrão
LENGTH=8
USE_UPPERCASE=false
USE_DIGITS=false
USE_SYMBOLS=false

# Parsear argumentos
# { Implementação vai aqui }

# Definir conjuntos de caracteres
LOWERCASE="abcdefghijklmnopqrstuvwxyz"
UPPERCASE="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
DIGITS="0123456789"
SYMBOLS="!@#$%^&*()-_=+[]{}|;:,.<>?/~"

# Construir a lista de caracteres permitidos
# { Implementação vem aqui }

# Gerar a senha: 
# o /dev/urandom gera bytes aleatórios, para conseguir
# uma senha precisamos limpar esses bytes de alguma forma
PASSWORD=$(cat /dev/urandom) 

# Exibir a senha gerada
echo "Senha gerada: $PASSWORD"

# Opcional: salvar a senha em um arquivo criptografado
# Implemente como essa senha será criptografada com o openssl
echo $PASSWORD >> password.txt.enc
```

### Colaboração

Esse projeto pode ser divido em duas partes, a primeira parte seria a interface e o processamento de
argumentos da linha de comando e a segunda parte seria a investigação de como usar o `/dev/urandom`.

### Submissão

Um email para <linuxgitpetcc@gmail.com>, com o link do repositório e nome completo dos autores é suficiente.
Apenas um membro da dupla deve realizar a submissão

----
<script>
const dataDia5 = new Date('2025-03-14');
const agora = new Date();

if (agora < dataDia5) {
    document.body.innerHTML = '<h1 style="text-align:center; margin-top:20%;">Página Indisponível</h1>' +
                              '<p style="text-align:center;">Esta página estará disponível a partir de ' + dataDia5.toLocaleDateString() + '.</p>';
}
</script>

{% include petcccopyright.html %}


# Passa a Bola ⚽

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan?logo=tailwindcss)

## 📖 Sobre o Projeto

**Passa a Bola** é uma plataforma web dedicada a entusiastas do futebol feminino. O projeto foi desenvolvido como um desafio para aplicar conceitos modernos de desenvolvimento front-end, criando uma experiência rica e interativa para o usuário, desde a autenticação até o consumo de dados de partidas.

A aplicação permite que usuários se cadastrem, façam login e acessem uma área de dashboard para visualizar resultados de campeonatos importantes do futebol feminino.

## ✨ Features

-   🔐 **Autenticação de Usuários:** Sistema completo de login e cadastro utilizando **Firebase Authentication (E-mail e Senha)**.
-   👤 **Perfis de Usuário:** Armazenamento de dados adicionais do usuário (nome, telefone, etc.) no **Cloud Firestore**, vinculados de forma segura ao perfil de autenticação.
-   🛡️ **Rotas Protegidas:** Acesso a páginas exclusivas, como o dashboard de jogos, somente para usuários autenticados.
-   🎨 **Design Moderno e Responsivo:** Interface estilizada com **Tailwind CSS**, apresentando os resultados das partidas em formato de *cards* visuais e informativos, incluindo logos dos times e do campeonato.
-   ⚙️ **Arquitetura Escalável:** Código organizado com uma clara separação de responsabilidades, utilizando Context API para gerenciamento de estado global e uma camada de serviço para as chamadas de API.


## 📋 Instruções de Edição (Admin)

Para gerenciar o conteúdo da **Copa PAB** (como adicionar jogadoras e ver estatísticas dinâmicas), é necessário acessar o painel administrativo.

### Acesso ao Painel

* **Usuário:** `Admin`
* **Senha:** `Admin12#`

### Adicionando uma Jogadora com Atributos

1.  Após fazer login como Admin, navegue até a seção **"Copa PAB"**.
2.  Acesse a área **"Times"**.
3.  Clique no card roxo correspondente ao time que deseja editar (o card exibe o nome e as estatísticas do time).
4.  Uma janela modal será aberta. Clique no botão **"adicionar jogadora"**.
5.  Um novo card aparecerá para ser preenchido. Insira as informações e atributos da jogadora.
6.  Após preencher, feche a janela.
7.  Para visualizar o resultado, vá até a opção **"Estatísticas"** no painel.
8.  Clique sobre o nome da jogadora que você acabou de criar.
9.  O **Dashboard dinâmico** será exibido, refletindo os atributos cadastrados.
10. Essa jogadora e estatísticas ficam salvas e você pode ver se entrar em outra conta, sem ser a admin.


## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **React:** Biblioteca principal para a construção da interface.
-   **Vite:** Ferramenta de build extremamente rápida para o ambiente de desenvolvimento.
-   **React Router DOM:** Para gerenciamento de rotas e navegação.
-   **Tailwind CSS:** Framework CSS para estilização rápida e moderna.

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [Git](https://git-scm.com/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Challenge-Domina-No-Pe/Front-End.git
    cd passa-a-bola
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    npm i react-router-dom
    npm install lucide-react
    ```

3.  **Rode o projeto:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou a porta que o Vite indicar).

## 👥 Integrantes
- Vítor Silva Borsato RM:561805   
- João Pedro Godinho Passiani RM:561602​
- Gabriel Molinari Droppa RM:562082
- Isabela de Deus RM: 565988

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

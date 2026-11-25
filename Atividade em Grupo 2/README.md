# ⛩️ Meu Catálogo de Animes | Sakura Edition 🌸

> *"Nossa estante de animes: episódios, notas e próximas maratonas."*

Aplicação web full-stack desenvolvida para a disciplina de **Programação para Web (2026)**. O projeto consiste em um catálogo pessoal de animes com identidade visual inspirada na cultura japonesa e na estética Studio Ghibli, permitindo cadastrar, listar em ordem alfabética, filtrar por busca ou status, editar e excluir obras com persistência real em banco de dados relacional.

---

## 👩‍💻 Integrantes da Dupla

* **Fernanda Brito**
* **Tatyana Brasil**

---

## 🗄️ Banco de Dados Utilizado e Justificativa

* **Sistema Gerenciador:** **SQLite3** (arquivo local `animes.db`).
* **Justificativa da Escolha:** O SQLite foi escolhido por ser um banco de dados relacional leve, autônomo e armazenado em um único arquivo local dentro do projeto. Ele dispensa a instalação ou configuração de servidores externos (como MySQL ou PostgreSQL), garantindo que a aplicação rode imediatamente em qualquer máquina após a instalação das dependências do Node.js.
* **Modelagem da Tabela (`animes`):**
  * `id` (`INTEGER PRIMARY KEY AUTOINCREMENT`) — Identificador único do registro
  * `titulo` (`TEXT NOT NULL`) — Nome do anime
  * `genero` (`TEXT NOT NULL`) — Categoria principal (ex.: Ação, Suspense, Comédia)
  * `episodios` (`INTEGER NOT NULL`) — Quantidade total de episódios
  * `nota` (`REAL`) — Avaliação de 0 a 10
  * `status` (`TEXT`) — Situação (*Assistindo*, *Completo* ou *Quero Ver*)
  * `sinopse` (`TEXT`) — Breve resumo da obra
  * `imagem` (`TEXT`) — URL externa ou imagem codificada em Base64

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5 semântico (`<header>`, `<section>`, `<dialog>`, `<footer>`), CSS3 puro (Grid, Flexbox, layout responsivo e tema *Japan/Sakura*) e JavaScript (ES6+) com consumo assíncrono via `fetch()` e `async/await`.
* **Back-end:** Node.js com **Express** (API RESTful com suporte a JSON até 10MB e CORS) e driver **sqlite3**.

---

## ✨ Funcionalidades Implementadas

* **Listagem Dinâmica Ordenada (A - Z):** Exibição automática dos animes em ordem alfabética diretamente via consulta SQL (`ORDER BY titulo COLLATE NOCASE ASC`).
* **Filtro e Busca em Tempo Real:** Pesquisa dinâmica por título ou gênero e filtragem por status (*Assistindo*, *Completo*, *Quero Ver*) integradas aos parâmetros de consulta da API (`GET /api/animes?busca=...&status=...`).
* **Modais Interativos (`<dialog>`):**
  * Modal dedicado para **Cadastro** e **Edição** de animes.
  * Modal próprio dentro da página para **Confirmação de Exclusão**, substituindo alertas nativos do navegador.
* **Gerenciamento de Capas:** Suporte tanto para **URL da web** quanto para **upload de imagens locais** do computador (via `FileReader` com pré-visualização instantânea) e enquadramento padronizado nos cards.
* **Feedback Visual e Validação:** Mensagens claras de sucesso e tratamento de erros tanto no front-end quanto no back-end.

---

## 📁 Estrutura de Pastas

```text
├── database/
│   └── seed.js            # Script que cria a tabela e insere os 10 animes iniciais
├── public/
│   ├── fundo.jpg          # Plano de fundo temático local
│   ├── index.html         # Estrutura HTML semântica e modais
│   ├── script.js          # Consumo da API REST, filtros, upload e manipulação do DOM
│   └── style.css          # Estilização temática Japão/Sakura e responsividade
├── animes.db              # Banco de dados SQLite populado
├── package-lock.json      # Registro exato das versões das dependências instaladas
├── package.json           # Dependências e configurações do Node.js
├── README.md              # Documentação do projeto
└── server.js              # Servidor Express e rotas da API REST

```

---

## 🚀 Passo a Passo para Executar o Projeto

### Pré-requisitos
* **Node.js** (versão 18 ou superior) instalado no computador.

### Passo 1: Acessar a pasta do projeto
Abra o terminal na pasta raiz do projeto (onde está localizado o arquivo `server.js`).

### Passo 2: Instalar as dependências
Execute o comando abaixo para baixar os pacotes (`express`, `sqlite3` e `cors`):

```bash
npm install
```

### Passo 3: Criar e popular o banco de dados *(Opcional)*
O arquivo `animes.db` já acompanha o repositório populado com 10 animes e suas capas. Caso queira recriar a tabela e restaurar os 10 registros iniciais do zero, execute:

```bash
node database/seed.js
```

Saída esperada no terminal:
> `Conectado ao banco de dados SQLite.`
> `Tabela "animes" criada com sucesso.`
> `10 animes iniciais inseridos com sucesso!`

### Passo 4: Iniciar o servidor back-end
Rode o servidor Express com o comando:

```bash
node server.js
```

Saída esperada no terminal:
> `Servidor rodando em http://localhost:3000`
> `Servidor conectado ao SQLite com sucesso!`

### Passo 5: Abrir no navegador
Com o servidor em execução, acesse no navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔌 Endpoints da API REST

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/animes` | Lista todos os animes em ordem alfabética (aceita `?busca=` e `?status=`) |
| `POST` | `/api/animes` | Cadastra um novo anime no SQLite |
| `PUT` | `/api/animes/:id` | Atualiza os dados de um anime pelo ID |
| `DELETE` | `/api/animes/:id` | Exclui um anime pelo ID |

---

## 🤖 Uso de Inteligência Artificial

Ferramentas de IA generativa (Gemini) foram utilizadas como apoio durante o desenvolvimento para:
* Configuração inicial do ambiente Node.js e gerenciamento de dependências (`package.json`, `package-lock.json` e `node_modules`);
* Revisão de requisitos técnicos e estruturação das rotas REST no Express;
* Refinamento da estilização CSS (paleta temática Japão/Sakura, padronização de imagens e responsividade);
* Implementação dos modais nativos `<dialog>` e leitura de arquivos locais com `FileReader`.

Todo o código foi testado, adaptado e validado localmente pela dupla antes da entrega.

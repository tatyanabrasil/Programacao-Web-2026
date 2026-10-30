# All Bella | Loja Online de Cosméticos

Aplicação web de e-commerce desenvolvida como projeto prático para a disciplina de **Programação para Web**. O projeto consiste em uma vitrine virtual de cosméticos com estética editorial minimalista, consumo de API externa, navegação por categorias, modal de detalhes e persistência de dados no navegador.

---

## 👩‍💻 Integrantes do Grupo

* **Fernanda Brito**
* **Tatyana Brasil**

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica (`<header>`, `<nav>`, `<main>`, `<article>`, `<dialog>`, `<footer>`) e formulários de pesquisa.
* **CSS3:** Design responsivo sem uso de frameworks, layout com Flexbox, paleta visual personalizada e tipografia editorial clássica (*Cinzel* via Google Fonts).
* **JavaScript (ES6+):** Manipulação dinâmica do DOM, funções assíncronas com `async/await` e tratamento de eventos.
* **DummyJSON API:** Consumo de dados via `fetch()` das categorias `beauty`, `fragrances` e `skin-care`.
* **Web Storage API (`localStorage`):** Persistência dos produtos favoritados pelo usuário.

---

## ✨ Funcionalidades Implementadas

1. **Vitrine Dinâmica com Consumo de API:**
   * Requisições assíncronas consumindo dados da DummyJSON API com tratamento de erros.
   * Exibição de catálogo unificado com maquiagens, fragrâncias e produtos de cuidados com a pele.
   * Sistema inteligente de tradução de termos para o português e *fallback* automático caso a API adicione novos produtos.

2. **Filtragem por Categorias e Navegação:**
   * Menus interativos para filtrar itens por "Maquiagem", "Perfumes" e "Cuidados com a Pele", além da opção "Início" para visualizar todo o catálogo.

3. **Sistema de Busca Integrado:**
   * Busca textual via formulário utilizando `preventDefault()` para evitar recarregamento indevido da página.
   * Filtragem de produtos por nome e termos descritivos.

4. **Modal com Detalhes do Produto:**
   * Elemento nativo `<dialog>` disparado ao clicar em "Ver Detalhes".
   * Apresentação da ficha completa: marca, avaliação dos clientes, estoque disponível, descrição estendida e preço formatado.
   * Fechamento por botão interativo ou por clique fora da área do modal (backdrop).

5. **Lista de Favoritos e Persistência:**
   * Marcação e desmarcação de itens favoritos com atualização do ícone de coração.
   * Salvamento automático do array de favoritos em formato JSON no `localStorage`.
   * Tela exclusiva de favoritos acessível pelo cabeçalho.

6. **Experiência do Usuário (UX) com Desfazer:**
   * Notificação flutuante temporária (*Toast*) com duração de 5 segundos disparada exclusivamente ao desmarcar um produto na tela de favoritos.
   * Botão interativo **Desfazer**, permitindo restaurar o cosmético removido acidentalmente sem precisar pesquisá-lo novamente.

---

## 🚀 Como Executar a Aplicação

A aplicação foi construída com tecnologias web nativas e não necessita de instalação de pacotes ou servidores complexos:

1. Baixe ou clone este repositório no seu computador.
2. Certifique-se de manter os arquivos `index.html`, `style.css` e `script.js` na mesma pasta.
3. Dê um **duplo clique no arquivo `index.html`** para abrir o site diretamente no seu navegador padrão (Google Chrome, Firefox, Edge, etc.).
4. *(Opcional)* Se estiver usando o VS Code, clique com o botão direito sobre o `index.html` e selecione **Open with Live Server**.

// 1. DADOS INICIAIS
const filmesPadrao = [
  { id: 1, titulo: "O Jogo da Imitação", ano: 2014, genero: "Drama" },
  { id: 2, titulo: "Orgulho e Preconceito", ano: 2005, genero: "Romance/Comédia" },
  { id: 3, titulo: "E o Vento levou", ano: 1939, genero: "Romance/Guerra" },
  { id: 4, titulo: "Estrelas Além do Tempo", ano: 2016, genero: "Drama/Comédia" },
  { id: 5, titulo: "Historias Cruzadas", ano: 2011, genero: "Drama" },
  { id: 6, titulo: "Invocação do Mal", ano: 2013, genero: "Terror/Misterio" },
  { id: 7, titulo: "Efeito Borboleta", ano: 2004, genero: "Ficção Cientifica" },
  { id: 8, titulo: "Van Helsing: O Caçador de Monstros", ano: 2004, genero: "Terror/Ação" },
  { id: 9, titulo: "Frankenstein", ano: 2025, genero: "Terror/Ficção científica" }
];

// Carrega os filmes cadastrados ou inicia com os padrões
let filmes = JSON.parse(localStorage.getItem("catalogo_filmes")) || filmesPadrao;

// Carrega os IDs favoritos salvos
let favoritos = JSON.parse(localStorage.getItem("filmes_favoritos")) || [];

// Elementos da DOM
const catalogoContainer = document.getElementById("catalogo");
const btnLimpar = document.getElementById("btn-limpar");
const formFilme = document.getElementById("form-filme");

// 2. RENDERIZAR O CATÁLOGO
function renderizarCatalogo() {
  catalogoContainer.innerHTML = "";

  filmes.forEach((filme) => {
    const ehFavorito = favoritos.includes(filme.id);

    const card = document.createElement("div");
    card.className = "card";

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
      <h3>${filme.titulo}</h3>
      <p>Ano: ${filme.ano} | ${filme.genero}</p>
    `;

    const botao = document.createElement("button");
    botao.className = ehFavorito ? "favorito" : "";
    botao.textContent = ehFavorito ? "♥ Favorito" : "♡ Favoritar";

    botao.addEventListener("click", () => {
      alternarFavorito(filme.id);
    });

    card.appendChild(infoDiv);
    card.appendChild(botao);
    catalogoContainer.appendChild(card);
  });
}

// 3. GERENCIAR FAVORITOS
function alternarFavorito(idFilme) {
  if (favoritos.includes(idFilme)) {
    favoritos = favoritos.filter((id) => id !== idFilme);
  } else {
    favoritos.push(idFilme);
  }

  localStorage.setItem("filmes_favoritos", JSON.stringify(favoritos));
  renderizarCatalogo();
}

// 4. ADICIONAR NOVO FILME PELO FORMULÁRIO
formFilme.addEventListener("submit", (e) => {
  e.preventDefault();

  const tituloInput = document.getElementById("titulo");
  const anoInput = document.getElementById("ano");
  const generoInput = document.getElementById("genero");

  const novoFilme = {
    id: Date.now(), // Gera um ID único baseado no timestamp atual
    titulo: tituloInput.value,
    ano: Number(anoInput.value),
    genero: generoInput.value
  };

  // Adiciona ao array e salva no localStorage
  filmes.push(novoFilme);
  localStorage.setItem("catalogo_filmes", JSON.stringify(filmes));

  // Limpa os campos do formulário e atualiza a tela
  formFilme.reset();
  renderizarCatalogo();
});

// 5. LIMPAR FAVORITOS
function limparRegistros() {
  if (confirm("Tem certeza que deseja apagar todos os favoritos salvos?")) {
    localStorage.removeItem("filmes_favoritos");
    favoritos = [];
    renderizarCatalogo();
  }
}

if (btnLimpar) {
  btnLimpar.addEventListener("click", limparRegistros);
}



// Execução inicial
renderizarCatalogo();


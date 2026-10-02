// 1. DADOS INICIAIS (Lista de Objetos)
const filmesIniciais = [
  { id: 1, titulo: "O Jogo da Imitação", ano: 2014, genero: "Drama" },

  {
    id: 2,
    titulo: "Orgulho e Preconceito",
    ano: 2005,
    genero: "Romance/Comédia",
  },

  { id: 3, titulo: "E o Vento levou", ano: 1939, genero: "Romance/Guerra" },

  {
    id: 4,
    titulo: "Estrelas Além do Tempo",
    ano: 2016,
    genero: "Drama/Comédia",
  },

  { id: 5, titulo: "Historias Cruzadas", ano: 2011, genero: "Drama" },

  { id: 6, titulo: "Invocação do Mal", ano: 2013, genero: "Terror/Misterio" },

  { id: 7, titulo: "Efeito Borboleta", ano: 2004, genero: "Ficção Cientifica" },

  {
    id: 8,
    titulo: "Van Helsing: O Caçador de Monstros",
    ano: 2004,
    genero: "Terror /ação ",
  },

  {
    id: 9,
    titulo: "Frankenstein",
    ano: 2025,
    genero: " Terror/Ficção científica ",
  },
];

// 2. RECUPERAR FAVORITOS DO LOCALSTORAGE (getItem + JSON.parse)
let favoritos = JSON.parse(localStorage.getItem("filmes_favoritos")) || [];

const catalogoContainer = document.getElementById("catalogo");
const btnLimpar = document.getElementById("btn-limpar");

// 3. RENDERIZAR NA TELA (Percorrendo o Array)
function renderizarCatalogo() {
  catalogoContainer.innerHTML = "";

  filmesIniciais.forEach((filme) => {
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

// 4. ALTERAR E SALVAR NO LOCALSTORAGE (JSON.stringify + setItem)
function alternarFavorito(idFilme) {
  if (favoritos.includes(idFilme)) {
    favoritos = favoritos.filter((id) => id !== idFilme);
  } else {
    favoritos.push(idFilme);
  }

  localStorage.setItem("filmes_favoritos", JSON.stringify(favoritos));
  renderizarCatalogo();
}

function limparRegistros() {
  if (confirm("Tem certeza que deseja apagar todos os favoritos salvos?")) {
    // Apaga do localStorage
    localStorage.removeItem("filmes_favoritos");

    // Reseta o array na memória
    favoritos = [];

    // Atualiza a tela
    renderizarCatalogo();
  }
}

// Evento de clique do botão limpar
if (btnLimpar) {
  btnLimpar.addEventListener("click", limparRegistros);
}

// Execução inicial
renderizarCatalogo();

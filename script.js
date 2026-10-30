// Elementos do DOM
const logoInicio = document.getElementById("logo-inicio");
const formBusca = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");
const botaoVerFavoritos = document.getElementById("botao-ver-favoritos");
const botoesCategoria = document.querySelectorAll(".botao-categoria");
const vitrine = document.getElementById("vitrine-produtos");
const mensagemStatus = document.getElementById("mensagem-status");
const modalDetalhes = document.getElementById("modal-detalhes");
const conteudoDetalhes = document.getElementById("conteudo-detalhes");

// Notificação Toast
const toastDesfazer = document.getElementById("toast-desfazer");
const btnDesfazer = document.getElementById("btn-desfazer");

// Estado e Armazenamento
let listaDeProdutosGeral = [];
let visualizandoApenasFavoritos = false;
let listaFavoritos =
  JSON.parse(localStorage.getItem("allbella_favoritos")) || [];
let ultimoFavoritoRemovido = null;
let temporizadorToast = null;

// Catálogo com Tradução Manual dos Produtos Atuais
const catalogoTraduzido = {
  1: {
    titulo: "Máscara de Cílios Lash Princess",
    resumo: "Efeito volume dramático e curvatura intensa o dia todo.",
    descricao:
      "A Máscara de Cílios Lash Princess confere efeito de cílios postiços com curvatura prolongada e acabamento impecável sem formar grumos.",
  },
  2: {
    titulo: "Paleta de Sombras com Espelho",
    resumo: "12 cores altamente pigmentadas com acabamento matte e cintilante.",
    descricao:
      "A Paleta de Sombras com Espelho oferece uma combinação versátil de tons neutros e sofisticados, com textura aveludada e espelho integrado para retoques.",
  },
  3: {
    titulo: "Pó Facial Compacto Aveludado",
    resumo: "Acabamento matte natural e controle prolongado da oleosidade.",
    descricao:
      "Pó facial micronizado ultrafino ideal para selar a maquiagem, suavizar poros e proporcionar uma pele com toque seco e acabamento aveludado.",
  },
  4: {
    titulo: "Batom Vermelho Clássico",
    resumo: "Vermelho marcante com textura cremosa e alta durabilidade.",
    descricao:
      "O Batom Vermelho Clássico possui fórmula rica em agentes hidratantes que deslizam facilmente nos lábios, entregando cor intensa e acabamento acetinado.",
  },
  5: {
    titulo: "Esmalte Vermelho Verniz",
    resumo: "Secagem rápida, brilho espelhado e cobertura uniforme.",
    descricao:
      "Esmalte de alta durabilidade com tonalidade vermelha vibrante e pincel anatômico que facilita uma esmaltação precisa e sem manchas.",
  },
  6: {
    titulo: "Perfume Calvin Klein CK One",
    resumo: "Fragrância cítrica refrescante e marcante de uso unissex.",
    descricao:
      "CK One é um ícone atemporal da perfumaria mundial, combinando notas cítricas de bergamota e cardamomo com um fundo almiscarado leve e moderno.",
  },
  7: {
    titulo: "Perfume Chanel Coco Noir",
    resumo: "Fragrância oriental amadeirada, sensual e sofisticada.",
    descricao:
      "Coco Noir da Chanel é um tributo ao mistério e à elegância feminina, com notas envolventes de toranja, rosa de maio, patchouli da Indonésia e fava tonka.",
  },
  8: {
    titulo: "Perfume Dior J'adore",
    resumo: "Buquê floral nobre, luminoso e exuberante.",
    descricao:
      "J'adore é a grande fragrância floral da Dior, composta por notas de ylang-ylang das Comores, rosa damascena e jasmim sambac com sofisticação pura.",
  },
  9: {
    titulo: "Perfume Dolce & Gabbana Dolce Shine",
    resumo: "Fragrância floral frutada radiante com notas tropicais.",
    descricao:
      "Dolce Shine evoca o início da primavera italiana com manga suculenta, toranja cítrica, flor de laranjeira suave e madeiras nobres aquecidas pelo sol.",
  },
  10: {
    titulo: "Perfume Gucci Bloom Eau de Parfum",
    resumo: "Floral rico com essência de jasmim natural e tuberosa.",
    descricao:
      "Desenvolvido para celebrar a autenticidade e a vitalidade feminina, Gucci Bloom transporta você para um exuberante jardim repleto de flores raras.",
  },
  118: {
    titulo: "Sabonete Líquido Attitude Super Leaves",
    resumo:
      "Fórmula natural hipoalergênica enriquecida com extratos botânicos.",
    descricao:
      "Sabonete para mãos enriquecido com extratos de folhas de oliveira que purificam, protegem e nutrem a barreira natural da pele com suavidade.",
  },
  119: {
    titulo: "Sabonete Corporal Olay Ultra Moisture",
    resumo: "Hidratação profunda no banho com manteiga de karité.",
    descricao:
      "Formulado com complexo de vitamina B3 e manteiga de karité nutritiva, limpa delicadamente sem ressecar e melhora a textura da pele desde o primeiro uso.",
  },
  120: {
    titulo: "Loção Hidratante Vaseline Pele & Rosto",
    resumo: "Absorção rápida sem toque oleoso para hidratação intensiva.",
    descricao:
      "Loção hidratante formulada com microgotas de geleia de vaselina que restauram a hidratação da pele seca e reforçam a barreira protetora facial e corporal.",
  },
};

// Tradução Automática de Termos Desconhecidos
function autoTraduzir(texto) {
  if (!texto) return "";
  const termos = {
    lipstick: "Batom",
    eyeshadow: "Sombra",
    mascara: "Máscara de Cílios",
    palette: "Paleta",
    powder: "Pó Facial",
    "nail polish": "Esmalte",
    perfume: "Perfume",
    fragrance: "Fragrância",
    cream: "Creme",
    lotion: "Loção",
    soap: "Sabonete",
    wash: "Gel de Limpeza",
    cleanser: "Limpador Facial",
    serum: "Sérum",
    moisturizer: "Hidratante",
    red: "Vermelho",
    pink: "Rosa",
    black: "Preto",
    matte: "Matte",
    glow: "Iluminador",
    skin: "Pele",
    face: "Rosto",
    body: "Corpo",
    hand: "Mãos",
    men: "Masculina",
    "with mirror": "com Espelho",
  };

  let textoTraduzido = texto;
  for (const [en, pt] of Object.entries(termos)) {
    textoTraduzido = textoTraduzido.replace(
      new RegExp(`\\b${en}\\b`, "gi"),
      pt,
    );
  }
  return textoTraduzido;
}

// Resolução de Conteúdo
function obterInfoTraduzida(produto) {
  if (catalogoTraduzido[produto.id]) {
    return catalogoTraduzido[produto.id];
  }

  const tituloAdaptado = autoTraduzir(produto.title);
  const descAdaptada = autoTraduzir(produto.description);

  return {
    titulo: tituloAdaptado,
    resumo:
      descAdaptada.length > 70
        ? descAdaptada.slice(0, 70) + "..."
        : descAdaptada,
    descricao: descAdaptada,
  };
}

// Consumo da API
async function carregarProdutos(categoria = "todos") {
  visualizandoApenasFavoritos = false;
  if (vitrine) vitrine.innerHTML = "";
  if (mensagemStatus) {
    mensagemStatus.textContent = "Carregando produtos...";
    mensagemStatus.style.color = "inherit";
  }

  try {
    if (categoria === "todos") {
      const resBeleza = await fetch(
        "https://dummyjson.com/products/category/beauty",
      );
      const dadosBeleza = await resBeleza.json();

      const resPerfumes = await fetch(
        "https://dummyjson.com/products/category/fragrances",
      );
      const dadosPerfumes = await resPerfumes.json();

      let dadosPele = { products: [] };
      try {
        const resPele = await fetch(
          "https://dummyjson.com/products/category/skin-care",
        );
        if (resPele.ok) {
          dadosPele = await resPele.json();
        } else {
          const resPeleAlt = await fetch(
            "https://dummyjson.com/products/category/skincare",
          );
          if (resPeleAlt.ok) dadosPele = await resPeleAlt.json();
        }
      } catch (e) {
        console.warn("Skincare não carregado.");
      }

      listaDeProdutosGeral = [
        ...dadosBeleza.products,
        ...dadosPerfumes.products,
        ...dadosPele.products,
      ];
    } else {
      let catSlug = categoria;
      let resposta = await fetch(
        `https://dummyjson.com/products/category/${catSlug}`,
      );

      if (!resposta.ok && catSlug === "skin-care") {
        catSlug = "skincare";
        resposta = await fetch(
          `https://dummyjson.com/products/category/${catSlug}`,
        );
      }

      if (!resposta.ok) throw new Error("Erro na requisição da API.");
      const dados = await resposta.json();
      listaDeProdutosGeral = dados.products;
    }

    if (mensagemStatus) mensagemStatus.textContent = "";
    exibirProdutos(listaDeProdutosGeral);
  } catch (erro) {
    if (mensagemStatus) {
      mensagemStatus.textContent =
        "Erro ao carregar produtos. Tente novamente!";
      mensagemStatus.style.color = "red";
    }
    console.error("Erro na requisição:", erro);
  }
}

// Renderização dos Produtos
function exibirProdutos(produtos) {
  if (!vitrine) return;
  vitrine.innerHTML = "";

  if (produtos.length === 0) {
    if (mensagemStatus)
      mensagemStatus.textContent = "Nenhum cosmético encontrado.";
    return;
  }

  if (mensagemStatus) mensagemStatus.textContent = "";

  produtos.forEach((produto) => {
    const cartao = document.createElement("article");
    cartao.classList.add("card-produto");

    const info = obterInfoTraduzida(produto);
    const isFavorito = listaFavoritos.some((fav) => fav.id === produto.id);
    const iconeCoracao = isFavorito ? "♥" : "♡";

    cartao.innerHTML = `
            <button type="button" class="botao-favorito" data-id="${produto.id}" title="Favoritar">
                ${iconeCoracao}
            </button>
            <img src="${produto.thumbnail}" alt="${info.titulo}" class="img-produto" width="150">
            <h3>${info.titulo}</h3>
            <p class="descricao-curta">${info.resumo}</p>
            <p class="preco-produto"><strong>$ ${produto.price.toFixed(2)}</strong></p>
            <button type="button" class="botao-detalhes" data-id="${produto.id}">Ver Detalhes</button>
        `;

    vitrine.appendChild(cartao);
  });

  vincularEventosCards();
}

function vincularEventosCards() {
  if (!vitrine) return;

  const botoesFavoritar = vitrine.querySelectorAll(".botao-favorito");
  botoesFavoritar.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.getAttribute("data-id"));
      alternarFavorito(id);
    });
  });

  const botoesDetalhes = vitrine.querySelectorAll(".botao-detalhes");
  botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.getAttribute("data-id"));
      abrirDetalhesProduto(id);
    });
  });
}

// Favoritos e Desfazer
function alternarFavorito(idProduto) {
  const indice = listaFavoritos.findIndex((item) => item.id === idProduto);

  if (indice > -1) {
    ultimoFavoritoRemovido = listaFavoritos[indice];
    listaFavoritos.splice(indice, 1);

    // Exibe o aviso somente quando estiver vendo a lista de favoritos
    if (visualizandoApenasFavoritos) {
      exibirToastDesfazer();
    }
  } else {
    const produtoParaFavoritar =
      listaDeProdutosGeral.find((p) => p.id === idProduto) ||
      ultimoFavoritoRemovido;
    if (produtoParaFavoritar) listaFavoritos.push(produtoParaFavoritar);
    esconderToastDesfazer();
  }

  localStorage.setItem("allbella_favoritos", JSON.stringify(listaFavoritos));

  if (visualizandoApenasFavoritos) {
    mostrarTelaFavoritos();
  } else {
    exibirProdutos(listaDeProdutosGeral);
  }
}

function exibirToastDesfazer() {
  if (!toastDesfazer) return;
  toastDesfazer.classList.add("visivel");
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(esconderToastDesfazer, 5000);
}

function esconderToastDesfazer() {
  if (toastDesfazer) toastDesfazer.classList.remove("visivel");
}

if (btnDesfazer) {
  btnDesfazer.addEventListener("click", () => {
    if (ultimoFavoritoRemovido) {
      listaFavoritos.push(ultimoFavoritoRemovido);
      localStorage.setItem(
        "allbella_favoritos",
        JSON.stringify(listaFavoritos),
      );
      esconderToastDesfazer();
      ultimoFavoritoRemovido = null;

      if (visualizandoApenasFavoritos) {
        mostrarTelaFavoritos();
      } else {
        exibirProdutos(listaDeProdutosGeral);
      }
    }
  });
}

function mostrarTelaFavoritos() {
  visualizandoApenasFavoritos = true;
  botoesCategoria.forEach((b) => b.classList.remove("ativo"));

  if (listaFavoritos.length === 0) {
    if (vitrine) vitrine.innerHTML = "";
    if (mensagemStatus)
      mensagemStatus.textContent =
        "Você ainda não possui nenhum produto favoritado!";
    return;
  }

  exibirProdutos(listaFavoritos);
}

if (botaoVerFavoritos) {
  botaoVerFavoritos.addEventListener("click", () => {
    if (campoBusca) campoBusca.value = "";
    mostrarTelaFavoritos();
  });
}

// Detalhes do Produto (Modal)
function abrirDetalhesProduto(idProduto) {
  if (!modalDetalhes || !conteudoDetalhes) return;

  const produto =
    listaDeProdutosGeral.find((p) => p.id === idProduto) ||
    listaFavoritos.find((p) => p.id === idProduto);

  if (!produto) return;

  const info = obterInfoTraduzida(produto);

  conteudoDetalhes.innerHTML = `
        <button type="button" id="botao-fechar-modal" class="botao-fechar">×</button>
        <img src="${produto.thumbnail}" alt="${info.titulo}" width="200">
        <h2>${info.titulo}</h2>
        <p><strong>Categoria:</strong> ${produto.category}</p>
        <p><strong>Marca:</strong> ${produto.brand || "All Bella Cosméticos"}</p>
        <p><strong>Avaliação:</strong> ⭐ ${produto.rating} / 5</p>
        <p><strong>Estoque:</strong> ${produto.stock} unidades disponíveis</p>
        <p class="descricao-completa">${info.descricao}</p>
        <p class="preco-destaque"><strong>Preço:</strong> $ ${produto.price.toFixed(2)}</p>
    `;

  modalDetalhes.showModal();

  const btnFechar = document.getElementById("botao-fechar-modal");
  if (btnFechar) {
    btnFechar.addEventListener("click", () => modalDetalhes.close());
  }
}

if (modalDetalhes) {
  modalDetalhes.addEventListener("click", (evento) => {
    if (evento.target === modalDetalhes) modalDetalhes.close();
  });
}

// Pesquisa
function realizarPesquisa() {
  visualizandoApenasFavoritos = false;
  const termo = campoBusca ? campoBusca.value.trim().toLowerCase() : "";

  if (termo === "") {
    exibirProdutos(listaDeProdutosGeral);
    return;
  }

  const filtrados = listaDeProdutosGeral.filter((produto) => {
    const info = obterInfoTraduzida(produto);
    const tituloPt = info.titulo.toLowerCase();
    const resumoPt = info.resumo.toLowerCase();
    const descricaoPt = info.descricao.toLowerCase();

    return (
      tituloPt.includes(termo) ||
      resumoPt.includes(termo) ||
      descricaoPt.includes(termo)
    );
  });

  exibirProdutos(filtrados);
}

if (formBusca) {
  formBusca.addEventListener("submit", (evento) => {
    evento.preventDefault();
    realizarPesquisa();
  });
}

// Categorias e Navegação
botoesCategoria.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesCategoria.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    const categoria = botao.getAttribute("data-categoria");
    if (campoBusca) campoBusca.value = "";
    carregarProdutos(categoria);
  });
});

if (logoInicio) {
  logoInicio.addEventListener("click", () => {
    if (campoBusca) campoBusca.value = "";
    botoesCategoria.forEach((b) => b.classList.remove("ativo"));

    const botaoInicio = document.querySelector(
      '.botao-categoria[data-categoria="todos"]',
    );
    if (botaoInicio) botaoInicio.classList.add("ativo");

    carregarProdutos("todos");
  });
}

// Inicialização
carregarProdutos("todos");

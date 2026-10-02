document.addEventListener("DOMContentLoaded", function () {
  // 1. BASE DE DADOS DAS MÚSICAS (Incluindo imagemAutor e partitura)
  const bancoDeMusicas = {
    //Primeira musica
    victor: {
      titulo: "Victor's Piano Solo (A Noiva Cadáver)",
      autor: "Danny Elfman",
      historia:
        "Tocada pelo personagem Victor Van Dort no filme de Tim Burton. É uma peça melancólica e expressiva em tom menor, composta por Danny Elfman para refletir a timidez e os sentimentos profundos do personagem.",
      imagemAutor: "imagens/corpesBride.png",
      //Tentei colocar as partituras em pdf, sem sucesso
      partitura: "partituras/Victor Piano solo.png",
      audioSrc:
        "musica/“Victor’s Piano Solo” - Tim Burton’s Corpse Bride (HD Piano Cover, Movie Soundtrack).wav",
    },

    //Segunda musica
    jack: {
      titulo: "Jack's Lament /  (O Estranho Mundo de Jack)",
      autor: "Danny Elfman",
      historia:
        "Uma das obras mais famosas do cinema em Stop-Motion. A música combina elementos teatrais com mudanças rápidas de ritmo, expressando o fascínio e a crise existencial do Rei  Abóbora, Jack Skellington.",
      imagemAutor: "imagens/o estranho mundo de jack.png",
      partitura: "partituras/Jack s Lament.png",
      audioSrc:
        "musica/[PIANO TUTORIAL] Jack's Lament - Tim Burton's  (Easy Piano, Synthesia).wav",
    },

    //Terceira musica
    beethoven: {
      titulo: "Sonata ao Luar (Moonlight Sonata)",
      autor: "Ludwig van Beethoven",
      historia:
        "Concluída em 1801 e dedicada à sua aluna Giulietta Guicciardi. O primeiro movimento é famoso por seu tom sombrio, lento e arpejos contínuos que se tornaram símbolo do Romantismo.",
      imagemAutor: "imagens/Ludwig van Beethoven.png",
      partitura: "partituras/Sonata.png",
      audioSrc:
        "musica/Beethoven - Moonlight Sonata - Sonata ao Luar - Sonata Op. 27 n. 2 (Full).wav",
    },

    //Quarta musica
    chopin: {
      titulo: "Nocturne Op. 9 No. 2",
      autor: "Frédéric Chopin",
      historia:
        "Composta quando Chopin tinha cerca de 20 anos, esta obra é famosa por sua melodia cantável adornada por ornamentos delicados na mão direita e acompanhamento suave na mão esquerda.",
      imagemAutor: "imagens/Frédéric Chopin.png",
      partitura: "partituras/Nocturne.png",
      audioSrc: "musica/Chopin - Nocturne op.9 No.2.wav",
    },
  };

  // 2. SELEÇÃO DOS ELEMENTOS DO DOM
  const campoNome = document.getElementById("nome-usuario");
  const msgSaudacao = document.getElementById("mensagem-saudacao");
  const formPeca = document.getElementById("form-peca");
  const selectCompositor = document.getElementById("compositor");
  const btnAlternarTema = document.getElementById("btn-alternar-tema");

  // Elementos do Quadro de Detalhes
  const quadroDetalhes = document.getElementById("quadro-detalhes");
  const detalheTitulo = document.getElementById("detalhe-titulo");
  const detalheAutor = document.getElementById("detalhe-autor");
  const detalheHistoria = document.getElementById("detalhe-historia");
  const detalhePartitura = document.getElementById("detalhe-partitura");
  const detalheImagemAutor = document.getElementById("detalhe-imagem-autor"); // Elemento da imagem do autor/obra

  // Player de Áudio
  const playerAudio = document.getElementById("player-audio");
  const fonteAudio = document.getElementById("fonte-audio");

  // Curtidas
  const btnCurtir = document.getElementById("btn-curtir");
  const contadorCurtidas = document.getElementById("contador-curtidas");

  let curtidasAtual = 0;

  // 3. SAUDAÇÃO EM TEMPO REAL
  if (campoNome && msgSaudacao) {
    campoNome.addEventListener("input", function () {
      const nome = campoNome.value.trim();
      if (nome === "") {
        msgSaudacao.textContent = "Bem-vindo(a) ao nosso universo musical!";
      } else {
        msgSaudacao.textContent =
          "Olá, " +
          nome +
          "! Explore as partituras, áudios e histórias abaixo.";
      }
    });
  }

  // 4. SUBMIT DO FORMULÁRIO
  if (formPeca) {
    formPeca.addEventListener("submit", function (event) {
      event.preventDefault();

      const chaveMusica = selectCompositor.value;

      if (chaveMusica === "") {
        alert("Por favor, selecione uma música!");
        return;
      }

      const musicaSelecionada = bancoDeMusicas[chaveMusica];

      // Atualiza informações no DOM
      detalheTitulo.textContent = musicaSelecionada.titulo;
      detalheAutor.textContent = musicaSelecionada.autor;
      detalheHistoria.textContent = musicaSelecionada.historia;
      detalhePartitura.src = musicaSelecionada.partitura;
      detalheImagemAutor.src = musicaSelecionada.imagemAutor; // Define a imagem do autor ou da obra

      // Carrega o áudio
      fonteAudio.src = musicaSelecionada.audioSrc;
      playerAudio.load();

      // Reseta contador de curtidas e exibe o quadro
      curtidasAtual = 0;
      contadorCurtidas.textContent = "0 curtidas";
      quadroDetalhes.classList.remove("oculto");
    });
  }

  // 5. BOTÃO CURTIR
  if (btnCurtir) {
    btnCurtir.addEventListener("click", function () {
      curtidasAtual++;
      contadorCurtidas.textContent = curtidasAtual + " curtida(s)!";
    });
  }

  // 6. TEMA CLARO / ESCURO (Alterna a classe no body)
  if (btnAlternarTema) {
    btnAlternarTema.addEventListener("click", function () {
      document.body.classList.toggle("tema-claro");
    });
  }
});

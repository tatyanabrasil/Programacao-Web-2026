const API_URL = 'http://localhost:3000/api/animes';

let listaAnimesMemoria = [];
let idParaExcluir = null;

// Modais
const modalForm = document.getElementById('modal-formulario');
const modalExcluir = document.getElementById('modal-excluir');

// Elementos de Filtro
const filtroBusca = document.getElementById('filtro-busca');
const filtroStatus = document.getElementById('filtro-status');

// Elementos de Imagem
const inputImagemUrl = document.getElementById('imagem-url');
const inputImagemArquivo = document.getElementById('imagem-arquivo');
const inputImagemFinal = document.getElementById('imagem-final');
const previewContainer = document.getElementById('preview-container');
const previewImg = document.getElementById('preview-img');

document.addEventListener('DOMContentLoaded', () => {
    carregarAnimes();

    // Abrir modal de cadastro limpo
    document.getElementById('btn-abrir-cadastro').addEventListener('click', () => {
        limparFormulario();
        modalForm.showModal();
    });

    // Fechar modal de cadastro/edição
    document.getElementById('btn-fechar-modal-form').addEventListener('click', () => modalForm.close());
    document.getElementById('btn-cancelar').addEventListener('click', () => modalForm.close());

    // Fechar modal de exclusão
    document.getElementById('btn-cancelar-exclusao').addEventListener('click', () => {
        idParaExcluir = null;
        modalExcluir.close();
    });

    // Confirmar exclusão dentro do modal
    document.getElementById('btn-confirmar-exclusao').addEventListener('click', executarExclusao);

    // Envio do formulário (POST ou PUT)
    document.getElementById('anime-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await salvarAnime();
    });

    // Filtros em tempo real (consultando a API ordenada)
    filtroBusca.addEventListener('input', carregarAnimes);
    filtroStatus.addEventListener('change', carregarAnimes);

    // Controle de imagem via URL
    inputImagemUrl.addEventListener('input', () => {
        const url = inputImagemUrl.value.trim();
        inputImagemFinal.value = url;
        atualizarPreview(url);
    });

    // Controle de imagem via Arquivo do Computador
    inputImagemArquivo.addEventListener('change', (e) => {
        const arquivo = e.target.files[0];
        if (!arquivo) return;

        const leitor = new FileReader();
        leitor.onload = (evento) => {
            const base64 = evento.target.result;
            inputImagemFinal.value = base64;
            inputImagemUrl.value = '';
            atualizarPreview(base64);
        };
        leitor.readAsDataURL(arquivo);
    });

    // Remover imagem selecionada
    document.getElementById('btn-remover-img').addEventListener('click', () => {
        inputImagemFinal.value = '';
        inputImagemUrl.value = '';
        inputImagemArquivo.value = '';
        atualizarPreview('');
    });
});

function atualizarPreview(src) {
    if (src) {
        previewImg.src = src;
        previewContainer.classList.remove('hidden');
    } else {
        previewImg.src = '';
        previewContainer.classList.add('hidden');
    }
}

async function carregarAnimes() {
    try {
        const params = new URLSearchParams();
        if (filtroBusca.value.trim()) params.append('busca', filtroBusca.value.trim());
        if (filtroStatus.value) params.append('status', filtroStatus.value);

        const urlConsulta = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
        const resposta = await fetch(urlConsulta);
        const animes = await resposta.json();

        listaAnimesMemoria = animes;

        const grid = document.getElementById('animes-grid');
        const contador = document.getElementById('contador-animes');
        contador.textContent = `${animes.length} ${animes.length === 1 ? 'anime' : 'animes'}`;
        grid.innerHTML = '';

        if (animes.length === 0) {
            grid.innerHTML = '<p>Nenhum anime encontrado com esse filtro.</p>';
            return;
        }

        animes.forEach(anime => {
            const card = document.createElement('div');
            card.className = 'anime-card';

            const capaHtml = anime.imagem
                ? `<div class="capa-wrapper"><img src="${anime.imagem}" alt="Capa de ${anime.titulo}" onerror="this.parentElement.innerHTML='<span class=capa-placeholder>🌸</span>'"></div>`
                : `<div class="capa-wrapper"><span class="capa-placeholder">🌸</span></div>`;

            card.innerHTML = `
                <div>
                    ${capaHtml}
                    <div class="card-corpo">
                        <h3>${anime.titulo}</h3>
                        <p><strong>Gênero:</strong> ${anime.genero}</p>
                        <p><strong>Episódios:</strong> ${anime.episodios} | <strong>Nota:</strong> ⭐ ${anime.nota || 'N/A'}</p>
                        <p><strong>Status:</strong> ${anime.status || 'Assistindo'}</p>
                        <p class="sinopse">"${anime.sinopse || 'Sem sinopse cadastrada.'}"</p>
                    </div>
                </div>
                <div class="card-buttons">
                    <button type="button" class="btn-editar" onclick="abrirEdicao(${anime.id})">Editar</button>
                    <button type="button" class="btn-excluir" onclick="abrirConfirmacaoExclusao(${anime.id})">Excluir</button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        mostrarMensagem('Erro ao conectar com o servidor.', 'erro');
    }
}

async function salvarAnime() {
    const id = document.getElementById('anime-id').value;
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const episodios = document.getElementById('episodios').value;
    const nota = document.getElementById('nota').value;
    const status = document.getElementById('status').value;
    const sinopse = document.getElementById('sinopse').value;
    const imagem = inputImagemFinal.value;

    const dados = { titulo, genero, episodios, nota, status, sinopse, imagem };

    try {
        const resposta = await fetch(id ? `${API_URL}/${id}` : API_URL, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        const resultado = await resposta.json();

        if (!resposta.ok) {
            mostrarMensagem(resultado.erro || 'Erro ao salvar.', 'erro');
            return;
        }

        modalForm.close();
        limparFormulario();
        mostrarMensagem(resultado.mensagem, 'sucesso');
        carregarAnimes();
    } catch (err) {
        mostrarMensagem('Erro ao enviar dados para o servidor.', 'erro');
    }
}

function abrirEdicao(id) {
    const anime = listaAnimesMemoria.find(item => item.id === id);
    if (!anime) return;

    document.getElementById('anime-id').value = anime.id;
    document.getElementById('titulo').value = anime.titulo;
    document.getElementById('genero').value = anime.genero;
    document.getElementById('episodios').value = anime.episodios;
    document.getElementById('nota').value = anime.nota;
    document.getElementById('status').value = anime.status;
    document.getElementById('sinopse').value = anime.sinopse;

    const imgAtual = anime.imagem || '';
    inputImagemFinal.value = imgAtual;
    inputImagemUrl.value = imgAtual.startsWith('data:image') ? '' : imgAtual;
    atualizarPreview(imgAtual);

    document.getElementById('form-titulo').innerText = 'Editar Anime';
    document.getElementById('btn-salvar').innerText = 'Atualizar Anime';
    modalForm.showModal();
}

function limparFormulario() {
    document.getElementById('anime-form').reset();
    document.getElementById('anime-id').value = '';
    inputImagemFinal.value = '';
    inputImagemUrl.value = '';
    inputImagemArquivo.value = '';
    atualizarPreview('');
    document.getElementById('form-titulo').innerText = 'Cadastrar Novo Anime';
    document.getElementById('btn-salvar').innerText = 'Salvar Anime';
}

function abrirConfirmacaoExclusao(id) {
    const anime = listaAnimesMemoria.find(item => item.id === id);
    idParaExcluir = id;
    document.getElementById('texto-confirmar-exclusao').textContent =
        anime ? `Tem certeza que deseja excluir "${anime.titulo}" do catálogo?` : 'Deseja excluir este anime?';
    modalExcluir.showModal();
}

async function executarExclusao() {
    if (!idParaExcluir) return;
    try {
        const resposta = await fetch(`${API_URL}/${idParaExcluir}`, { method: 'DELETE' });
        const resultado = await resposta.json();

        modalExcluir.close();
        idParaExcluir = null;

        if (!resposta.ok) {
            mostrarMensagem(resultado.erro || 'Erro ao excluir.', 'erro');
            return;
        }

        mostrarMensagem(resultado.mensagem, 'sucesso');
        carregarAnimes();
    } catch (err) {
        mostrarMensagem('Erro ao excluir o registro.', 'erro');
    }
}

function mostrarMensagem(texto, tipo) {
    const msgDiv = document.getElementById('mensagem');
    msgDiv.innerText = texto;
    msgDiv.className = `mensagem ${tipo}`;
    msgDiv.classList.remove('hidden');
    setTimeout(() => msgDiv.classList.add('hidden'), 4000);
}
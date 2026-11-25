const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Limite de 10mb permite salvar imagens selecionadas do próprio computador
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.resolve(__dirname, 'animes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Servidor conectado ao SQLite com sucesso!');
    db.run(`CREATE TABLE IF NOT EXISTS animes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      genero TEXT NOT NULL,
      episodios INTEGER NOT NULL,
      nota REAL,
      status TEXT,
      sinopse TEXT,
      imagem TEXT
    )`, () => {
      db.run(`ALTER TABLE animes ADD COLUMN imagem TEXT`, () => {});
    });
  }
});

// GET: Lista animes em ORDEM ALFABÉTICA com suporte a filtro de busca e status
app.get('/api/animes', (req, res) => {
  const { busca, status } = req.query;
  let sql = 'SELECT * FROM animes WHERE 1=1';
  const params = [];

  if (busca) {
    sql += ' AND (titulo LIKE ? OR genero LIKE ?)';
    params.push(`%${busca}%`, `%${busca}%`);
  }

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  sql += ' ORDER BY titulo COLLATE NOCASE ASC';

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// POST: Cadastra novo anime
app.post('/api/animes', (req, res) => {
  const { titulo, genero, episodios, nota, status, sinopse, imagem } = req.body;
  if (!titulo || !genero || !episodios) {
    return res.status(400).json({ erro: 'Preencha os campos obrigatórios (Título, Gênero e Episódios).' });
  }

  const query = `INSERT INTO animes (titulo, genero, episodios, nota, status, sinopse, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [titulo.trim(), genero.trim(), episodios, nota || 0, status || 'Assistindo', sinopse || '', imagem || ''], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: this.lastID, mensagem: 'Anime cadastrado com sucesso!' });
  });
});

// PUT: Atualiza um anime existente
app.put('/api/animes/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, genero, episodios, nota, status, sinopse, imagem } = req.body;

  if (!titulo || !genero || !episodios) {
    return res.status(400).json({ erro: 'Preencha os campos obrigatórios para atualizar.' });
  }

  const query = `UPDATE animes SET titulo = ?, genero = ?, episodios = ?, nota = ?, status = ?, sinopse = ?, imagem = ? WHERE id = ?`;
  db.run(query, [titulo.trim(), genero.trim(), episodios, nota || 0, status || 'Assistindo', sinopse || '', imagem || '', id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Anime não encontrado.' });
    res.json({ mensagem: 'Anime atualizado com sucesso!' });
  });
});

// DELETE: Exclui um anime
app.delete('/api/animes/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM animes WHERE id = ?`, id, function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Anime não encontrado.' });
    res.json({ mensagem: 'Anime excluído com sucesso!' });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
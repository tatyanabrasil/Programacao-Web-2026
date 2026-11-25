const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../animes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS animes`, (err) => {
    if (err) {
      console.error('Erro ao apagar tabela antiga:', err.message);
      return;
    }

    db.run(`
      CREATE TABLE animes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        genero TEXT NOT NULL,
        episodios INTEGER NOT NULL,
        nota REAL,
        status TEXT,
        sinopse TEXT,
        imagem TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela:', err.message);
        return;
      }
      console.log('Tabela "animes" criada com sucesso.');

      const animesIniciais = [
        ['Attack on Titan', 'Ação', 89, 9.1, 'Completo', 'A humanidade luta pela sobrevivência dentro de muralhas contra titãs devoradores.', 'https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'],
        ['Baki', 'Ação', 39, 8.0, 'Completo', 'Um jovem lutador treina intensamente para superar seu poderoso pai nas artes marciais.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBPJ7FR1zR2w5In6uafbtEZ9ocKL-YY3NZ7PyqJ_ZohATDcsQzm8HG0c&s=10'],
        ['Death Note', 'Suspense', 37, 8.9, 'Completo', 'Um estudante encontra um caderno sobrenatural que mata quem tiver o nome escrito.', 'https://m.media-amazon.com/images/S/pv-target-images/2fac05d582494e996087fbc93b4137e8413f81c8891f5d38a58e46d36cd84966.jpg'],
        ['Fullmetal Alchemist: Brotherhood', 'Ação', 64, 9.5, 'Completo', 'Dois irmãos buscam a Pedra Filosofal após uma tragédia alquímica.', 'https://i.etsystatic.com/61314533/r/il/f1721f/7549778033/il_fullxfull.7549778033_6gqy.jpg'],
        ['Haikyuu', 'Esportes', 85, 8.8, 'Completo', 'Um estudante apaixonado por voleibol busca levar seu time ao topo do campeonato nacional.', 'https://m.media-amazon.com/images/M/MV5BYjYxMWFlYTAtYTk0YS00NTMxLWJjNTQtM2E0NjdhYTRhNzE4XkEyXkFqcGc@._V1_.jpg'],
        ['Hunter x Hunter', 'Aventura', 148, 9.0, 'Completo', 'Um garoto parte em uma jornada perigosa para se tornar um Hunter e encontrar o pai.', 'https://m.media-amazon.com/images/M/MV5BYzYxOTlkYzctNGY2MC00MjNjLWIxOWMtY2QwYjcxZWIwMmEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'],
        ['Kaguya-sama: Love Is War', 'Comédia Romântica', 37, 8.5, 'Assistindo', 'Dois presidentes de conselho estudantil orgulhosos tentam fazer o outro se declarar primeiro.', 'https://m.media-amazon.com/images/S/pv-target-images/44281d7bcce8a5ffd08996a6c9bd6bcb0e3c5be6d24fd1fa225f4cca1b04a889.jpg'],
        ['Kusuriya no Hitorigoto', 'Mistério', 24, 8.9, 'Assistindo', 'Uma jovem apotecária usa seus conhecimentos de venenos e medicina para resolver mistérios no palácio imperial.', 'https://m.media-amazon.com/images/M/MV5BNjAxMmFjZjgtYjM1ZS00NzdmLTliZDktZmIyMzU5YTBlNDBmXkEyXkFqcGc@._V1_.jpg'],
        ['Mob Psycho 100', 'Sobrenatural', 25, 8.6, 'Completo', 'Um jovem psychic poderoso tenta viver uma vida normal e reprimir suas emoções.', 'https://occ-0-2794-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaN86OB2KasEu16UUgoxtHefmXQYrfC0aC6QBlF4PKHSW4Nuzd788lPPsyFH2fWq0MYWLIt81ujHlIynuP3gRu3nS1kafTNbZMSc.jpg?r=428'],
        ['Spy x Family', 'Comédia', 25, 8.3, 'Assistindo', 'Um espião monta uma família falsa com uma assassina e uma telepata para uma missão.', 'https://m.media-amazon.com/images/S/pv-target-images/fa084ba0b8f6fb938c218fe8c9d689ece6b28196490ede47fac9a3894b5ab342._UR1920,1080_.jpg']
      ];

      const stmt = db.prepare(`INSERT INTO animes (titulo, genero, episodios, nota, status, sinopse, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)`);
      animesIniciais.forEach(anime => {
        stmt.run(anime);
      });
      stmt.finalize(() => {
        console.log('10 animes iniciais inseridos com sucesso!');
        db.close();
      });
    });
  });
});
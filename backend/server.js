const express = require('express');
const cors = require('cors');
const playlistsRouter = require('./routes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/playlists', playlistsRouter);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/*
Exemplo de JSON para teste:

{
  "name": "Rock",
  "tags": ["rock", "metal"]
}
*/
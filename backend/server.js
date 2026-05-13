const express = require ('express');
const playlistsRouter = require ('./routes');
const app = express ();

app.use (express.json ());

app.use ('/api/playlists', playlistsRouter);

const PORT = 3000;

app.listen (PORT, () => {
  console.log (`Servidor rodando na porta ${PORT}`);
});

const cors = require('cors')

app.use(cors())

// {
//   "name": "Rock",
//   "tags": ["rock", "metal"]
// }
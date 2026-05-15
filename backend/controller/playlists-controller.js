const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, 'playlists.json')

// Carrega os dados do arquivo ao iniciar
let playlists = []

if (fs.existsSync(dataPath)) {
  const data = fs.readFileSync(dataPath, 'utf-8')
  playlists = JSON.parse(data)
}

// Função para salvar no arquivo
function saveData() {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(playlists, null, 2)
  )
}

function generateRandomID() {
  return Math.floor(Math.random() * 999999)
}

module.exports = {
  // GET /api/playlists
  index: (req, res) => {
    res.json(playlists)
  },

  // GET /api/playlists/:id
  show: (req, res) => {
    const { id } = req.params

    const playlist = playlists.find(pl => pl.id === +id)

    if (!playlist) {
      return res.status(404).json({
        message: 'playlist not found'
      })
    }

    res.json(playlist)
  },

  // POST /api/playlists
  save: (req, res) => {
    const { name, tags, musics } = req.body

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: 'name must be a string'
      })
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({
        message: 'tags must be an array'
      })
    }

    if (musics && !Array.isArray(musics)) {
      return res.status(400).json({
        message: 'musics must be an array'
      })
    }

    const newPlaylist = {
      id: generateRandomID(),
      name,
      tags,
      musics: musics ?? []
    }

    playlists.push(newPlaylist)

    saveData()

    res.status(201).json(newPlaylist)
  },

  // PUT /api/playlists/:id
  update: (req, res) => {
    const { id } = req.params
    const { name, tags } = req.body

    const playlistIndex = playlists.findIndex(pl => pl.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({
        message: 'playlist not found'
      })
    }

    if (name !== undefined && typeof name !== 'string') {
      return res.status(400).json({
        message: 'name must be a string'
      })
    }

    if (tags !== undefined && !Array.isArray(tags)) {
      return res.status(400).json({
        message: 'tags must be an array'
      })
    }

    if (typeof name === 'string') {
      playlists[playlistIndex].name = name
    }

    if (Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags
    }

    saveData()

    res.json(playlists[playlistIndex])
  },

  // DELETE /api/playlists/:id
  delete: (req, res) => {
    const { id } = req.params

    const playlistIndex = playlists.findIndex(pl => pl.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({
        message: 'playlist not found'
      })
    }

    const deletedPlaylist = playlists.splice(playlistIndex, 1)[0]

    saveData()

    res.json(deletedPlaylist)
  },

  // POST /api/playlists/:playlistId/musics
  addMusic: (req, res) => {
    const { playlistId } = req.params
    const { title, year, artist, album } = req.body

    const playlist = playlists.find(pl => pl.id === +playlistId)

    if (!playlist) {
      return res.status(404).json({
        message: 'playlist not found'
      })
    }

    const parsedYear = Number(year)

    if (
      typeof title !== 'string' ||
      isNaN(parsedYear) ||
      typeof artist !== 'string' ||
      typeof album !== 'string'
    ) {
      return res.status(400).json({
        message: 'invalid fields'
      })
    }

    const newMusic = {
      id: generateRandomID(),
      title,
      year: parsedYear,
      artist,
      album
    }

    playlist.musics.push(newMusic)

    saveData()

    res.status(201).json(newMusic)
  },

  // DELETE /api/playlists/:playlistId/musics/:musicId
  removeMusic: (req, res) => {
    const { playlistId, musicId } = req.params

    const playlist = playlists.find(
      pl => pl.id === +playlistId
    )

    if (!playlist) {
      return res.status(404).json({
        message: 'playlist not found'
      })
    }

    const musicIndex = playlist.musics.findIndex(
      music => music.id === +musicId
    )

    if (musicIndex === -1) {
      return res.status(404).json({
        message: 'music not found'
      })
    }

    playlist.musics.splice(musicIndex, 1)

    saveData()

    res.status(204).end()
  },

  // PUT /api/playlists/:playlistId/musics/:musicId
  editMusic: (req, res) => {
    const { playlistId, musicId } = req.params
    const { title, year, artist, album } = req.body

    const playlist = playlists.find(
      pl => pl.id === +playlistId
    )

    if (!playlist) {
      return res.status(404).json({
        message: 'playlist not found'
      })
    }

    const musicIndex = playlist.musics.findIndex(
      music => music.id === +musicId
    )

    if (musicIndex === -1) {
      return res.status(404).json({
        message: 'music not found'
      })
    }

    if (
      (title !== undefined && typeof title !== 'string') ||
      (year !== undefined && isNaN(Number(year))) ||
      (artist !== undefined && typeof artist !== 'string') ||
      (album !== undefined && typeof album !== 'string')
    ) {
      return res.status(400).json({
        message: 'invalid fields'
      })
    }

    if (title !== undefined) {
      playlist.musics[musicIndex].title = title
    }

    if (year !== undefined) {
      playlist.musics[musicIndex].year = Number(year)
    }

    if (artist !== undefined) {
      playlist.musics[musicIndex].artist = artist
    }

    if (album !== undefined) {
      playlist.musics[musicIndex].album = album
    }

    saveData()

    res.json(playlist.musics[musicIndex])
  }
}
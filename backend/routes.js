const express = require('express')
const playlistsController = require('./controller/playlists-controller')

const playlistsRouter = express.Router()

// PLAYLISTS
playlistsRouter.get('/', playlistsController.index)

playlistsRouter.get('/:id', playlistsController.show)

playlistsRouter.post('/', playlistsController.save)

playlistsRouter.put('/:id', playlistsController.update)

playlistsRouter.delete('/:id', playlistsController.delete)

// MUSICS
playlistsRouter.post(
  '/:playlistId/musics',
  playlistsController.addMusic
)

playlistsRouter.delete(
  '/:playlistId/musics/:musicId',
  playlistsController.removeMusic
)

// EDIT MUSIC
playlistsRouter.put(
  '/:playlistId/musics/:musicId',
  playlistsController.editMusic
)

module.exports = playlistsRouter
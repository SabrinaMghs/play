import { useState } from 'react'
import { api } from '../services/api'
import MusicForm from './MusicForm'

import styles from '../styles/PlaylistCard.module.css'

function PlaylistCard({ playlist, onDelete, refresh }) {
  const [editingMusicId, setEditingMusicId] = useState(null)

  const [editData, setEditData] = useState({
    title: '',
    artist: '',
    album: '',
    year: ''
  })

  async function addMusic(data) {
    try {
      await api.post(
        `/playlists/${playlist.id}/musics`,
        data
      )

      refresh()
    } catch (error) {
      console.log(error)
    }
  }

  async function removeMusic(musicId) {
    try {
      await api.delete(
        `/playlists/${playlist.id}/musics/${musicId}`
      )

      refresh()
    } catch (error) {
      console.log(error)
    }
  }

  function startEditing(music) {
    setEditingMusicId(music.id)

    setEditData({
      title: music.title,
      artist: music.artist,
      album: music.album,
      year: music.year
    })
  }

  async function saveEdit(musicId) {
    try {
      await api.put(
        `/playlists/${playlist.id}/musics/${musicId}`,
        editData
      )

      setEditingMusicId(null)

      refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h2>{playlist.name}</h2>

        <button onClick={() => onDelete(playlist.id)}>
          Excluir
        </button>
      </div>

      <div className={styles.tags}>
        {playlist.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <MusicForm onSubmit={addMusic} />

      <div className={styles.musicList}>
        {playlist.musics.map(music => (
          <div
            key={music.id}
            className={styles.musicCard}
          >
            {editingMusicId === music.id ? (
              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={e =>
                    setEditData({
                      ...editData,
                      title: e.target.value
                    })
                  }
                  placeholder="Título"
                />

                <input
                  type="text"
                  value={editData.artist}
                  onChange={e =>
                    setEditData({
                      ...editData,
                      artist: e.target.value
                    })
                  }
                  placeholder="Artista"
                />

                <input
                  type="text"
                  value={editData.album}
                  onChange={e =>
                    setEditData({
                      ...editData,
                      album: e.target.value
                    })
                  }
                  placeholder="Álbum"
                />

                <input
                  type="number"
                  value={editData.year}
                  onChange={e =>
                    setEditData({
                      ...editData,
                      year: e.target.value
                    })
                  }
                  placeholder="Ano"
                />

                <button className={styles.editMusic}
                  onClick={() => saveEdit(music.id)}
                >
                  📝
                </button>

                <button className={styles.editMusic}
                  onClick={() =>
                    setEditingMusicId(null)
                  }
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <h3>{music.title}</h3>

                <p>{music.artist}</p>

                <small>
                  {music.album} • {music.year}
                </small>

                <div className={styles.actions}>
                  <button
                    className={styles.removeMusic}
                    onClick={() =>
                      startEditing(music)
                    }
                  >
                    ✏️
                  </button>

                  <button
                    className={styles.removeMusic}
                    onClick={() =>
                      removeMusic(music.id)
                    }
                  >
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistCard
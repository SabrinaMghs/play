import { api } from '../services/api'
import MusicForm from './MusicForm'

import styles from '../styles/PlaylistCard.module.css'

function PlaylistCard({ playlist, onDelete, refresh }) {
  async function addMusic(data) {
    try {
      await api.post(`/playlists/${playlist.id}/musics`, data)
      refresh()
    } catch (error) {
      console.log(error)
    }
  }

  async function removeMusic(musicId) {
    try {
      await api.delete(`/playlists/${playlist.id}/musics/${musicId}`)
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
          <div key={music.id} className={styles.musicCard}>
            <h3>{music.title}</h3>
            <p>{music.artist}</p>
            <small>
              {music.album} • {music.year}
            </small>
            <button
              className={styles.removeMusic}
              onClick={() => removeMusic(music.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistCard
import { useEffect, useState } from 'react'
import { api } from './services/api'

import PlaylistForm from './components/PlaylistForm'
import PlaylistCard from './components/PlaylistCard'

import styles from './styles/App.module.css'

function App() {
  const [playlists, setPlaylists] = useState([])

  async function fetchPlaylists() {
    try {
      const response = await api.get('/playlists')
      setPlaylists(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPlaylists()
  }, [])

  async function createPlaylist(data) {
    try {
      await api.post('/playlists', data)
      fetchPlaylists()
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePlaylist(id) {
    try {
      await api.delete(`/playlists/${id}`)
      fetchPlaylists()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Playlist API</h1>
        <p>Gerencie suas playlists favoritas</p>
      </header>

      <PlaylistForm onSubmit={createPlaylist} />

      <section className={styles.grid}>
        {playlists.map(playlist => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onDelete={deletePlaylist}
            refresh={fetchPlaylists}
          />
        ))}
      </section>
    </div>
  )
}

export default App
import { useState } from 'react'
import styles from '../styles/MusicForm.module.css'

function MusicForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [year, setYear] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      title,
      artist,
      album,
      year: Number(year)
    })

    setTitle('')
    setArtist('')
    setAlbum('')
    setYear('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Artista"
        value={artist}
        onChange={e => setArtist(e.target.value)}
      />

      <input
        type="text"
        placeholder="Álbum"
        value={album}
        onChange={e => setAlbum(e.target.value)}
      />

      <input
        type="number"
        placeholder="Ano"
        value={year}
        onChange={e => setYear(e.target.value)}
      />

      <button>Adicionar Música</button>
    </form>
  )
}

export default MusicForm
import { useState } from 'react'
import styles from '../styles/MusicForm.module.css'

function MusicForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [year, setYear] = useState('')

  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  async function handleSearch() {
    const query = [title, artist].filter(Boolean).join(' ')
    if (!query.trim()) {
      setSearchError('Digite o título ou artista para buscar.')
      return
    }

    setSearching(true)
    setSearchError('')
    setSearchResults([])

    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=5`
      )
      const data = await res.json()

      if (data.resultCount === 0) {
        setSearchError('Nenhuma música encontrada.')
      } else {
        setSearchResults(data.results)
      }
    } catch {
      setSearchError('Erro ao buscar. Tente novamente.')
    } finally {
      setSearching(false)
    }
  }

  function fillFromResult(result) {
    setTitle(result.trackName || '')
    setArtist(result.artistName || '')
    setAlbum(result.collectionName || '')
    setYear(result.releaseDate ? new Date(result.releaseDate).getFullYear().toString() : '')
    setSearchResults([])
  }

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
    setSearchResults([])
    setSearchError('')
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

      <button
        type="button"
        className={styles.searchBtn}
        onClick={handleSearch}
        disabled={searching}
      >
        {searching ? 'Buscando...' : '🔍 Buscar no iTunes'}
      </button>

      {searchError && (
        <p className={styles.searchError}>{searchError}</p>
      )}

      {searchResults.length > 0 && (
        <ul className={styles.results}>
          {searchResults.map(r => (
            <li key={r.trackId} className={styles.resultItem}>
              <img src={r.artworkUrl60} alt={r.trackName} className={styles.artwork} />

              <div className={styles.resultInfo}>
                <span className={styles.resultTitle}>{r.trackName}</span>
                <span className={styles.resultArtist}>{r.artistName} — {r.collectionName}</span>
              </div>

              <div className={styles.resultActions}>
                <button
                  type="button"
                  className={styles.fillBtn}
                  onClick={() => fillFromResult(r)}
                >
                  Usar
                </button>

                <a
                  href={r.trackViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.listenBtn}
                >
                  Ouvir ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button type="submit" className={styles.submitBtn}>
        Adicionar Música
      </button>
    </form>
  )
}

export default MusicForm

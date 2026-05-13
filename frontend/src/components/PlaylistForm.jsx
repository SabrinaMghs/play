import { useState } from 'react'
import styles from '../styles/PlaylistForm.module.css'

function PlaylistForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const formattedTags = tags
      .split(',')
      .map(tag => tag.trim())

    onSubmit({
      name,
      tags: formattedTags
    })

    setName('')
    setTags('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da playlist"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags separadas por vírgula"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />

      <button>Criar Playlist</button>
    </form>
  )
}

export default PlaylistForm
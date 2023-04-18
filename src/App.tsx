import React, { useState } from 'react'
import WordFacade from "./api/api"
import './App.css'

function App() {
  const [word, setWord] = useState<string>("")
  const [synonym, setSynonym] = useState<string[]>([])

  const handleSearch = async (word: string) =>{
    const data = await WordFacade.getSynonymData(word);
    setSynonym(data)
  }

  const handleFetchSynonym = (e: React.FormEvent) =>{
    e.preventDefault()
    handleSearch(word)

  }

  return (
    <div className="App">
      <form onSubmit={handleFetchSynonym}>
        <label htmlFor='word-input'>Your Word</label>
        <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        id="word-input"
        name='word-input'
        ></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App

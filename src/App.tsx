import React, { useState } from 'react'
import WordFacade from "./api/api"
import './App.css'

interface Synonym {
  word: string,
  score: number
}

function App() {
  const [word, setWord] = useState<string>("")
  const [synonym, setSynonym] = useState<Synonym[]>([])

  const handleSearch = async (word: string) =>{
    const data = await WordFacade.getSynonymData(word);
    setSynonym(data)
  }

  const handleFetchSynonym = (e: React.FormEvent) =>{
    e.preventDefault()
    handleSearch(word)

  }

  const handleNewWordClicked = async (newWord: string) =>{
    const newWordData = await WordFacade.getSynonymData(newWord)
    setSynonym(newWordData)
    setWord(newWord)
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

        <ul>
        {synonym.map((synonyms, idx)=>(
          <li key={idx} onClick={()=>handleNewWordClicked(synonyms.word)}>{synonyms.word}</li>
        ))}
        </ul>
      </form>
    </div>
  )
}

export default App

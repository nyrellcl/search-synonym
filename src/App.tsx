import React, { useState } from "react";

import { SynonymFinder } from "./api/api";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [synonym, setSynonym] = useState<string[]>([]);

  const handleSearch = async (word: string) => {
    const finder = new SynonymFinder();
    const synonymResults = await finder.findSynonyms(word);
    setSynonym(synonymResults);
  };

  const handleFetchSynonym = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchWord);
  }

  const handleNewWordClicked = async (newWord: string) => {
    const newWordFinder = new SynonymFinder();
    const newWordData = await newWordFinder.findSynonyms(newWord);
    setSynonym(newWordData);
    setSearchWord(newWord);
  };

  return (
    <div className="App">
      <form onSubmit={handleFetchSynonym}>
        <label htmlFor="word-input">Your Word</label>
        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          id="word-input"
          name="word-input"
        ></input>
        <button type="submit">Submit</button>

        <ul>
          {synonym.map((synonyms, idx) => (
            <li key={idx} onClick={() => handleNewWordClicked(synonyms)}>
              {synonyms}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;

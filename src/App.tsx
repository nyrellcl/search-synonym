import React, { useState } from "react";

import { SynonymFinder, SynonymFinderFacade } from "./api/api";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [synonym, setSynonym] = useState<string[]>([]);

  const handleSearch = async (word: string) => {
    const synonymFinder = new SynonymFinder();
    const synonymFacade = new SynonymFinderFacade(synonymFinder)
    const synonymResults = await synonymFacade.findSynonyms(word);
    setSynonym(synonymResults);
  };

  const handleFetchSynonym = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchWord);
  }

  const handleNewWordClicked = async (newWord: string) => {
    const newSynonymFinder = new SynonymFinder();
    const newSynonymFinderFacade = new SynonymFinderFacade(newSynonymFinder)
    const newWordData = await newSynonymFinderFacade.findSynonyms(newWord);
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

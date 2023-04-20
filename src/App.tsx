import React, { useState } from "react";

import { SynonymGetter, SynonymFinderFacade } from "./api/api";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [synonym, setSynonym] = useState<string[]>([]);

  const handleSearch = async (word: string) => {
    const getSynonym = new SynonymGetter();
    const synonymFacade = new SynonymFinderFacade(getSynonym)
    const synonymResults = await synonymFacade.getSynonyms(word);
    setSynonym(synonymResults);
  };

  const handleFetchSynonym = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchWord);
  }

  const handleNewWordClicked = async (newWord: string) => {
    const getNewSynonym = new SynonymGetter();
    const getNewSynonymFacade = new SynonymFinderFacade(getNewSynonym)
    const newWordData = await getNewSynonymFacade.getSynonyms(newWord);
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

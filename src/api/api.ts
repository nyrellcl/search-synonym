import axios from "axios";

interface Synonyms {
  findSynonyms(searchTerm: string): Promise<string[]>;
}


export class SynonymFinder implements Synonyms {
    private readonly BASE_API_URL: string;
  
    constructor() {
      this.BASE_API_URL = "https://api.datamuse.com/words";
    }
    public async findSynonyms(searchTerm: string): Promise<string[]> {
      const queryParam = "rel_syn";
      const url = `${this.BASE_API_URL}?${queryParam}=${searchTerm}`;
  
      try {
        const res = await axios.get(url);
        if (res.status >= 200 && res.status < 300) {
          const synonyms = await res.data;
          return synonyms.map((s: { word: string }) => s.word);
        } else {
          throw new Error(`Server responded with ${res.status} status`);
        }
      } catch (error) {
        console.error("Error while fetching synonyms: ", error);
        return ["No synonyms found"];
      }
    }
  }



export class SynonymFinderFacade implements Synonyms {
  private readonly synonym: Synonyms;

  constructor(synonym: Synonyms) {
    this.synonym = synonym;
  }

  public async findSynonyms(searchTerm: string): Promise<string[]> {
    return this.synonym.findSynonyms(searchTerm);
  }
}






/*export class SynonymFinder implements Synonyms {
  private readonly BASE_API_URL: string;

  constructor() {
    this.BASE_API_URL = "https://api.datamuse.com/words";
  }
  public async findSynonyms(searchTerm: string): Promise<string[]> {
    const queryParam = "rel_syn";
    const url = `${this.BASE_API_URL}?${queryParam}=${searchTerm}`;

    try {
      const res = await fetch(url);
      if (res.status >= 200 && res.status < 300) {
        const synonyms = await res.json();
        return synonyms.map((s: { word: string }) => s.word);
      } else {
        throw new Error(`Server responded with ${res.status} status`);
      }
    } catch (error) {
      console.error("Error while fetching synonyms: ", error);
      return ["No synonyms found"];
    }
  }
}*/

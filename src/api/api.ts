import axios from "axios";

interface Synonyms {
  getSynonyms(searchTerm: string): Promise<string[]>;
}

async function fetchAPI(param: string): Promise<string[]> {
  try {
    const res = await fetch(param);
    const synonyms = await res.json();
    if (res.status != 200) {
      throw new Error(`Server responded with ${res.status} status`);
    }
    return synonyms.map((s: { word: string }) => s.word);
  } catch (error) {
    console.error("Error while fetching synonyms: ", error);
    return ["No synonyms found"];
  }
}

export class SynonymGetter implements Synonyms {
  private readonly BASE_API_URL: string;

  constructor() {
    this.BASE_API_URL = "https://api.datamuse.com/words";
  }
  public async getSynonyms(searchTerm: string): Promise<string[]> {
    const queryParam = "rel_syn";
    const url = `${this.BASE_API_URL}?${queryParam}=${searchTerm}`;
    return fetchAPI(url);
  }
}

export class SynonymGetterFacade implements Synonyms {
  private readonly synonym: Synonyms;

  constructor(synonym: Synonyms) {
    this.synonym = synonym;
  }

  public async getSynonyms(searchTerm: string): Promise<string[]> {
    return this.synonym.getSynonyms(searchTerm);
  }
}

/*export class SynonymGetter implements Synonyms {
    private readonly BASE_API_URL: string;
  
    constructor() {
      this.BASE_API_URL = "https://api.datamuse.com/words";
    }
    public async getSynonyms(searchTerm: string): Promise<string[]> {
      const queryParam = "rel_syn";
      const url = `${this.BASE_API_URL}?${queryParam}=${searchTerm}`;
      return fetchAPI(url)
    }
  }*/

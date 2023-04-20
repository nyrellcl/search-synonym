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
      const res = await fetch(url);
      const synonyms = await res.json();
      return synonyms.map((s: any) => s.word);
    } catch (error) {
      console.error("Error while fetching synonyms: ", error);
      throw error;
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


export class SynonymFinder{
    private readonly BASE_API_URL: string

    constructor(){
        this.BASE_API_URL = 'https://api.datamuse.com/words'
    }
    public async findSynonyms(searchTerm: string): Promise<string[]>{
        const queryParam = 'rel_syn'
        const url = `${this.BASE_API_URL}?${queryParam}=${searchTerm}`
        const res = await fetch(url);
        const synonyms = await res.json()
        return synonyms.map((s: any)=> s.word)
    }
}

import axios from "axios";

const BASE_API_URL = 'https://api.datamuse.com'

class WordFacade{
    async getSynonymData(synonym: string){
        const res = await axios.get(
            `${BASE_API_URL}/words?rel_syn=${synonym}`
        );
        return res.data
    }
}

export default new WordFacade()
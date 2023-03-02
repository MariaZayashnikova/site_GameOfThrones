export default class GotService{
    constructor() {
        this._ApiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResourse = async (url) => {
        const res = await fetch(`${this._ApiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Ошбика по адресу: ${this._ApiBase}${url}, Статус: ${res.status}`); 
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        let res = await this.getResourse('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        let res = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllHouses = async () => {
        let res = await this.getResourse('/houses');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        let res = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(res);
    }

    getAllBooks = async () => {
        let res = await this.getResourse('/books');
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        let res = await this.getResourse(`/books/${id}`);
        return this._transformBook(res);
    }

    getCorrectId = (obj) => {
        let regexp = /\d/g;
        let arrId = obj.url.match(regexp);
        let correctId = '';
        for (let i = 0; i < arrId.length; i++) {
            correctId += arrId[i];
        }

        return correctId;
    }

    checkData = (obj) => {
        for(let key in obj) {
            if(obj[key].length === 0){
                obj[key] = 'no information';
            }

            if(typeof obj[key] === 'object') {
                for(let i = 0; i < obj[key].length; i++) {
                    if(obj[key][i] === '') {
                        obj[key][i] = 'no information';
                    }
                }
            }
        }

        return obj;
    }

    _transformCharacter = (char) => {
        let correctId = this.getCorrectId(char);
        let res = {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: correctId
        }

        res = this.checkData(res);
        
        return res;
    }

    _transformHouse = (house) => {
        let correctId = this.getCorrectId(house);
        let res = {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            id: correctId
        }

        res = this.checkData(res);

        return res;
    }

    _transformBook = (book) => {
        let correctId = this.getCorrectId(book);
        let res = {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            id: correctId
        }

        res = this.checkData(res);
        
        return res;
    }
}


export default class VideogameDTO {

    static getInsertDTO = (videogame) =>{
        //Asegurarme que lo que inserte en la base de datos COINCIDA en lo que me pide.
        return {
            title:videogame.title,
            description: videogame.description,
            price: videogame.price,
            code: videogame.code,
            category: videogame.category || 'Sin categoría',
            image:videogame.image || 'url de imagen genérica'
        }
    }

    static getCardPresenterDTO = (videogame) =>{
        return {
            title: videogame.title,
            description: videogame.description,
            active: videogame.stock>0,
            image: videogame.image
        }
    }

    static getDetailedDTO = (videogame) =>{

    }

}
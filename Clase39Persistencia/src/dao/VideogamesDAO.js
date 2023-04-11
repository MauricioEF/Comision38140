import videogamesModel from "./mongo/videogame.js";


export default class VideogamesDao {

    getVideogames = (params) =>{
        return videogamesModel.find(params).lean();
    }

    createVideogame = (videogame) =>{
        return videogamesModel.create(videogame);
    }

}
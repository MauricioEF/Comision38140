import videogamesModel from "./models/videogame.js";


export default class VideogamesDao {

    getVideogames = (params,page=1) =>{
        return videogamesModel.paginate(params,{page,limit:2,lean:true});
        // return videogamesModel.find(params).lean();
    }

    createVideogame = (videogame) =>{
        return videogamesModel.create(videogame);
    }

}
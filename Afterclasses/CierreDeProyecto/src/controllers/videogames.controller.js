import { videogamesService } from "../dao/index.js";

const createVideogame = async(req,res)=>{
    const file = req.file;
    const  {title,description,code,price,category} = req.body;
    if(!title||!description||!code||!price) return res.status(400).send({status:"error",error:"Incomplete values"});
    const videogame = {
        title,
        description,
        code,
        price,
        category,
        image:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    const result = await videogamesService.createVideogame(videogame)
    res.send({status:"success",payload:result})
}

const getVideogames = async(req,res) =>{
    const videogames = await videogamesService.getVideogames();
    res.send({status:"success",payload:videogames})
}

export default {
    createVideogame,
    getVideogames
}
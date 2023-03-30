import videogamesModel from "../dao/mongo/videogame.js"

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
    const result = await videogamesModel.create(videogame);
    res.send({status:"success",payload:result})
}

export default {
    createVideogame
}
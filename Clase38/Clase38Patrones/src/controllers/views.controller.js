import videogamesModel from "../dao/mongo/videogame.js";

const home = async(req,res)=> {
    const videogames = await videogamesModel.find().lean();
    console.log(videogames);
    res.render('home',{videogames});
}

const register = (req,res)=>{
    res.render('register')
}

const login = (req,res)=>{
    res.render('login')
}

const profile = (req,res)=>{
    res.render('profile',{user:req.user})
}
const createVideogame = (req,res)=>{
    res.render('videogameCreator');
}

export default {
    createVideogame,
    home,
    login,
    profile,
    register
}
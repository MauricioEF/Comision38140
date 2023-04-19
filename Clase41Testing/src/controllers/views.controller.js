import { cartsService, videogamesService } from "../dao/index.js";

const home = async(req,res)=> {
    const page = req.query.page||1;
    const cartId = req.user.cart;
    const pagination = await videogamesService.getVideogames({},page);
    let videogames = pagination.docs;
    const cart = await cartsService.getCartById(cartId);
    videogames = videogames.map(videogame =>{
        const exists = cart.games.some(v=>v._id.toString()===videogame._id.toString())
        return {...videogame,isValidToAdd:!exists}
    })
    const paginationData = {
        hasPrevPage:pagination.hasPrevPage,
        hasNextPage:pagination.hasNextPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        page: pagination.page
    }
    res.render('home',{videogames,css:'home', paginationData});
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


const cart = async(req,res)=>{
    const cartId = req.user.cart;
    const cart = await cartsService.getCartById(cartId,{populate:true});
    const name = req.user.name;
    console.log(cart.games);
    const games  = cart.games.map(game=>game._id);
    res.render('cart',{
        games,
        name
    })
}


export default {
    cart,
    createVideogame,
    home,
    login,
    profile,
    register
}
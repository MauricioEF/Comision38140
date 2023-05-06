import { cartsService, historiesService, usersService, videogamesService } from "../dao/index.js";

const home = async(req,res)=> {
    const page = req.query.page||1;
    const cartId = req.user.cart;
    const user = await usersService.getUserBy({_id:req.user.id});
    const pagination = await videogamesService.getVideogames({},page);
    let videogames = pagination.docs;
    const cart = await cartsService.getCartById(cartId);
    videogames = videogames.map(videogame =>{
        const existsInCart = cart.games.some(v=>v._id.toString()===videogame._id.toString())
        const existsInLibrary = user.library.some(g=>g._id.toString()===videogame._id.toString());
        return {...videogame,inCart:existsInCart, inLibrary:existsInLibrary}
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

const profile = async (req,res)=>{
    const history = await historiesService.getHistoryByUser(req.user.id);
    res.render('profile',{user:req.user,events:history?history.events:[]})
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

const purchase = (req,res) =>{
    const code = req.params.pid;
    res.render('purchase',{code})
}

export default {
    cart,
    createVideogame,
    home,
    login,
    profile,
    register,
    purchase
}
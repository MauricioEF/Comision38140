import { cartsService } from "../dao/index.js";


const insertGameToCart = async(req,res)=>{
    const user = req.user;
    const videogameId = req.params.vid;
    const cart = await cartsService.getCartById(user.cart);
    //Corroboro si el videojuego ya existía en el carrito
    const exists = cart.games.find(game=>game._id.toString()===videogameId);
    if(exists) return res.status(400).send({status:"error",error:"Game already exists"});
    cart.games.push({_id:videogameId});
    console.log(cart.games);
    await cartsService.updateCart(cart._id,{games:cart.games});
    res.redirect('/cart')
}

export default {
    insertGameToCart
}
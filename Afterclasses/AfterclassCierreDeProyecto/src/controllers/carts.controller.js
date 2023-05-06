import { cartsService, historiesService, ticketsService, usersService } from "../dao/index.js";
import { makeId } from "../utils.js";
import { DateTime } from "luxon";

const insertGameToCart = async(req,res)=>{
    const user = await usersService.getUserBy({_id:req.user.id});
    const videogameId = req.params.vid;
    const cart = await cartsService.getCartById(user.cart);
    //Corroboro si el videojuego ya existía en el carrito
    let exists = false;
    exists = cart.games.find(game=>game._id.toString()===videogameId);
    if(exists) return res.status(400).send({status:"error",error:"Game already exists in cart"});
    exists = user.library.find(game=>game._id.toString()===videogameId);
    if(exists) return res.status(400).send({status:"error",error:"Game already exists in library"});
    cart.games.push({_id:videogameId});
    await cartsService.updateCart(cart._id,{games:cart.games});
    res.redirect('/cart')
}

const finishPurchase = async(req,res) =>{
    const user = await usersService.getUserBy({_id:req.user.id});
    const cart = await cartsService.getCartById(user.cart);
    const populatedCart = await cartsService.getCartById(user.cart,{populate:true})
    let exists=false;
    cart.games.find(game=>{
        exists = user.library.some(gameInLibrary=>gameInLibrary._id.toString()===game._id.toString())
    })
    if(exists) return res.status(400).send({status:"error", error:"Operación no completada porque uno de los juegos ya está en la biblioteca"})
    const newLibrary = [...user.library,...cart.games];
    await usersService.updateUser(user._id,{library:newLibrary});
    const ticket = {
        user:user._id,
        videogames:cart.games,
        total:populatedCart.games.reduce((previous,current)=>previous+current._id   .price,0),
        code:makeId(12)
    }
    await ticketsService.createTicket(ticket);
    await cartsService.updateCart(cart._id,{games:[]})
    const history = await historiesService.getHistoryByUser(user._id);
    const event = {
        event:"Purchase",
        date: DateTime.now().toISO(),
        description:`Compra de múltiples juegos`,
        thumbnail:'',
        tags:['purchase']
    }
    if(!history){
        await historiesService.createHistory({user:user._id,events:[event]})
    }else{
        history.events.push(event)
        await historiesService.updateHistory(history._id,{events:history.events})
    }
    res.send({status:"success",purchaseCode:ticket.code})
}

export default {
    finishPurchase,
    insertGameToCart
}
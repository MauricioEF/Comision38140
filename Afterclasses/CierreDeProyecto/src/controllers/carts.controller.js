import { cartsService, historiesService, ticketsService, usersService } from "../dao/index.js";
import { makeid } from "../utils.js";
import { DateTime } from "luxon";

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

const purchase = async(req,res) =>{
    const user = await usersService.getUserBy({_id:req.user.id});
    const cart = await cartsService.getCartById(user.cart);
    const populatedCart = await cartsService.getCartById(user.cart,{populate:true})
    let exists = false;
    cart.games.forEach(game=>{
        exists = user.library.some(gameInLibrary=>gameInLibrary._id.toString()===game._id.toString());
    })
    if(exists) return res.status(400).send({status:'error',error:'Operación no completada porque un juego del carrito ya está en la librería'});
    const newLibrary = [...user.library,...cart.games];
    const ticket = {
        user:user._id,
        videogames:cart.games,
        total:populatedCart.games.reduce((previous,current)=>previous+current._id.price,0),
        code: makeid(20)
    }
    await usersService.updateUser(user._id,{library:newLibrary});
    await cartsService.updateCart(cart._id,{games:[]});
    await ticketsService.createTicket(ticket);
    const history = await historiesService.getHistoryBy({user:user._id});
    const event = {
        event:'Purchase',
        date: DateTime.now().toISO(),
        description:`Hizo una compra de ${populatedCart.games.length>1?"Multiples juegos":"un juego"}`
    }
    if(!history){
        await historiesService.createHistory({user:user._id,events:[event]})
    }else{
        history.events.push(event);
        await historiesService.updateHistory(history._id,{events:history.events})
    }
    res.send({status:"success",message:"Videojuegos agregados a la librería"});
    //llamar a nodemailer o servicio de mail de preferencia y enviar el ticket de compra.
}

export default {
    insertGameToCart,
    purchase
}
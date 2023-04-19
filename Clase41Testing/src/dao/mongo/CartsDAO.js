import cartModel from "./models/cart.js";


export default class CartsDao {

    getCartById = (id, options={}) =>{
        if(options.populate)
            return cartModel.findOne({_id:id}).populate('games._id').lean();
        return cartModel.findOne({_id:id}).lean();
    }

    createCart = () =>{
        return cartModel.create({games:[]});
    }

    updateCart = (id,cart) =>{
        return cartModel.findByIdAndUpdate(id,{$set:cart})
    }

}
import mongoose from "mongoose";

const collection = 'Carts';

const schema = new mongoose.Schema({
    games:[
        {
            _id:{
                type: mongoose.SchemaTypes.ObjectId,
                ref:'Videogames'
            }
        }
    ]
})

const cartModel = mongoose.model(collection,schema);

export default cartModel;
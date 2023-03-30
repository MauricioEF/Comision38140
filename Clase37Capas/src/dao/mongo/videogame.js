import mongoose from 'mongoose';

const collection = 'Videogames';

const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:String,
    code:{
        type:String,
        unique:true
    },
    image:String
})

const videogamesModel  = mongoose.model(collection,schema);

export default videogamesModel;
import mongoose from 'mongoose';
import mongoosePagination  from 'mongoose-paginate-v2';

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
schema.plugin(mongoosePagination);

const videogamesModel  = mongoose.model(collection,schema);

export default videogamesModel;
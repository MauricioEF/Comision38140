import mongoose from "mongoose";

const collection = "Histories";

const schema = new mongoose.Schema({
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users',
    },
    events: [
        {
            event:String,
            date:Date,
            description:String,
            thumbnail:String,
            tags:Array
        }
    ]
})

const historyModel =  mongoose.model(collection,schema);

export default historyModel;
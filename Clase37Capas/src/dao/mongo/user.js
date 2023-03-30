import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        default:'user'
    },
    avatar:String
})

const userModel = mongoose.model(collection,schema);
export default userModel;
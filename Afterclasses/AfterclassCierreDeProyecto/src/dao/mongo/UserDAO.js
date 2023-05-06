import userModel from "./models/user.js";

export default class UserDao {

    getUsers = (params) =>{
        return userModel.find(params).lean();
    }

    getUserBy = (params) =>{
        return userModel.findOne(params).lean();
    }

    createUser = (user) =>{
        return userModel.create(user);
    }

    updateUser = (id,user) =>{
        return userModel.findByIdAndUpdate(id,{$set:user});
    }

    drop = () =>{
        return userModel.collection.drop();
    }

}
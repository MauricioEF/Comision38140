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

    drop = () =>{
        return userModel.collection.drop();
    }

}
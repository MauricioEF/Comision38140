import userModel from "../../models/User.js";

export default class Users {

    get = () =>{
        return userModel.find();
    }

    getBy = (params) =>{
        return userModel.findOne(params);
    }

    save = (user) =>{
        return userModel.create(user);
    }
}
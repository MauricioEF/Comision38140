import { usersService } from "../dao/index.js";
const getUsers = async(req,res)=>{
    const users = await usersService.getUsers();
    res.send({status:"success",payload:users})
}

const getUserById = async(req,res) =>{
    const {uid} = req.params.uid;
    const user = await usersService.getUserBy({_id:uid});
    res.send({status:"success",payload:user})
}

const addFriend = async(req,res) =>{

}


export default {
    addFriend,
    getUserById,
    getUsers,
}
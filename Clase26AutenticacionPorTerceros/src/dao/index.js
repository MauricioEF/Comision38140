import mongoose from "mongoose";

const persistence = "MONGO";

export let usersService;

switch(persistence) {
    case 'MONGO':
        mongoose.set('strictQuery', false)
        const connection = mongoose.connect("mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/comision31840?retryWrites=true&w=majority");
        const {default:MongoUser} = await import('./Mongo/UsersContainer.js')
        usersService = new MongoUser();
        break;
    case 'FILESYSTEM':
        const {default:FSUser} = await import('./FileSystem/UsersContainer.js')
        usersService = new FSUser();
        break;
}
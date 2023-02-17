import mongoose from "mongoose";
import config from "../config/config.js";

const persistence = "MONGO";

export let usersService;

switch(persistence) {
    case 'MONGO':
        mongoose.set('strictQuery', false)
        const connection = mongoose.connect(config.mongo.URL);
        const {default:MongoUser} = await import('./Mongo/UsersContainer.js')
        usersService = new MongoUser();
        break;
    case 'FILESYSTEM':
        const {default:FSUser} = await import('./FileSystem/UsersContainer.js')
        usersService = new FSUser();
        break;
}
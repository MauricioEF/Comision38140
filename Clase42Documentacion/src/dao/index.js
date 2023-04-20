import config from "../config/config.js";

export let usersService;
export let videogamesService;
export let cartsService;

switch(config.app.PERSISTENCE) {
    case "MONGO":
        const {default:MongoUser} = await import('./mongo/UserDAO.js');
        const {default:MongoVideogames} = await import('./mongo/VideogamesDAO.js');
        const {default:MongoCart} = await import('./mongo/CartsDAO.js');

        usersService = new MongoUser();
        videogamesService = new MongoVideogames();
        cartsService = new MongoCart();
        break;
    case "FILESYSTEM":
}
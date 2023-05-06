import config from "../config/config.js";

export let usersService;
export let videogamesService;
export let cartsService;
export let ticketsService;
export let historiesService;

switch(config.app.PERSISTENCE) {
    case "MONGO":
        const {default:MongoUser} = await import('./mongo/UserDAO.js');
        const {default:MongoVideogames} = await import('./mongo/VideogamesDAO.js');
        const {default:MongoCart} = await import('./mongo/CartsDAO.js');
        const {default:MongoTickets} = await import('./mongo/TicketsDAO.js');
        const {default:MongoHistory} = await import('./mongo/HistoriesDAO.js');

        usersService = new MongoUser();
        videogamesService = new MongoVideogames();
        cartsService = new MongoCart();
        ticketsService = new MongoTickets();
        historiesService = new MongoHistory();
        
        break;
    case "FILESYSTEM":
}
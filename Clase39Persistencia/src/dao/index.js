// const persistence = "MONGO";
import UserDao from "./UserDAO.js";
import VideogamesDao from "./VideogamesDAO.js";

// switch(persistence) {
//     case "MONGO":

// }

export const userService = new UserDao();
export const videogamesService = new VideogamesDao();
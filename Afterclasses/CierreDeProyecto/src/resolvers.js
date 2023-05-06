import { videogamesService, usersService } from "./dao/index.js";

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hola mundo";
    },
    getVideogames: async () => {
      const videogames = await videogamesService.getVideogames();
      return videogames.docs;
    },
    getUsers: async() =>{
        const users = await usersService.getUsers();
        return users;
    }
    
  },
  Mutation: {
    registerUser: async (_, args) => {
      const user = {
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        password: args.password
      }
      const result = await usersService.createUser(user);
      return result;
    },
  },
};

export default resolvers;

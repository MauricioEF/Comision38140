const typeDefs = `#graphql

    type Videogame {
        _id: ID
        title: String
        description: String
        price: Float
        code: String
    }

    type User {
        _id: ID
        first_name: String
        last_name: String
        email: String
        password: String
        avatar: String
    }

   type Query {
    helloWorld: String
    getVideogames: [Videogame]
    getUsers: [User]
   }

   type Mutation {
        registerUser(first_name:String, last_name: String, email:String, password: String): User
   }
`;

export default typeDefs;

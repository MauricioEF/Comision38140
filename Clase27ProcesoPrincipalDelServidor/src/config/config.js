// import dotenv from 'dotenv';

// const mode = process.argv.slice(2)[0]

// dotenv.config({
//     path:mode==="PRODUCTION"?'./.env.production':'./.env.development'
// });

console.log(process.env);

export default {
    app: {
        PORT : process.env.PORT||8080
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    jwt: {
        SECRET: process.env.JWT_SECRET
    }
}
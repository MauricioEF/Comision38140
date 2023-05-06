import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import videogamesRouter from './routes/videogames.router.js';
import cartsRouter from './routes/carts.router.js';

import config from './config/config.js';
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
import { usersService } from './dao/index.js';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL);

//Swagger
const swaggerDefinition = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "API de videojuegos",
            description: "API pensada por comisión 38140"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerDefinition);

//Motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

//Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

initializePassport();


app.get('/test/init',async (req,res)=>{
    await usersService.drop();
    res.sendStatus(200);
})

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions/',sessionsRouter);
app.use('/api/videogames/',videogamesRouter);
app.use('/api/carts',cartsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


const apollo = new ApolloServer({
    typeDefs,
    resolvers
})

await apollo.start();

app.use(expressMiddleware(apollo))
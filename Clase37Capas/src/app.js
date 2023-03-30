import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import videogamesRouter from './routes/videogames.router.js';

import config from './config/config.js';
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL);

//Motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

//Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(cookieParser());

initializePassport();

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions/',sessionsRouter);
app.use('/api/videogames/',videogamesRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
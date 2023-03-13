import express from 'express';
import session from 'express-session';
import storage from 'session-file-store';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import passport from 'passport';
import initializeStrategies from './config/passport.config.js';
import { addLogger } from './middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;


app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/comision31840?retryWrites=true&w=majority",
        ttl: 3600
    }),
    secret: 'aspdiasc903ok1pkc',
    resave: false,
    saveUninitialized: false
}));

initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

//Inicializar el motor.
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logger
app.use(addLogger);

//Routers
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.get('/pruebaLogger', (req, res) => {
    res.send("ok");
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
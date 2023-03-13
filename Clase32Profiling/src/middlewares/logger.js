import winston from 'winston';

const customLevelsOptions = {
    levels:{
        papa:0,
        error:1,
        warning:2,
        http:3,
        debug:4,
    }
}

const logger = winston.createLogger({
    levels:customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"debug"
        })
    ]
})

export const addLogger = (req,res,next) =>{
    req.logger = logger;
    req.logger.papa(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}
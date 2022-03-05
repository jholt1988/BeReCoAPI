const expressLoader = require('./express');
const routesLoader = require('../Routes/index');
const passportLoader = require('./passport');
const swaggerLoader = require('./swagger');




module.exports = async (app) => {
        const expressApp = await expressLoader(app)
        const passport = await passportLoader(expressApp)
         routesLoader(app, passport)
        swaggerLoader(app)
        return app
    
}
const expressLoader = require('./express');
// const routesLoader = require('../Routers/index');
const passportLoader = require('./passport')
const swaggerLoader = require ('./swagger')



module.exports = async (app) => {
    const expressApp = await expressLoader(app)
    const passport = await passportLoader(expressApp)
    swaggerLoader(app)
    // routesLoader(app, passport)
    
    return app
}
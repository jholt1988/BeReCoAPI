const expressLoader = require('./express');
const routesLoader = require('../Routers/index');
const passportLoader = require('./passport')



module.exports = async (app) => {
    const expressApp = await expressLoader(app)
    const passport = await passportLoader(expressApp)
    routesLoader(app, passport)
    
    return app
}
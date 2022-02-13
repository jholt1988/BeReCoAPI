const expressLoader = require('./express');
const routesLoader = require('../Routers/index');



module.exports = async (app) => {
   await expressLoader(app)
    routesLoader(app)
    
    return app
}
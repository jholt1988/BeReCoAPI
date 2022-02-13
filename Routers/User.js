

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const  User  = require('../Services/UserService');

    app.use('/users', router);
    
    router.post('/', User.create);
    
    router.put('/:id', User.update);

    router.get('/:id', User.findOne);

    router.get('/', User.getAll);

    router.delete('/:id', User.deleteOne)


}
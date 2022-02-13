const { Orders } = require('../db');

exports.UpdateOrder = (req, res,) => {
    const { id, ...data } = req.body
    
    
    Orders.update({ ...data },
        {
            where: { id: id }
        })
        .then(data => {
            res.send(data)
        })
}

exports.findOrders = (req, res) => {
    const userId = req.params.user

    Orders.findAll({
        where: {userId: req.body.user}
    })
        .then(data => {
        res.send(data)
    })
}

exports.findOrder = (req, res) => {
    const orderId = req.params.orderId

    Orders.findByPk(orderId)
        .then(data => {
            res.send(data);
        })
}
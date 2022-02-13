const {Products} = require('../db');



exports.create = (req, res) => {
    if (!req.body.productName) {
        res.status(400).send({
            message: 'Error Adding Product'
        });
        return;
    }

    const product = {
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
    

    }
    
    Products.create(product)
        .then(data => {
            res.send(data)
            console.log(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message
            })
        })
};


exports.update = (req, res) => {
    const id = req.params.id


    Products.update(req.body, {
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Product Update'
                });

            } else {
                res.send({
                    message: 'Product Update Not Successful'
                })
        }
        })
        .catch(err => {
            res.send({
            message: "Error Updating product"
        })
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id

    Products.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: 'Product Does Not Exist'
                })
            }
            
        });
}

exports.getAll = (req, res) => {
    Products.findAll()
        .then(data => {
            if (data) {
               res.send(data)
            } else {
                res.status(404).send({
                    message: 'Error Retrieving Messages'
                })
           }
        })
        
}

exports.deleteOne = (req, res) => {
    const id = req.params.id
    
    Products.destroy({
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:'Product Deleted Successfully'
                })
            } else {
                res.status(404).send({
                  message:'Error- Product Not Deleted'
              }) 
            }
        })
        .catch(err => {
            res.status(500).send({
            message: err.message
        })
    })
}

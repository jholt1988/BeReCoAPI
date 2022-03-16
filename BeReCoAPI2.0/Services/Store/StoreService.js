const {Vendor, Product} = require('../../db')

exports.createVendor = (req, res) => {
   
    const vendorName = { vendorName: req.body.vendorName }

   
    const exists = Vendor.vendorExists(vendorName)
    if (exists) {
        throw new Error('Vendor Already Exists')
    } else {
        Vendor.create(vendorName).then(newVendor => {
            res.status(201).send(newVendor)
        })
    }
}
    
    exports.createProduct = (req, res) => {
        const  vendorName  = req.body.vendorName
        const vendor = Vendor.findOne({ vendorName })
        const product = {
            productName : req.body.productName,
            description : req.body.description,
            price : req.body.price, 
            quantity :req.body.quantity, 
            vendorID : vendor.id, 
            category : req.body.category
        }

        Product.create(product)
            .then(product => {
                if (product) {
                    res.status(201).send(product)
                } else {
                    res.send(Error('Error Adding Product'))
                }
            })
            .catch(err => {
                res.send(err.message)
            })
}
            
exports.updateProduct = async (req, res, data) => {
const productName = req.query.productName
    await Product.findOne({ productName })
        .then(async (product)=> {
           await Product.update(data).then( (updatedProduct) => {
                if (updatedProduct) {
                    res.send(200).send(updatedProduct)
                } else {
                    res.send(Error("Error updating product"))
                }
            })
                .catch(err => {
                res.send(err.message)
            })
                
        })

}

exports.getAllProducts = async (req, res) => {
    Product.findAll().then(products => {
        
            
            res.status(200).send(products)
        })
        .catch(err => {
        res.send(err.message)
    })
}


exports.getProduct = async (req, res) => {
    const productName = req.query.productName
    Product.findOne({ productName }).then(product => {
        if (product) {
            res.status(200).send(product)
        } else {
            res.send(Error('Product Not Found'))
        }
    })
}
    
exports.getVendor = async (req, res) => {
    const vendorName = req.query
    Vendor.findOne({ vendorName }).then(vendor => {
        if (vendor) {
            res.status(200).send(vendor)
        } else {
            res.send(Error('Vendor Not Found'))
        }
    })
}

exports.getVendorProductList = async (req, res) => {
    const vendorName = req.query

    let productList = [];

    const vendor = await Vendor.findOne({ vendorName })
    
    await Product.findAll({ where: { vendorID: vendor.id } }).then(products => {
        if (products) {
            for (let product of products) {
              productList =  productList.push(product)
            
            }
            res.status(200).send({
                vendorName: {
                    productList
                }
            })
        } else {
            res.send(Error('Error Get Vendor Product List'))
        }
    })
}
    

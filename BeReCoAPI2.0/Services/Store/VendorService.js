const {Vendor} = require('../../db')

exports.createVendor = (req,res, done) => {
   
    const vendorName = {vendorName : req.body.vendorName }

   
   const exists = Vendor.vendorExists(vendorName)
  if(exists){
      throw new Error('Vendor Already Exists')
  } else {
      Vendor.create(vendorName).then(newVendor => {
            res.status(201).send(newVendor)
      })
  }
    
}
const express = require('express');
const router = express.Router()
const Vendor = require('../Services/Store/VendorService');
const {isAuthenticated} = require('../Loaders/authenticate')


module.exports = (app) => {
    app.use('/store', router)

    router.post('/vendors', isAuthenticated, Vendor.createVendor)
}


const express = require('express')
const path = require('path')

const staticPath = path.resolve(__dirname, '../../dist')

const router = new express.Router()
const apiProductRouter = require('./api-product-router')

router.use('/', express.static(staticPath))

router.use('/api/product', apiProductRouter)

module.exports = router
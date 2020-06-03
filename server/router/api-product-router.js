const express = require('express')
const router = new express.Router()
const {
  listProductHandler,
  findProductById,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler
} = require('../modules/product')

router.get('/', listProductHandler)

router.get('/:id', findProductById)

router.post('/', createProductHandler)

router.put('/', updateProductHandler)

router.delete('/:id', deleteProductHandler)

module.exports = router




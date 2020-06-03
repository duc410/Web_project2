// This list should be replace by a database table
const list = [
  {
    id: '1591181282737',
    title: 'Sữa chua'
  },
  {
    id: '1591181289860',
    title: 'Kem đánh răng'
  }
]

function listProductHandler(req, res, next) {
  try {
    res.json(list)
  } catch(err) {
    next(err)
  }
}

function findProductById(req, res, next) {
  try {
    let id = req.params.id

    if(!id) {
      throw new Error('Params id required!')
    }
    let product = list.find(item => item.id == id)
    if(!product) {
      throw new Error(`Not found item with id: '${id}'`)
    }

    res.json(product)
  } catch(err) {
    next(err)
  }
}

function createProductHandler(req, res, next) {
  try {
    let newProduct = req.body

    if(!newProduct || !newProduct.title) {
      throw new Error(`Require item 'title'!`)
    }

    newProduct.id = String(Date.now())
    list.push(newProduct)

    res.json(newProduct)
  } catch(err) {
    next(err)
  }
}

function updateProductHandler(req, res, next) {
  try {
    let data = req.body
    let id = req.body.id
    let newTitle = req.body.title

    if(!data || !data.id) {
      throw new Error(`Require product 'id'!`)
    }
    if(!newTitle) {
      throw new Error(`Require product 'title'!`)
    }

    let product = list.find(item => item.id == id)
    if(!product) {
      throw new Error(`Not found product with id '${data.id}'`)
    }
    product.title = newTitle

    res.json(product)
  } catch(err) {
    next(err)
  }
}

function deleteProductHandler(req, res, next) {
  try {
    let id = req.params.id
    
    if(!id) {
      throw new Error(`Require product 'id'!`)
    }

    let productIndex = list.findIndex(item => item.id == id)
    if(!productIndex < 0) {
      throw new Error(`Not found product with id: '${id}'`)
    }
    let product = list.splice(productIndex, 1)
    
    res.json(product)
  } catch(err) {
    next(err)
  }
}

module.exports = {
  listProductHandler,
  findProductById,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler
}
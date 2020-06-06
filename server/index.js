const express = require('express')
const bodyParser = require('body-parser')
const upload=require('express-fileupload')

const app = express()
const router = require('./router')
const cors = require('./cors')
const errorHandler = require('./error-handler')

const port = 9000

// using middlewares
app.use(upload())
app.use(cors)
app.use(bodyParser.json())

// routing
app.use(router)

// // error handling
app.use(errorHandler)

// listening
app.listen(port, (err) => {
  if(err) {
    console.error('Server open failed!')
    console.error(err)
  } else {
    console.log(`Server opened at port: ${port}`)
  }
})

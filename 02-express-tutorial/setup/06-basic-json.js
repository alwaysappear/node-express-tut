const { products } = require('../data')
const express = require('express')
const app = express()

app.get('/api/products', (req, res) => res.status(200).json(products))

app.listen(2003, () => console.log('Listening on port : 2003...'))
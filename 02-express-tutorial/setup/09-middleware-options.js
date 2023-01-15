const authorize = require('../authorize')
// const logger = require('../logger')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))

app.get('/', authorize, (req, res) => {
    res.send(`Welcome, ${req.user.name}!`)
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    res.send('Items')
})

app.listen(2003)

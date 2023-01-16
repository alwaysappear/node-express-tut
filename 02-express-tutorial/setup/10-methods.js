let { people } = require('../data')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})


app.listen(2003, () => {
    console.log('Listening on port : 2003...')
})
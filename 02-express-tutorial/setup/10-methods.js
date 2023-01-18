let { people } = require('../data')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('../methods-public'))
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

app.post('/login', (req, res) => {
    const {name} = req.body
    
    if (name) {
        return res.status(200).send(`Welcome, ${name}!`)
    }

    return res.status(401).send('Please, provide cridentials.')
})

app.listen(2003, () => {
    console.log('Listening on port : 2003...')
})

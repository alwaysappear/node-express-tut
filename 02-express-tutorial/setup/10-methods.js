const express = require('express')
const morgan = require('morgan')
const app = express()
const {static, urlencoded} = require('express')
let { people } = require('../data')

app.use(morgan('tiny'))
app.use(static('../methods-public'))
app.use(urlencoded({ extended: false }))

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

app.post('/login', (req, res) => {
    const { name } = req.body
    
    if (name) {
        return res.status(200).send(`Welcome, ${name}!`)
    }

    res.status(401).send('Please, provide cridentials.')
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({success: false, msg: 'Pls, provide name value'})
    }
    res.status(201).json({success: true, person: name})
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    console.log(id, name)
    res.send('Hello, World!')
})

app.listen(2003)

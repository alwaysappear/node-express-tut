const express = require('express')
const router = express.Router()
const path = require('path')
const { handleNewUser } = require('../controllers/registerController')

router.get('^/$|register(.html)?', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/register.html'))
})

router.post('/register', handleNewUser)

module.exports = router
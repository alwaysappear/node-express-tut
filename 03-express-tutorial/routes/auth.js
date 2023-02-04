const { resolve } = require('path')
const express = require('express')
const router = express.Router()

const { handleLogin } = require('../controllers/authController')

router.get('^/$|login(.html)?', (req, res) => {
    res.status(200).sendFile(resolve(__dirname, '../views/login.html'))
})

router.post('/login', handleLogin)

module.exports = router
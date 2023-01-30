const express = require('express')
const path = require('path')

const router = express.Router()

router.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
})

router.get('/new-page(.html)?', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, './new-page')
})

module.exports = router
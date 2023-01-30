const express = require('express')
const path = require('path')

const router = express.Router()

const data = {}
data.employees = require('../../data/employees.json')


router.route('/')
    .get((req, res) => {
        res.status(200).json({ success: true, data: data.employees })
    })

module.exports =  router
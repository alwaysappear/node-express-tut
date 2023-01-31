const express = require('express')
const { v4:uuid } = require('uuid')
const path = require('path')

const router = express.Router()

const data = {}
data.employees = require('../../data/employees.json')


router.route('/')
    .get((req, res) => {
        res.json({
            success: true,
            employees: data.employees
        })
    })
    .post((req, res) => {
        res.json({
            id: uuid(),
            firsname: req.body.firsname,
            lastname: req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

router.route('/:id')
    .get(({ params: { id } }, res) => {
        const newEmployee = data.employees.find(employee => employee.id === parseInt(id))
        res.status(200).json({ newEmployee })
    })

module.exports =  router
const express = require('express')
const {
    getAllEmployees,
    getEmployee,
    deleteEmployee,
    addNewEmployee
} = require('../../controllers/employeeControllers')

const router = express.Router()

const data = {}
data.employees = require('../../data/employees.json')


router.route('/')
    .get(getAllEmployees)
    .post(addNewEmployee)

router.route('/:id')
    .get(getEmployee)
    .delete(deleteEmployee)

module.exports =  router
const express = require('express')
const {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
} = require('../../controllers/employeeControllers')

const router = express.Router()

const data = {}
data.employees = require('../../data/employees.json')


router.route('/')
    .get(getAllEmployees)
    .post(addNewEmployee)
    .put(updateEmployee)

router.route('/:id')
    .get(getEmployee)
    .delete(deleteEmployee)

module.exports =  router
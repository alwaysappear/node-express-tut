const express = require('express')
const router = express.Router()

const {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
} = require('../../controllers/employeeControllers')

router.route('/')
    .get(getAllEmployees)
    .post(addNewEmployee)
    .put(updateEmployee)

router.route('/:id')
    .get(getEmployee)
    .delete(deleteEmployee)

module.exports =  router
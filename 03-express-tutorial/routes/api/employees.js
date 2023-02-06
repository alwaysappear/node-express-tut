const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middleware/verifyJWT')

const {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
} = require('../../controllers/employeeControllers')

router.use(verifyJWT)

router.route('/')
    .get(getAllEmployees)
    .post(addNewEmployee)
    .put(updateEmployee)

router.route('/:id')
    .get(getEmployee)
    .delete(deleteEmployee)

module.exports =  router
const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middleware/verifyJWT')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

const {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
} = require('../../controllers/employeeControllers')

router.use(verifyJWT)

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), addNewEmployee)
    .put(updateEmployee)

router.route('/:id')
    .get(getEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

module.exports =  router
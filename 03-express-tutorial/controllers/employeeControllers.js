const { v4: uuid } = require('uuid')

const data = {}
data.employees = require('../data/employees.json')

const checkEmployeeFunc = (id) => {
    const employee = data.employees.find(emp => emp.id === parseInt(id))
    if (!employee) {
        return {
            success: true,
            message: `Employee with ID: ${id} could not be found!`
        }
    }
    return employee
}

const getAllEmployees = (req, res) => {
    res
        .status(200)
        .json({
                success: true,
                employess: data.employees
        })
}

const getEmployee = ({
    params: {
        id
    }
}, res) => {
    if (checkEmployeeFunc(id)) {
        return res
            .status(400)
            .json(checkEmployeeFunc(id))
    }
    res
        .status(200)
        .json(checkEmployeeFunc(id))
}

const addNewEmployee = (req, res) => {
    res
        .status(201)
        .json({
            id: uuid(),
            firsname: req.body.firsname,
            lastname: req.body.lastname
    })
}

const deleteEmployee = ({
    params: {
        id
    }
}, res) => {
    if (checkEmployeeFunc(id)) {
        return res
                .status(400)
                .json(checkEmployeeFunc(id))
    }
    const newEmployees = data.employees.filter(employee => employee.id !== parseInt(id))
    res
        .status(200)
        .json({
            success: true,
            employees: newEmployees
    })
}

module.exports = {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
}
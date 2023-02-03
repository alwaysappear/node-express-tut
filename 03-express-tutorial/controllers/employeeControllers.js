const { v4: uuid } = require('uuid')

const data = {}
data.employees = require('../model/employees.json')

const notFound = (id) => {
    return {
        success: false,
        message: `Employee with ID: ${id} could not be found!`
    }
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
    const employee = data.employees.find(emp => emp.id === parseInt(id))
    if (!employee) {
        return res
                .status(400)
                .json(notFound(id))
    }
    res
        .status(200)
        .json(employee)
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
    const newEmployees = data.employees.filter(employee => employee.id !== parseInt(id))
    return res
        .status(200)
        .json({
            success: true,
            employees: newEmployees
        })
    
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(id))
    if (!employee) {
        return res
            .status(400)
            .json(notFound(id))
    }

    if (req.body.firsname) employee.firsname = req.body.firsname
    if (req.body.lastname) employee.lastname = req.body.lastname
    const filteredArray = data.employees.filter(employee => employee.id !== parseInt(req.body.id))
    const newEmployees = [...filteredArray, checkEmployee]
    data.setEmployees(newEmployees.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.employees)
}

module.exports = {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
}
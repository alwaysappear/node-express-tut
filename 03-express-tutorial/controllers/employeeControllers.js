const { v4: uuid } = require('uuid')

const data = {}
data.employees = require('../data/employees.json')

const getAllEmployees = (req, res) => {
    res.status(200).json({ success: true, employess: data.employess })
}

const getEmployee = ({
    params: {
        id
    }
}, res) => {
    const newEmployee = data.employees.find(employee => employee.id === parseInt(id))
    res.status(200).json({
        newEmployee
    })
}

const addNewEmployee = (res, res) => {
    res.json({
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
    res.status(200).json({
        success: true,
        employees: newEmployees
    })
}
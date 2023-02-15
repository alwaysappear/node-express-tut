const Employee = require('../model/Employee')

const notFound = (id) => {
    return {
        success: false,
        message: `Employee with ID: ${id} could not be found!`
    }
}

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) return res.status(204).json({
            message: 'No employees found'
    })
    res.status(200).json({
        success: true,
        employees
    })
}

const getEmployee = async ({ params: { id } }, res) => {
    const employee = await Employee.findOne({ id }).exec()
    if (!employee) return res.status(400) .json(notFound(id))
    res.status(200).json(employee)
}

const addNewEmployee = async (req, res) => {
    const { firstname, lastname } = req.body
    if (!firstname | !lastname) return res.status(409).json({
        message: 'Contents required!'
    })
    const newEmployee = await Employee.create({
        firsname: firstname,
        lastname: lastname
    })
    res.status(201).json(newEmployee)
}

const deleteEmployee = async ({ params: { id } }, res) => {
    const employee = await Employee.findOne({ _id: id }).exec()
    if (!employee) return res.status(400).json(notFound(id))

    await employee.deleteOne({ _id: id })

    const employees = await Employee.find()
    return res.status(200).json({
        success: true,
        employees
    })
}

const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { firstname, lastname } = req.body
    if (id) return res.status(400).json({
        message: 'ID Parameter required!'
    })
    if (!firstname | !lastname) return res.status(409).json({
        message: 'Contents required!'
    })

    const employee = await Employee.findOne({ _id: id }).exec()
    if (!employee)  return res.status(400).json(notFound(id))

    employee.firsname = firstname
    employee.lastname = lastname
    await employee.save()

    res.status().json({
        success: true,
        message: 'Contents updated!'
    })
}

module.exports = {
    getAllEmployees, getEmployee,
    deleteEmployee, addNewEmployee,
    updateEmployee
}
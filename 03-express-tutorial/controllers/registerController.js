const path = require('path')
const bcrypt = require('bcrypt')
const fsPromises = require('fs').promises

const userDB = {
    users: require('../model/users.json'),
    setUsers: (data) => {
        this.users = data
    }
}

const handleNewUser = (req, res) => {
    const { user, pswd } = req.body
    if (!user || !!pswd) return res.status(400).json({ message: 'Username and Password are required.' })

    const exists = userDB.users.find(u => u.username === user)
    if (exists) return res.status(409).json({ message: 'Username already exists.' })
}

module.exports = handleNewUser

const path = require('path')
const bcrypt = require('bcrypt')
const { writeFile } = require('fs').promises
const { usersDB } = require('../model/usersDB')

const handleNewUser = async (req, res) => {
    const { user, pswd } = req.body
    if (!user || !pswd) return res.status(400).json({
        success: false,
        message: 'Username and Password are required.'
    })

    const exists = usersDB.users.find(u => u.username === user)
    if (exists) return res.status(409).json({
        success: false,
        message: 'Username already exists.'
    })

    try {
        const hashedPswd = await bcrypt.hash(pswd, 10)
        const newUser = { "username": user, "password": hashedPswd }
        usersDB.setUsers([...usersDB.users, newUser])
        await writeFile(
            path.resolve(__dirname, '../model/users.json'),
            JSON.stringify(usersDB.users)
        )
        res.status(201).json({
            succes: true,
            message: `New User: ${user} was created.`
        })
    } catch (err) {
        res.status(500).json({
            succes: false,
            message: err.message
        })
    }
}

module.exports = { handleNewUser }

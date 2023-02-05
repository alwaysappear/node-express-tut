const bcrypt = require('bcrypt')
const { usersDB } = require('../model/usersDB')

const handleLogin = async (req, res) => {
    const { user, pswd } = req.body
    const userExists = usersDB.users.find(u => u.username === user)

    if (!user || !pswd) return res.status(400).json({
        success: false,
        message: 'Username and Password are required.'
    })

    if (!userExists) return res.status(401).json({
        succes: false,
        message: "Username does not exists."
    })

    try {
        const match = await bcrypt.compare(pswd, userExists.password)
        if (match) {
            return res.status(200).json({
                succes: true,
                message: `Welcome, ${userExists.username}!`
            })
        }
        res.status(401).json({
            success: false,
            message: "Incorrect password!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { handleLogin }
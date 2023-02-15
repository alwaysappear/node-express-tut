const bcrypt = require('bcrypt')
const User = require('../model/User')

const handleNewUser = async (req, res) => {
    const { user, pswd } = req.body
    if (!user || !pswd) return res.status(400).json({
        success: false,
        message: 'Username and Password are required.'
    })

    const exists = await User.findOne({ username: user }).exec()
    if (exists) return res.status(409).json({
        success: false,
        message: 'Username already exists.'
    })

    try {
        const hashedPswd = await bcrypt.hash(pswd, 10)
        await User.create({
            username: user,
            password: hashedPswd
        })

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

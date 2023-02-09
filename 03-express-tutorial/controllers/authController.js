require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { resolve } = require('path')
const { writeFile } = require('fs').promises
const { usersDB } = require('../model/usersDB')

const handleLogin = async (req, res) => {
    const { user, pswd } = req.body
    const userExists = usersDB.users.find(u => u.username === user)

    if (!user || !pswd) return res.status(400).json({
        success: false,
        message: 'Username and Password are required.'
    })

    if (!userExists) return res.sendStatus(409) // Conflict

    try {
        const match = await bcrypt.compare(pswd, userExists.password)
        if (match) {
            const accessToken = jwt.sign(
                { "username": userExists.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )

            const refreshToken = jwt.sign( 
                { "username": userExists.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            const updateUser = usersDB.users.map(newUser => newUser.username === userExists.username ? { ...newUser, refreshToken }: newUser)
            usersDB.setUsers(updateUser)
            await writeFile(
                resolve(__dirname, '../model/users.json'),
                JSON.stringify(usersDB.users)
            )

            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }
            )
            return res.status(200).json({
                accessToken
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
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const handleLogin = async (req, res) => {
    const { user, pswd } = req.body
    const userExists = await User.findOne({ username: user }).exec()

    if (!user || !pswd) return res.status(400).json({
        success: false,
        message: 'Username and Password are required.'
    })

    if (!userExists) return res.sendStatus(409) // Conflict

    try {
        const match = await bcrypt.compare(pswd, userExists.password)
        if (match) {
            const roles = Object.values(userExists.roles)

            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": userExists.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )

            const refreshToken = jwt.sign( 
                { "username": userExists.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            userExists.refreshToken = refreshToken
            await userExists.save()
            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly: true,
                    sameSite: 'None',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                } // secure - in production
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
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { usersDB } = require('../model/usersDB')

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    const userExists = usersDB.users.find(user => user.refreshToken === refreshToken)
    if (!userExists) return res.sendStatus(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.username !== userExists.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                { "username": userExists.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.status(200).json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }
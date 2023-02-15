const jwt = require('jsonwebtoken')
const User = require('../model/User')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    const userExists = await User.findOne({ refreshToken }).exec()
    if (!userExists) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.username !== userExists.username) return res.sendStatus(403)
            const roles = Object.values(userExists.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.status(200).json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }
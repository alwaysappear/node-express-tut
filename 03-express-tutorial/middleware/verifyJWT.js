require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers[`${'a' || 'A'}uthorization`]
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401) // unauthorized
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403) // forbidden
            req.user = decoded.username
            req.roles = decoded.userinfo.roles
            next()
        }
    )
}

module.exports = verifyJWT
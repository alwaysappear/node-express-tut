const { v4: uuid, v4 } = require('uuid')

const authorize = (req, res, next) => {
    const { user } = req.query
    if (user) {
        req.user = {name: user, id: v4()}
        next()
    } else {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = authorize
const allowedOrigins = require('../config/alllowedOrigins')

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', origin)
    }
    next()
}
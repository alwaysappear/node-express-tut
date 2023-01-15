const authorize = (req, res, next) => {
    const { user } = req.query
    if (user === 'raheem') {
        req.user = {name: 'raheem', id: 1}
        next()
    } else {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = authorize
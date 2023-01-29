const errorHandler = (err, req, res, next) => {
    console.error(err)
    res.status(500).send(err)
}

module.exports = errorHandler
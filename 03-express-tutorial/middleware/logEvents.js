const path = require('path')
const { appendFile } = require('fs').promises
const { v4: uuid } = require('uuid')

const textFile = path.resolve(__dirname, '../logEvents.txt')

const logger = (req, res, next) => {
    appendFile(
        textFile,
        `id: ${uuid()}\n\tpath: \n\t\t${req.method} ${req.url}\n\n`,
        (err) => {
            if (err) throw new Error('Could not be resolved!')
        }
    )
    next()
}

module.exports = logger
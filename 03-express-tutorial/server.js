const PORT = process.env.PORT || 2003
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

const logger = require('./middleware/logEvents')
app.use(logger)

app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))


const whiteLists = [
    'http://127.0.0.1:2003'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteLists.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS.'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions)) // cross-origin resource share

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './views/index.html'))
})

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
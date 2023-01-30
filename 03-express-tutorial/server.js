const errorHandler = require('./middleware/errorHandler')
const logger = require('./middleware/logEvents')

const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 2003

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

app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(errorHandler)
app.use(logger)
app.use(morgan('tiny'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({error: '404 not found!'})
    } else {
        res.type('txt').send('404 not found!')
    }
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
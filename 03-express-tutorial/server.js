const errorHandler = require('./middleware/errorHandler')
const logger = require('./middleware/logEvents')
const router = require('./routes/subdir')

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

app.use(cors(corsOptions)) // cross-origin resource share

app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({
    extended: false
}))

app.use(errorHandler)
app.use(logger)
app.use(morgan('tiny'))
app.use('/subdir', router)

app.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './views/index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './views/new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, './new-page')
})

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
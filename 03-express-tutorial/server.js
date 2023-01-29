const PORT = process.env.PORT || 2003
const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))


const whiteLists = [
    'http://localhost:2003'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteLists.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS.'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions)) // cross-origin resource share

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
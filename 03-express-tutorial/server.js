const PORT = process.env.PORT || 2003
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors()) // cross-origin resource share
app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))


app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
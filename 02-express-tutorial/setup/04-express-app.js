const express = require('express')
const app = express()


app.get('*', (req, res) => res.status(404).send('Resource not found!'))

app.listen(2003, () => {
    console.log('Server is running on port : 2003...')
})
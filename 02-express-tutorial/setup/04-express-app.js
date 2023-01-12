const path = require('path')
const express = require('express')
const app = express()

app.use(express.static('../../public'))

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../navbar-app/index.html')))

app.all('*', (req, res) => res.status(404).send('Resource not found!'))

app.listen(2003, () => console.log('Server is running on port : 2003...'))
const app = require('express')()

app.get('/', (req, res) => {
    res.status(200).send('Welcome!')
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page.')
})

app.all('*', (req, res) => {
    res.status(404).send(`${req.url} does not exist.`)
})


app.listen(2003, () => {
    console.log('Server is running on port : 2003...')
})
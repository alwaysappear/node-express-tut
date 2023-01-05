const http = require('http')

const server  = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end("Welcome, User!")
    }

    if (req.url === '/about') {
        res.end("Welcome to our about page...")
    }

    res.end(`
        <h1>Page not found!</h1>
        <a href='/'>back home</a>
    `)
})

server.listen(3030)
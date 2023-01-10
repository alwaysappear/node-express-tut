const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    // console.log(req.method)
    const url = req.url
    if (url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write("<h1>Our Homepage.</h1>")
    } else if (url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write("<h5>Our About Page.</h5>")
    } else if (url === '/contact') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.write("Greetings - Hello, World!")
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        })
        res.write('Page not found!')
    }
    res.end()
})

server.listen(1968, () => {
    console.log("Listening on port : 1968...")
})
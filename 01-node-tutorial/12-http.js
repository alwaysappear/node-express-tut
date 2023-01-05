const http = require('http')

const server  = http.createServer((req, res) => {
    res.write("Welcome, user!")
    res.end()
})

server.listen(3030)
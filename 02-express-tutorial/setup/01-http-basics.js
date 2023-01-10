const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write("<p>Hello, World!<p>")
    res.end()
})
.listen(1968, () => {
    console.log("Listening on port : 1968...")
})
const http = require('http')

http.createServer((req, res) => {
    res.end("Hello, World!")
})
.listen(1968, () => {
    console.log("Listening on port : 1968...")
})
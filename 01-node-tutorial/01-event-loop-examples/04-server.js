const http = require('http')

const server = http.createServer((req, res) => {
  console.log('request event')
  if (req.url === "/") {
    res.end('Hello, World!')
  }
})

server.listen(3030, () => {
  console.log('Server listening on port : 3030....')
})

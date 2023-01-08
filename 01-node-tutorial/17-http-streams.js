const {readFileSync} = require('fs')
const {createServer} = require('http')

createServer((req, res) => {
    const text = readFileSync(
        './content/big.txt',
        'utf-8'
    )
    res.end(text)
}).listen(3030)
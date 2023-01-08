const {
    readFileSync,
    createReadStream
} = require('fs')
const {createServer} = require('http')

createServer((req, res) => {
    // const text = readFileSync(
    //     './content/big.txt',
    //     'utf-8'
    // )
    const fileStream = createReadStream('./content/big.txt', 'utf-8')
    fileStream.on('open', () => fileStream.pipe(res))
    fileStream.on('error', err => res.end(err))
}).listen(3030)
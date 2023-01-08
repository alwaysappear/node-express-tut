const {createReadStream} = require('fs')

const stream = createReadStream('./content/big.txt', 'utf-8')

stream.on('data', result => {
    console.log(result)
})

stream.emit('data')
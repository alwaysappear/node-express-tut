const EventEmitter = require('events')

const customEventEmitter = new EventEmitter()

customEventEmitter.on('response', () => {
    console.log(`Data Recieved`)
})

customEventEmitter.on('response', (x, y) => {
    console.log(`Data Processed : ${x+y}`)
})

customEventEmitter.emit('response')


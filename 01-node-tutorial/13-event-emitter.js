const EventEmitter = require('events')

const customEventEmitter = new EventEmitter()

customEventEmitter.on('response', () => {
    console.log(`Data Recieved`)
})

customEventEmitter.on('response', () => {
    console.log(`Another Data Recieved`)
})

customEventEmitter.emit('response')


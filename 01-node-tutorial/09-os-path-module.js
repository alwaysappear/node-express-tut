const path = require('path')
console.log(`File path seperation: ${path.sep}`)

const filePath = path.join('\\content', 'subfolder', 'text.txt')

console.log(filePath)

const basePath = path.basename(filePath)
console.log(basePath)

const absPath = path.resolve(__dirname, 'content', 'subfolder', 'text.txt')
console.log(absPath)
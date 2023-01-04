const {readFile, writeFile} = require('fs')

readFile('./content/first.txt', 'utf-8', (err, result) => {
    if (err) throw (err)
    console.log(result)
})
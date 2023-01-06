const { readFile } = require('fs')

console.log('started.')

readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) throw err
  console.log(result)
  console.log('completed.')
})

console.log('starting next task!!')

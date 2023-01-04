const fs = require('fs')
const {readFileSync, writeFileSync} = fs

const first = readFileSync('./content/first.txt', 'utf-8')
const second = readFileSync('./content/second.txt', 'utf-8')

writeFileSync(
    './content/result-sync.txt',
    `Here is the result: \n\t1. ${first}\n\t2. ${second}`
)

writeFileSync(
    './content/result-sync.txt',
    '\nThis is an appended text.',
    {flag: 'a'}
)

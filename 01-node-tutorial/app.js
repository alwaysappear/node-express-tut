const { writeFileSync } = require('fs')

for(let i = 0; i <= 10000; i++) {
    writeFileSync(
        './content/big.txt',
        `${Math.floor(Math.random() * 100)}\n`,
        {flag: 'a'}
        )
}
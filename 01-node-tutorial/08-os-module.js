const os = require('os')

const user = os.userInfo()
console.log(user)

console.log(`The System Uptime is ${os.uptime}sec.`)
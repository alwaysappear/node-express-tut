const { usersDB } = require('../model/usersDB')
const { writeFile } = require('fs').promises
const { resolve } = require('path')

const clearCookie = {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
}

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt
    const userExists = usersDB.users.find(user => user.refreshToken === refreshToken)
    if (!userExists) {
        res.clearCookie('jwt', clearCookie)
        res.sendStatus(204)
    }
    const updateUser =  usersDB.users.map(user => user.refreshToken === userExists.refreshToken ? {...user, refreshToken: ""}: user)
    usersDB.setUsers(updateUser)
    await writeFile(
        resolve(__dirname, '../model/users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie('jwt', clearCookie)
    res.sendStatus(204)
}

module.exports = { handleLogout }
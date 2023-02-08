const { usersDB } = require('../model/usersDB')
const { writeFile } = require('fs').promises
const { resolve } = require('path')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt
    const userExists = usersDB.users.find(user => user.refreshToken === refreshToken)
    if (!userExists) {
        res.clearCookie(
            'jwt',
            {
                httpOnly: true,
                // maxAge: 7 * 24 * 60 * 60 * 1000
            }
        )
        res.sendStatus(204)
    }
    const otherUsers = usersDB.users.filter(user => user.refreshToken !== userExists.refreshToken)
    const currentUser = { ...userExists, refreshToken: '' }
    usersDB.setUsers([...otherUsers, currentUser])
    await writeFile(
        resolve(__dirname, '../model/users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie(
        'jwt', {
            httpOnly: true,
            // maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )
    res.sendStatus(204)
}

module.exports = { handleLogout }
const User = require('../model/User')

const clearCookie = {
    httpOnly: true,
} // secure - in production, sameSite: 'None'

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt
    const userExists = await User.findOne({ refreshToken }).exec()

    if (!userExists) {
        res.clearCookie('jwt', clearCookie)
        res.sendStatus(204)
    }

    userExists.refreshToken = ''
    await userExists.save()
    res.clearCookie('jwt', clearCookie)
    res.sendStatus(204)
}

module.exports = { handleLogout }
const bcrypt = require('bcrypt')

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const handleLogin = async (req, res) => {

}

module.exports = { handleLogin }
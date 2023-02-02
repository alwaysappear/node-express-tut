const path = require('path')
const bcrypt = require('bcrypt')
const fsPromises = require('fs').promises

const userDB = {
    users: require('../model/users.json'),
    setUsers: (data) => {
        this.users = data
    }
}

const handleNewUser = (req, res) => {

}

module.exports = handleNewUser

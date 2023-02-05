const usersDB = {
    users: require('./users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

module.exports = { usersDB }
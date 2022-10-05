// const User = require('./../models/user')
const db = require('./../models/index')

const findUser = async () => {
    const data = await db.User.findAll()
    if (data ===null) {
        console.log('tap trung');
    } else {
        console.log(data)
    }
}

module.exports = {findUser}

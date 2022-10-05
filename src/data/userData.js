const db = require('../models/index')

const findUser =  () => {
    return new Promise((resolve, reject) => {
        try {
            const users = db.user.findAll({
                raw:true
            })
            resolve(users)
          
            
        } catch (error) {
            reject(error)
            
        }
        
    })
}

module.exports = {findUser}

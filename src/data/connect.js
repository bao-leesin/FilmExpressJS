const config = require('./connect')
const mysql = require('mysql')

const connect = async () => {
try {
    await mysql.createConnection({
        config
    })
    console.log(config);
} catch (error) {
    console.log(error);
}


}

module.exports = connect
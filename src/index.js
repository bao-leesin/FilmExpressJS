require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userController = require('./controllers/userController')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json()) 
app.use(express.urlencoded({extended:  true}))

app.use(cors())
app.use(morgan('combined'))


// Set up view
// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars')
// app.set('views', path.join(__dirname,'resources/views'))

userController.getUser()



app.listen(port, () => { 
    console.log('Server is running on http://localhost:' + port);
});

// đã làm qua sequelize, tiếp tục tìm cách để làm việc với data
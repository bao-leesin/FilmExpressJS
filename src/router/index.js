const userRouter = require('./userRouter')
const filmRouter = require('./filmRouter')
const profileRouter = require('./profileRouter')

function route(app) {
    app.use('/apis/user/',userRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/profile/',profileRouter)
    

}

module.exports = route
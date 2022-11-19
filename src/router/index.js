const visitorRouter = require('./visitorRouter')
const filmRouter = require('./filmRouter')
const userRouter = require('./userRouter')
const actorRouter = require('./actorRouter')
const subscriptionRouter = require('./subscriptionRouter')
const notificationRouter = require('./notificationRouter')

function route(app) {
    app.use('/apis/',visitorRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/user/',userRouter)
    app.use('/apis/actor/',actorRouter)
    app.use('/apis/notification/',notificationRouter)    
    app.use('/apis/subscription/',subscriptionRouter)
}

module.exports = route
const userRouter = require('./user.route')
const ConversationRouter = require('./conversation.route')
const MessageRouter = require('./message.route')

const Route = (app) => {
    app.use('/user', userRouter)
    app.use('/conversation', ConversationRouter),
    app.use('/message', MessageRouter)
}

module.exports = Route;
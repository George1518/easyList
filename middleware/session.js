const session = require('express-session')
const mongoStore = require('connect-mongo')
const MongoStore = require('connect-mongo')

module.exports = session(
    {
        secret: 'securekey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/todo'
        }),
        cookie:
        {
            secure: false,

            httpOnly: true,

            maxAge: 1000 * 60 * 60
        }
    }
)
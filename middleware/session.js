const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // ✅ Atlas instead of localhost
        collectionName: 'sessions'
    }),
    cookie: {
        secure: false, // set to true if using HTTPS in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
});

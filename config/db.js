const mongoose = require('mongoose');

const connectDB = async () => {
mongoose.connect('mongodb://127.0.0.1:27017/todo')
.then(()=> console.log('Connected to mongoDB'))
.catch (err => {console.log(err.message)

    process.exit(1)
})
}
module.exports = connectDB;
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const sessionMiddleware = require('./middleware/session');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 1512;

// Connect to DB
connectDB();

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Public routes (NO auth here)
app.use('/', require('./routes/root.js'));
app.use('/login', require('./routes/login.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/register', require('./routes/registration.js'));


// Protected routes (require auth)
app.use('/api/tasks', authMiddleware, require('./routes/taskList.js'));
app.use('/users', authMiddleware, require('./routes/userList.js'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));



//admin page

app.use('/admin', require('./routes/admin.js'))

// 404 fallback
app.use((req, res) => {
  res.status(404).send('404 Error: Page not found');
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ YOUR APP RUNNING ON http://localhost:${PORT}`);
});
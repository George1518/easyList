const express = require('express');
const router = express.Router();
const getTasks = require('../controllers/todo/getTasks');
const deleteTask = require('../controllers/todo/deleteTask');
const postTask = require('../controllers/todo/postTask');
const putTask = require('../controllers/todo/putTask');
const authMiddleware = require('../middleware/authMiddleware')


router.use(express.json());

// Get all tasks for current logged-in user
router.get('/', authMiddleware, getTasks);

// Add a task
router.post('/', authMiddleware, postTask);

// Update a task (toggle/edit)
router.put('/:id', authMiddleware, putTask);

// Delete a task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
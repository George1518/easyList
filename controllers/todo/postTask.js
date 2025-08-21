const Tasks = require('../../models/todo');

const postTask = async (req, res) => {
  try {
    const userId = req.session.userId;

    const newTask = new Tasks({
      task: req.body.task,
      completed: false,
      userId
    });
    console.log(newTask)
     console.log(req.session.userId)
    await newTask.save();

    const taskList = await Tasks.find({ userId });
    console.log(req.session.userId)
    res.status(201).json(taskList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = postTask;
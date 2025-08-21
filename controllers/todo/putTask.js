const Tasks = require('../../models/todo');

const putTask = async (req, res) => {
  try {
    const userId = req.session.userId;

    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: req.params.id, userId },
      { $set: { completed: req.body.completed } },
      { new: true }
    );

    // if (!updatedTask) {
    //   return res.status(404).json({ error: 'Task not found' });
    // }

    const taskList = await Tasks.find({ userId });
    res.status(200).json(taskList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = putTask;
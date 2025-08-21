const Tasks = require('../../models/todo');

const deleteTask = async (req, res) => {
  try {
    const userId = req.session.userId;

    const deleted = await Tasks.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskList = await Tasks.find({ userId });
    res.status(200).json(taskList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = deleteTask;
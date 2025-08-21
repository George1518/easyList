

const Tasks = require('../../models/todo');

const getTasks = async (req, res) => {
  try {
     res.set('Cache-Control','no-store')
    console.log("Session in getTasks:", req.session);

    const userId = req.session.userId; // from session
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: no userId in session" });
    }

    const taskList = await Tasks.find({ userId });


    res.status(200).json(taskList);
  } catch (err) {
    console.error("Error in getTasks:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getTasks;
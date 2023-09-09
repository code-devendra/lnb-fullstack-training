const Tasks = require("../Schemas/taskSchema");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find().sort({ completed: 1 });
    if (!tasks) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found!!" });
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Task created successfully!!", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

// Get single Task
const getTask = async (req, res) => {
  try {
    const task = await Tasks.findOne({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found!!" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Tasks.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `No task found with id : ${req.params.id}`,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Task is updated successfully!!", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `No task found with id : ${req.params.id}`,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully!!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

// Search tasks
const searchTasks = async (req, res) => {
  try {
    console.log(req.query.key);
    const tasks = await Tasks.find({
      $or: [
        { name: { $regex: req.query.key } },
        { description: { $regex: req.query.key } },
      ],
    }).sort({ completed: 1 });
    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: `No task found with the search ${req.query.key}`,
      });
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  searchTasks,
};

const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  searchTasks,
} = require("../Controllers/taskController");

router.route("/").get(getTasks).post(createTask);
router.route("/search").get(searchTasks);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;

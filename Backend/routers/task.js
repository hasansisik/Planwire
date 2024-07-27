const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  addMessageToTask,
  getTaskMessages,
  getFiles,
  taskPersonsAdd,
} = require("../controllers/task");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:projectId").post(createTask).get(getTasks);

router
  .route("/single/:taskId")
  .post(taskPersonsAdd)
  .get(getTask)
  .put(updateTask)
  .delete([isAdmin], deleteTask);

  router
    .route("/:taskId/messages")
    .post( addMessageToTask)
    .get(getTaskMessages);

    router.get("/projects/:projectId/files", getFiles);

module.exports = router;

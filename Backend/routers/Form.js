const express = require("express");
const {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/form");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:projectId").post(createForm).get(getForms);

router
  .route("/:id")
  .get(getForm)
  .put([isAdmin], updateForm)
  .delete([isAdmin], deleteForm);

module.exports = router;

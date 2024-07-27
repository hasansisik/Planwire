const express = require("express");
const {
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  deletePlan,
  createPin,
  getPins
} = require("../controllers/plan");
const { isAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:projectId").post(createPlan).get(getPlans);

router.route("/pin/:planId").post(createPin).get(getPins);

router
  .route("/single/:planId")
  .get(getPlan)
  .put([isAdmin], updatePlan)
  .delete([isAdmin], deletePlan);

module.exports = router;

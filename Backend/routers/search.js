const express = require('express');
const { searchPlan,searchTask } = require('../controllers/search');

const router = express.Router();

router.route("/plan")
    .get(searchPlan)

router.route("/task")
    .get(searchTask)

module.exports = router;
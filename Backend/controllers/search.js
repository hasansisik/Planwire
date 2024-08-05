const createHttpError = require("http-errors");
const {
  searchPlanService,
  searchTaskService,
} = require("../services/search.service");

const searchPlan = async (req, res, next) => {
  try {
    const keyword = req.query.search || "";
    const projectId = req.query.projectId; 

    if (!keyword || !projectId) {
      throw createHttpError.BadRequest("Arama parametreleri eksik.");
    }

    const plans = await searchPlanService(keyword, projectId);
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const searchTask = async (req, res, next) => {
  try {
    const keyword = req.query.search || "";
    const projectId = req.query.projectId; 

    if (!keyword || !projectId) {
      throw createHttpError.BadRequest("Arama parametreleri eksik.");
    }

    const tasks = await searchTaskService(keyword, projectId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  searchPlan,
  searchTask,
};

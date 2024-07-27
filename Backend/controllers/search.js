const createHttpError = require("http-errors");
const {
  searchPlanService,
  searchTaskService,
} = require("../services/search.service");

const searchPlan = async (req, res, next) => {
  try {
    const keyword = req.query.search || "";

    if (!keyword) {
      throw createHttpError.BadRequest("Arama parametreleri eksik.");
    }
    const plans = await searchPlanService(keyword);
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const searchTask = async (req, res, next) => {
  try {
    const keyword = req.query.search || "";
    let me = {};

    if (req.query.me) {
      const meList = req.query.me.split(",");
      for (let persons of meList) {
        me[`persons.${persons}`] = true;
      }
    }

    if (!keyword && !req.query.me) {
      throw createHttpError.BadRequest("Arama parametreleri eksik.");
    }

    const tasks = await searchTaskService(keyword,me);
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

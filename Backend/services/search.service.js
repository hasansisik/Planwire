const Plan = require("../models/Plan");
const Task = require("../models/Task")

const searchPlanService = async (keyword, projectId) => {
  const query = {
    $or: [
      { planName: { $regex: keyword, $options: "i" } },
      { planCode: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ],
    project: projectId,
  };

  const plans = await Plan.find(query);
  return plans;
};

const searchTaskService = async (keyword, projectId) => {
  const query = {
    $or: [
      { taskTitle: { $regex: keyword, $options: "i" } },
      { taskCategory: { $regex: keyword, $options: "i" } },
    ],
    project: projectId,
  };

  const tasks = await Task.find(query)
    .populate("persons")
    .populate("taskCreator")
    .populate("plan");
  return tasks;
};

module.exports = {
  searchPlanService,
  searchTaskService,
};

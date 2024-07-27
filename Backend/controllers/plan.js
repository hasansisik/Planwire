//Plan Controller
const Plan = require("../models/Plan");
const Project = require("../models/Project");
const { StatusCodes } = require("http-status-codes");

const createPlan = async (req, res) => {
  const { planCategory, planCode, planName, planImages } = req.body;

  // Projeyi bul
  const project = await Project.findById(req.params.projectId);

  if (!planCategory || !planCode || !planName || !planImages || !project) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    // Planı oluştur
    const plan = new Plan({
      planCategory,
      planCode,
      planName,
      planImages,
      project: project,
    });
    await plan.save();
    // Oluşturulan planın ID'sini projenin plans dizisine ekle
    project.plans.push(plan._id);
    await project.save(); // Projeyi güncelle

    res.status(StatusCodes.CREATED).json({
      message: "Plan success.",
      plan,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: error.message,
      message: "Sistem hatası oluştu. Lütfen tekrar deneyin.",
    });
  }
};

const getPlans = async (req, res) => {
  try {
    const projectId = req.params.projectId; 
    const plans = await Plan.find({ project: projectId })

    if (!plans.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "Bu projeye ait plan bulunamadı.",
      });
    }
    res.status(StatusCodes.OK).json({
      plans,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId)
    if (!plan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "No plan found",
      });
    }
    res.status(StatusCodes.OK).json({
      plan,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.planId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: "No plan found",
      });
    }
    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "No plan found",
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Plan deleted.",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const createPin = async (req, res) => {
  const { planId } = req.params;
  const { x, y,task } = req.body;

  if (!x || !y || !planId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: "X, Y koordinatları ve planId alanları zorunludur.",
    });
  }

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "Belirtilen plan bulunamadı.",
      });
    }

    plan.pins.push({ x, y,task });
    await plan.save();

    res
      .status(StatusCodes.CREATED)
      .json({ pin: { x, y, task: req.body.task } });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message,
    });
  }
};

const getPins = async (req, res) => {
  const { planId } = req.params;
  try {
    const plan = await Plan.findById(planId).populate({
      path: "pins.task",
      populate: [
        { path: "plan" },
        { path: "taskCreator" },
        { path: "persons" },
        {
          path: "messages.sender",
        },
      ],
    });

    if (!plan) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "Belirtilen plan bulunamadı.",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      pins: plan.pins,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  deletePlan,
  createPin,
  getPins,
};

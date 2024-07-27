const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    projectCode: { type: String },
    address: { type: String },
    logo: {
      type: String,
      default:
        "https://i.ibb.co/V3gcGJ8/b46a6970cc0f064f5ba5d6370077c7f2e18dbb0f-1200x630-removebg-preview.png",
    },
    plans: [{ type: Schema.Types.ObjectId, ref: "Plan", default: [] }],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

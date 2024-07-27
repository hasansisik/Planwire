import { createReducer } from "@reduxjs/toolkit";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../actions/projectActions";

export const projectReducer = createReducer(
  {
	projects: [],
	project: {},
	loading: false,
	error: null,
	message: null,
  },
  (builder) => {
	builder
	  // Create Project
	  .addCase(createProject.pending, (state) => {
		state.loading = true;
	  })
	  .addCase(createProject.fulfilled, (state, action) => {
		state.loading = false;
		state.project = action.payload;
	  })
	  .addCase(createProject.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload;
	  })
	  // Get Projects
	  .addCase(getProjects.pending, (state) => {
		state.loading = true;
	  })
	  .addCase(getProjects.fulfilled, (state, action) => {
		state.loading = false;
		state.projects = action.payload;
	  })
	  .addCase(getProjects.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload;
	  })
	  // Get Project
	  .addCase(getProject.pending, (state) => {
		state.loading = true;
	  })
	  .addCase(getProject.fulfilled, (state, action) => {
		state.loading = false;
		state.project = action.payload;
	  })
	  .addCase(getProject.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload;
	  })
	  // Update Project
	  .addCase(updateProject.pending, (state) => {
		state.loading = true;
	  })
	  .addCase(updateProject.fulfilled, (state, action) => {
		state.loading = false;
		state.project = action.payload;
	  })
	  .addCase(updateProject.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload;
	  })
	  // Delete Project
	  .addCase(deleteProject.pending, (state) => {
		state.loading = true;
	  })
	  .addCase(deleteProject.fulfilled, (state, action) => {
		state.loading = false;
		state.message = action.payload;
	  })
	  .addCase(deleteProject.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload;
	  });

	// Error and Message
	builder.addCase("clearError", (state) => {
	  state.error = null;
	});
	builder.addCase("clearMessage", (state) => {
	  state.message = null;
	});
  }
);
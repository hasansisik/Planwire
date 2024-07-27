import { createReducer } from "@reduxjs/toolkit";
import { companyRegister, companyLogin } from "../actions/companyActions";

export const companyReducer = createReducer(
  {
    company: {},
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      // Company Register
      .addCase(companyRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(companyRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Company Login
      .addCase(companyLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(companyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Error Handling
    builder.addCase("clearError", (state) => {
      state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    });
  }
);

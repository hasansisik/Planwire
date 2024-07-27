import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "./reducers/companyReducer";
import { userReducer } from "./reducers/userReducer";
import { projectReducer } from "./reducers/projectReducer";
import { planReducer } from "./reducers/planReducer";
import { taskReducer } from "./reducers/taskReducer";
import { formReducer } from "./reducers/formReducer";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    projects: projectReducer,
    plans: planReducer,
    tasks: taskReducer,
    forms: formReducer,
  },
});

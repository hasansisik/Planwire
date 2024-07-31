// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './reducers/companyReducer';
import userReducer from './reducers/userReducer';
import { projectReducer } from './reducers/projectReducer';

const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    projects: projectReducer,  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
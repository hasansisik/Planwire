import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../config";

export const createPlan = createAsyncThunk(
  "plan/create",
  async (
    { projectId, planCategory, planCode, planName, planImages },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(`${server}/plan/${projectId}`, {
        planCategory,
        planCode,
        planName,
        planImages,
      });
      return data.plan;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPlans = createAsyncThunk(
  "plan/getAll",
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/plan/${projectId}`);
      return data.plans;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPlan = createAsyncThunk(
  'plan/get',
  async (planId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/plan/${planId}`);
      return data.plan;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plan/update",
  async (
    { planId, planCategory, planCode, planName, planImages },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.put(`${server}/plan/${planId}`, {
        planCategory,
        planCode,
        planName,
        planImages,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  'plan/delete',
  async (planId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/plan/${planId}`);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createPin = createAsyncThunk(
  "plan/createPin",
  async ({ planId, x, y, task }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/plan/pin/${planId}`, {
        x,
        y,
        task,
      });
      return data.pin;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPins = createAsyncThunk(
  "plan/getPins",
  async (planId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/plan/pin/${planId}`);
      return data.pins;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
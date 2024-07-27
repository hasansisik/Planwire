import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../config"

export const createProject = createAsyncThunk(
  "project/create",
  async ({ projectName, projectCode, address, logo, companyId }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/project`, {
        projectName,
        projectCode,
        address,
        logo,
        companyId
      });
      return data.project;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getAll",
  async (companyId, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/project/gets`, { companyId });
      return data.projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProject = createAsyncThunk(
  'project/get',
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/project/${projectId}`);
      return data.project;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/update',
  async ({ projectId, projectName, projectCode, address, logo }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${server}/project/${projectId}`, { projectName, projectCode, address, logo });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/delete',
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/project/${projectId}`);
      return data.message; // Assuming the response structure includes a success message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
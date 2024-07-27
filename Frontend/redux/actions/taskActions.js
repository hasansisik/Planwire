import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

export const createTask = createAsyncThunk(
  "task/create",
  async (
    { projectId, taskCategory, taskTitle, persons, plan, taskCreator },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${server}/task/${projectId}`, {
        taskCategory,
        taskTitle,
        persons,
        plan,
        taskCreator,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getAll",
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/task/${projectId}`);
      return data.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTask = createAsyncThunk(
  "task/get",
  async (taskId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/task/single/${taskId}`);
      return data.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async ({ taskId, taskCategory, taskTitle, persons, plans }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${server}/task/${taskId}`, {
        taskCategory,
        taskTitle,
        persons,
        plans,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (taskId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/task/${taskId}`);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addMessageToTask = createAsyncThunk(
  "task/addMessage",
  async ({ taskId, content, senderId, files }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${server}/task/${taskId}/messages`,
        {
          content,
          senderId,
          files,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTaskMessages = createAsyncThunk(
  "task/getMessages",
  async (taskId, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${server}/task/${taskId}/messages`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getFiles = createAsyncThunk(
  "task/getFiles",
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${server}/task/projects/${projectId}/files`
      );
      return data.files;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addPersonToTask = createAsyncThunk(
  "task/addPerson",
  async ({ taskId, userId }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/task/single/${taskId}`, {
        userId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
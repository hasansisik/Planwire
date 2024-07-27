import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

export const createForm = createAsyncThunk(
  "form/create",
  async (
    {
      projectId,
      formCategory,
      formTitle,
      formDescription,
      formCreator,
      formPerson, 
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${server}/form/${projectId}`, {
        formCategory,
        formTitle,
        formDescription,
        formCreator,
        formPerson,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getForms = createAsyncThunk(
  "form/getAll",
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/form/${projectId}`);
      return data.forms;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getForm = createAsyncThunk(
  "form/get",
  async (formId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/form/${formId}`);
      return data.form;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateForm = createAsyncThunk(
  "form/update",
  async ({ formId, formCategory, formPerson }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${server}/form/${formId}`, {
        formCategory,
        formPerson,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteForm = createAsyncThunk(
  "form/delete",
  async (formId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/form/${formId}`);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

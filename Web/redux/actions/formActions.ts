import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

export interface CreateFormPayload {
  projectId: string;
  formCategory: string; // Bu satırı ekleyin
  formTitle: string;
  formDescription: string;
  formCreator: string;
  formPerson: string;
}

interface UpdateFormPayload {
  formId: string;
  formCategory: string;
  formPerson: string;
}

export const createForm = createAsyncThunk(
  "form/create",
  async (payload: CreateFormPayload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await axios.post(`${server}/form/${payload.projectId}`, {
        formCategory: payload.formCategory,
        formTitle: payload.formTitle,
        formDescription: payload.formDescription,
        formCreator: payload.formCreator,
        formPerson: payload.formPerson,
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      console.log(error.response.data.message);
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getForms = createAsyncThunk(
  "form/getAll",
  async (projectId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/form/${projectId}`);
      return data.forms;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getForm = createAsyncThunk(
  "form/get",
  async (formId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/form/${formId}`);
      return data.form;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateForm = createAsyncThunk(
  "form/update",
  async (payload: UpdateFormPayload, thunkAPI) => {
    try {
      const { data } = await axios.put(`${server}/form/${payload.formId}`, {
        formCategory: payload.formCategory,
        formPerson: payload.formPerson,
      });
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteForm = createAsyncThunk(
  "form/delete",
  async (formId: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/form/${formId}`);
      return data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

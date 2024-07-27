import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

export const companyRegister = createAsyncThunk(
  "company/register",
  async ({ CompanyCode, password, CompanyName, CompanyEmail, CompanyAddress, CompanyPhone }, thunkAPI) => {
	try {
	  const { data } = await axios.post(`${server}/company/register`, {
      CompanyCode,
      password,
      CompanyName,
      CompanyEmail,
      CompanyAddress,
      CompanyPhone,
    });
	  return data.company;
	} catch (error) {
	  return thunkAPI.rejectWithValue(error.response.data.message);
	}
  }
);

export const companyLogin = createAsyncThunk(
  "company/login",
  async ({ CompanyCode, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/company/login`, {
        CompanyCode,
        password,
      });
      await AsyncStorage.setItem("companyId", data.company._id);
      return data.company;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


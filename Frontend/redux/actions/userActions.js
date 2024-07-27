import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../config"

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password, companyId }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/auth/register`, {
        name,
        email,
        password,
        companyId,
      });
      await AsyncStorage.setItem("accessToken", data.user.token);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, companyId }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/auth/login`, {
        email,
        password,
        companyId,
      });
      await AsyncStorage.setItem("accessToken", data.user.token);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const { data } = await axios.get(`${server}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const { data } = await axios.get(`${server}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("companyId"); 
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async ({ email, verificationCode }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${server}/auth/verify-email`,
        { email, verificationCode },
      );

      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  }
);

export const againEmail = createAsyncThunk(
  'user/againEmail',
  async (email, thunkAPI) => {
    try {
      await axios.post(`${server}/auth/again-email`, { email });

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, thunkAPI) => {
    try {
      await axios.post(`${server}/auth/forgot-password`, { email });

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email, passwordToken, newPassword }, thunkAPI) => {
    try {
      await axios.post(`${server}/auth/reset-password`, { email, passwordToken, newPassword });

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  }
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async (userData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      const body = JSON.stringify(userData);
      await axios.post(`${server}/auth/edit-profile`, body, config);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (companyId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/auth/users/${companyId}`);
      return data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);




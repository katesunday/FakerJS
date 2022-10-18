import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoint } from "../mocks/handlers";
import { dataObj, UserType } from "../data/usersData";
import { setAppStatusAC } from "./appReducer";

export const getUsersTC = createAsyncThunk(
  "users/getUsers",
  async (param, { dispatch }) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const response = await fetch(`${endpoint}/users`, {
        method: "GET",
      });
      dispatch(setAppStatusAC({ status: "succeeded" }));
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }
);

export const getUserByIDTC = createAsyncThunk(
  "users/getUserByID",
  async (param: { id: number }, { dispatch }) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const response = await fetch(`${endpoint}/users/:${param.id}`, {
        method: "GET",
      });
      dispatch(setAppStatusAC({ status: "succeeded" }));
      return { id: param.id };
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteUsersTC = createAsyncThunk(
  "users/deleteUser",
  async (param: { id: number }, { dispatch }) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      await fetch(`${endpoint}/users/:${param.id}`, {
        method: "DELETE",
        body: JSON.stringify(dataObj),
      });
      dispatch(setAppStatusAC({ status: "succeeded" }));
      return { id: param.id };
    } catch (e) {
      console.log(e);
    }
  }
);

export const modifyUserTC = createAsyncThunk(
  "users/modifyUser",
  async (param: UserType, { dispatch }) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      await fetch(`${endpoint}/users/:${param.id}`, {
        method: "PATCH",
        body: JSON.stringify(dataObj),
      });
      dispatch(setAppStatusAC({ status: "succeeded" }));
      return param;
    } catch (e) {
      console.log(e);
    }
  }
);
export const addNewUserTC = createAsyncThunk(
  "users/addUser",
  async (param: UserType, { dispatch }) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      await fetch(`${endpoint}/users/addUser`, {
        method: "PUT",
        body: JSON.stringify(dataObj),
      });
      dispatch(setAppStatusAC({ status: "succeeded" }));
      return param;
    } catch (e) {
      console.log(e);
    }
  }
);

const slice = createSlice({
  name: "users",
  initialState: [] as UserType[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersTC.fulfilled, (state, action) => {
      return dataObj;
    });
    builder.addCase(getUserByIDTC.fulfilled, (state, action) => {
      state.find((el) => el.id === action.payload?.id);
    });
    builder.addCase(deleteUsersTC.fulfilled, (state, action) => {
      return state.filter((el) => el.id !== action.payload?.id);
    });
    builder.addCase(modifyUserTC.fulfilled, (state, action) => {
      if (action.payload) {
        const { id, first_name, last_name, email } = action.payload;
        return state.map((el) => {
          return el.id === id ? { ...el, first_name, last_name, email } : el;
        });
      }
    });
    builder.addCase(addNewUserTC.fulfilled, (state, action) => {
      action.payload && state.unshift({ ...action.payload });
    });
  },
});
export const usersReducer = slice.reducer;

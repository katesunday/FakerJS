import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name:'users',
    initialState:{},
    reducers:{},
    extraReducers:{}
})
export const usersReducer = slice.reducer

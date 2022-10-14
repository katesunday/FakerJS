import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name:'auth',
    initialState:{isLoggedIn:false},
    reducers:{},
    extraReducers:{}
})
export const authReducer = slice.reducer

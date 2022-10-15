import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {endpoint} from "../mocks/handlers";
import {USERS , UserType} from "../data/usersData";

export const getUsersTC = createAsyncThunk('users/getUsers' , async (param,ThunkAPI)=>{
    try {
        const response = await fetch(`${endpoint}/users`,{
            method:'GET'
        })
        return response.json()
    }
    catch (e) {
        console.log(e)
    }
})

export const deleteUsersTC = createAsyncThunk('users/deleteUser' , async (param:{id:number},ThunkAPI)=>{
    try {
        const response = await fetch(`${endpoint}/users/:${param.id}`,{
            method:'DELETE'
        })
        return {id:param.id}
    }
    catch (e) {
        console.log(e)
    }
})

const slice = createSlice({
    name:'users',
    initialState:[] as UserType[],
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getUsersTC.fulfilled,(state,action)=>{
            return USERS
        })
        builder.addCase(deleteUsersTC.fulfilled,(state,action)=>{
            if(action.payload){
                const index = state.findIndex(el=>el.id !== action.payload?.id)
                if (index > -1) {
                    const users = state.slice(index , 1)
                    state = users
                }
            }
            console.log(state)

        })
    }
})
export const usersReducer = slice.reducer

import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {endpoint} from "../mocks/handlers";
import {setAppStatusAC} from "./appReducer";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type FieldErrorType = { field: string, error: string }
export const LoginTC = createAsyncThunk<undefined , LoginParamsType , { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType } }>('auth/login' , async (data: LoginParamsType , {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await fetch(`${endpoint}/login` , {
            method: 'POST'
        })
        dispatch(setAppStatusAC({status: 'loading'}))
        return response.json()
    } catch (e) {
        console.log(e)
    }
})

const slice = createSlice({
    name: 'auth' ,
    initialState: {isLoggedIn: true} ,
    reducers: {} ,
    extraReducers: (builder) => {
        builder.addCase(LoginTC.fulfilled , (state , action) => {
            state.isLoggedIn = true
        })
    }
})
export const authReducer = slice.reducer



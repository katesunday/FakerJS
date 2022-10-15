import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {endpoint} from "../mocks/handlers";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type FieldErrorType = { field: string, error: string }
export const LoginTC = createAsyncThunk<undefined , LoginParamsType , {rejectValue:{errors:string[],fieldsErrors?:FieldErrorType}}>('auth/login' , async (data: LoginParamsType,thunkAPI)=>{
    try {
        const response = await fetch(`${endpoint}/login`,{
            method:'POST'
        })
        return response.json()
    }
    catch (e) {
        console.log(e)
    }
})

const slice = createSlice({
    name: 'auth' ,
    initialState: {isLoggedIn: true} ,
    reducers: {} ,
    extraReducers: (builder) => {
        builder.addCase(LoginTC.fulfilled,(state,action)=>{
            state.isLoggedIn = true
        })
    }
})
export const authReducer = slice.reducer


// export const createItem = async () => {
//     try {
//         const response = await fetch(`${endpoint}/users`, {
//             method: "GET",
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             },
//         });
//         return response.json();
//     } catch (e) {
//         console.log(e);
//     }
// };

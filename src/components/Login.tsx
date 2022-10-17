import {useAppDispatch , useAppSelector} from "../store/store";
import {FormikHelpers , useFormik} from "formik";
import { Navigate } from "react-router-dom";
import {
    Button ,
    Checkbox ,
    FormControl ,
    FormControlLabel ,
    FormGroup ,
    FormLabel ,
    Grid , LinearProgress ,
    TextField
} from "@mui/material";
import {LoginTC} from "../reducers/authReducer";
import React from "react";

 type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
 type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    const formik = useFormik({
        initialValues: {
            email: '' ,
            password: '' ,
            rememberMe: false
        } ,
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length <= 2) {
                errors.password = 'Minimum 2 symbols required';
            }

            return errors;
        } ,
        onSubmit: async (values:FormikValuesType,formikHelpers:FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(LoginTC(values))
            if(LoginTC.rejected.match(action)){
                if(action.payload?.fieldsErrors){
                    const error = action.payload.fieldsErrors
                    formikHelpers.setFieldError(error.field,error.error)
                }
            }
            formik.resetForm()
        } ,
    })

    if (isLoggedIn) {
        return <Navigate to='/users'/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>This is a simulation of login:</p>
                        <p>Email: can be any.</p>
                        <p>Password: can be any.</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                        <FormControlLabel label={'Remember me'}
                                          control={
                                              <Checkbox
                                                  {...formik.getFieldProps('rememberMe')}
                                              />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'} disabled={status ==='loading'}>
                            Login
                        </Button>
                        {status === 'loading' && <LinearProgress/>}
                    </FormGroup>
                </FormControl>
            </form>

        </Grid>
    </Grid>
}


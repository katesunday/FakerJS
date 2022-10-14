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
    Grid ,
    TextField
} from "@mui/material";

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
            // const action = await dispatch(loginTC(values))
            // if(loginTC.rejected.match(action)){
            //     if(action.payload?.fieldsErrors){
            //         const error = action.payload.fieldsErrors
            //         formikHelpers.setFieldError(error.field,error.error)
            //     }
            // }
            formik.resetForm()
        } ,
    })

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        {/*<ErrorSnackbar/>*/}
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                            // name='email'
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            //        onBlur={formik.handleBlur}
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
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>

        </Grid>
    </Grid>
}

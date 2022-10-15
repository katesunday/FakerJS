import React , {useEffect} from 'react';
import {useAppDispatch , useAppSelector} from "../store/store";
import {Navigate} from "react-router-dom";
import {getUsersTC} from "../reducers/usersReducer";
import {Paper , Table , TableBody , TableCell , TableContainer , TableRow} from "@mui/material";
import UserItem from "./UserItem";

const UsersList = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const users = useAppSelector(state => state.users)
    useEffect(()=>{
        dispatch(getUsersTC())
    },[dispatch])
    if(!isLoggedIn){
       return <Navigate to='/login'/>
    }
    return (
                <Paper>
                    <TableContainer component = {Paper}>
                        <Table sx={{minWidth: 200,maxWidth:1400}} aria-label="custom pagination table" >
                            <TableBody>
                                <TableRow style={{backgroundColor: 'rgb(184 245 213 / 54%)'}}>
                                    <TableCell align='left'>
                                        Avatar
                                    </TableCell>
                                    <TableCell align='left'>
                                        First Name
                                    </TableCell>
                                    <TableCell align='left'>
                                        Last Name
                                    </TableCell>
                                    <TableCell align='left' style={{width:"inherit"}}>
                                        Email
                                    </TableCell>
                                    <TableCell align='left'>
                                    </TableCell>

                                </TableRow>
                                {users.map((el)=>{
                                    return <UserItem key={el.id} user = {el}/>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

    );
};

export default UsersList;

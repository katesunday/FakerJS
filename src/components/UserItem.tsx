import React from 'react';
import {IconButton , TableCell , TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Edit} from "@mui/icons-material";
import {UserType} from "../data/usersData";
import {useAppDispatch} from "../store/store";
import {deleteUsersTC} from "../reducers/usersReducer";

type UserItemPropsType = {
    user:UserType
}
const UserItem = (props:UserItemPropsType) => {
    const dispatch = useAppDispatch()
    const deleteUserHandler = (id:number)=>{
        dispatch(deleteUsersTC({id}))
    }
    return (
        <TableRow key={props.user.id}>
            <TableCell style={{width: 100}} align="left">
                <img src={props.user.avatar} style={{width: '70px', height: '70px',borderRadius:'50%'}} alt ='user avatar'/>
            </TableCell>
            <TableCell style={{width: 100}} align="left">{props.user.first_name}</TableCell>
            <TableCell style={{width: 100}} align="left">{props.user.last_name}</TableCell>
            <TableCell style={{width: 100}} align="left">{props.user.email}</TableCell>
            <TableCell style={{width: 20}} align='left'>
                <IconButton aria-label="delete" size='small' sx={{mt: 0.2, mb: 0.2, display: 'block', width: 0}}
                onClick={()=>deleteUserHandler(props.user.id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" size='small' sx={{mt: 0.2, mb: 0.2, display: 'block', width: 0}}>
                    <Edit />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default UserItem;
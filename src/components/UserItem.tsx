import React , {useState} from "react";
import {IconButton , TableCell , TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Edit} from "@mui/icons-material";
import {UserType} from "../data/usersData";
import {useAppDispatch , useAppSelector} from "../store/store";
import {deleteUsersTC} from "../reducers/usersReducer";
import ModalUserItem from "./ModalUserItem";
import noAvatarImg from "../images/no-avatar.png";

type UserItemPropsType = {
    user: UserType;
};
const UserItem = (props: UserItemPropsType) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.app.status);

    const deleteUserHandler = (id: number) => {
        dispatch(deleteUsersTC({id}));
    };
    const [openModal , setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => setOpenModal(false);

    return (
        <TableRow key={props.user.id}>
            <TableCell style={{width: 100}} align="left">
                <img
                    src={props.user.avatar || noAvatarImg}
                    style={{width: "70px" , height: "70px" , borderRadius: "50%"}}
                    alt="user avatar"
                />
            </TableCell>
            <TableCell style={{width: 100}} align="left">
                {props.user.first_name}
            </TableCell>
            <TableCell style={{width: 100}} align="left">
                {props.user.last_name}
            </TableCell>
            <TableCell style={{width: 100}} align="left">
                {props.user.email}
            </TableCell>
            <TableCell style={{width: 20}} align="left">
                <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{mt: 0.2 , mb: 0.2 , display: "block" , width: 0}}
                    onClick={() => deleteUserHandler(props.user.id)}
                    disabled={status === "loading"}
                >
                    <DeleteIcon/>
                </IconButton>
                <IconButton
                    aria-label="edit"
                    size="small"
                    sx={{mt: 0.2 , mb: 0.2 , display: "block" , width: 0}}
                >
                    <Edit onClick={handleOpen}/>
                </IconButton>
            </TableCell>
            <ModalUserItem
                user={props.user}
                openModal={openModal}
                handleClose={handleClose}
            />
        </TableRow>
    );
};

export default UserItem;

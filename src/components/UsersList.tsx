import React , {ChangeEvent , useEffect , useState} from 'react';
import {useAppDispatch , useAppSelector} from "../store/store";
import {Navigate , useParams} from "react-router-dom";
import {getUsersTC} from "../reducers/usersReducer";
import {
    Button ,
    LinearProgress ,
    Pagination ,
    Paper ,
    Table ,
    TableBody ,
    TableCell ,
    TableContainer ,
    TableRow
} from "@mui/material";
import UserItem from "./UserItem";
import {UserType} from "../data/usersData";
import ModalUserItem from "./ModalUserItem";
import usePagination from "../utils/pagination";


const UsersList = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const users = useAppSelector(state => state.users)
    const status = useAppSelector(state => state.app.status)

    const {userId} = useParams()
    const userFromParams = userId && users.find(el => el.id === +userId);
    console.log(userId)

    const newUser: UserType = {
        id: users.length + 1 ,
        first_name: '' ,
        last_name: '' ,
        email: '' ,
    }
    const [openModal , setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [page , setPage] = useState(1);
    const PER_PAGE = 10;
    const count = Math.ceil(users.length / PER_PAGE);
    const _DATA = usePagination(users , PER_PAGE);
    const handleChange = (e: ChangeEvent<unknown> , p: number) => {
        setPage(p);
        _DATA.jump(p);
    };

    useEffect(() => {
        dispatch(getUsersTC())
    } , [dispatch , userId])


    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return (
        <Paper>
            <div style={{display: "flex" , justifyContent: 'space-between'}}>
                <b>TOTAL CUSTOMERS : {users.length}</b>
                <Button variant={'contained'}
                        color={'primary'}
                        size={'small'} onClick={handleOpen}>+ Add customer</Button>
                <ModalUserItem user={newUser} openModal={openModal} handleClose={handleClose} isNewUser={true}/>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200 , maxWidth: 1400}} aria-label="custom pagination table">
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
                            <TableCell align='left' style={{width: "inherit"}}>
                                Email
                            </TableCell>
                            <TableCell align='left'>
                            </TableCell>

                        </TableRow>
                        {_DATA.currentData().map((el) => {
                            return <UserItem key={el.id} user={el}/>
                        })}
                    </TableBody>
                </Table>
                {userFromParams &&
                    <ModalUserItem user={userFromParams} openModal={openModal} handleClose={handleClose}/>}
                <Pagination count={count} page={page} onChange={handleChange}
                            variant="outlined" shape="rounded"/>
                {status === 'loading' && <LinearProgress/>}
            </TableContainer>

        </Paper>

    );
};

export default UsersList;

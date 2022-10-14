import React from 'react';
import {useAppSelector} from "../store/store";
import {Navigate} from "react-router-dom";

const UsersList = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    if(!isLoggedIn){
       return <Navigate to='/login'/>
    }
    return (
        <div>
            users
        </div>
    );
};

export default UsersList;

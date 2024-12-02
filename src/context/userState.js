import React, { useState } from "react";
import userContext from "./userContext";
import{ jwtDecode } from 'jwt-decode';

const UserState = (props) => {

    const [user, setUser] = useState({name: '',email: '', data:{}});
    const initializeUser = ()=>{
        const token = localStorage.getItem('authToken');
        if (token){
            const userObj = jwtDecode(token);
            const myUser = {
                name: userObj.name,
                email: userObj.email,
                data: {}
            }
            setUser(myUser);
        }
        else return;
    }
    return (
        <userContext.Provider value={{ user,setUser,initializeUser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;


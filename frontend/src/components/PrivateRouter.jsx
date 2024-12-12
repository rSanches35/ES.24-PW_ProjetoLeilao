import React from "react";

import {Navigate, Outlet} from "react-router-dom";

const PrivateRouter = () =>{

    const isAuthenticated = !!localStorage.getItem("token");

    return (

        isAuthenticated?<Outlet/>:<Navigate to='/login-request'/>
    );
}; export default PrivateRouter;
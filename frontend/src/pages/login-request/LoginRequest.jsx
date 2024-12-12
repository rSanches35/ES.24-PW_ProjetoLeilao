import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './LoginRequest.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const LoginRequest = () => {

    return (
        <div className="body-login">
            <Helmet><title>Login Request</title></Helmet>

            <Card title="Unauthorized"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">

                <img className="w-2 mt-1 mb-3" src="/images/login-request.png" alt=""></img>

                <h4 className="mt-1 px-6">
                    The page you tried to access asks for Login.</h4>

                <div className="flex flex-column align-items-center mt-3">

                <Link to="/login" className="w-full">
                    <Button
                    label="Log In"
                    link/>
                </Link>

                </div>
            </Card>
        </div>
    );
    
}; export default LoginRequest;
import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './Login.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';


const Login = () => {

    return (
        <div>
            <Helmet><title>Log In</title></Helmet>

            <Card title="Log In"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">
                
                <InputText
                placeholder="E-Mail"
                className="mt-5 w-10"
                />

                <Password
                placeholder="Password"
                toggleMask
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}
                />

                <Button
                label="Log In"
                className="mt-5 mb-3 px-6"
                />

                <div className="flex flex-column align-items-center mt-3">

                <Link to="/forgot-password" className="w-full">
                    <Button
                    label="Forgot your Password?"
                    link
                    className="-mb-3"/>
                </Link>

                <Link to="/register" className="w-full">
                    <Button
                    label="Create Account"
                    link/>
                </Link>

                </div>
            </Card>
        </div>
    );
    
}; export default Login;
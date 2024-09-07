import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './Login.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';


const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const handleChange = (input) =>{

        setUser({...user, [input.target.name]:input.target.value});
    }

    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter') { login();}
    }

    const login = () =>{

        if(user.email == "user" && user.password == "123") {

            let token = "token do backend"

            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);

            navigate("/");
        }
        else {alert("Access Denied!");}
    }

    return (
        <div className="body-login">
            <Helmet><title>Log In</title></Helmet>

            <Card title="Log In"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">
                
                <InputText
                placeholder="E-Mail"
                name="email"
                className="mt-5 w-10"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />

                <Password
                placeholder="Password"
                name="password"
                toggleMask
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />

                <Button
                label="Log In"
                className="mt-5 mb-3 px-6"
                onClick={login}
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
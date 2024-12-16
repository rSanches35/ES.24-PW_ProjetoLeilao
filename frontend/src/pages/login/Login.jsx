import React, { useState, useRef } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './Login.css'

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import PersonService from "../../services/PersonService";


const Login = () => {

    const toast = useRef(null);

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: null,
        password: null
    });

    const personService = new PersonService;

    const handleChange = (input) =>{

        setUser({...user, [input.target.name]:input.target.value});
    }

    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter') { login();}
    }

    const showErrorBlank = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'The field[s] cannot be empty!', life: 3000});
    }

    const showErrorInvalidLogin = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Incorrect Email or Password!', life: 3000});
    }

    const login = async () => {

        try {
            const response = await personService.login(user);
            if (response) {
                localStorage.setItem("token", response.token);
                navigate("/");
            }
        } catch (error) {
            if(user.email == null || user.password == null) {showErrorBlank();}
            else if(error.status == 500){showErrorInvalidLogin();}
        }
    }

    return (
        <div className="body-login">
            <Helmet><title>Log In</title></Helmet>

            <Toast ref={toast} />

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
                    className="mt-2 -mb-3"/>
                </Link>

                <Link to="/validate" className="w-full">
                    <Button
                    label="Validate your Account"
                    link/>
                </Link>

                <Link to="/register" className="w-full">
                    <Button
                    label="Create Account"
                    link
                    className="-mt-3" />
                </Link>

                </div>
            </Card>
        </div>
    );
    
}; export default Login;
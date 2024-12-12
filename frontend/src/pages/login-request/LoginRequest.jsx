import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './LoginRequest.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import PersonService from "../../services/PersonService";


const LoginRequest = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const personService = new PersonService;

    const handleChange = (input) =>{

        setUser({...user, [input.target.name]:input.target.value});
    }

    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter') { login();}
    }

    const login = async () => {

        try {
            console.log(user);
            const response = await personService.login(user);
            if (response) {
                localStorage.setItem("token", JSON.stringify(response));
                navigate("/");
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="body-login">
            <Helmet><title>Log In</title></Helmet>

            <Card title="Unauthorized"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">

                <img className="w-2 mt-1 mb-3" src="/images/login-request.png" alt=""></img>

                <h4 className="mt-1 px-6">
                    The page you tried to access asks for Login.</h4>

                <div className="flex flex-column align-items-center mt-3">

                <Link to="/login" className="w-full">
                    <Button
                    label="Log In"
                    link
                    className="" />
                </Link>

                </div>
            </Card>
        </div>
    );
    
}; export default LoginRequest;
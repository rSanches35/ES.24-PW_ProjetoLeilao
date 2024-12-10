import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './Validate.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';

import PersonService from "../../services/PersonService";


const Validate = () => {

    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const personService = new PersonService;

    const handleChange = (input) => {

        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const handleKeyDown = (event) => {

        if (event.key === 'Enter') { validate(); }
    }

    const validate = async () => {

        try {
            console.log(user);
            const response = await personService.activate(otp);
            if (response) {
                localStorage.setItem("user", JSON.stringify(response));
                navigate("/login");
            }
        } catch (error) {

            console.log(user);
            console.log(error);
        }
    }

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    return (
        <div className="body-login">
            <Helmet><title>Validate</title></Helmet>

            <Card title="Validate Account"
                className="pt-5 md:w-25rem flex flex-column align-items-center text-center">

                <InputOtp
                length={6}
                integerOnly
                onChange={(e) => handleOtpChange(e.value)}onKeyDown={handleKeyDown}
                />

                <Button
                    label="Validate"
                    className="mt-5 mb-3 px-6"
                    onClick={validate}
                />

                <div className="flex flex-column align-items-center mt-3">

                    <Link to="/login" className="w-full">
                        <Button
                        label="Back"
                        link />
                    </Link>

                </div>
            </Card>
        </div>
    );

}; export default Validate;
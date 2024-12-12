import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

import './Validate.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { InputText } from 'primereact/inputtext';

import PersonService from "../../services/PersonService";


const Validate = () => {

    const location = useLocation();
    const emailDigitado = location.state?.email || "";

    const [email, setEmail] = useState(emailDigitado);
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    const personService = new PersonService;

    const handleKeyDown = (event) => {

        if (event.key === 'Enter') { validate(); }
    }

    const validate = async () => {

        try {
            const response = await personService.activate({email, code:  otp});
            if (response) {
                navigate("/login");
            }
        } catch (error) {

            console.log(email);
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

                <InputText
                placeholder={emailDigitado ? emailDigitado : "E-Mail"}
                value={email}
                id="email"
                className="mt-3 mb-3 w-full"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                />

                <InputOtp
                length={6}
                integerOnly
                onChange={(e) => handleOtpChange(e.value)}
                onKeyDown={handleKeyDown}
                />

                <Button
                    label="Validate"
                    className="mt-6 mb-3 px-6"
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
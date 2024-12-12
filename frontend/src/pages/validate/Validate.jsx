import React, { useState, useRef } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

import './Validate.css'

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { InputText } from 'primereact/inputtext';

import PersonService from "../../services/PersonService";


const Validate = () => {

    const toast = useRef(null);
    const location = useLocation();
    const emailDigitado = location.state?.email || null;

    const [email, setEmail] = useState(emailDigitado);
    const [otp, setOtp] = useState(null);

    const navigate = useNavigate();
    const personService = new PersonService;

    const handleKeyDown = (event) => {

        if (event.key === 'Enter') { validate(); }
    }

    const showErrorBlank = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'The field[s] cannot be empty!', life: 3000});
    }

    const showErrorInvalidValidate = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Incorrect Email or Code!', life: 3000});
    }

    const showAccountValidate = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Account Validated!', life: 3000});
    }

    const validate = async () => {

        try {
            const response = await personService.activate({email, code:  otp});
            if (response) {
                
                showAccountValidate();
                setTimeout(() => { navigate("/login");}, 1800);
            }
        } catch (error) {

            if(email == null || otp == null) {showErrorBlank();}
            else if(error.status == 500){showErrorInvalidValidate();}
        }
    }

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    return (
        <div className="body-login">
            <Helmet><title>Validate</title></Helmet>

            <Toast ref={toast} />

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
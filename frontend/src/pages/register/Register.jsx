import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './Register.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
        

const Register = () => {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
  
    const header = <div className="font-bold mb-3">Choose Password</div>;
    const footer = (
        <>
        <Divider />
        <p className="mt-2">Requirements</p>
        <ul className="pl-2 ml-2 mt-0 line-height-3">
            <li
                className={passwordRequirements.minLength ? "text-green-500" : "text-red-500"}>
                Minimum characters [6]
            </li>
            <li
                className={passwordRequirements.hasLowerCase ? "text-green-500" : "text-red-500"}>
                Lowercase
            </li>
            <li
                className={passwordRequirements.hasUpperCase ? "text-green-500" : "text-red-500"}>
                Uppercase
            </li>
            <li
                className={passwordRequirements.hasNumber ? "text-green-500" : "text-red-500"}>
                Numeric
            </li>
            <li
                className={passwordRequirements.hasSpecialChar ? "text-green-500" : "text-red-500"}>
                Special character
            </li>
        </ul>
        </>
    );
  
    const onPasswordChange = (e) => {

        const typedPassword = e.target.value;

        setPassword(typedPassword);
        setPasswordRequirements({
            minLength: typedPassword.length >= 6,
            hasLowerCase: /[a-z]/.test(typedPassword),
            hasUpperCase: /[A-Z]/.test(typedPassword),
            hasNumber: /[0-9]/.test(typedPassword),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(typedPassword),
        });
    };
  
    const onPasswordConfirmChange = (e) => {

        const passwordConfirm = e.target.value;

        setPasswordConfirm(passwordConfirm);
        if (password !== passwordConfirm) { setErrorMessage("Passwords are different");}
        else { setErrorMessage("");}
    };

    return (
        <div>
            <Helmet><title>Register</title></Helmet>

            <Card title="Register"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">
                
                <InputText
                placeholder="Full Name"
                className="mt-5 w-10"
                />

                <InputText
                placeholder="E-Mail"
                className="mt-3 w-10"
                />

                <InputMask
                mask="(99) 9 9999-9999"
                placeholder="Phone"
                className="mt-3 w-10">
                </InputMask>

                <Calendar
                placeholder="Birth Date"
                className="mt-3 w-10"
                touchUI
                />

                <Password
                placeholder="Password"
                toggleMask
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}

                header={header}
                footer={footer}
                value={password}
                onChange={onPasswordChange}
                />

                <Password
                placeholder="Confirm Password"
                toggleMask
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}

                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                />

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button
                label="Register"
                className="mt-5 mb-3 px-6"
                />

                <div className="flex flex-column align-items-center">

                <Link to="/login" className="w-full">
                    <Button
                    label="Back"
                    link/>
                </Link>

                </div>
            </Card>
        </div>
    );
}; export default Register;
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './ForgotPassword.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { InputOtp } from 'primereact/inputotp';
import { InputText } from 'primereact/inputtext';


const ForgotPassword = () => {

    const [currentSection, setCurrentSection] = useState(1);

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


    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        if (currentSection === 2) {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1);
                } else if (minutes > 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [minutes, seconds, currentSection]);

    const handleNext = () => {
        setCurrentSection(prevSection => prevSection + 1);
    };

    const handleBack = () => {
        setCurrentSection(prevSection => prevSection - 1);
    };

    return (
        <div>
            <Helmet><title>Forgot Password</title></Helmet>

            <Card title="Recover Password"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">

                {currentSection === 1 && (
                <>

                <InputText
                placeholder="E-Mail"
                className="mt-5 w-10"
                />

                <Button
                label="Next"
                className="mt-5 mb-3 px-6"
                onClick={handleNext}
                />

                <div className="flex flex-column align-items-center">

                <Link to="/login" className="w-full">
                    <Button
                    label="Back"
                    link/>
                </Link>

                </div>

                </>
                )}

                {currentSection === 2 && (
                <>

                <p>A code has been sent to your E-Mail...</p>
                <p
                className="-mt-2">
                    It will expire in:</p>

                <p
                className="mt-4">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>

                <div className="mt-6 flex flex-column align-items-center">

                <InputOtp
                length={6}
                integerOnly
                />

                </div>

                <Button
                label="Next"
                className="mt-5 mb-3 px-6"
                onClick={handleNext}
                />

                <div className="flex flex-column align-items-center">

                <Button
                label="Back"
                onClick={handleBack}
                link
                />

                </div>

                </>
                )}

                {currentSection === 3 && (
                <>

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

                <Link to="/login" className="w-full">
                    <Button
                    label="Next"
                    className="mt-5 mb-3 px-6"/>
                </Link>

                <div className="flex flex-column align-items-center">

                <Link to="/login" className="w-full">
                    <Button
                    label="Cancel"
                    link/>
                </Link>

                </div>

                </>
                )}

            </Card>
        </div>
    );
}; export default ForgotPassword;
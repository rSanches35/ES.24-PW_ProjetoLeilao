import React, { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import './ForgotPassword.css'

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { InputOtp } from 'primereact/inputotp';
import { InputText } from 'primereact/inputtext';

import PersonService from "../../services/PersonService";


const ForgotPassword = () => {

    const personService = new PersonService;

    const toast = useRef(null);
    const [currentSection, setCurrentSection] = useState(1);

    const navigate = useNavigate();
    const [otp, setOtp] = useState(null);

    const [email, setEmail] = useState(null);
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

    }, [minutes, seconds, currentSection,
        [otp],
        [password, passwordConfirm, passwordRequirements]]);

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        setPasswordRequirements({
            minLength: password.length >= 6,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-\\]/.test(password), // O '\\' é necessario para não ficar como palavra reservada.
        });
    };

    const handlePasswordConfirmation = (e) => {
        const passwordConfirm = e.target.value;
        setPasswordConfirm(passwordConfirm);
        if (password !== passwordConfirm) {
            setErrorMessage("As senhas devem ser iguais.");
        } else {
            setErrorMessage("");
        }
    };

    const showErrorBlank = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'The field[s] cannot be empty!', life: 3000});
    }

    const showErrorEmailNotFound = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Email not Found!', life: 3000});
    }

    const showErrorInvalidCode = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Incorrect or Expired Code!', life: 3000});
    }

    const showPasswordChanged = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Password Changed!', life: 3000});
    }

    const handleNext = async () => {
        
        if(currentSection == 1){
            try{
                const response = await personService.recoverSendEmail(email);
                if(response){ setCurrentSection(prevSection => prevSection + 1); setErrorMessage(null);}
            }
            catch(error){ 
                if(email == null) {showErrorBlank();}
                else if(error.status == 500){showErrorEmailNotFound();}
            }
        };

        if(currentSection == 2){

            try{
                const response = await personService.recoverVerifyCode({email, code:  otp});
                if(response){ setCurrentSection(prevSection => prevSection + 1); setErrorMessage(null);}
            }
            catch(error){
                if(otp == null) {showErrorBlank();}
                else if(error.status == 500){showErrorInvalidCode();}
            }
        }

        if(currentSection == 3){

            if(password == passwordConfirm) {
                try{
                    const response = await personService.recoverChangePassword({email, password});
                    if(response){

                        showPasswordChanged();
                        setTimeout(() => { navigate("/login");}, 1800);
                    }
                }
                catch(error){ setErrorMessage("Erro ao alterar a Senha"); alert(errorMessage);}
            }
        }
    }

    const handleBack = () => {
        setCurrentSection(prevSection => prevSection - 1);
    };

    return (
        <div className="body-forgot-password">
            <Helmet><title>Forgot Password</title></Helmet>

            <Toast ref={toast} />

            <Card title="Recover Password"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">

                {currentSection === 1 && (
                <>

                <InputText
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => handleOtpChange(e.value)}
                />

                </div>

                <Button
                label="Verify Code"
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

                onChange={handlePasswordChange}

                header={header}
                footer={footer}
                />

                <Password
                placeholder="Confirm Password"
                toggleMask
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}

                onChange={handlePasswordConfirmation}
                />

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button
                label="Change"
                className="mt-5 mb-3 px-6"
                onClick={handleNext}/>

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
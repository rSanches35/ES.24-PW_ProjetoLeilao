import React, { useState, useRef } from "react";
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css'

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

import PersonService from "../../services/PersonService";


const Register = () => {

    const toast = useRef(null);
    const navigate = useNavigate();
    const personService = new PersonService;

    const [user, setUser] = useState({
        name: null, 
        email: null,
        phone: "",
        birthDate: null,
        password: null,
    });

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
  
    const handleChange = (input) => {

        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const handleBirthDate = (input) => {

        const dataI = input.target.value;

        const ano = dataI.getFullYear();
        const mes = String(dataI.getMonth() + 1).padStart(2, '0');
        const dia = String(dataI.getDate()).padStart(2, '0');

        const dataF = `${ano}-${mes}-${dia}`;
        setUser({ ...user, [input.target.name]: dataF });

        console.log(user.birthDate);
    }

    const handlePasswordChange = (e) => {

        const typedPassword = e.target.value;

        setPassword(typedPassword);
        setUser({ ...user, [e.target.name]: e.target.value });
        setPasswordRequirements({
            minLength: typedPassword.length >= 6,
            hasLowerCase: /[a-z]/.test(typedPassword),
            hasUpperCase: /[A-Z]/.test(typedPassword),
            hasNumber: /[0-9]/.test(typedPassword),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(typedPassword),
        });

        if (password !== passwordConfirm) { setErrorMessage("Passwords are different"); }
        else { setErrorMessage(""); }
    };

    const handlePasswordConfirmation = (e) => {
        
        const passwordConfirm = e.target.value;
        setPasswordConfirm(passwordConfirm);

        if (password !== passwordConfirm) { setErrorMessage("Passwords are different"); }
        else { setErrorMessage(""); }
    };

    const showErrorBlank = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'The field[s] cannot be empty!', life: 3000});
    }

    const showErrorNotUnique = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Email or Phone already registered!', life: 3000});
    }

    const showAccountRegister = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Account Created!', life: 3000});
    }

    const register = async () => {

        try {

            const response = await personService.register(user);
            if (response) {
                const email = user.email;

                showAccountRegister();
                setTimeout(() => { navigate("/validate", { state: { email } });}, 1800);
            }
        } catch (error){
            if(user.name == null || user.email == null || user.birthDate == null || password  == null || passwordConfirm == null) {showErrorBlank();}
            else if(error.status == 500){showErrorNotUnique();}
        }
    }

    return (
        <div className="body-register">
            <Helmet><title>Register</title></Helmet>

            <Toast ref={toast} />

            <Card title="Register"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">
                
                <InputText
                name="name"
                placeholder="Full Name"
                className="mt-5 w-10"
                onChange={handleChange}
                />

                <InputText
                name="email"
                placeholder="E-Mail"
                className="mt-3 w-10"
                onChange={handleChange}
                />

                <InputMask
                name="phone"
                mask="(99) 9 9999-9999"
                placeholder="Phone"
                className="mt-3 w-10"
                onChange={handleChange}>
                </InputMask>

                <Calendar
                name="birthDate"
                placeholder="Birth Date"
                className="mt-3 w-10"
                touchUI
                onChange={handleBirthDate}
                />

                <Password
                name="password"
                placeholder="Password"
                toggleMask
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}
                onChange={handlePasswordChange}

                header={header}
                footer={footer}
                />

                <Password
                name="passwordConfirm"
                placeholder="Confirm Password"
                toggleMask
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}
                onChange={handlePasswordConfirmation}
                />

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button
                label="Register"
                className="mt-5 mb-3 px-6"
                onClick={register}
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
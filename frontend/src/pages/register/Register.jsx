import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './Register.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
        

const Register = () => {

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
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}
                />

                <Password
                placeholder="Confirm Password"
                toggleMask
                feedback={false}
                className="mt-3 w-10"
                inputStyle={{ width: '100%' }}
                />

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
import React from "react";
import './Login.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

const Login = () => {

    return (
        <div>
            <Card title="Login" className="pt-5 flex flex-wrap column-gap-4 md:w-25rem flex flex-columns justify-content-center text-center">
                <InputText className="mt-5 flex align-items-center justify-content-center" placeholder="E-Mail"/>
                <Password className="mt-3 flex align-items-center justify-content-center" placeholder="Password" feedback={false}/>
                <Button className="mt-5 mb-3 px-6 align-items-center justify-content-center" label="Login"/>
                <a href="" className="no-underline"><p>Forgot my Password</p></a>
                <a href="" className="no-underline"><p>Create Account</p></a>
            </Card>
        </div>
    );
    
}; export default Login;
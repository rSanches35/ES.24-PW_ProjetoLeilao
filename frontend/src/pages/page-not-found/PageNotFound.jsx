import React from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="body-login">
            <Helmet><title>ERRO 4044</title></Helmet>

            <Card title="Page Not Found"
            className="pt-5 md:w-25rem flex flex-column align-items-center text-center">

                <img className="w-2 mt-1 mb-3" src="/images/page-not-found.png" alt=""></img>

                <h4 className="mt-1 px-6">
                    The page you tried to access asks for Login.</h4>

                <div className="flex flex-column align-items-center mt-3">

                <Button
                label="Previous Page"
                link
                className="w-full"
                onClick={() => navigate(-1)} />

                </div>
            </Card>
        </div>
    );
    
}; export default PageNotFound;
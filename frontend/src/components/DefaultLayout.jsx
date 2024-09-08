import React from "react";

import { useLocation } from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/Footer';

import './DefaultLayout.css';

const DefaultLayout = ({ children }) => {

    const location = useLocation();
    const pageConfig = {
        '/': { title: 'Dashboard', icon: 'pi pi-home' },
        '/profile': { title: 'Profile', icon: 'pi pi-user' },
    };
    const currentConfig = pageConfig[location.pathname];

    return (
        <div className="main-container">
            <Header title={currentConfig.title} icon={currentConfig.icon} />
            {/*
            <div className="content">
                {children}
            </div>
            <Footer />
            */}
        </div>
    );
}; export default DefaultLayout;

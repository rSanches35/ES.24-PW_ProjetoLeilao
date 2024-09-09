import React from "react";
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import Header from './header/Header';
import Footer from './footer/Footer';

import './DefaultLayout.css';

const DefaultLayout = ({ children }) => {

    const { t } = useTranslation();

    const location = useLocation();
    const pageConfig = {
        '/': { title: t('dashboard'), icon: 'pi pi-chart-bar' },
        '/profile': { title: t('profile'), icon: 'pi pi-user' },
    };
    const currentConfig = pageConfig[location.pathname];

    return (
        <div className="main-container">
            <Header title={currentConfig.title} icon={currentConfig.icon} />
            <div className="content">
                {children}
            </div>
            <Footer />
        </div>
    );
}; export default DefaultLayout;

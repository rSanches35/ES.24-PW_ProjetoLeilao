import React from "react";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

import './Dashboard.css'

const Dashboard = () => {

    const { t } = useTranslation();

    return (
        <div className="body-dashboard">
            <Helmet><title>{t('dashboard')} - Maxin'UP</title></Helmet>
        </div>
    );
}; export default Dashboard;
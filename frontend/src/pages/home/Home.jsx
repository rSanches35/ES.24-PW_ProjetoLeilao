import React from "react";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

import './Home.css'

const Home = () =>{

    const { t } = useTranslation();

    return(
        <div className="body-home">
            <Helmet><title>{t('home')} - Maxin'UP</title></Helmet>
        </div>
    );
}; export default Home;
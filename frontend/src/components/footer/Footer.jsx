import React from "react";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

import './Footer.css'

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className="body-footer">
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
            </Helmet>
            <div className="border-noround-bottom footer">
                <div className="container-footer">
                    <div className="wrapper-footer">
                        <div className="widget-footer">
                            <a href="#">
                                <img src="/images/logo.png" height="50" alt="" className="logo-footer"/>
                            </a>
                            <p className="description-footer">
                                {t('footer-text')}
                            </p>
                            <ul className="footer-socials">
                                <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-discord icon-size"></i></a></li>
                                <li><a href="#"><i class="fa-solid fa-envelope icon-size"></i></a></li>
                            </ul>
                        </div>
                        <div className="widget-footer">
                            <h6>{t('quick-links')}</h6>
                            <ul className="widget-links">
                                <li><a href="#">{t('home')}</a></li>
                                <li><a href="#">{t('auctions')}</a></li>
                                <li><a href="/profile">{t('profile')}</a></li>
                            </ul>
                        </div>
                        <div className="widget-footer">
                            <h6>{t('company')}</h6>
                            <ul className="widget-links">
                                <li><a href="#">{t('about-us')}</a></li>
                                <li><a href="#">{t('privacy-policy')}</a></li>
                            </ul>
                        </div>
                        <div className="widget-footer">
                            <h6>{t('support')}</h6>
                            <ul className="widget-links">
                                <li><a href="#">{t('faq')}</a></li>
                                <li><a href="#">{t('shipping')}</a></li>
                                <li><a href="#">{t('payment')}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright-wrapper">
                        <p>{t('footer-created')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}; export default Footer;
import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './Footer.css'

const Footer = () => {

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
                                Make your bid and take home a piece of musical history. Unique treasures for true collectors.
                            </p>
                            <ul className="footer-socials">
                                <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-discord icon-size"></i></a></li>
                                <li><a href="#"><i class="fa-solid fa-envelope icon-size"></i></a></li>
                            </ul>
                        </div>
                        <div className="widget-footer">
                            <h6>Quick Links</h6>
                            <ul className="widget-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Auctions</a></li>
                                <li><a href="/profile">Profile</a></li>
                            </ul>
                        </div>
                        <div className="widget-footer">
                            <h6>Company</h6>
                            <ul className="widget-links">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="widget-footer">
                            <h6>Support</h6>
                            <ul className="widget-links">
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Payment Option</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright-wrapper">
                        <p>Design and Developed by rSanches35</p>
                    </div>
                </div>
            </div>
        </div>
    );
}; export default Footer;
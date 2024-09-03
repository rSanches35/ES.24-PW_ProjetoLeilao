import React from "react";
import './Footer.css'

const Footer = () => {

    return (
        <div className="body-footer">
            <div className="border-round-3xl border-noround-bottom py-3 font-semibold footer flex justify-content-center align-items-center text-center flex-column">
                <div className="py-2">
                    <i className="pi pi-instagram px-2" style={{ fontSize: '1.5rem' }}></i>
                    <i className="pi pi-facebook px-2" style={{ fontSize: '1.5rem' }}></i>
                    <i className="pi pi-whatsapp px-2" style={{ fontSize: '1.5rem' }}></i>
                    <i className="pi pi-discord px-2" style={{ fontSize: '1.5rem' }}></i>
                    <i className="pi pi-envelope px-2" style={{ fontSize: '1.5rem' }}></i>
                </div>
                {/*Footer*/}
            </div>
        </div>
    );
}; export default Footer;
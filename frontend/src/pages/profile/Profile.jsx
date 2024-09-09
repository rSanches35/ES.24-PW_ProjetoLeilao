import React, { useState } from "react";
import { Helmet } from 'react-helmet';

import './Profile.css'

import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const Profile = () => {

    const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
    const [formData, setFormData] = useState({
        state: '',
        city: '',
        street: '',
        number: '',
        neighborhood: '',
        additionalInfo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        
        console.log(formData);
        setShowDialog(false);
    };

    return (
        <div className="body-profile flex justify-content-center mt-4 mb-8">
            <Helmet><title>Profile - Maxin'UP</title></Helmet>
            <Card className="card-profile">
                <div className="grid-profile">

                    <div className="grid-profile-sec-1">
                        <Avatar image="/images/logo.png" shape="circle" className="profile-pic" />

                        <h2 className="text-center">Rafael Sanches Silva</h2>
                        <h5 className="text-center -mt-3">rafaelsanches.s35@gmail.com</h5>
                        <h4 className="text-center -mt-3">rSanches35</h4>

                        <div className="text-start main-info">
                            <p>iD: #HTJ40C4Z</p>
                            <p className="-mt-2">Since: 09/09/2024</p>
                            <p className="-mt-2">Birthday: 01/01/2000</p>
                            <p className="-mt-2">Phone: (44) 9 9999-9999</p>
                        </div>

                        <span className="mt-5 role-tag">Bidder</span>
                        <i className="pi pi-pencil edit-icon"></i>
                    </div>

                    <div className="grid-profile-sec-2">

                        <div className="mini-card addres">
                            <h3>
                                <i className="pi pi-home ml-1 mr-2" style={{ fontSize: '1.2rem' }}></i>
                                Addres
                            </h3>
                            <p className="-mt-2">Location: PR | Paranavaí</p>
                            <p className="-mt-3">ZIP Code: 87750-000</p>
                            <p className="-mt-2">Street: Crimson Planes, n1374</p>
                            <p className="-mt-3">Neighborhood: Centro</p>

                            <i className="pi pi-pencil edit-icon" onClick={() => setShowDialog(true)}></i>
                        </div>
                        <div className="mini-card in-progress">
                            <h3>
                            <i className="pi pi-spin pi-cog ml-1 mr-2" style={{ fontSize: '1.2rem' }}></i>
                                In Progress...
                            </h3>
                        </div>
                        <div className="mini-card in-progress">
                            <h3>
                                <i className="pi pi-spin pi-cog ml-1 mr-2" style={{ fontSize: '1.2rem' }}></i>
                                In Progress...
                            </h3>
                        </div>
                        <div className="mini-card in-progress">
                            <h3>
                            <i className="pi pi-spin pi-cog ml-1 mr-2" style={{ fontSize: '1.2rem' }}></i>
                                In Progress...
                            </h3>
                        </div>
                        <div className="mini-card in-progress">
                            <h3>
                            <i className="pi pi-spin pi-cog ml-1 mr-2" style={{ fontSize: '1.2rem' }}></i>
                                In Progress...
                            </h3>
                        </div>
                        <div className="mini-card in-progress">
                            <h3>
                                <i className="pi pi-spin pi-cog ml-1 mr-2" style={{ fontSize: '1.2rem' }}></i>
                                In Progress...
                            </h3>
                        </div>
                    </div>
                </div>
            </Card>

            <Dialog header="Edit Address" visible={showDialog} style={{ width: '400px' }} modal onHide={() => setShowDialog(false)}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="state">State</label>
                        <InputText id="state" name="state" value={formData.state} onChange={handleInputChange} />
                    </div>

                    <div className="p-field">
                        <label htmlFor="city">City</label>
                        <InputText id="city" name="city" value={formData.city} onChange={handleInputChange} />
                    </div>

                    <div className="p-field">
                        <label htmlFor="street">ZIP Code</label>
                        <InputText id="street" name="street" value={formData.street} onChange={handleInputChange} />
                    </div>

                    <div className="p-field">
                        <label htmlFor="street">Street</label>
                        <InputText id="street" name="street" value={formData.street} onChange={handleInputChange} />
                    </div>

                    <div className="p-field">
                        <label htmlFor="number">Number</label>
                        <InputText id="number" name="number" value={formData.number} onChange={handleInputChange} />
                    </div>

                    <div className="p-field">
                        <label htmlFor="neighborhood">Neighborhood</label>
                        <InputText id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} />
                    </div>

                    <div className="p-field">
                        <label htmlFor="additionalInfo">Additional Info (Optional)</label>
                        <InputText id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} />
                    </div>

                    <Button label="Save" onClick={handleSubmit} />
                </div>
            </Dialog>
        </div>
    );
}; export default Profile;
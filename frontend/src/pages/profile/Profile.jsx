import React from "react";
import { Helmet } from 'react-helmet';

import './Profile.css'

import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';

const Profile = () => {

    return (
        <div className="body-profile flex justify-content-center mt-6 mb-8">
            <Helmet><title>Profile - Maxin'UP</title></Helmet>
            <Card className="perfil-card">
                <div className="perfil-grid">
                    {/* Seção 1: Foto e Informações Básicas */}
                    <div className="secao1">
                        <Avatar image="url-da-imagem.jpg" size="xlarge" shape="circle" className="p-d-block p-mx-auto" />
                        <h2 className="p-text-center">Jill Anderson</h2>
                        <p className="p-text-center text-muted">UI Designer</p>
                        <div className="quote p-text-center">"Simplifying the planning of my business trips."</div>
                        <div className="info-basica p-text-center">
                            <p>Age: 26</p>
                            <p>Status: Single</p>
                            <p>Location: Brooklyn</p>
                            <p>Archetype: Frequent Flyer</p>
                        </div>
                        <div className="tags p-d-flex p-jc-center">
                            <span className="tag">Organized</span>
                            <span className="tag">Practical</span>
                            <span className="tag">Hardworking</span>
                        </div>
                    </div>

                    {/* Seção 2: Informações à direita */}
                    <div className="secao2">
                        {/* Bio Section */}
                        <div className="mini-card">
                            <h3>Bio</h3>
                            <p>
                                Jill is a Regional Director who travels 4-8 times each month for work. She has a specific region in which she travels, and she often visits the same cities and stays at the same hotel.
                            </p>
                        </div>
                        {/* Personalidade Section */}
                        <div className="mini-card">
                            <h3>Personality</h3>
                            <p>Introvert: 70% | Analytical: 60%</p>
                        </div>
                        {/* Motivations Section */}
                        <div className="mini-card">
                            <h3>Motivations</h3>
                            <p>Price: High | Comfort: Medium</p>
                        </div>
                        {/* Outros cards */}
                        <div className="mini-card">
                            <h3>Goals</h3>
                            <p>To spend less time booking travel</p>
                        </div>
                        <div className="mini-card">
                            <h3>Frustrations</h3>
                            <ul>
                                <li>Too much time booking</li>
                                <li>Not tech savvy</li>
                            </ul>
                        </div>
                        <div className="mini-card">
                            <h3>Favorite Brands</h3>
                            <p>Adidas, Nike, Netflix</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}; export default Profile;
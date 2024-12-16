import React, { useEffect, useState } from "react";

import './Home.css'

import { Card, Divider, Button, Avatar } from "primereact";
import { DataView } from "primereact/dataview";

const Home = () => {
    const [auctions, setAuctions] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auction/list-all");
            const data = await response.json();
            console.log("Dados recebidos da API:", data);

            setAuctions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar os Dados dos Leilões:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Template para renderizar cada leilão
    const itemTemplate = (auction) => {
        const date = new Date(auction.endDateTime);
        const formattedDate = date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return (
            <div className="auction-item-container">
                <Card className="auction-item-card">
                    <div className="auction-item-header">
                        <Avatar
                            icon="pi pi-gavel" // Ícone para leilão
                            size="large"
                            shape="square"
                            className="auction-item-avatar"
                        />
                        <div>
                            <div className="auction-item-title">{auction.title}</div>
                            <div className="auction-item-date">Encerramento: {formattedDate}</div>
                        </div>
                    </div>

                    <div className="auction-item-details">
                        <div className="auction-item-meta">
                            <div className="auction-item-status">Status: {auction.status}</div>
                        </div>

                        <div className="auction-item-meta">
                            <div className="auction-item-minimum-bid">Lance mínimo: R${auction.minimumBid}</div>
                        </div>

                        <div className="auction-item-description mt-2">{auction.description}</div>
                    </div>

                    <Button
                        label="Ver mais"
                        icon="pi pi-eye"
                        className="auction-item-button"
                    />
                </Card>
            </div>
        );
    };

    return (
        <div className="auction-list-container">
            <Card title="Lista de Leilões" className="auction-list-card px-5">
                <Divider className="auction-list-divider flex justify-content-center" />
                <DataView
                    value={auctions}
                    layout="list" // Define o layout como lista
                    itemTemplate={itemTemplate}
                    paginator
                    rows={5} // Quantos itens por página
                />
            </Card>
        </div>
    );
};

export default Home;

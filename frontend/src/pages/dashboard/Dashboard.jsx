import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

import './Dashboard.css'

import { Chart } from 'primereact/chart';

const Dashboard = () => {

    const { t } = useTranslation();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: t('sales'),
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {indexAxis: 'y',
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="body-dashboard flex justify-content-center mt-6 mb-8">
            <Helmet><title>{t('dashboard')} - Maxin'UP</title></Helmet>

            <div className="grid w-9 grid-chart flex justify-content-center align-items-center">
                <div className="col-6">
                    <div className="card p-3">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="card flex justify-content-center">
                        <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>

        </div>
    );
}; export default Dashboard;
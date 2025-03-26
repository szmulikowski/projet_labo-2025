import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PerformanceSecurityGraph() {
    const [cpuUsage, setCpuUsage] = useState(0);
    const [ramUsage, setRamUsage] = useState(0);
    const [securityAlert, setSecurityAlert] = useState(false);
    const [cpuHistory, setCpuHistory] = useState(Array(10).fill(0));
    const [ramHistory, setRamHistory] = useState(Array(10).fill(0));

    const [alertCount, setAlertCount] = useState(0);
    const [alertTimeout, setAlertTimeout] = useState(null);

    const generateRandomData = () => {
        const randomCpuUsage = Math.random() * 100;
        const randomRamUsage = Math.random() * 100;
        setCpuUsage(randomCpuUsage);
        setRamUsage(randomRamUsage);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            generateRandomData();

            setCpuHistory((prevHistory) => {
                const updatedHistory = [...prevHistory.slice(1), cpuUsage];
                return updatedHistory;
            });
            setRamHistory((prevHistory) => {
                const updatedHistory = [...prevHistory.slice(1), ramUsage];
                return updatedHistory;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [cpuUsage, ramUsage]);

    useEffect(() => {
        if (alertCount < 3) {
            setSecurityAlert(true);
            setAlertCount(prev => prev + 1);
        }

        const timeout = setTimeout(() => {
            if (alertCount < 3) {
                setSecurityAlert(false);
            }
        }, 5000);

        const stopAlertTimeout = setTimeout(() => {
            clearTimeout(timeout);
            setSecurityAlert(false);
        }, 15000);

        setAlertTimeout(stopAlertTimeout);

        return () => {
            clearTimeout(timeout);
            clearTimeout(stopAlertTimeout);
        };
    }, [alertCount]);

    const data = {
        labels: Array.from({ length: 10 }, (_, i) => `T${i + 1}`),
        datasets: [
            {
                label: 'CPU Usage (%)',
                data: cpuHistory,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'RAM Usage (%)',
                data: ramHistory,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Performance et Sécurité du PC',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}%`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
        animation: {
            duration: 5000,
            easing: 'easeInOutQuad',
            onProgress: function (animation) {
                const chart = animation.chart;
                const ctx = chart.ctx;
                const width = chart.width;
                const height = chart.height;
                const scanLineHeight = height / 20;

                ctx.save();
                ctx.globalAlpha = 0.2;
                const scanPosition = (animation.currentStep / animation.numSteps) * width;
                const isGreen = Math.floor(scanPosition / 50) % 2 === 0;

                ctx.fillStyle = isGreen ? '#00ff00' : '#ff0000';
                ctx.fillRect(scanPosition - 50, 0, 50, height);
                ctx.restore();
            },
        },
    };

    return (
        <div>
            {securityAlert && (
                <div
                    style={{
                        fontSize: "24px",
                        position: "fixed",
                        top: "68%",
                        left: "62.5%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        backgroundColor: "rgba(255, 0, 0, 0.25)",
                        color: "white",
                        textAlign: "center",
                        padding: "10px 0",
                        zIndex: 9999,
                    }}
                >
                    ⚠️ Alerte de sécurité : Problème détecté !
                </div>
            )}

            <div className="flex flex-col items-center justify-center bg-gray-800 p-3 rounded-lg shadow-lg max-w-sm w-full fixed left-4 top-[350px] md:top-[470px] mx-auto z-10">
                <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-2">
                    {securityAlert && (
                        <span className="text-red-500">⚠️</span>
                    )}
                </h3>

                {/* Affichage du graphique */}
                <div className="relative w-full sm:w-[350px] sm:h-[200px] h-[150px]">
                    <Line data={data} options={options} />
                </div>

                {/* Indicateurs de performance */}
                <div className="mt-3 text-white text-sm">
                    <p>Utilisation CPU: <strong>{cpuUsage.toFixed(2)}%</strong></p>
                    <p>Utilisation RAM: <strong>{ramUsage.toFixed(2)}%</strong></p>
                </div>
            </div>
        </div>
    );
}

export default PerformanceSecurityGraph;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import { FaFileAlt, FaKey, FaLock, FaDatabase, FaShieldAlt, FaUndo, FaTrash } from "react-icons/fa";

const ConsoleData = () => {
    const [output, setOutput] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [selectedScanType, setSelectedScanType] = useState("personalFiles");
    const [progress, setProgress] = useState(0);
    const [scanResults, setScanResults] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [userMessage, setUserMessage] = useState("");
    const [actionsRestantes, setActionsRestantes] = useState(0);
    const navigate = useNavigate();

    const scanTypes = [
        { id: "personalFiles", label: "Fichiers Personnels", icon: <FaFileAlt className="text-blue-500 text-2xl" /> },
        { id: "passwords", label: "Mots de passe", icon: <FaKey className="text-yellow-500 text-2xl" /> },
        { id: "apiKeys", label: "Clés API", icon: <FaLock className="text-red-500 text-2xl" /> }
    ];

    useEffect(() => {
        const savedOutput = localStorage.getItem('scanResults');
        if (savedOutput) {
            setOutput(JSON.parse(savedOutput));
        }
    }, []);

    const scanSensitiveData = () => {
        setIsScanning(true);
        setProgress(0);
        setOutput([]);
        setScanResults([]);
        setDataCount(0);
        setUserMessage("");
        setActionsRestantes(0);

        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 20;
            });
            setDataCount(prev => prev + Math.floor(Math.random() * 10) + 5);
        }, 600);

        setTimeout(() => {
            let results = [];

            if (selectedScanType === "personalFiles") {
                results.push({ message: "Fichiers personnels analysés", count: 20, status: "OK" });
            } else if (selectedScanType === "passwords") {
                results.push({ message: "Mots de passe trouvés", count: 3, status: "DANGEROUS", action: "Quarantaine" });
            } else if (selectedScanType === "apiKeys") {
                results.push({ message: "Clés API exposées", count: 2, status: "DANGEROUS", action: "Supprimé" });
            }

            results.push({ message: "Scan terminé", status: "OK" });

            setScanResults(results);
            setOutput(results);
            localStorage.setItem('scanResults', JSON.stringify(results));

            const actionsEnAttente = results.filter(res => res.action && res.action !== "Restauré").length;
            setActionsRestantes(actionsEnAttente);

            setIsScanning(false);
        }, 3500);
    };

    const handleAction = (index, actionType) => {
        let updatedResults = [...scanResults];
        updatedResults[index].action = actionType;
        setScanResults(updatedResults);

        const actionsRestantesApres = updatedResults.filter(res => res.action && res.action !== "Restauré").length;
        setActionsRestantes(actionsRestantesApres);

        if (actionsRestantesApres === 0) {
            setUserMessage("Toutes les actions sont terminées. Redirection...");
            setTimeout(() => navigate("/abonnement"), 3000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-800 text-white">

            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-gray-900 p-4 fixed h-full">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                    <FaDatabase className="text-blue-500 mr-2" /> Types de données
                </h2>
                <div className="flex flex-col space-y-2 mb-auto">
                    {scanTypes.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            className={`flex items-center space-x-2 p-2 rounded ${selectedScanType === id ? "bg-gray-700" : "bg-gray-800"}`}
                            onClick={() => setSelectedScanType(id)}
                        >
                            {icon} <span>{label}</span>
                        </button>
                    ))}
                </div>

                <h2 className="text-lg font-bold mt-[-320px] flex items-center">
                    <FaShieldAlt className="text-green-500 mr-2" /> Analyse en cours
                </h2>

                {isScanning ? (
                    <p className="text-yellow-400">Données analysées : {dataCount}</p>
                ) : (
                    <p className="text-green-400">Analyse terminée</p>
                )}

                <ul className="mt-4">
                    {scanResults.map((result, index) => (
                        <li key={index} className={`mb-2 p-2 rounded ${result.status === "OK" ? "bg-green-700" : "bg-red-700"}`}>
                            {result.message} ({result.count})
                            {result.action && <p className="text-sm text-gray-300">Action: {result.action}</p>}
                        </li>
                    ))}
                </ul>

                {/* Boutons d'action placés en bas de la sidebar */}
                <div className="mt-auto flex flex-col space-y-2">
                    {scanResults.map((result, index) => (
                        !result.action && (
                            <div key={index} className="flex space-x-2 mt-[-320px]">
                                <button
                                    onClick={() => handleAction(index, "Quarantaine")}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                                >
                                    <FaShieldAlt className="mr-2" /> Quarantaine
                                </button>
                                <button
                                    onClick={() => handleAction(index, "Supprimé")}
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
                                >
                                    <FaTrash className="mr-2" /> Supprimer
                                </button>

                            </div>
                        )
                    ))}
                    {scanResults.map((result, index) => (
                        (result.action === "Quarantaine" || result.action === "Supprimé") && (
                            <button
                                key={index}
                                onClick={() => handleAction(index, "Restauré")}
                                className="bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded ml-[0px] flex items-center"
                            >
                                <FaUndo className="mr-2" /> Restaurer
                            </button>

                        )
                    ))}
                </div>
            </aside>

            {/* Sélection des types de données - Mobile */}
            <div className="flex md:hidden justify-center space-x-4 bg-gray-900 p-2">
                {scanTypes.map(({ id, icon }) => (
                    <button
                        key={id}
                        className={`p-2 rounded-full ${selectedScanType === id ? "bg-gray-700" : "bg-gray-800"}`}
                        onClick={() => setSelectedScanType(id)}
                    >
                        {icon}
                    </button>
                ))}
            </div>

            {/* Console principale */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:pl-72 mt-[-150px]">
                {/* Liens de navigation */}
                <div className="flex gap-4 mt-12 mb-4">
                    <Link to="/consolePC" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                        💻 Console PC
                    </Link>
                    <Link to="/consoleReseau" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                        🌐 Console Réseau
                    </Link>
                </div>

                <img src="public/database-removebg-preview.png" className="w-3/10 md:w-1/10 mt-[-150px]" />

                <br /> <br /> <br /> <br />

                <div className="bg-black text-green-500 p-6 w-full max-w-4xl rounded-lg shadow-lg">
                    <div className="font-mono text-sm h-96 overflow-auto whitespace-pre-wrap">
                        {output.length === 0 ? (
                            <p>Bienvenue dans la console des données sensibles. Choisissez un type de scan et appuyez sur "Scanner".</p>
                        ) : (
                            output.map((result, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <p className={result.status === "OK" ? "text-green-500" : "text-red-500"}>
                                        {result.message} ({result.count})
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {userMessage && <p className="text-center text-yellow-400 mt-4">{userMessage}</p>}

                    <button onClick={scanSensitiveData} disabled={isScanning} className="bg-blue-500 text-white w-full py-2 rounded">
                        Scanner
                    </button>
                </div>
            </div>


        </div>
    );
};

export default ConsoleData;















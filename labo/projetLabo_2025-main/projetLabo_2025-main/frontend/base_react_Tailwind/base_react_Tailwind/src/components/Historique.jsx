import React, { useState, useEffect } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaUpload, FaSave, FaUser, FaHistory, FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Historique() {
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [status, setStatus] = useState('');
    const [usage, setUsage] = useState('');
    const [email, setEmail] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    const [testHistory, setTestHistory] = useState([]);
    const [scanResults, setScanResults] = useState([]);
    const [networkTestResults, setNetworkTestResults] = useState([]);

    const fetchUserProfile = async () => {
        try {
            const userEmail = sessionStorage.getItem('userEmail');
            if (userEmail) {
                const response = await fetch('http://localhost:5000/api/users');
                const users = await response.json();
                const loggedInUser = users.find(user => user.email === userEmail);
                if (loggedInUser) {
                    setName(loggedInUser.username);
                    setEmail(loggedInUser.email);
                    setStatus(loggedInUser.profil);
                    setAvatar(loggedInUser.avatar);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur :', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();

        const history = JSON.parse(localStorage.getItem('testHistory')) || [];
        setTestHistory(history);

        const savedScanResults = JSON.parse(localStorage.getItem('scanResults')) || [];
        setScanResults(savedScanResults);

        const savedNetworkTestResults = JSON.parse(localStorage.getItem('networkTestResults')) || [];
        setNetworkTestResults(savedNetworkTestResults);

        const savedData = JSON.parse(localStorage.getItem('userProfile'));
        if (savedData) {
            setName(savedData.name);
            setSurname(savedData.surname);
            setStatus(savedData.status);
            setUsage(savedData.usage);
            setEmail(savedData.email);
            setAvatar(savedData.avatar);
        }

        const savedSelectedPrice = localStorage.getItem('selectedPrice');
        if (savedSelectedPrice) {
            setSelectedPrice(savedSelectedPrice);
        }
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setAvatar(URL.createObjectURL(file));
        } else {
            toast.error('Veuillez sélectionner un fichier image.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            toast.error('Veuillez entrer un email valide.');
            return;
        }
        const userProfile = {
            name,
            surname,
            status,
            usage,
            email,
            avatar,
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        toast.success('Profil sauvegardé avec succès !');
    };

    const handleDeleteTest = (index, testType) => {
        let updatedHistory;
        if (testType === 'scan') {
            updatedHistory = [...scanResults];
            updatedHistory.splice(index, 1);
            setScanResults(updatedHistory);
            localStorage.setItem('scanResults', JSON.stringify(updatedHistory));
        } else if (testType === 'network') {
            updatedHistory = [...networkTestResults];
            updatedHistory.splice(index, 1);
            setNetworkTestResults(updatedHistory);
            localStorage.setItem('networkTestResults', JSON.stringify(updatedHistory));
        } else {
            updatedHistory = [...testHistory];
            updatedHistory.splice(index, 1);
            setTestHistory(updatedHistory);
            localStorage.setItem('testHistory', JSON.stringify(updatedHistory));
        }
    };

    const calculateDaysRemainingThisYear = () => {
        const today = new Date();
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        const timeDiff = endOfYear - today;
        const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24));
        return daysRemaining > 0 ? daysRemaining : 0;
    };

    return (
        <div className="flex min-h-screen bg-gray-800">
            <div className="w-[300px] bg-gray-900 text-white p-6 hidden sm:block">
                <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2">
                    <FaUser size={24} />
                    Mon Profil
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:block hidden">
                    <div className="flex flex-col items-center">
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden cursor-pointer"
                        />
                        <button
                            onClick={() => document.getElementById('avatar').click()}
                            className="w-full text-blue-500 py-2 px-4 border border-blue-500 rounded-md mb-4 flex justify-center items-center gap-2"
                        >
                            <FaUpload size={18} /> Avatar
                        </button>
                        {avatar && <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full" />}
                    </div>

                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white cursor-pointer"
                            minLength={5}
                            maxLength={15}
                            placeholder="Nom"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white cursor-pointer"
                            minLength={5}
                            maxLength={15}
                            placeholder="Prénom"
                            required
                        />
                    </div>

                    <div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            required
                        >
                            <option value="">Statut</option>
                            <option value="indépendant">Indépendant</option>
                            <option value="étudiant">Étudiant</option>
                            <option value="employé">Employé</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={usage}
                            onChange={(e) => setUsage(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            required
                        >
                            <option value="">Usage</option>
                            <option value="professionnel">Professionnel</option>
                            <option value="domestique">Domestique</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <FaSave size={18} /> Save
                    </button>
                </form>

                {/* Abonnement Carte */}
                <div className="mt-2 p-4 rounded-lg bg-gradient-to-r from-green-400 to-green-600 shadow-lg text-white">
                    <h5 className="text-xl font-semibold text-center flex justify-center items-center gap-2">
                        <FaCalendarCheck size={22} />
                        Abonnement
                    </h5>
                    <div className="mt-1 text-center">
                        {selectedPrice ? (
                            <p className="text-lg">Vous avez sélectionné : <strong>{selectedPrice}</strong></p>
                        ) : (
                            <p className="text-lg">Aucune sélection de prix trouvée.</p>
                        )}

                        {selectedPrice && (
                            <p className="text-lg mt-2 text-red-500">
                                Jours restants : <strong>{calculateDaysRemainingThisYear()}</strong>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Section for Test History */}
            <div className="flex-1 bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold text-center text-white mb-6 flex justify-center items-center gap-2">
                    <FaHistory size={24} />
                    Historique des Tests
                </h2>

                {testHistory.length === 0 && scanResults.length === 0 && networkTestResults.length === 0 ? (
                    <p className="text-gray-400 text-center">Aucun historique ou résultats de scan trouvé.</p>
                ) : (
                    <div className="space-y-4">
                        {/* Affichage de l'historique des tests antivirus */}
                        {testHistory.map((test, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-2 rounded-lg ${test.result === 'Réussi' ? 'bg-green-700' : 'bg-red-700'}`}
                            >
                                <div>
                                    <strong>{test.testType}</strong>
                                    <p className="text-sm">{test.date}</p>
                                    <p className="text-xs">{test.result}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaTrashAlt
                                        onClick={() => handleDeleteTest(index, 'antivirus')}
                                        size={18}
                                        className="cursor-pointer text-white hover:text-red-500"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Affichage des résultats des tests réseau */}
                        {networkTestResults.map((networkTest, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-2 rounded-lg ${networkTest.status === 'success' ? 'bg-green-700' : 'bg-red-700'}`}
                            >
                                <div>
                                    <strong>Test Réseau</strong>
                                    <p className="text-sm">{new Date(networkTest.timestamp).toLocaleString()}</p>
                                    <p className="text-xs">{networkTest.message}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaTrashAlt
                                        onClick={() => handleDeleteTest(index, 'network')}
                                        size={18}
                                        className="cursor-pointer text-white hover:text-red-500"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Affichage des résultats des tests de scan */}
                        {scanResults.map((scan, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-2 rounded-lg ${scan.status === 'OK' ? 'bg-green-700' : 'bg-red-700'}`}
                            >
                                <div>
                                    <strong>Scan</strong>
                                    <p className="text-sm">{scan.message}</p>
                                    <p className="text-xs">{scan.status}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaTrashAlt
                                        onClick={() => handleDeleteTest(index, 'scan')}
                                        size={18}
                                        className="cursor-pointer text-white hover:text-red-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Historique;









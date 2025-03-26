import React, { useState } from "react";
import { FaGithub } from 'react-icons/fa';
import {
    FaNetworkWired, FaDatabase, FaDesktop, FaCheckCircle, FaPlay,
    FaTwitter, FaLinkedin, FaLock, FaShieldAlt, FaEye, FaInfoCircle,
    FaRegSave, FaServer, FaArrowsAltH, FaHeartbeat
} from "react-icons/fa";
import Authentification from "../components/auth/Authentification";
import { useNavigate } from 'react-router-dom';

function Offres() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const navigate = useNavigate();

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRedirect = (route) => {
        const userEmail = sessionStorage.getItem('userEmail');
        const token = sessionStorage.getItem('token');

        if (userEmail && token) {
            navigate(route);
        } else {
            openModal("authentification");
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col">
            <div className="bg-gray-800 p-6 mt-6 sm:mt-0">
                <div className="flex-1 p-4 -mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4">
                        {/* Carte 1 - Test Réseau */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="flex items-center mb-4">
                                <FaNetworkWired size={32} className="text-blue-500 mr-3" />
                                <h2 className="text-2xl font-semibold">Test Réseau</h2>
                            </div>
                            <p className="mb-4 text-sm">Testez la performance et la sécurité de votre réseau.</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Analyse de la bande passante</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Tests de latence</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Évaluation de la sécurité du réseau</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRedirect('/consoleReseau')}
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                            >
                                <FaPlay className="mr-2" size={18} />
                                Tester mon réseau
                            </button>
                        </div>

                        {/* Carte 2 - Test Données */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="flex items-center mb-4">
                                <FaDatabase size={32} className="text-blue-500 mr-3" />
                                <h2 className="text-2xl font-semibold">Test Données</h2>
                            </div>
                            <p className="mb-4 text-sm">Vérifiez la sécurité et l'intégrité de vos données.</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Test de la cryptographie</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Analyse des sauvegardes</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Vérification de l'intégrité des fichiers</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRedirect('/consoleData')}
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                            >
                                <FaPlay className="mr-2" size={18} />
                                Tester mes datas
                            </button>
                        </div>

                        {/* Carte 3 - Test PC */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="flex items-center mb-4">
                                <FaDesktop size={32} className="text-blue-500 mr-3" />
                                <h2 className="text-2xl font-semibold">Test PC</h2>
                            </div>
                            <p className="mb-4 text-sm">Testez la sécurité et les performances de votre PC.</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Analyse des logiciels malveillants</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Test de performance du processeur</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-green-500 mr-2" />
                                    <span className="text-sm">Vérification des paramètres de sécurité</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRedirect('/consolePC')}
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                            >
                                <FaPlay className="mr-2" size={18} />
                                Tester mon pc
                            </button>
                        </div>

                        {/* Carte 4 - Accessibilité */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="flex items-center mb-4">
                                <FaEye size={32} className="text-blue-500 mr-3" />
                                <h2 className="text-2xl font-semibold">Accessibilité</h2>
                            </div>
                            <p className="mb-4 text-sm">Assurez-vous que vos données et services sont accessibles aux utilisateurs autorisés.</p>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaInfoCircle size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">Le chiffrement des données empêche les personnes non autorisées de lire vos informations.</p>
                                </div>
                                <div className="flex items-center">
                                    <FaInfoCircle size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">Le contrôle d’accès limite l’accès aux informations selon les rôles des utilisateurs.</p>
                                </div>
                                <div className="flex items-center">
                                    <FaInfoCircle size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">La gestion des mots de passe assure des mots de passe robustes et leur renouvellement périodique.</p>
                                </div>
                            </div>
                        </div>

                        {/* Carte 5 - Confidentialité */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="flex items-center mb-4">
                                <FaLock size={32} className="text-blue-500 mr-3" />
                                <h2 className="text-2xl font-semibold">Confidentialité</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaInfoCircle size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">Protégez les informations sensibles contre l'accès non autorisé.</p>
                                </div>
                                <div className="flex items-center">
                                    <FaShieldAlt size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">Utiliser des systèmes de détection d’intrusion (IDS) et de prévention d’intrusion (IPS).</p>
                                </div>
                                <div className="flex items-center">
                                    <FaRegSave size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">Mettre en place des sauvegardes régulières des données.</p>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle size={20} className="text-blue-400 mr-2" />
                                    <p className="text-sm">Implémenter des mécanismes de vérification de l’intégrité des données.</p>
                                </div>
                            </div>
                        </div>

                        {/* Carte 6 - Intégrité */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="flex items-center mb-4">
                                <FaServer size={32} className="text-blue-500 mr-3" />
                                <h2 className="text-2xl font-semibold">Intégrité</h2>
                            </div>
                            <p className="mb-4 text-sm">Assurez-vous que vos données sont complètes, exactes et protégées contre toute altération.</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center">
                                    <FaHeartbeat size={20} className="text-blue-400 mr-2" />
                                    <span className="text-sm">Audit des systèmes et logs de sécurité pour vérifier les anomalies.</span>
                                </div>
                                <div className="flex items-center">
                                    <FaArrowsAltH size={20} className="text-blue-400 mr-2" />
                                    <span className="text-sm">Gestion des versions des fichiers et des bases de données.</span>
                                </div>
                                <div className="flex items-center">
                                    <FaShieldAlt size={20} className="text-blue-400 mr-2" />
                                    <span className="text-sm">Utilisation de mécanismes d’intégrité comme les hachages et signatures numériques.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Réseaux Sociaux */}
                <div className="bg-gray-800 px-6 py-6 sm:px-12 md:px-24 lg:px-24 xl:px-24 2xl:px-24">
                    <div className="flex flex-col sm:flex-row justify-center items-center">
                        {/* Réseaux Sociaux */}
                        <div className="flex space-x-6 sm:space-x-6">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="Twitter">
                                <FaTwitter size={32} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="LinkedIn">
                                <FaLinkedin size={32} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" aria-label="GitHub">
                                <FaGithub size={32} />
                            </a>
                        </div>
                    </div>
                    <br />
                    <p align="center">Testing cybersécurité | Szmulikowski Vincent | Copyright @2025</p>
                </div>
            </div>

            {/* Affichage du modal */}
            {isModalOpen && (
                <Authentification isOpen={isModalOpen} closeModal={closeModal} content={modalContent} />
            )}
        </div>
    );
}

export default Offres;












import React, { useState, useEffect } from "react";
import { FaTimes, FaEnvelope, FaUserPlus, FaSignInAlt, FaUser, FaGithub, FaTwitter, FaLinkedin, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

const Authentification = ({ isOpen, closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profil, setProfil] = useState("professionnel");
    const [avatar, setAvatar] = useState("");
    const [avatarURL, setAvatarURL] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("route1");
    const [isRegistering, setIsRegistering] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formError, setFormError] = useState(false);
    const [errorDetails, setErrorDetails] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasReloaded, setHasReloaded] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        closeModal();
    };

    const encryptToken = (token) => {
        const secretKey = 'yourSecretKey';
        return CryptoJS.AES.encrypt(token, secretKey).toString();
    };

    const decryptToken = (encryptedToken) => {
        const secretKey = 'yourSecretKey';
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const isTokenValid = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000;
            return Date.now() < expirationTime;
        } catch (error) {
            return false;
        }
    };

    const checkIfUserIsLoggedIn = () => {
        const encryptedToken = sessionStorage.getItem("token");
        const userEmail = sessionStorage.getItem("userEmail");

        if (encryptedToken && userEmail) {
            const token = decryptToken(encryptedToken);
            if (isTokenValid(token)) {
                setIsLoggedIn(true);
            } else {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userEmail");
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const savedEmail = sessionStorage.getItem("userEmail");
            const savedEncryptedPassword = sessionStorage.getItem("userPassword");
            const encryptedToken = sessionStorage.getItem("token");

            if (savedEmail) {
                setEmail(savedEmail);
            }

            let savedPassword = "";
            if (savedEncryptedPassword) {
                savedPassword = decryptToken(savedEncryptedPassword);
            }

            if (savedPassword) {
                setPassword(savedPassword);
            }

            if (encryptedToken) {
                const token = decryptToken(encryptedToken);
                if (isTokenValid(token)) {
                    setIsLoggedIn(true);
                } else {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("userEmail");
                    setIsLoggedIn(false);
                }
            }
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError(false);
        setErrorDetails("");

        if (!email || !password) {
            setFormError(true);
            setErrorDetails("Tous les champs sont obligatoires.");
            return;
        }

        if (email.length < 10 || email.length > 50) {
            setFormError(true);
            setErrorDetails("L'email doit contenir entre 10 et 50 caractères.");
            return;
        }

        if (password.length < 10 || password.length > 50) {
            setFormError(true);
            setErrorDetails("Le mot de passe doit contenir entre 10 et 50 caractères.");
            return;
        }

        if (isRegistering) {
            if (!username || !profil || (!avatar && !avatarURL)) {
                setFormError(true);
                setErrorDetails("Tous les champs sont obligatoires.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, username, profil, avatar: avatarURL || avatar }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage(data.message);
                    setTimeout(() => setSuccessMessage(""), 3000);
                    setIsRegistering(false);
                } else {
                    setErrorMessage(data.message);
                    setTimeout(() => setErrorMessage(""), 3000);
                }
            } catch (error) {
                setErrorMessage("Une erreur est survenue.");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        } else {
            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    const token = data.token;

                    const encryptedToken = encryptToken(token);
                    sessionStorage.setItem("token", encryptedToken);
                    sessionStorage.setItem("userEmail", email);

                    const encryptedPassword = encryptToken(password);
                    sessionStorage.setItem("userPassword", encryptedPassword);

                    setSuccessMessage(data.message);
                    setTimeout(() => setSuccessMessage(""), 3000);

                    if (selectedRoute === "route1") {
                        navigate("/consolePC");
                    } else if (selectedRoute === "route2") {
                        navigate("/consoleData");
                    } else if (selectedRoute === "route3") {
                        navigate("/consoleReseau");
                    }

                    closeModal();

                    if (!hasReloaded) {
                        setHasReloaded(true);
                        window.location.reload();
                    }
                } else {
                    setErrorMessage(data.message);
                    setTimeout(() => setErrorMessage(""), 3000);
                }
            } catch (error) {
                setErrorMessage("Une erreur est survenue.");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-800 flex justify-center items-center z-50">
                <div className="bg-gray-800 p-8 rounded-lg shadow-none w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl sm:mt-48 mt-[-80px]">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="flex justify-center items-center mb-6 -mt-40">
                        <h2 className="text-3xl font-semibold text-white hover:[#1919FF] flex items-center">
                            {isRegistering ? (
                                <>
                                    <FaUserPlus className="mr-2 text-blue-500" />
                                    S'enregistrer
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt className="mr-2 text-blue-500" />
                                    Se connecter
                                </>
                            )}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Champ email */}
                        {!isLoggedIn && (
                            <>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        className={`w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 ${email ? 'border-green-400' : 'border-red-400'} focus:border-blue-500 text-white placeholder-gray-400 focus:outline-none shadow-sm transition-all cursor-pointer`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Votre email :"
                                        minLength={10}
                                        maxLength={50}
                                        required
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>

                                {/* Champ mot de passe */}
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        className={`w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 ${password ? 'border-green-400' : 'border-red-400'} focus:border-blue-500 text-white placeholder-gray-400 focus:outline-none shadow-sm transition-all cursor-pointer`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Votre mot de passe :"
                                        minLength={10}
                                        maxLength={50}
                                        required
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                            </>
                        )}

                        {/* Route selection */}
                        {!isRegistering && !isLoggedIn && (
                            <div className="relative">
                                <select
                                    value={selectedRoute}
                                    onChange={(e) => setSelectedRoute(e.target.value)}
                                    className="w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all"
                                >
                                    <option value="route1">💻 Tester mon pc</option>
                                    <option value="route2">📂 Tester mes données</option>
                                    <option value="route3">🌐 Tester mon réseau</option>
                                </select>
                            </div>
                        )}

                        {/* Autres champs d'enregistrement */}
                        {isRegistering && !isLoggedIn && (
                            <>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="username"
                                        className="w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all cursor-pointer"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nom d'utilisateur"
                                        required
                                    />
                                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>

                                {/* Select profil */}
                                <div className="relative">
                                    <select
                                        id="profil"
                                        className="w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all"
                                        value={profil}
                                        onChange={(e) => setProfil(e.target.value)}
                                        required
                                    >
                                        <option value="etudiant">Étudiant</option>
                                        <option value="professionnel">Professionnel</option>
                                        <option value="autres">Autres</option>
                                    </select>
                                </div>

                                {/* Avatar URL */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="avatarURL"
                                        className="w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all cursor-pointer"
                                        value={avatarURL}
                                        onChange={(e) => setAvatarURL(e.target.value)}
                                        placeholder="URL de l'avatar"
                                    />
                                </div>

                                {/* Avatar Upload */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="avatar"
                                        className="w-full p-4 pl-12 pr-4 rounded-lg bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all cursor-pointer"
                                        onChange={(e) => setAvatar(e.target.files[0])}
                                    />
                                </div>
                            </>
                        )}

                        {/* Message d'erreur ou de succès */}
                        {formError && <div className="text-red-500 text-sm">{errorDetails}</div>}
                        {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
                        {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center cursor-pointer"
                        >
                            {isRegistering ? (
                                <>
                                    <FaUserPlus className="mr-2" />
                                    S'enregistrer
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt className="mr-2" />
                                    Se connecter
                                </>
                            )}
                        </button>
                    </form>

                    <br />

                    {/* Lien pour changer de mode */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-blue-500 hover:text-blue-600 cursor-pointer"
                        >
                            {isRegistering ? "Déjà un compte ? Se connecter" : "Pas encore inscrit ? S'enregistrer"}
                        </button>
                    </div>

                    {/* Icônes des réseaux sociaux */}
                    <div className="mt-6 flex justify-center space-x-6">
                        <a href="#" className="text-white hover:text-white">
                            <FaGithub size={32} />
                        </a>
                        <a href="#" className="text-white hover:text-white">
                            <FaTwitter size={32} />
                        </a>
                        <a href="#" className="text-white hover:text-white">
                            <FaLinkedin size={32} />
                        </a>
                    </div>
                </div>
            </div>
        )
    );
};

export default Authentification;












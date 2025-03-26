import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt, FaHome, FaClipboardList, FaMobileAlt, FaDesktop, FaHistory, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ isMobile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInitials, setUserInitials] = useState("");
    const [userEmail, setUserEmail] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage] = useState("🟢 Votre statut de dernière analyse il y a 7 jours est protégé.");
    const [notificationCount, setNotificationCount] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = () => {
            const storedUserEmail = sessionStorage.getItem("userEmail");
            const isLoggedIn = sessionStorage.getItem("isAuthenticated");
            const userInfo = JSON.parse(sessionStorage.getItem("user"));

            if (storedUserEmail) {
                setUserEmail(storedUserEmail);
                setIsAuthenticated(isLoggedIn === "true");

                if (userInfo && userInfo.name) {
                    const nameParts = userInfo.name.split(" ");
                    const initials = nameParts
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("");
                    setUserInitials(initials);
                } else {
                    setUserInitials("");
                }
            } else {
                setUserEmail(null);
            }
        };

        checkAuthentication();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUserInitials("");
        setUserEmail(null);
        navigate("/offres");
    };

    if (location.pathname === "/") {
        return null;
    }

    const isConsoleReseauPage = location.pathname === "/consoleReseau";

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
        setNotificationCount(0);
    };

    return (
        <nav className={`p-4 ${isConsoleReseauPage ? 'bg-anthracite' : 'bg-gray-800'} text-white`}>
            <div className="flex justify-between items-center">
                {/* Menu mobile */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden cursor-pointer">
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                <br /><br />

                <div className="text-2xl font-bold flex items-center">
                    <a href="/" className="flex items-center">
                        <FaHome className="mr-2 text-blue-400" size={24} />
                        Accueil
                    </a>
                </div>

                {/* Liens pour desktop */}
                <div className="hidden md:flex space-x-6 ml-4">
                    {userEmail && (
                        <>
                            <a href="/historique-utilisateur" className="flex items-center hover:text-blue-400">
                                <FaHistory className="mr-2" size={20} />
                                Historique
                            </a>
                            <a href="/offres" className="flex items-center hover:text-blue-400">
                                <FaClipboardList className="mr-2" size={20} />
                                Offres
                            </a>
                        </>
                    )}
                </div>

                <div className="hidden md:flex items-center ml-auto">
                    {isAuthenticated && (
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            {userInitials}
                        </div>
                    )}

                    {userEmail && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white rounded-full px-4 py-2 flex items-center hover:bg-red-600 cursor-pointer"
                        >
                            <FaSignOutAlt className="mr-2" size={20} />
                            Déconnexion
                        </button>
                    )}
                    &#160;&#160;&#160;
                    {/* Icône de notification avec le badge */}
                    {userEmail && (
                        <div className="relative">
                            <button onClick={handleNotificationClick} className="text-white relative cursor-pointer">
                                <FaBell size={24} />
                                {notificationCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>

                            {/* Bulle d'information avec le message */}
                            {showNotification && (
                                <div className="absolute right-0 mt-2 p-4 bg-gray-800 text-white rounded-lg shadow-md w-72">
                                    <p>{notificationMessage}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    className="'bg-anthracite' text-white px-6 py-3 rounded-md flex items-center hover:bg-gray-800 cursor-pointer"
                >
                    {isMobile ? (
                        <>
                            <FaMobileAlt style={{ fontSize: "24px" }} className="mr-2" />
                        </>
                    ) : (
                        <>
                            <FaDesktop style={{ fontSize: "24px" }} className="mr-2" />
                        </>
                    )}
                </button>
            </div>

            {/* Menu mobile */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-700 p-4 bg-transparent">
                    <a href="/historique-utilisateur" className="flex items-center block py-2 text-white">
                        <FaHistory className="mr-2" size={20} />
                        Historique
                    </a>

                    {userEmail && (
                        <>
                            <a href="/offres" className="flex items-center block py-2 text-white">
                                <FaClipboardList className="mr-2" size={20} />
                                Offres
                            </a>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white rounded-full px-4 py-2 flex items-center hover:bg-red-600 cursor-pointer"
                            >
                                <FaSignOutAlt className="mr-2" size={20} />
                                Déconnexion
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;













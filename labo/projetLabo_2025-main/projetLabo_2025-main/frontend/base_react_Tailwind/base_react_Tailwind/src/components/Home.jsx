import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col justify-between text-white relative"
            style={{
                backgroundImage: `url(${isMobile ? '/image_Mobile.jpg' : '/image_Home.jpg'})`,
                backgroundSize: isMobile ? "contain" : "cover",
                backgroundPosition: isMobile ? "center" : "center calc(50% - 5px)",
                backgroundRepeat: "no-repeat",
                height: isMobile ? "812px" : "100vh",
                width: "100%",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-75"></div>

            {/* Conteneur du texte et du bouton en desktop */}
            {!isMobile && (
                <div
                    className="absolute text-center"
                    style={{
                        top: "calc(50% + 180px)",
                        left: "calc(50% + 290px)",
                        transform: "translate(-50%, -50%)",
                        zIndex: "1",
                    }}
                >
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                        Venez tester votre réseau et vos performances
                    </p>

                    {/* Bouton "Tester" sous le texte */}
                    <div style={{ marginTop: "20px" }}>
                        <Link to="/offres">
                            <button
                                className="flex items-center gap-3 text-xl font-semibold px-8 py-4 rounded-full transition duration-300"
                                style={{
                                    width: "400px",
                                    height: "75px",
                                    backgroundColor: "#0a1e3f",
                                    color: "white",
                                    fontSize: "24px",
                                    border: "2px solid #2C75FF",
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#2C75FF")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#0a1e3f")}
                            >
                                <FaPlay size={25} />
                                Tester votre sécurité
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Bouton en haut pour mobile */}
            {isMobile && (
                <div
                    className="absolute"
                    style={{
                        top: "10%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Link to="/offres">
                        <button
                            className="flex items-center gap-3 text-xl font-semibold px-8 py-4 rounded-full transition duration-300"
                            style={{
                                width: "250px",
                                height: "65px",
                                backgroundColor: "#0a1e3f",
                                color: "white",
                                fontSize: "16px",
                                border: "2px solid #2C75FF",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2C75FF")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0a1e3f")}
                        >
                            <FaPlay size={20} />
                            Tester votre sécurité
                        </button>
                    </Link>
                </div>
            )}

            {/* Icônes de réseaux sociaux pour mobile */}
            {isMobile && (
                <div className="absolute top-3/4 transform -translate-y-1/2 w-full flex justify-center gap-8">
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#0A66C2] transition duration-300"
                    >
                        <FaLinkedin size={30} />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#1DA1F2] transition duration-300"
                    >
                        <FaTwitter size={30} />
                    </a>
                    <a
                        href="https://www.github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-400 transition duration-300"
                    >
                        <FaGithub size={30} />
                    </a>
                </div>
            )}

            {/* Icônes de réseaux sociaux en bas pour desktop */}
            {!isMobile && (
                <div className="absolute bottom-6 w-full flex justify-center gap-6">
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#0A66C2] transition duration-300"
                    >
                        <FaLinkedin size={35} />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#1DA1F2] transition duration-300"
                    >
                        <FaTwitter size={35} />
                    </a>
                    <a
                        href="https://www.github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-400 transition duration-300"
                    >
                        <FaGithub size={35} />
                    </a>
                </div>
            )}
        </div>
    );
}

export default Home;







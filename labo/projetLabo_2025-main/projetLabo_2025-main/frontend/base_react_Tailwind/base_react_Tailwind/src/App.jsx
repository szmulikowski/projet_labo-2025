import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Offres from "./components/Offres";
import ConsolePC from "./components/consoles/ConsolePC";
import Authentification from "./components/auth/Authentification";
import Navbar from './components/navigation/Navbar';
import Historique from "./components/Historique";
import AbonnementServices from "./components/services/AbonnementServices";
import NetworkStatus from "./components/consoles/reseau/NetworkStatus";
import NetworkAnalysis from "./components/consoles/reseau/NetworkAnalysis";
import ConsoleReseau from "./components/consoles/ConsoleReseau";
import ConsoleData from "./components/consoles/ConsoleData";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isPageChanged, setIsPageChanged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isPageChanged) {
      setIsPageChanged(true);
      console.log("Page changée, rechargement des données...");
    }
  }, [location]);

  return (
    <div
      className={`transition-all duration-500 ${isMobile ? "scale-90" : "scale-100"} max-w-full`}
      style={{
        height: "100vh",
        maxWidth: isMobile ? "375px" : "100%",
        margin: isMobile ? "0 auto" : "0",
        overflowX: "hidden",
      }}
    >
      <Navbar isMobile={isMobile} />
      <Routes>
        <Route path="/" element={<Home isMobile={isMobile} />} />
        <Route path="/offres" element={<Offres isMobile={isMobile} />} />
        <Route path="/consolePC" element={<ConsolePC isMobile={isMobile} />} />
        <Route path="/historique-utilisateur" element={<Historique isMobile={isMobile} />} />
        <Route path="/modal" element={<Authentification isMobile={isMobile} />} />
        <Route path="/abonnement" element={<AbonnementServices isMobile={isMobile} />} />
        <Route path="/reseau" element={<NetworkStatus isMobile={isMobile} />} />
        <Route path="/resultat" element={<NetworkAnalysis isMobile={isMobile} />} />
        <Route path="/consoleReseau" element={<ConsoleReseau isMobile={isMobile} />} />
        <Route path="/consoleData" element={<ConsoleData isMobile={isMobile} />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;













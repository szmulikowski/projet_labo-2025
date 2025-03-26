import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import { FaDesktop, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaLock, FaLaptopCode, FaHdd, FaFileAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import PerformanceSecurityGraph from "../graphique/PerformanceSecurityGraph";

function ConsolePC() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("verify");
  const [progress, setProgress] = useState(0);
  const [scannedFilesCount, setScannedFilesCount] = useState();
  const [totalFiles, setTotalFiles] = useState(18747);
  const [recommendations, setRecommendations] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [isTestUpdated, setIsTestUpdated] = useState(false);
  const [selectedTest, setSelectedTest] = useState("security");
  const [canRedirect, setCanRedirect] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isModalOpen] = useState(false);
  const [selectedDisks, setSelectedDisks] = useState({ C: false, D: false });
  const [error, setError] = useState("");
  const [isUpdatingVirusDatabase, setIsUpdatingVirusDatabase] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const [showCorrectTestPopup, setShowCorrectTestPopup] = useState(false);

  const userEmail = localStorage.getItem("userEmail") || "utilisateur@example.com";
  const userAvatar = localStorage.getItem("userAvatar") || "https://www.example.com/default-avatar.jpg";
  const navigate = useNavigate();

  const predefinedCommands = [
    { command: "Test de sécurité", icon: <FaShieldAlt />, testType: "security" },
    { command: "Test des disques", icon: <FaHdd />, testType: "disks" },
    { command: "Analyse antivirus", icon: <FaLock />, testType: "antivirus" },
    { command: "Test de performance", icon: <FaDesktop />, testType: "performance" }
  ];

  const errorSound = new Audio("public/siren-alert-96052.mp3");

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("testHistory"));
    if (storedHistory) {
      setTestHistory(storedHistory);
    }
  }, []);

  useEffect(() => {
    if (testHistory.length > 0) {
      localStorage.setItem("testHistory", JSON.stringify(testHistory));
    }
  }, [testHistory]);

  const handleTestExecution = () => {
    if (command.trim() === "") {
      setOutput("Aucune commande entrée !");
      setStatus("error");
      return;
    }

    setIsUpdatingVirusDatabase(true);
    setUpdateProgress(0);

    let updateInterval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(updateInterval);
          setIsUpdatingVirusDatabase(false);
          startTestExecution();
        }
        return prev + 10;
      });
    }, 500);
  };

  const startTestExecution = () => {
    setOutput(`Exécution de la commande : ${command}`);
    setProgress(0);
    setScannedFilesCount(0);
    setTotalFiles(18742);

    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        let filesScanned = Math.floor((prev / 100) * totalFiles);
        setScannedFilesCount(filesScanned);

        if (prev >= 100) {
          clearInterval(progressInterval);
          displayTestResults();
        }

        return prev + 10;
      });
    }, 500);

    setStatus("inProgress");
  };

  const displayTestResults = () => {
    const isTestPassed = false;

    const newNotification = `Test "${selectedTest}" ${isTestPassed ? "réussi" : "échoué"}`;

    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    if (isTestPassed) {
      setStatus("success");
      setOutput(`Test réussi pour la commande : ${command}`);
      setRecommendations("Aucune faille trouvée. Continuez à maintenir votre système sécurisé.");
      setCanRedirect(true);

      errorSound.pause();
      errorSound.currentTime = 0;

    } else {
      setStatus("error");
      setOutput(`Échec du test pour la commande : ${command}`);
      setRecommendations("Des failles de sécurité ont été détectées. Vérifiez les logs et les paramètres de sécurité.");
      setCanRedirect(false);

      errorSound.pause();
      errorSound.currentTime = 0;
      errorSound.play();
    }

    const newTestHistory = {
      testType: selectedTest,
      result: isTestPassed ? "Réussi" : "Échoué",
      date: new Date().toLocaleString(),
    };

    setTestHistory((prevHistory) => [...prevHistory, newTestHistory]);

    handleAbonnementService(isTestPassed);
  };

  const handleAbonnementService = (isTestPassed) => {
    if (isTestPassed && canRedirect) {
      setPopupMessage("Test réussi ! Vous pouvez vous abonner pour profiter de nos services étendus.");
      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/abonnement");
      }, 3000);
    } else if (!isTestPassed) {
      setPopupMessage("Le test a échoué. Veuillez vérifier les logs et les paramètres.");
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
    }
  };

  const handleShowCorrectTestPopup = () => {
    setShowCorrectTestPopup(true);
  };

  const handleConfirmCorrectTest = () => {
    setStatus("success");
    setPopupMessage("Test corrigé avec succès !");
    setShowCorrectTestPopup(false);
    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate("/abonnement");
    }, 1000);
  };

  const handleCancelCorrectTest = () => {
    setShowCorrectTestPopup(false);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 bg-blue-500 p-6 sm:block hidden">
        <h3 className="text-xl font-bold text-center mb-6 flex items-left justify-left">
          <FaLaptopCode className="mr-2 text-green-400" size={30} />
          Console de Test PC
        </h3>

        <PerformanceSecurityGraph />

        {/* Statut de sécurité */}
        <div className="mb-6 flex items-center">
          <FaShieldAlt className={`mr-2 ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-yellow-400"}`} size={20} />
          <span className="text-lg">{status === "success" ? "Système Sécurisé" : status === "error" ? "Non Sécurisé" : "Vérifier votre protection"}</span>
        </div>

        {/* Affichage du nombre de fichiers scannés */}
        {status === "inProgress" && (
          <div className="mb-6 flex items-center">
            <FaFileAlt className="mr-2 text-yellow-400" size={20} />
            <span className="text-lg">{scannedFilesCount} fichiers scannés sur {totalFiles}</span>
          </div>
        )}

        {/* Résultats du test */}
        {status === "success" && (
          <div className="mb-6 flex items-center">
            <FaCheckCircle className="mr-2 text-green-400" size={20} />
            <span className="text-lg">Test réussi avec {scannedFilesCount} fichiers scannés</span>
          </div>
        )}
        {status === "error" && (
          <div className="mb-6 flex items-center">
            <FaTimesCircle className="mr-2 text-red-400" size={20} />
            <span className="text-lg">Test échoué après avoir scanné {scannedFilesCount} fichiers</span>
          </div>
        )}

        {/* Liste des commandes prédéfinies */}
        <div className="mb-6">
          <ul>
            {predefinedCommands.map((cmd, index) => (
              <li
                key={index}
                className="cursor-pointer text-white hover:text-blue-900 flex items-center"
                onClick={() => {
                  setCommand(cmd.command);
                  setSelectedTest(cmd.testType);
                  setStatus("verify");
                }}
              >
                {cmd.icon}
                <span className="ml-2">{cmd.command}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Barre de progression de l'actualisation de la base de données antivirus */}
        {isUpdatingVirusDatabase && (
          <div className="mt-4">
            <span>Mise à jour de la base de données antivirus...</span>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div
                className="bg-green-400 h-full rounded-full"
                style={{ width: `${updateProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Barre de progression de l'exécution du test */}
        {status === "inProgress" && !isUpdatingVirusDatabase && (
          <div className="mt-4">
            <span>Exécution du test...</span>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div
                className="bg-blue-400 h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Bouton pour corriger le test */}
        {status === "error" && (

          <button
            onClick={handleShowCorrectTestPopup}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer flex items-center gap-2"
          >
            <FaCheck /> Faire une action
          </button>

        )}
      </div>

      {/* Main Content */}
      <div className="w-full bg-gray-800 sm:w-3/4 p-6 shadow-none">
        <div style={{ marginTop: "-35px" }} className="flex justify-center mb-6">
          <img
            src="public/Online-Web-Security-Transparent-Free-PNG.png"
            alt="Logo"
            className="w-24 h-24"
          />
        </div>
        {/* Liens de navigation */}
        <div style={{ marginTop: "-25px" }} className="flex gap-4 mt-12 mb-4 justify-center">
          <Link to="/consoleData" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            🖫 Console Datas
          </Link>
          <Link to="/consoleReseau" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            🌐 Console Réseau
          </Link>
        </div>

        <div className="w-full flex flex-col items-center justify-center shadow-none">
          <div className="w-full sm:w-3/4 bg-gray-800 p-6 rounded-lg shadow-none">
            <h3 className="text-lg font-semibold bg-gray-800 mb-2">Sélectionnez un test</h3>
            <div className="flex flex-wrap mb-4 shadow-none">
              {predefinedCommands.map((cmd, index) => (
                <label key={index} className="mr-4 mb-2 flex items-center">
                  <input
                    type="radio"
                    name="test"
                    value={cmd.testType}
                    checked={selectedTest === cmd.testType}
                    onChange={() => {
                      setCommand(cmd.command);
                      setSelectedTest(cmd.testType);
                      setStatus("verify");
                    }}
                    className="mr-2 cursor-pointer"
                  />
                  {cmd.icon}
                  <span>{cmd.command}</span>
                </label>
              ))}
            </div>

            {/* Test Execution */}
            {selectedTest && (
              <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-none">
                <h3 className="text-lg font-semibold mb-4">Exécuter le test</h3>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Entrez votre commande ici"
                  className="mb-4 px-4 py-2 w-full bg-gray-700 rounded-md"
                />
                <button
                  onClick={handleTestExecution}
                  disabled={isUpdatingVirusDatabase}
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlay />
                  Lancer le test
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup de confirmation pour corriger le test */}
      {showCorrectTestPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-orange-500 p-6 rounded-lg shadow-lg text-white w-80">
            <h3 align="center" className="text-lg font-bold flex items-center justify-center space-x-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <span>Voulez-vous corriger le test</span>
            </h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleConfirmCorrectTest}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
              >
                Oui
              </button>
              <button
                onClick={handleCancelCorrectTest}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsolePC;
















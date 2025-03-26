import React, { useState, useEffect } from 'react';
import { FaWifi, FaLock, FaSignal, FaTimes } from 'react-icons/fa';

function NetworkAnalysis() {
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [networkType, setNetworkType] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [showNetworks, setShowNetworks] = useState(false);

  const generateRandomNetworks = () => {
    const networks = [];
    const networkNames = ['techocité', 'HORNU', 'iPhone', 'publicWiFi', 'guestNetwork', 'adminNet'];
    networks.push({ name: networkName || 'Mon Réseau Wi-Fi', protected: true, signalStrength: Math.floor(Math.random() * 100) });

    for (let i = 0; i < 5; i++) {
      const networkName = networkNames[Math.floor(Math.random() * networkNames.length)];
      const isProtected = Math.random() > 0.5;
      networks.push({ name: networkName, protected: isProtected, signalStrength: Math.floor(Math.random() * 100) });
    }

    setAvailableNetworks(networks);
  };

  const getNetworkInfo = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      setNetworkType(connection.effectiveType);
      setNetworkName(connection.type);
    } else {
      setNetworkType('Inconnu');
      setNetworkName('Réseau non détecté');
    }
  };

  useEffect(() => {
    getNetworkInfo();
    generateRandomNetworks();
  }, []);

  const renderNetworkIcon = (network) => {
    let signalIcon;
    if (network.signalStrength > 80) {
      signalIcon = <FaSignal className="text-green-500" size={20} />;
    } else if (network.signalStrength > 50) {
      signalIcon = <FaSignal className="text-yellow-500" size={20} />;
    } else {
      signalIcon = <FaSignal className="text-red-500" size={20} />;
    }

    return (
      <div className="flex items-center space-x-3">
        <FaWifi className="text-blue-500" size={32} />
        <span className="text-white font-medium">{network.name}</span>
        {network.protected && <FaLock className="text-gray-400" />}
        {signalIcon}
      </div>
    );
  };

  const refreshNetworks = () => {
    generateRandomNetworks();
  };

  const toggleNetworksVisibility = () => {
    setShowNetworks(!showNetworks);
  };

  return (
    <div className="bg-gray-800 p-6 sm:px-8 rounded-lg shadow-md">
      {/* Connexion actuelle avec icône stylisée */}
      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaWifi className="text-green-500" size={32} />
            <span className="text-white font-medium ml-2">Vous êtes connecté à {networkName || 'Mon Réseau Wi-Fi'}</span>
          </div>
          <span className="text-gray-400">{networkType}</span>
        </div>
      </div>

      {/* Affichage des réseaux disponibles avec icônes */}
      {showNetworks && (
        <div className="bg-gray-700 p-4 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">Réseaux Wi-Fi disponibles :</h3>
            {/* Bouton pour fermer la liste */}
            <FaTimes className="text-white cursor-pointer" size={20} onClick={toggleNetworksVisibility} />
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            {availableNetworks.map((network, index) => (
              <div key={index} className="flex items-center justify-between">
                {renderNetworkIcon(network)}
              </div>
            ))}
          </div>
          <button
            onClick={refreshNetworks}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 cursor-pointer"
          >
            ⎘ Rafraîchir les réseaux
          </button>
        </div>
      )}
      {!showNetworks && (
        <button
          onClick={toggleNetworksVisibility}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 flex items-center space-x-2 cursor-pointer"
        >
          {/* Ajout de l'icône FaWifi dans le bouton "Afficher les réseaux" */}
          <FaWifi className="text-white" />
          <span>Afficher les réseaux</span>
        </button>
      )}
    </div>
  );
}

export default NetworkAnalysis;
















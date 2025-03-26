import React, { useState } from 'react';

function NetworkStatus() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState('Aucun problème détecté');

  const startAnalysis = () => {
    setIsAnalyzing(true);
    let interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setLastAnalysis('Analyse terminée. Aucun problème détecté.');
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);
  };

  const handleQuarantine = () => {
    setIsQuarantined(true);
    setLastAnalysis('Appareil mis en quarantaine.');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <span className="text-white font-semibold mr-2">Vous êtes connecté à :</span>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 0H7C5.9 0 5 0.9 5 2V22C5 23.1 5.9 24 7 24H17C18.1 24 19 23.1 19 22V2C19 0.9 18.1 0 17 0ZM12 22C11.45 22 11 21.55 11 21C11 20.45 11.45 20 12 20C12.55 20 13 20.45 13 21C13 21.55 12.55 22 12 22ZM15 18H9V3H15V18Z" />
            </svg>

          </div>
          <div>
            <span className="text-white font-medium">iPhone</span>
            <div className="text-green-400 text-sm">
              <span className="mr-1">{lastAnalysis}</span>
              <a href="#" className="text-blue-400 hover:underline"></a>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      {isAnalyzing && (
        <div className="mb-4">
          <div className="bg-gray-600 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white text-sm text-center">{progress}%</p>
        </div>
      )}

      {/* Bouton d'analyse */}
      <button
        onClick={startAnalysis}
        disabled={isAnalyzing || isQuarantined}
        className={`${isAnalyzing || isQuarantined
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-600'
          } text-white font-semibold py-2 px-4 rounded w-full cursor-pointer`}
      >
        {isAnalyzing ? 'Analyse en cours...' : 'ANALYSER CE RÉSEAU'}
      </button>

      {/* Option de quarantaine */}
      {progress === 100 && !isQuarantined && (
        <button
          onClick={handleQuarantine}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full mt-4"
        >
          METTRE EN QUARANTAINE
        </button>
      )}
    </div>
  );
}

export default NetworkStatus;


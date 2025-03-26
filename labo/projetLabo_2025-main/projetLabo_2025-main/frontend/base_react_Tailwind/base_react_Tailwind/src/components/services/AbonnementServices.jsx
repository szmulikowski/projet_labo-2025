import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AbonnementServices = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedPrice = localStorage.getItem('selectedPrice');
    if (savedPrice) {
      setSelectedPrice(savedPrice);
    }
  }, []);

  const handlePriceSelection = (price) => {
    setSelectedPrice(price);
    localStorage.setItem('selectedPrice', price);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubscription = () => {
    if (isChecked && selectedPrice) {
      setIsPopupOpen(true);
    } else {
      alert('Veuillez accepter les conditions et choisir une option de prix.');
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    closeModal();
    navigate('/offres');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isPopupOpen) {
      const successSound = new Audio('public/luvvoice.com-20250315-jRjcQ6.mp3');
      successSound.play();
    }
  }, [isPopupOpen]);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${isMobile ? "mt-[-170px]" : ""
            }`}
        >
          <div className="bg-white p-8 rounded-lg max-w-xs w-full sm:max-w-md lg:max-w-md sm:w-[calc(100%-100px)] sm:px-4 shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
              <FaShieldAlt className="mr-2 text-green-600" /> Offre d'Abonnement
            </h2>
            <p className="text-gray-700 mb-4">
              Choisissez une option d'abonnement pour bénéficier de notre service de cybersécurité complet.
            </p>

            {/* Options de prix */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div
                className={`border p-4 rounded-lg cursor-pointer ${selectedPrice === '1mois' ? 'bg-green-100 border-green-500' : 'border-gray-300'
                  }`}
                onClick={() => handlePriceSelection('1mois')}
              >
                <h3 className="text-lg font-semibold text-green-600">1 Mois</h3>
                <p className="text-gray-700">€9.99 par mois</p>
              </div>
              <div
                className={`border p-4 rounded-lg cursor-pointer ${selectedPrice === '6mois' ? 'bg-green-100 border-green-500' : 'border-gray-300'
                  }`}
                onClick={() => handlePriceSelection('6mois')}
              >
                <h3 className="text-lg font-semibold text-green-600">6 Mois</h3>
                <p className="text-gray-700">€49.99 pour 6 mois</p>
              </div>
              <div
                className={`border p-4 rounded-lg cursor-pointer ${selectedPrice === '1an' ? 'bg-green-100 border-green-500' : 'border-gray-300'
                  }`}
                onClick={() => handlePriceSelection('1an')}
              >
                <h3 className="text-lg font-semibold text-green-600">1 An</h3>
                <p className="text-gray-700">€89.99 par an</p>
              </div>
            </div>

            {/* Case à cocher pour accepter les conditions */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-green-600 border-gray-300 rounded mr-2 cursor-pointer"
              />
              <label className="text-gray-700">
                J'accepte les <span className="text-blue-600">conditions d'utilisation</span>
              </label>
            </div>

            {/* Boutons de confirmation */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600 transition cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={handleSubscription}
                className={`bg-green-500 text-white py-2 px-4 rounded-lg ${isChecked && selectedPrice ? 'hover:bg-green-600' : 'opacity-50 cursor-not-allowed cursor-pointer'
                  }`}
                disabled={!isChecked || !selectedPrice}
              >
                <FaCheckCircle className="inline mr-2" />
                Abonner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de confirmation */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-green-600 p-8 rounded-lg max-w-xs w-full sm:max-w-md lg:max-w-md sm:w-[calc(100%-40px)] sm:px-4 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <FaCheckCircle className="mr-2 text-white" /> Abonnement Confirmé
            </h2>
            <p className="text-white mb-4">
              Félicitations ! Votre abonnement pour {selectedPrice} a été confirmé avec succès.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closePopup}
                className="bg-white text-green-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AbonnementServices;











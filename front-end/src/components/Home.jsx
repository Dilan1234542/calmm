// src/components/Home.jsx
import React, { useState } from 'react';
import BreathingActivitiesModal from './BreathingActivitiesModal';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true); // Abierto por defecto para demostración

  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="home">
      <BreathingActivitiesModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Home;

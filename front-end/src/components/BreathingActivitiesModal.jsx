import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './BreathingActivitiesModal.css'; // Importar el archivo CSS

const BreathingActivitiesModal = ({ isOpen, onRequestClose }) => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3000/act/actividades');
        if (!response.ok) {
          throw new Error('Error al obtener las actividades');
        }
        const data = await response.json();
        setActivities(data);
        setCompletedActivities(Array(data.length).fill(false));
      } catch (error) {
        console.error('Error al obtener las actividades:', error);
      }
    };

    fetchActivities();
  }, []);

  // No mostrar la modal si no hay actividades
  if (!isOpen || activities.length === 0) {
    return null;
  }

  const nextActivity = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
  };

  const prevActivity = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + activities.length) % activities.length);
  };

  const handleCompleteClick = () => {
    setCompletedActivities((prev) => {
      const newCompleted = [...prev];
      newCompleted[currentIndex] = true;
      return newCompleted;
    });
  };

  const activity = activities[currentIndex];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actividades de Respiración"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="modal-title">Bienvenido a las Actividades de Respiración</h2>
      <div className="activity-card">
        {activity.image && <img src={activity.image} alt={activity.title} className="activity-image" />}
        <h3 className="activity-title">{activity.title}</h3>
        <p className="activity-description">{activity.description}</p>
        <p className="activity-time">{activity.time}</p>
        {activity.pattern && (
          <div className="breathing-pattern">
            <h4>Modo de Realización:</h4>
            <ul>
              {activity.pattern.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          className={`complete-button ${completedActivities[currentIndex] ? 'completed' : ''}`}
          onClick={handleCompleteClick}
          disabled={completedActivities[currentIndex]} // Desactivar botón si ya está completo
        >
          {completedActivities[currentIndex] ? 'Completo' : 'Por Completar'}
        </button>
        <div className="navigation-buttons">
          <button onClick={prevActivity} className="nav-button">←</button>
          <button onClick={nextActivity} className="nav-button">→</button>
        </div>
      </div>
      <button onClick={onRequestClose} className="close-button">Cerrar</button>
    </Modal>
  );
};

export default BreathingActivitiesModal;

// src/components/BreathingActivitiesModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import './BreathingActivitiesModal.css'; // Importar el archivo CSS

const activities = [
  {
    day: 'Lunes',
    image: 'https://uniepilepsias.com/wp-content/uploads/2023/08/tips-sobre-la-respiracion-consciente.webp',
    title: 'Respiración Profunda y Lenta',
    description: 'Este ejercicio de respiración está diseñado para ayudarte a relajarte y reducir el estrés. Consiste en inhalar profundamente por la nariz, mantener la respiración por unos segundos, y luego exhalar lentamente por la boca. Este proceso ayuda a oxigenar el cuerpo y a calmar la mente.',
    time: '5 minutos',
    pattern: [
      'Inhala lentamente por la nariz durante 4 segundos.',
      'Mantén la respiración durante 2 segundos.',
      'Exhala despacio por la boca durante 6 segundos.',
      'Descansa durante 2 segundos antes de repetir.',
      'Repite este ciclo durante 5 minutos para una sesión completa.'
    ],
  },
  {
    day: 'Martes',
    image: 'https://media.istockphoto.com/id/1372597649/es/vector/ejercicio-de-respiraci%C3%B3n-respiraci%C3%B3n-profunda-por-la-nariz-para-beneficio-y-buen-trabajo.jpg?s=612x612&w=0&k=20&c=sH0tfOVL2-RcCqZxY1pduOLdJMlVweaz4QAG_IIA3nQ=',
    title: 'Respiración en Caja',
    description: 'Este ejercicio implica respirar en un patrón de caja de 4 lados, donde inhalas, mantienes la respiración, exhalas y mantienes nuevamente en tiempos iguales. Esto ayuda a enfocar la mente y reducir la ansiedad.',
    time: '12 minutos',
    pattern: [
      'Inhala lentamente por la nariz durante 4 segundos.',
      'Mantén la respiración durante 4 segundos.',
      'Exhala lentamente por la boca durante 7 segundos.',
      'Exhala despacio por la boca durante 4 segundos.',
      'Descansa durante 4 segundos antes de repetir.'
    ],
  },
  {
    day: 'Miercoles',
    image: 'https://i0.wp.com/campuskinesico.com/wp-content/uploads/2024/02/respiracion-nasal-alterna.jpg?resize=832%2C555&ssl=1',
    title: 'Respiración Alterna de las Narinas',
    description: 'Este ejercicio ayuda a equilibrar el sistema nervioso y promover la relajación. Involucra respirar por una narina a la vez, utilizando los dedos para alternar el flujo de aire.',
    time: '5 minutos',
    pattern: [
      'Cierra la narina derecha con el pulgar y inhala lentamente por la narina izquierda durante 4 segundos.',
      'Cierra la narina izquierda con el dedo anular, y exhala por la narina derecha durante 6 segundos.',
      'Inhala por la narina derecha durante 4 segundos.',
      'Cierra la narina derecha y exhala por la narina izquierda durante 6 segundos.',
      'Repite este ciclo durante 5 minutos.'
    ],
  },
];



const BreathingActivitiesModal = ({ isOpen, onRequestClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(Array(activities.length).fill(false));

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
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <h3 className="activity-title">{activity.title}</h3>
        <p className="activity-description">{activity.description}</p>
        <p className="activity-time">{activity.time}</p>
        <div className="breathing-pattern">
          <h4>Modo de Realización:</h4>
          <ul>
            {activity.pattern.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
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

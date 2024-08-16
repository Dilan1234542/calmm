import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import BreathingActivitiesModal from './BreathingActivitiesModal';
import './Home.css';

const Home = () => {
  const [counter, setCounter] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [cycles, setCycles] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { speak } = useSpeechSynthesis();
  const [activity, setActivity] = useState('breathing'); // Nuevo estado para alternar entre actividades

  // Estado para el consejo del día
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);
  const adviceList = [
    'Planifica tu Tiempo: Usa una agenda para organizar tus tareas y evitar la procrastinación.',
    'Encuentra Tiempo para Ti: Dedica tiempo a actividades que disfrutes, como leer o practicar deportes.',
    'Habla con Alguien: No dudes en buscar apoyo emocional en amigos, familiares o consejeros.',
    'Practica Técnicas de Relajación: Considera la meditación, el yoga o la respiración profunda para reducir el estrés.',
    'Establece Metas Realistas: No te exijas demasiado y establece metas alcanzables para evitar el agotamiento.'
  ];

  useEffect(() => {
    let timer;
    if (isCounting) {
      if (counter > 0) {
        timer = setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        if (phase === 'inhale') {
          setCounter(5); // Reiniciar contador para exhalar
          setPhase('exhale');
          speak({ text: 'Exhala' });
        } else {
          if (cycles < 4) {
            setCounter(5); // Reiniciar contador para inhalar
            setPhase('inhale');
            speak({ text: 'Inhala' });
            setCycles(cycles + 1);
          } else {
            setIsCounting(false); // Detener después de 5 ciclos
            setCycles(0); // Reiniciar ciclos
          }
        }
      }
    }
    return () => clearTimeout(timer);
  }, [counter, isCounting, phase, cycles, speak]);

  useEffect(() => {
    const adviceTimer = setInterval(() => {
      setCurrentAdviceIndex((prevIndex) => (prevIndex + 1) % adviceList.length);
    }, 10000); // Cambiar consejo cada 10 segundos

    return () => clearInterval(adviceTimer);
  }, [adviceList.length]);

  const startBreathing = () => {
    speak({ text: 'Respira conmigo' });
    setTimeout(() => {
      setCounter(5);
      setPhase('inhale');
      setIsCounting(true);
      speak({ text: 'Inhala' });
      setCycles(0);
    }, 3000); // Espera 3 segundos antes de comenzar la secuencia
  };

  const startVisualRelaxation = () => {
    setIsCounting(false);
    speak({ text: 'Relájate y concéctate en la imagen' });
  };

  const toggleActivity = () => {
    setActivity(activity === 'breathing' ? 'visual' : 'breathing');
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="home">
      <h1>Bienvenido a la Plataforma de Actividades de Respiración</h1>
      <p className="subtitle">
        Experimenta técnicas de respiración para manejar el estrés universitario y mejorar tu bienestar.
      </p>
      
      <div className="content-wrapper">
        
        <div className="circle-container">
          <span className="arrow left-arrow" onClick={toggleActivity}>⬅️</span>
          <div
            className="breathing-circle"
            onClick={activity === 'breathing' ? startBreathing : startVisualRelaxation}
            style={{ backgroundColor: activity === 'breathing' ? '#4caf50' : '#ff9800' }}
          >
            {isCounting && activity === 'breathing' ? (
              <>
                <span className="counter">{counter}</span>
                <span className="phase-text">{phase === 'inhale' ? 'Inhala' : 'Exhala'}</span>
              </>
            ) : (
              <span className="start-text">
                {activity === 'breathing' ? 'Comienza a Respirar' : 'Comienza la Relajación'}
              </span>
            )}
          </div>
          <span className="arrow right-arrow" onClick={toggleActivity}>➡️</span>
        </div>

        <div className="activity-section">
          <h2>Consejos para Manejar el Estrés Universitario</h2>
          <ul>
            <li><strong>Planifica tu Tiempo:</strong> Usa una agenda para organizar tus tareas y evitar la procrastinación.</li>
            <li><strong>Encuentra Tiempo para Ti:</strong> Dedica tiempo a actividades que disfrutes, como leer o practicar deportes.</li>
            <li><strong>Habla con Alguien:</strong> No dudes en buscar apoyo emocional en amigos, familiares o consejeros.</li>
            <li><strong>Practica Técnicas de Relajación:</strong> Considera la meditación, el yoga o la respiración profunda para reducir el estrés.</li>
            <li><strong>Establece Metas Realistas:</strong> No te exijas demasiado y establece metas alcanzables para evitar el agotamiento.</li>
          </ul>
        </div>
      </div>

      <div className="advice-section">
        <h2>Consejo del Día</h2>
        <p className="advice-text">{adviceList[currentAdviceIndex]}</p>
      </div>

      <button className="open-modal-button" onClick={openModal}>
        Ver Mis Actividades
      </button>

      <BreathingActivitiesModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css'; 

export const Juego = ({ dificultad }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const data = await fetchQuestions(dificultad);
        setPreguntas(data);
        console.log('Preguntas cargadas:', data);
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPreguntas();
  }, [dificultad]); // Se ejecuta si la dificultad cambia

  if (cargando) {
    return <div>Cargando preguntas...</div>;
  }

  // Aquí mostraremos la pregunta actual. Por ahora, solo el texto.
  const pregunta = preguntas[preguntaActual];
  console.log( pregunta);
  return (
    <>
      <h2>{pregunta?.question}</h2>
      <div className='dificultad-botones'>

        <BotonDificultad key={pregunta?.option1} texto={pregunta?.option1} />
        <BotonDificultad key={pregunta?.option2} texto={pregunta?.option2} />
        <BotonDificultad key={pregunta?.option3} texto={pregunta?.option3} />
        <BotonDificultad key={pregunta?.option4} texto={pregunta?.option4} />
        {/* Aquí irán los botones con las opciones */}

      </div>
    </>
  );
};
import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitAnswer } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css'; 

export const Juego = ({ dificultad }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [cargando, setCargando] = useState(true);
  // Nuevos estados para manejar la respuesta
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [resultadoRespuesta, setResultadoRespuesta] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

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

  const handleOpcionClick = async (opcionKey) => {
    // Si ya se respondió o el juego terminó, no hacer nada.
    if (opcionSeleccionada || juegoTerminado) return;

    const preguntaId = preguntas[preguntaActual].id;
    setOpcionSeleccionada(opcionKey);

    try {
      const resultado = await submitAnswer(preguntaId, opcionKey);
      setResultadoRespuesta(resultado);

      if (!resultado.answer) {
        // Si la respuesta es incorrecta, el juego termina.
        setJuegoTerminado(true);
      }
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
  };

  if (cargando) {
    return <div>Cargando preguntas...</div>;
  }

  const pregunta = preguntas[preguntaActual];

  // Creamos un array de opciones para mapearlas dinámicamente
  const opciones = [
    { key: 'option1', texto: pregunta?.option1 },
    { key: 'option2', texto: pregunta?.option2 },
    { key: 'option3', texto: pregunta?.option3 },
    { key: 'option4', texto: pregunta?.option4 },
  ];

  return (
    <>
      <h2>{pregunta?.question}</h2>
      <div className='dificultad-botones'>
        {opciones.map((opcion) => {
          let estadoBoton = '';
          if (opcionSeleccionada === opcion.key) {
            estadoBoton = resultadoRespuesta?.answer ? 'correcto' : 'incorrecto';
          }
          return (
            <BotonDificultad
              key={opcion.key}
              texto={opcion.texto}
              onClick={() => handleOpcionClick(opcion.key)}
              estado={estadoBoton}
              disabled={juegoTerminado || opcionSeleccionada}
            />
          );
        })}
      </div>
    </>
  );
};
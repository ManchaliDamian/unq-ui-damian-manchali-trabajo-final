import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitAnswer } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css'; 

export const Juego = ({ dificultad, onReiniciar }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [puntaje, setPuntaje] = useState(0);
  // Nuevos estados para manejar la respuesta
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [resultadoRespuesta, setResultadoRespuesta] = useState(null);
  // Este estado ahora indica que se han respondido todas las preguntas.
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const data = await fetchQuestions(dificultad);
        setPreguntas(data);
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
    if (opcionSeleccionada) return;

    const preguntaId = preguntas[preguntaActual].id;
    setOpcionSeleccionada(opcionKey);

    try {
      const resultado = await submitAnswer(preguntaId, opcionKey);
      setResultadoRespuesta(resultado);

      if (resultado.answer) {
        // Si la respuesta es correcta, incrementamos el puntaje.
        setPuntaje(puntajeAnterior => puntajeAnterior + 1);
      }
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
  };

  const handleSiguientePregunta = () => {
    // Verificamos si hay más preguntas
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      // Reseteamos los estados para la nueva pregunta
      setOpcionSeleccionada(null);
      setResultadoRespuesta(null);
    } else {
      // Si no hay más preguntas, terminamos el juego.
      setJuegoTerminado(true);
    }
  };

  if (cargando) {
    return <div>Cargando preguntas...</div>;
  }

  const pregunta = preguntas[preguntaActual];

  if (juegoTerminado) {
    return (
      <>
        <h2>Juego Terminado</h2>
        <h3>Puntaje Final: {puntaje} de {preguntas.length}</h3>
        <BotonDificultad texto="Reiniciar Juego" onClick={onReiniciar} />
      </>
    );
  }

  // Creamos un array de opciones para mapearlas dinámicamente
  const opciones = [
    { key: 'option1', texto: pregunta?.option1 },
    { key: 'option2', texto: pregunta?.option2 },
    { key: 'option3', texto: pregunta?.option3 },
    { key: 'option4', texto: pregunta?.option4 },
  ];

  return (
    <>
      <div className="juego-header">
        <span>Puntaje: {puntaje}</span>
        <button onClick={onReiniciar} className="reiniciar-btn">Reiniciar</button>
      </div>
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
              disabled={opcionSeleccionada}
            />
          );
        })}
      </div>
      {opcionSeleccionada && (
        <div className="siguiente-pregunta-container">
          <BotonDificultad texto="Siguiente Pregunta" onClick={handleSiguientePregunta} />
        </div>
      )}
    </>
  );
};
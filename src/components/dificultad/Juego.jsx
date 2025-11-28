import { useState, useEffect } from 'react';
import { fetchQuestions, submitAnswer } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css'; 

export const Juego = ({ dificultad, onReiniciar }) => {

  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [puntaje, setPuntaje] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const data = await fetchQuestions(dificultad);
        setPreguntas(data);
      } catch (error) {
        setError("No se pudieron cargar las preguntas. Por favor, reinicia el juego.");
      } finally {
        setCargando(false);
      }
    };

    cargarPreguntas();
  }, [dificultad]);

  const handleOpcionClick = async (opcionKey) => {

    if (opcionSeleccionada) return;

    const preguntaId = preguntas[preguntaActual].id;
    setOpcionSeleccionada(opcionKey);

    try {
      const resultado = await submitAnswer(preguntaId, opcionKey);
      setResultadoRespuesta(resultado);

      if (resultado.answer) {
        setPuntaje(puntajeAnterior => puntajeAnterior + 1);
      }
    } catch (error) {
      setError("Hubo un problema al verificar tu respuesta. Inténtalo de nuevo.");
    }
  };

  const handleSiguientePregunta = () => {

    if (preguntaActual < preguntas.length - 1) {      
      setPreguntaActual(preguntaActual + 1);
      setOpcionSeleccionada(null);
      setResultadoRespuesta(null);
    } else {
      setJuegoTerminado(true);
    }
  };

  if (cargando) {
    return <div>Cargando preguntas...</div>;
  }

  if (error) {
    return <div className="error-mensaje">{error}</div>;
  }

  const pregunta = preguntas[preguntaActual];

  if (juegoTerminado) {
    return (
      <>
        <h1>Juego Terminado</h1>
        <h2>Puntaje Final: {puntaje} de {preguntas.length}</h2>
        <h2>Dificultad elegida: {dificultad}</h2>
        <h3>Querés jugar otra vez?</h3>
        <BotonDificultad texto="Reiniciar Juego" onClick={onReiniciar} />
      </>
    );
  }

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
            if (resultadoRespuesta)
              estadoBoton = resultadoRespuesta.answer ? 'correcto' : 'incorrecto';
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
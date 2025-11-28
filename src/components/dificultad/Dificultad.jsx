import React, { useState, useEffect } from 'react';
import { fetchDifficulties } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css';


export const Dificultad = ({ onDificultadSeleccionada }) => {
  
  const [dificultades, setDificultades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDificultades = async () => {
      try {
        const data = await fetchDifficulties();
        setDificultades(data); 
      } catch (error) {
        setError("No se pudieron cargar las dificultades. Intenta recargar la página.");
      }
    };

    cargarDificultades();
  }, []);

  if (error) {
    return <div className="error-mensaje">{error}</div>;
  }

  return (
    <>
      <h1 >Selecciona una dificultad</h1>
      <div className='dificultad-botones'>
        {dificultades.map((dificultad) => (
          <BotonDificultad
            key={dificultad}
            texto={dificultad}
            onClick={() => onDificultadSeleccionada(dificultad.toLowerCase())}
          />
        ))}
      </div>
    </>
  );
};

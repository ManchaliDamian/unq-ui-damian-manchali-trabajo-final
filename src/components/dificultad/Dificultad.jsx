import React, { useState, useEffect } from 'react';
import { fetchDifficulties } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css';


export const Dificultad = ({ onDificultadSeleccionada }) => {
  
  const [dificultades, setDificultades] = useState([]);

 
  useEffect(() => {
    
    const cargarDificultades = async () => {
      try {
        const data = await fetchDifficulties();
        setDificultades(data); 
      } catch (error) {
        console.error('Error al cargar las dificultades:', error);
      }
    };

    cargarDificultades();
  }, []);

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

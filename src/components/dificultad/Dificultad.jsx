import React, { useState, useEffect } from 'react';
import { fetchDifficulties } from '../../services/api';
import { BotonDificultad } from './BotonDificultad';
import './dificultad.css';
export const Dificultad = () => {
  // 1. Creamos un estado para almacenar las dificultades. Inicialmente es un array vacío.
  const [dificultades, setDificultades] = useState([]);

  // 2. Usamos useEffect para llamar a la API cuando el componente se monta.
  useEffect(() => {
    // Definimos una función async dentro del efecto para poder usar await.
    const cargarDificultades = async () => {
      try {
        const data = await fetchDifficulties();
        setDificultades(data); // 3. Actualizamos el estado con los datos de la API.
      } catch (error) {
        console.error('Error al cargar las dificultades:', error);
      }
    };

    cargarDificultades();
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez.

  const handleDificultadClick = (dificultad) => {
    // Aquí irá la lógica para iniciar el juego con la dificultad seleccionada.
    console.log(`Dificultad seleccionada: ${dificultad}`);
  };

  return (
    <>
      <h3 >Selecciona una dificultad</h3>
      <div className='dificultad-botones'>
        {/* 4. Ahora 'dificultades' es un array y .map() funcionará correctamente. */}
        {dificultades.map((dificultad) => (
          <BotonDificultad key={dificultad} texto={dificultad} onClick={() => handleDificultadClick(dificultad)} />
        ))}
      </div>
    </>
  );
};

import React from 'react';
import './BotonDificultad.css';
export const BotonDificultad = ({ texto, onClick }) => {
  // Podríamos agregar estilos o lógica específica del botón aquí en el futuro.
  return (
    <button className='botones' onClick={onClick}>
      {texto}
    </button>
  );
};
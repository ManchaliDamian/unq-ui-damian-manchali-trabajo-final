
import React, { useState } from 'react';
import './App.css';
import { Dificultad } from './components/dificultad/Dificultad';
import { Juego } from './components/dificultad/Juego';

const App = () => {
  // Estado para saber qué vista mostrar: 'dificultad' o 'juego'
  const [vista, setVista] = useState('dificultad');
  // Estado para guardar la dificultad elegida
  const [dificultad, setDificultad] = useState(null);

  // Esta función se la pasaremos a Dificultad.jsx
  const iniciarJuego = (dificultadSeleccionada) => {
    setDificultad(dificultadSeleccionada);
    setVista('juego'); // Cambiamos la vista para mostrar el componente Juego
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Preguntados</h1>
      </header>
      <main className="app-content">
        {vista === 'dificultad' && <Dificultad onDificultadSeleccionada={iniciarJuego} />}
        {vista === 'juego' && <Juego dificultad={dificultad} />}
      </main>
    </div>
  );
};

export default App;
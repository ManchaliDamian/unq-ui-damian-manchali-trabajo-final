
import React, { useState } from 'react';
import './App.css';
import { Dificultad } from './components/dificultad/Dificultad';
import { Juego } from './components/dificultad/Juego';

const App = () => {
  const [vista, setVista] = useState('dificultad');
  const [dificultad, setDificultad] = useState(null);

  const iniciarJuego = (dificultadSeleccionada) => {
    setDificultad(dificultadSeleccionada);
    setVista('juego');
  };

  const reiniciarJuego = () => {
    setDificultad(null);
    setVista('dificultad');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Preguntados</h1>
      </header>
      <main className="app-content">
        {vista === 'dificultad' && <Dificultad onDificultadSeleccionada={iniciarJuego} />}
        {vista === 'juego' && <Juego dificultad={dificultad} onReiniciar={reiniciarJuego} />}
      </main>
    </div>
  );
};

export default App;
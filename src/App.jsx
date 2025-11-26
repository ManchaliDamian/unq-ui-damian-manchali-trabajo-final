
import './App.css';
import { Dificultad } from './components/dificultad/Dificultad';

const App = () => {

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Preguntados</h1>
      </header>
      <Dificultad />
    </div>
  );
};

export default App;
import './BotonDificultad.css';
export const BotonDificultad = ({ texto, onClick, estado, disabled }) => {
  
  return (
    <button className={`botones ${estado}`} onClick={onClick} disabled={disabled}>
      {texto}
    </button>
  );
};
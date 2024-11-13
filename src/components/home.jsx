import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">CellphoneSpStore</h1>
      <button 
        className="home-button"
        onClick={() => navigate('/inicio-sesion')}
      >
        Ir a Iniciar Sesión
      </button>
    </div>
  );
};

export default Home;

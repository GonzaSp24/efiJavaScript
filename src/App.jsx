import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import UsersContainer from './Components/Users/UsersContainer';
import CreateUser from './Components/Users/CreateUsers';
import LoginUser from './Components/Users/LoginUser';
import EquiposContainer from './Components/Equipos/EquiposContainer';
import CreateEquipo from './Components/Equipos/CreateEquipo';
import { Menubar } from 'primereact/menubar';


// Componente Home necesita estar FUERA del BrowserRouter
const HomeContent = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="card">
        <h2>Bienvenido a CellphoneSpStore</h2>
        <div className="button-container">
          <button 
            onClick={() => navigate('/usuarios')}
            className="p-button"
          >
            Gestión de Usuarios
          </button>
          <button 
            onClick={() => navigate('/equipos')}
            className="p-button"
          >
            Gestión de Equipos
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const menuItems = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      url: '/'
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Ver Usuarios',
          icon: 'pi pi-list',
          url: '/usuarios'
        },
        {
          label: 'Nuevo Usuario',
          icon: 'pi pi-user-plus',
          url: '/nuevo_usuario'
        },
        {
          label: 'Iniciar Sesión',
          icon: 'pi pi-sign-in',
          url: '/inicio_sesion'
        }
      ]
    },
    {
      label: 'Equipos',
      icon: 'pi pi-mobile',
      items: [
        {
          label: 'Ver Equipos',
          icon: 'pi pi-list',
          url: '/equipos'
        },
        {
          label: 'Nuevo Equipo',
          icon: 'pi pi-plus',
          url: '/nuevo_equipo'
        }
      ]
    }
  ];

  return (
    <BrowserRouter>
      <div className="app-container">
        <Menubar model={menuItems} />
        <h1>EFI React</h1>
        
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/usuarios" element={<UsersContainer />} />
          <Route path="/nuevo_usuario" element={<CreateUser />} />
          <Route path="/inicio_sesion" element={<LoginUser />} />
          <Route path="/equipos" element={<EquiposContainer />} />
          <Route path="/nuevo_equipo" element={<CreateEquipo />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>

        <footer className="read-the-docs">
          Proyecto React inicializado por Spernanzoni Gonzalo
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import UserContainer from './components/users/UserContainer';
import CreateUser from './components/users/CreateUser';
import LoginUser from './components/users/LoginUser';
import Home from './components/home';
import CreateEquipo from './components/Equipos/CreateEquipo';
import EditEquipoForm from './components/Equipos/EditEquipoForm';
import EquiposContainer from './components/Equipos/EquiposContainer';

function App() {
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/home' },
    { label: 'Inicio Sesion', icon: 'pi pi-sign-in', url: '/inicio-sesion' },
    { label: 'Nuevo Usuario', icon: 'pi pi-user-plus', url: '/nuevo-usuario' },
    { label: 'Usuarios', icon: 'pi pi-users', url: '/usuarios' },
    // Nuevas opciones para Equipos
    { label: 'Equipos', icon: 'pi pi-list', url: '/equipos' },
    { label: 'Nuevo Equipo', icon: 'pi pi-plus-circle', url: '/nuevo-equipo' },
  ];

  return (
    <BrowserRouter>
      <Menubar model={items} className="menubar-custom" />
      <div className="content">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inicio-sesion" element={<LoginUser />} />
            <Route path="/nuevo-usuario" element={<CreateUser />} />
            <Route path="/usuarios" element={<UserContainer />} />
            <Route path="/equipos" element={<EquiposContainer />} />
            <Route path="/nuevo-equipo" element={<CreateEquipo />} />
            <Route path="/editar-equipo/:id" element={<EditEquipoForm />} />
          </Routes>
        </div>
        <div className="background-image" />
      </div>
      <footer className="read-the-docs">
        <h1>CellphoneSpStore</h1>
      </footer>
    </BrowserRouter>
  );
}


export default App;

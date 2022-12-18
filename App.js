import { Component } from "react";
//import Menu from "./components/Menu";
import PageDeportes from "./components/PageDeportes";
import PageEquipos from "./components/PageEquipos";
import PageEventos from "./components/PageEventos";
import PageInicio from "./components/PageInicio";
import PageSesion from "./components/PageSesion";
import PageUsuarios from "./components/PageUsuarios";
import MenuAdmin from "./components/MenuAdmin";
import PageLogin from "./components/PageLogin";
import PageLogout from './components/PageEventos';
import MenuInicial from "./components/MenuInicial";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 

class App extends Component {
  render() {
    return (
      <>
      

      <Router>
        <MenuInicial />
          <Routes>
            <Route path="/" element={<PageUsuarios />}/>
            <Route path="/PageInicio" element={<PageInicio />}/>
            <Route path="/PageDeportes" element={<PageDeportes />}/>
            <Route path="/PageEquipos" element={<PageEquipos />}/>
            <Route path="/PageEventos" element={<PageEventos />}/>
            <Route path="/PageSesion" element={<PageSesion />}/>
            <Route path="/PageUsuarios" element={<PageUsuarios />}/>
            <Route path="/MenuAdmin" element={<MenuAdmin />}/>
            <Route path="/PageLogin" element={<PageLogin />}/>

          </Routes>
      </Router>
      </>
    );
  }
}

export default App;

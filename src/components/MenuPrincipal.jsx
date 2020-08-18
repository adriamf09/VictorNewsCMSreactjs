import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import AgregarNoticia from '../pages/AgregarNoticia'
import Categorias from '../pages/Categorias';
import FormRegistroUsuarios from './FormRegistroUsuarios';
import Usuarios from '../pages/Usuarios';
import ListadoNoticias from '../pages/ListadoNoticias';
import VerNoticia from './VerNoticia';
import Login from './Login';
import Logout from './Logout';
import Configuracion from '../pages/Configuracion'
import Noticias from '../pages/Noticias'
import PublicarNoticias from '../pages/PublicarNoticias'

export default class MenuPrincipal extends Component {
    constructor(props){
        super(props);
        const token= localStorage.getItem("jwt")
        
        let loggedIn = this.props.loggedIn;
        if(token == null){
          loggedIn = false
        }
        this.state={
          loggedIn
        }
    }

    render() {
        const {loggedIn} = this.state;
        return (

            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand as={Link} to="/inicio">A Noticias</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/inicio">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/agregarnoticia">Nueva noticia</Nav.Link>
                        <Nav.Link as={Link} to="/misnoticias">Mis noticias</Nav.Link>
                        <Nav.Link as={Link} to="/publicarnoticias">Publicar noticias</Nav.Link>
                        <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
                        <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link>
                        <Nav.Link as={Link} to="/configuracion">Configuraci&oacute;n</Nav.Link>
                        {loggedIn? <Nav.Link as={Link} to="/logout" onClick={()=>this.setState({loggedIn: false})}>Cerrar sesi&oacute;n</Nav.Link>
                        :<Nav.Link as={Link} to="/login" onClick={()=>this.setState({loggedIn: true})}>Iniciar sesi&oacute;n</Nav.Link>}
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/inicio">
                        <ListadoNoticias/>
                    </Route>
                    <Route path="/agregarnoticia">
                        <AgregarNoticia/>
                    </Route>
                    <Route path="/categorias">
                        <Categorias/>
                    </Route>
                    <Route path="/registrarse">
                        <FormRegistroUsuarios/>
                    </Route>
                    <Route path="/usuarios">
                        <Usuarios/>
                    </Route>
                    <Route path="/noticia/:id">
                        <VerNoticia/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route path="/configuracion">
                        <Configuracion/>
                    </Route>
                    <Route path="/misnoticias">
                        <Noticias/>
                    </Route>
                    <Route path="/publicarnoticias">
                        <PublicarNoticias/>
                    </Route>
                </Switch>
            </Router>
        )
        
    }
}

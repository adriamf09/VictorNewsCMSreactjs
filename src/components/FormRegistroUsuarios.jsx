import React, { Component } from 'react'
import {Container, Form, Col} from 'react-bootstrap'
import './FormRegistroUsuarios.css'
import axios from 'axios'

export default class FormRegistroUsuarios extends Component {
    state={
        usuario:{
            Name:'',
            LastName:'',
            Email:'',
            Password:'',
            ConfirmPassword:'',
            Rol: 'Estándar'
        },
        nombreUsuarioError:'',
        apellidosError:'',
        emailError:'',
        claveError:'',
        confirmarClaveError:''
    }

    onChangeUsuarioNombre=(value)=>{
        this.setState({
            usuario:{
                ...this.state.usuario,
                Name: value
            }
        })
    }

    onChangeUsuarioApellidos=(value)=>{
        this.setState({
            usuario:{
                ...this.state.usuario,
                LastName: value
            }
        })
    }

    onChangeUsuarioEmail=(value)=>{
        this.setState({
            usuario:{
                ...this.state.usuario,
                Email: value
            }
        })
    }

    onChangeUsuarioClave=(value)=>{
        this.setState({
            usuario:{
                ...this.state.usuario,
                Password: value
            }
        })
    }

    onChangeConfirmarClave=(value)=>{
        this.setState({
            usuario:{
                ...this.state.usuario,
                ConfirmPassword: value
            }
        })
    }

    validarCredenciales = ()=>{
        if(!(this.state.usuario.Name)){
            this.setState({nombreUsuarioError: 'Debe ingresar su nombre.'})
            return false;
        }
        else if(!(this.state.usuario.LastName)){
            this.setState({apellidosError: 'Debe ingresar sus apellidos.'})
            return false;
        }
        else if(!(this.state.usuario.Email)){
            this.setState({emailError: 'Debe ingresar su correo electrónico.'})
            return false;
        }
        else if(!(this.state.usuario.Email.includes('@')) || !(this.state.usuario.Email.includes('.'))){
            this.setState({emailError: 'Ingrese un correo electrónico válido.'})
            return false;
        }
        else if(!(this.state.usuario.Password)){
            this.setState({claveError: 'Debe ingresar una contraseña.'})
            return false;
        }
        else if(!(this.state.usuario.ConfirmPassword)){
            this.setState({confirmarClaveError: 'Debe confirmar la contraseña.'})
            return false;
        }
        else if(this.state.usuario.Password !== this.state.usuario.ConfirmPassword){
            this.setState({confirmarClaveError: 'Las contraseñas no coinciden.'})
            return false;
        }
        return true;
    }

    crearUsuario = (e)=>{
        e.preventDefault();
        if(!this.validarCredenciales()){
            return;
        }

        axios.post("api/account/register", this.state.usuario)
        .then(()=>{
            this.setState({
                usuario:{
                    Name:'',
                    LastName:'',
                    Email:'',
                    Password:'',
                    ConfirmPassword:'',
                    Rol: 'Estándar'
                },
            })
        })
        .catch(err=>{
            if(err.response.status === 400)
                alert("Los datos ingresados no son validos.")
            else
                alert("Error inesperado.")
        })
        
    }
    
    render() {
        const {nombreUsuarioError, apellidosError, emailError, claveError, confirmarClaveError} = this.state;
        
        return (
            <Container>
                <h3 className="title">Formulario de registro</h3>
                <form id="formRegistroUsuarios" method="post" onSubmit={this.crearUsuario}>
                <Form.Row>
                        <Form.Group as={Col} controlId="nombreUsuario">
                            <Form.Label className="label">Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"
                                onChange={(e)=>this.onChangeUsuarioNombre(e.target.value)}
                                onInput={()=>{this.setState({nombreUsuarioError:''})}}
                                value={this.state.usuario.Name}
                                className={nombreUsuarioError? 'form-control is-invalid' : 'form-control'}
                            />
                            {nombreUsuarioError?<div className="text-danger">{nombreUsuarioError}</div> :null}
                        </Form.Group>
                        <Form.Group as={Col} controlId="apellidos">
                            <Form.Label className="label">Apellidos</Form.Label>
                            <Form.Control type="text" placeholder="Apellidos" 
                                onChange={(e)=>this.onChangeUsuarioApellidos(e.target.value)}
                                onInput={()=>{this.setState({apellidosError:''})}}
                                value={this.state.usuario.LastName}
                                className={apellidosError? 'form-control is-invalid' : 'form-control'}
                            />
                            {apellidosError? <div className="text-danger">{apellidosError}</div>: null}
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="email">
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control type="email" placeholder="Correo electrónico" 
                            onChange={(e)=>this.onChangeUsuarioEmail(e.target.value)}
                            onInput={()=>{this.setState({emailError:''})}}
                            value={this.state.usuario.Email}
                            className={emailError? 'form-control is-invalid' : 'form-control'}
                        />
                        {emailError? <div className="text-danger">{emailError}</div>:null}
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="clave">
                            <Form.Label className="label">Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" 
                                onChange={(e)=>this.onChangeUsuarioClave(e.target.value)}
                                onInput={()=>{this.setState({claveError:''})}}
                                value={this.state.usuario.Password}
                                className={claveError? 'form-control is-invalid' : 'form-control'}
                            />
                            {claveError? <div className="text-danger">{claveError}</div> : null}
                        </Form.Group>

                        <Form.Group as={Col} controlId="confirmarClave">
                            <Form.Label className="label">Confirmar contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Confirmar contraseña" 
                                onChange={(e)=>this.onChangeConfirmarClave(e.target.value)}
                                onInput={()=>{this.setState({confirmarClaveError:''})}}
                                value={this.state.usuario.ConfirmPassword}
                                className={confirmarClaveError? 'form-control is-invalid' : 'form-control'}
                            />
                            {confirmarClaveError? <div className="text-danger">{confirmarClaveError}</div>:null}
                        </Form.Group>
                    </Form.Row>
                </form>
                <button type="submit" className="btn btn-primary" form="formRegistroUsuarios">
                    Registrarse
                </button>
            </Container>
            
        )
    }
}

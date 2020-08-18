import React, { Component } from 'react'
import {Container, Table, Button, ButtonGroup} from 'react-bootstrap'
import axios from 'axios'
import UsuariosAddModal from './UsuariosAddModal'
import UsuariosDeleteModal from './UsuariosDeleteModal'
import {getJwt} from '../components/helpers/jwt'

export default class Usuarios extends Component {
    state={
        cargando: true,
        data: [],
        roles: [],
        rolesUsuarios: [],
        agregarUsuario: false,
        errorUsuario:{
            nombreUsuarioError:'',
            apellidosError:'',
            emailError:'',
            claveError:'',
            confirmarClaveError:''
        },
        usuarioSeleccionado: null,
        eliminarUsuario: false
    }
    componentDidMount(){
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);

        axios.get("api/aspnetusers", {
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({data: res.data})
        })

        axios.get("api/AspNetRoles", {
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({roles: res.data})
        })
        .finally(()=>{
            this.setState({cargando: false})
        })
    }

    cerrarUsuariosModal = ()=>{
        this.setState({agregarUsuario: false, eliminarUsuario: false})
    }

    validarCredenciales = (nuevoUsuario)=>{
        if(!(nuevoUsuario.Name)){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    nombreUsuarioError: 'Debe ingresar un nombre.'
                }
            })
            return false;
        }
        else if(!(nuevoUsuario.LastName)){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    apellidosError: 'Debe ingresar al menos un apellido.'
                }
            })
            return false;
        }
        else if(!(nuevoUsuario.Email)){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    emailError: 'Debe ingresar el correo electrónico.'
                }
            })
            return false;
        }
        else if(!(nuevoUsuario.Email.includes('@')) || !(nuevoUsuario.Email.includes('.'))){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    emailError: 'Ingrese un correo electrónico válido.'
                }
            })
            return false;
        }
        else if(!(nuevoUsuario.Password)){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    claveError: 'Debe ingresar una contraseña.'
                }
            })
            return false;
        }
        else if(!(nuevoUsuario.ConfirmPassword)){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    confirmarClaveError: 'Debe confirmar la contraseña.'
                }
            })
            return false;
        }
        else if(nuevoUsuario.Password !== nuevoUsuario.ConfirmPassword){
            this.setState({
                errorUsuario:{
                    ...this.state.errorUsuario,
                    confirmarClaveError: 'Las contraseñas no coinciden.'
                }
            })
            return false;
        }

        return true;
    }

    crearUsuario = (nuevoUsuario)=>{
        if(!this.validarCredenciales(nuevoUsuario)){
            return;
        }
        axios.post("api/account/register", nuevoUsuario)
        .then(res=>{
            this.forceUpdate();
            this.setState({
                data:[...this.state.data, res.data]
            })
        })
        .catch(err=>{
            alert("Error inesperado.")
        })
        .finally(()=>{
            this.setState({
                agregarUsuario: false,
            })
        })
    }

    eliminarUsuario = () =>{
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt); 
        const {usuarioSeleccionado} = this.state;
        usuarioSeleccionado.Eliminado = true;
        axios.put(`api/aspnetusers/${usuarioSeleccionado.Id}`, usuarioSeleccionado, {
            headers:{
                Authorization: auth
            }
        })
        .then(()=>{
            this.setState({
                data: this.state.data.filter(item=> item.Id !== usuarioSeleccionado.Id),
                eliminarUsuario: false
            })
        })
    }

    render() {
        const{data, cargando, agregarUsuario, roles, errorUsuario,  usuarioSeleccionado, eliminarUsuario} = this.state;
        return (
            <Container>
                <div className="d-flex align-items-center header">
                    <div className="flex-grow-1">
                        <h3>Administrar usuarios</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={()=>{this.setState({agregarUsuario: true})}}>
                        Agregar usuario
                        </button>
                    </div>
                </div>

                {agregarUsuario?<UsuariosAddModal 
                    onClose={this.cerrarUsuariosModal}
                    roles={roles}
                    onAccept={this.crearUsuario}
                    errorUsuario={errorUsuario}
                    onNombreUsuarioChanged ={()=>{this.setState({
                        errorUsuario:{
                            ...this.state.errorUsuario,
                            nombreUsuarioError: ''
                        }
                    })}}
                    onApellidosChanged ={()=>{this.setState({
                        errorUsuario:{
                            ...this.state.errorUsuario,
                            apellidosError: ''
                        }
                    })}}
                    onEmailChanged ={()=>{this.setState({
                        errorUsuario:{
                            ...this.state.errorUsuario,
                            emailError: ''
                        }
                    })}}
                    onClaveChanged ={()=>{this.setState({
                        errorUsuario:{
                            ...this.state.errorUsuario,
                            claveError: ''
                        }
                    })}}
                    onConfirmarClaveChanged ={()=>{this.setState({
                        errorUsuario:{
                            ...this.state.errorUsuario,
                            confirmarClaveError: ''
                        }
                    })}}
                    />
                : null}

                {eliminarUsuario?<UsuariosDeleteModal 
                    onClose={this.cerrarUsuariosModal}
                    onAccept={this.eliminarUsuario}
                    usuarioSeleccionado={usuarioSeleccionado}
                    />
                : null}


                <Table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                            <th style={{width: '154px'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando? 
                            <tr>
                                <td>Cargando...</td>
                            </tr> 
                        : data.map((item, index)=> <tr key={index}>
                            <td>
                                {item.Name+" "+item.LastName}
                            </td>
                            <td>
                                {item.Email}
                            </td>
                            <td>
                                <ButtonGroup>
                                    <Button className="btn btn-danger" onClick={()=>{
                                        this.setState({usuarioSeleccionado: item, eliminarUsuario: true})
                                    }}>
                                        Eliminar
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>  
            </Container>
        )
    }
}

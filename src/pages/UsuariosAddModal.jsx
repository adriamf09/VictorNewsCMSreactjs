import React from 'react'
import{Form, Col} from 'react-bootstrap'

export default function UsuariosAddEditModal({onClose, onAccept, roles, errorUsuario, onNombreUsuarioChanged,
    onApellidosChanged, onEmailChanged,onRolChanged, onClaveChanged, onConfirmarClaveChanged
}) {
    const onSubmitFormUsuarios = (e)=>{
        e.preventDefault();
        const nombreUsuario = e.target.elements["nombreUsuario"].value;
        const apellidos = e.target.elements["apellidos"].value;
        const email = e.target.elements["email"].value;
        const rol = e.target.elements["rolId"].value;
        const clave = e.target.elements["clave"].value;
        const confirmarClave = e.target.elements["confirmarClave"].value;

        onAccept({
            Name: nombreUsuario,
            LastName: apellidos,
            Rol: rol,
            Email: email,
            Password: clave,
            ConfirmPassword: confirmarClave
        })

        return false;
    }
    return (
        <div className="modal" role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Usuarios</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form id="formUsuarios" method="post" onSubmit={onSubmitFormUsuarios}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="nombreUsuario">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"
                                className={errorUsuario.nombreUsuarioError?'form-control is-invalid' : 'form-control'}
                                onChange={onNombreUsuarioChanged}/>
                                {errorUsuario.nombreUsuarioError?<div className="invalid-feedback">{errorUsuario.nombreUsuarioError}</div>: null}
                            </Form.Group>
                            <Form.Group as={Col} controlId="apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" placeholder="Apellidos"
                                className={errorUsuario.apellidosError?'form-control is-invalid' : 'form-control'}
                                onChange={onApellidosChanged}/>
                                {errorUsuario.apellidosError?<div className="invalid-feedback">{errorUsuario.apellidosError}</div>: null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Correo electrónico"
                                className={errorUsuario.emailError?'form-control is-invalid' : 'form-control'}
                                onChange={onEmailChanged}/>
                                {errorUsuario.emailError?<div className="invalid-feedback">{errorUsuario.emailError}</div>: null}
                            </Form.Group>
                            <Form.Group as={Col} controlId="rolId">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control as="select"
                                onChange={onRolChanged}>
                                {roles.map((item, index)=><option key={index} value={item.Name}>{item.Name}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Group as={Col} controlId="clave">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña"
                                className={errorUsuario.claveError?'form-control is-invalid' : 'form-control'}
                                onChange={onClaveChanged}/>
                                {errorUsuario.claveError?<div className="invalid-feedback">{errorUsuario.claveError}</div>: null}
                            </Form.Group>

                            <Form.Group as={Col} controlId="confirmarClave">
                                <Form.Label>Confirmar contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Confirmar contraseña"
                                className={errorUsuario.confirmarClaveError?'form-control is-invalid' : 'form-control'}
                                onChange={onConfirmarClaveChanged}/>
                                {errorUsuario.confirmarClaveError?<div className="invalid-feedback">{errorUsuario.confirmarClaveError}</div>: null}
                            </Form.Group>
                            <div className="form-control">
                                <p>Su contraseña debe contener al menos una letra may&uacute;scula, min&uacute;scula y un caracter n&uacute;merico.</p>
                            </div>
                        </Form.Row>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" form="formUsuarios">Guardar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Cerrar</button>
                </div>
                </div>
            </div>
        </div>
    )
}

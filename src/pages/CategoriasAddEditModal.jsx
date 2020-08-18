import React from 'react'
import {Form} from 'react-bootstrap'
export default function CategoriasAddEditModal({onClose, onAccept, errorNombreCategoria, onNombreCategoriaChanged,
    nombreCategoria
    }) {

    const nombreCategoriaTieneError = errorNombreCategoria !==''

    const onSubmitFormCategorias =(e)=>{
        e.preventDefault();
        const nombreCategoria = e.target.elements["nombreCategoria"].value;
        onAccept({
            NombreCategoria : nombreCategoria
        })

        return false;
    }
    return (
        <div className="modal fade show"  role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Categor&iacute;as</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{onClose()}}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="formCategorias" method="post" onSubmit={onSubmitFormCategorias}>
                            <Form.Group controlId="nombreCategoria">
                                <Form.Label style={{fontWeight: 'bold'}}>Nombre categor&iacute;a</Form.Label>
                                <Form.Control type="text" name="nombreCategoria"
                                 className={nombreCategoriaTieneError? 'form-control is-invalid' : 'form-control'}
                                 onChange={onNombreCategoriaChanged}
                                 value={nombreCategoria}/>
                                {nombreCategoriaTieneError?(
                                    <div className="invalid-feedback">{errorNombreCategoria}</div>
                                )
                                : null}
                                
                            </Form.Group>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Cerrar</button>
                        <button type="submit" className="btn btn-primary" form="formCategorias">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

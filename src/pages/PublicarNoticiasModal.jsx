import React from 'react'
import {Form} from 'react-bootstrap'

export default function PublicarNoticiasModal({noticiaSeleccionada, onClose, onAccept}) {
    const onSubmitFormPublicar=(e)=>{
        e.preventDefault();
        const estadoId = parseInt(e.target.elements["estadoId"].value);
        onAccept(estadoId)
    }
    return (
        <div className="modal fade show"  role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Publicar noticia</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form id="formPublicar" onSubmit={onSubmitFormPublicar}>
                        <Form.Group controlId="estadoId">
                            <Form.Label>Seleccione una opci&oacute;n</Form.Label>
                            <Form.Control defaultValue={noticiaSeleccionada.EstadoId} as="select">
                                <option value="1">Publicar</option>
                                <option value="2">No publicar</option>
                            </Form.Control>
                        </Form.Group>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" form="formPublicar">Confirmar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Cancelar</button>
                </div>
                </div>
            </div>
        </div>
    )
}

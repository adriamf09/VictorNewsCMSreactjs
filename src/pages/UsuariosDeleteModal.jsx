import React from 'react'

export default function UsuariosDeleteModal({onClose, usuarioSeleccionado, onAccept}) {
    return (
        <div className="modal fade show"  role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-danger">Advertencia</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight: 'bold'}}>¿Está seguro de eliminar este usuario?</p>
                    <p>{usuarioSeleccionado.Email}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={()=>{onAccept(usuarioSeleccionado.UsuarioId)}}>Confirmar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Cancelar</button>
                </div>
                </div>
            </div>
        </div>
    )
}

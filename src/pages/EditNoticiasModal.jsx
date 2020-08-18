import React from 'react'
import {Form, FormGroup} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import './EditNoticiasModal.css'
// const ReactQuill = require('react-quill'); 
// require('react-quill/dist/quill.snow.css');


export default function EditNoticiasModal({tituloError, onClose, noticiaSeleccionada, resumenError,
    onTitularChanged, onResumenChanged, onPortadaChanged, onCategoriaChanged, categorias, onAccept
}) {

    const modules = {
        toolbar:{
            container: [
                [{ 'font': []}, { 'size': ['small', false, 'large', 'huge'] }, {'header': [1, 2, 3] }, { 'align': [] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{ 'color': [] }, { 'background': [] }],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'clean'],
            ],

        },
        
        clipboard:{
            matchVisual: false,
        },
    }   

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'video', 'code-block'
    ]


    const onSubmitFormEditNoticias=(e)=>{
        e.preventDefault();
        const editor = document.getElementsByClassName("textEditor")[0].innerText;
        onAccept(editor)
    }
    return (
        <div class="modal" tabindex="-1" style={{display: 'block'}}>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editor de noticias</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="formEditNoticias"onSubmit={onSubmitFormEditNoticias}>
                        <FormGroup>
                            <Form.Label className="label">Titúlo</Form.Label>
                            <Form.Control type="text"
                                onChange={onTitularChanged}
                                value={noticiaSeleccionada.Titular}
                                className={tituloError? 'form-control is-invalid' : 'form-control'}
                            />
                            {tituloError?<div className="text-danger">{tituloError}</div> :null}
                        </FormGroup>
                        <FormGroup>
                            <Form.Label className="label">Imagen de portada</Form.Label>
                            <Form.File id="portada" name="portada" accept="image/*" onChange={onPortadaChanged}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label className="label">Resumen</Form.Label>
                            <Form.Control as="textarea" rows="3" 
                                onChange={onResumenChanged}
                                onInput={onResumenChanged}
                                value={noticiaSeleccionada.Resumen}
                                className={resumenError? 'form-control is-invalid' : 'form-control'}
                            />
                            {resumenError?<div className="text-danger">{resumenError}</div> :null}
                        </FormGroup>
                        <Form.Group controlId="categoriaId">
                            <Form.Label className="label">Categor&iacute;a</Form.Label>
                            <Form.Control defaultValue={noticiaSeleccionada.CategoriaId} as="select" onChange={onCategoriaChanged}>
                                {categorias ==null? null
                                :categorias.map((item, index)=><option key={index} value={item.CategoriaId}>{item.NombreCategoria}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <FormGroup>
                            <Form.Label className="label">Contenido</Form.Label>
                            <ReactQuill className="textEditor" id="textEditor"
                                value={noticiaSeleccionada.Contenido}
                                theme='snow'
                                modules={modules}
                                formats={formats}>
                            </ReactQuill>
                        </FormGroup>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                    <button type="submit" class="btn btn-primary" form="formEditNoticias">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

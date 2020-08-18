import React, { Component } from 'react'
import axios from 'axios'
import {getJwt} from '../components/helpers/jwt'
import {Container, Table, ButtonGroup, Button} from 'react-bootstrap'
import EditNoticiasModal from './EditNoticiasModal'
import NoticiasDeleteModal from './NoticiasDeleteModal'

export default class TablaNoticias extends Component {
    state={
        data: [],
        categorias: null,
        cargando: true,
        tituloError:'',
        resumenError:'',
        noticiaSeleccionada:'',
        editarNoticia: false,
        eliminarNoticia: false,
    }
    componentDidMount(){
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt); 
        axios.get("api/noticias/getnoticiasbyuser", {
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({data: res.data})
        })
        .catch(err=>{
            console.log("Error inesperado.")
        })
        .finally(()=>{
            this.setState({cargando: false})
        })

        axios.get("api/categorias")
        .then(res=>{
            this.setState({categorias: res.data})
        })
    }
    cerrarNoticiasModal = () =>{
        this.setState({
            editarNoticia:false,
            eliminarNoticia: false
        })
    }

    validarNoticia = (noticia) =>{
        if(!(noticia.Titular)){
            this.setState({tituloError: 'Debe ingresar el titulo de la noticia.'})
            return false;
        }
        else if(!(noticia.Resumen)){
            this.setState({resumenError: 'Debe ingresar un resumen de la noticia, de máximo 1000 caracteres.'})
            return false;
        }
        return true;
    }

    editarNoticia=(contenido)=>{
        const {noticiaSeleccionada} = this.state;
        if(!this.validarNoticia(noticiaSeleccionada)){
            return;
        }

        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);
        noticiaSeleccionada.Contenido = contenido;
        axios.put(`api/noticias/${noticiaSeleccionada.NoticiaId}`, noticiaSeleccionada, {
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({
                data: this.state.data.map(item =>(
                    item.NoticiaId === noticiaSeleccionada.CategoriaId ? noticiaSeleccionada: item
                ))
            })
        })
        .catch(err=>{
            if(err.response.status === 400)
                alert("Los datos ingresados no son validos.")
            else
                alert("Error inesperado.")
        })
        .finally(()=>{
            this.setState({
                editarNoticia: false
            })
        })
    }

    eliminarNoticia = () =>{
        const {noticiaSeleccionada} = this.state;
        noticiaSeleccionada.Eliminado = true;
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt); 
        axios.put(`api/noticias/${noticiaSeleccionada.NoticiaId}`, noticiaSeleccionada, {
            headers:{
                Authorization: auth
            }
        })
        .then(()=>{
            this.setState({
                data: this.state.data.filter(item=> item.NoticiaId !== noticiaSeleccionada.NoticiaId)
            })
        })
        .catch(err=>{
            alert(err.response.message)
        })
        .finally(()=>{
            this.setState({
                eliminarNoticia: false
            })
        })
    }
    render() {
        const {data, categorias, cargando, tituloError, resumenError, noticiaSeleccionada, editarNoticia, eliminarNoticia} = this.state;
        return (
            <Container>
                {editarNoticia? <EditNoticiasModal tituloError={tituloError} 
                resumenError={resumenError}
                noticiaSeleccionada={noticiaSeleccionada}
                onClose = {this.cerrarNoticiasModal}
                onAccept = {this.editarNoticia}
                categorias={categorias}
                onTitularChanged ={(e)=>{
                    this.setState({
                        tituloError : '',
                        noticiaSeleccionada : {...noticiaSeleccionada, Titular: e.target.value}
                    })
                }}
                onPortadaChanged ={(e)=>{
                    let file = e.target.files[0];
                    const reader = new FileReader();
                    reader.addEventListener("load",  ()=> {
                        this.setState({
                            noticiaSeleccionada : {...noticiaSeleccionada, Portada: reader.result}
                        })
                    }, false);
                    
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                    
                }}
                onResumenChanged ={(e)=>{
                    this.setState({
                        resumenError : '',
                        noticiaSeleccionada : {...noticiaSeleccionada, Resumen: e.target.value}
                    })
                }}
                onCategoriaChanged ={(e)=>{
                    this.setState({
                        noticiaSeleccionada : {...noticiaSeleccionada, CategoriaId: e.target.value}
                    })
                }}
                onContenidoChanged ={(e)=>{
                    this.setState({
                        noticiaSeleccionada : {...noticiaSeleccionada, Contenido: e.target.value}
                    })
                }}
                />
                : null}
                {eliminarNoticia? <NoticiasDeleteModal
                onClose={this.cerrarNoticiasModal}
                noticiaSeleccionada={noticiaSeleccionada}
                onAccept={this.eliminarNoticia}
                />: null}

                <Table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Titular</th>
                            <th>Resumen</th>
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
                                {item.Titular}
                            </td>
                            <td>
                                {item.Resumen}
                            </td>
                            <td>
                                <ButtonGroup>
                                    <Button className="btn btn-secondary" 
                                    onClick={()=>{
                                        this.setState({noticiaSeleccionada: item, editarNoticia: true})
                                    }}>
                                    Editar
                                    </Button>
                                    <Button className="btn btn-danger" 
                                    onClick={()=>{
                                        this.setState({noticiaSeleccionada: item, eliminarNoticia: true})
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

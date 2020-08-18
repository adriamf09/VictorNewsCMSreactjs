import React, {Component} from 'react'
import axios from 'axios'
import {Container, ButtonGroup, Button, Table} from 'react-bootstrap'
import './Categorias.css'
import CategoriasAddEditModal from './CategoriasAddEditModal'
import CategoriasDeleteModal from './CategoriasDeleteModal'
import {getJwt} from '../components/helpers/jwt'

export default class Categorias extends Component{
    
    state={
        cargando: true,
        data: null,
        agregarCategoria: false,
        editarCategoria: false,
        eliminarCategoria: false,
        errorNombreCategoria: '',
        categoriaSeleccionada : null
    }
    componentDidMount(){
        axios.get("api/categorias")
        .then(res=>{
            this.setState({data: res.data, cargando: false})
        })
    }

    cerrarCategoriasModal = () =>{
        this.setState({
            agregarCategoria: false,
            editarCategoria: false,
            eliminarCategoria: false
        })
    }

    crearCategoria = (nuevaCategoria)=>{
        if(!(nuevaCategoria.NombreCategoria)){
            this.setState({errorNombreCategoria: 'Debe ingresar el nombre de la categoría.'})
            return;
        }
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);
        axios.post("api/categorias", nuevaCategoria,{
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({
                data:[...this.state.data, res.data],
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
                agregarCategoria: false
            })
        })
    }

    editarCategoria = ()=>{

        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);
        const {categoriaSeleccionada} = this.state;
        if(!(categoriaSeleccionada.NombreCategoria)){
            this.setState({errorNombreCategoria: 'Debe ingresar el nombre de la categoría.'})
            return;
        }
        axios.put(`api/categorias/${categoriaSeleccionada.CategoriaId}`, categoriaSeleccionada, {
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({
                data: this.state.data.map(item =>(
                    item.CategoriaId === categoriaSeleccionada.CategoriaId ? categoriaSeleccionada: item
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
                editarCategoria: false
            })
        })
    }

    eliminarCategoria = () =>{
        const {categoriaSeleccionada} = this.state;
        categoriaSeleccionada.Eliminado = true;
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);
        axios.put(`api/categorias/${categoriaSeleccionada.CategoriaId}`, categoriaSeleccionada,{
            headers:{
                Authorization: auth
            }
        })
        .then(()=>{
            this.setState({
                data: this.state.data.filter(item=> item.CategoriaId !== categoriaSeleccionada.CategoriaId),
                eliminarCategoria: false
            })
        })
    }

    render(){
        const{cargando, data, agregarCategoria, errorNombreCategoria, editarCategoria, categoriaSeleccionada, eliminarCategoria} = this.state;
        return (
            <Container>
                <div className="d-flex align-items-center header">
                    <div className="flex-grow-1">
                        <h3>Categorias de las noticias</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={()=>{
                            this.setState({agregarCategoria: true})
                            }}
                        >
                        Agregar categor&iacute;a
                        </button>
                    </div>
                </div>

                {agregarCategoria? <CategoriasAddEditModal
                    onClose = {this.cerrarCategoriasModal}
                    onAccept = {this.crearCategoria}
                    errorNombreCategoria = {errorNombreCategoria}
                    onNombreCategoriaChanged ={()=>{
                        this.setState({errorNombreCategoria : ''})
                    }}
                />: null}

                {editarCategoria? <CategoriasAddEditModal
                    nombreCategoria={categoriaSeleccionada.NombreCategoria}
                    onClose = {this.cerrarCategoriasModal}
                    onAccept = {this.editarCategoria}
                    errorNombreCategoria = {errorNombreCategoria}
                    onNombreCategoriaChanged ={(e)=>{
                        this.setState({
                            errorNombreCategoria : '',
                            categoriaSeleccionada : {...categoriaSeleccionada, NombreCategoria: e.target.value}
                        })
                    }}
                />: null}

                {eliminarCategoria? <CategoriasDeleteModal
                onClose={this.cerrarCategoriasModal}
                nombreCategoria={categoriaSeleccionada.NombreCategoria}
                categoriaId={categoriaSeleccionada.CategoriaId}
                onAccept={this.eliminarCategoria}
                />
                : null}

                <Table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nombre de la categor&iacute;a</th>
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
                                {item.NombreCategoria}
                            </td>
                            <td>
                                <ButtonGroup>
                                    <Button className="btn btn-secondary" 
                                    onClick={()=>{
                                        this.setState({categoriaSeleccionada: item, editarCategoria: true})
                                    }}>
                                    Editar
                                    </Button>
                                    <Button className="btn btn-danger" 
                                    onClick={()=>{
                                        this.setState({categoriaSeleccionada: item, eliminarCategoria: true})
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

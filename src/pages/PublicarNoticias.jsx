import React, { Component } from 'react'
import {Container, Table, ButtonGroup, Button} from 'react-bootstrap'
import axios from 'axios'
import PublicarNoticiasModal from './PublicarNoticiasModal'
import {getJwt} from '../components/helpers/jwt'


export default class PublicarNoticias extends Component {
    state={
        data: [],
        cargando: true,
        noticiaSeleccionada:null,
        publicarNoticia: false
    }
    componentDidMount(){
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt); 
        axios.get("api/noticias/getalldbnoticias", {
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({data: res.data})
        })
        .finally(()=>{
            this.setState({cargando: false})
        })
    }
    cerrarPublicarModal=()=>{
        this.setState({publicarNoticia: false})
    }

    publicarNoticia = (estadoId) =>{
        const {noticiaSeleccionada} = this.state;
        noticiaSeleccionada.EstadoId = estadoId;
        noticiaSeleccionada.FechaPublicacion = new Date();
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);
        axios.put(`api/noticias/${noticiaSeleccionada.NoticiaId}`, noticiaSeleccionada, {
            headers:{
                Authorization: auth
            }
        })
        .then(()=>{
            this.setState({
                data: this.state.data.map(item =>(
                    item.NoticiaId === noticiaSeleccionada.NoticiaId ? noticiaSeleccionada: item
                ))
            })
        })
        .finally(()=>{
            this.setState({publicarNoticia: false})
        })
    }
    render() {
        const {data, cargando, noticiaSeleccionada, publicarNoticia} = this.state;
        return (
            <Container>
                {publicarNoticia? <PublicarNoticiasModal
                noticiaSeleccionada={noticiaSeleccionada}
                onClose={this.cerrarPublicarModal}
                onAccept={this.publicarNoticia}/>
                : null}
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
                                        this.setState({noticiaSeleccionada: item, publicarNoticia: true})
                                    }}>
                                    Publicar
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

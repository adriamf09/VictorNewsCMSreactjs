import React, { Component } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import {getJwt} from '../components/helpers/jwt'
export default class Configuracion extends Component {
    state={
        paginacion:{
            PaginacionId:0,
            PageSize: 0
        },
    }
    componentDidMount(){
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt); 
        axios.get("api/paginacions",{
            headers:{
                Authorization: auth
            }
        })
        .then(res=>{
            this.setState({paginacion:{
                ...this.state.paginacion,
                PaginacionId: res.data[0].PaginacionId,
                PageSize: res.data[0].PageSize

            }})
        })
    }
    editarPaginacion=(e)=>{
        e.preventDefault();
        const {paginacion} = this.state;
        const jwt = getJwt();
        const auth = 'Bearer '.concat(jwt);
        axios.put(`api/Paginacions/${paginacion.PaginacionId}`, paginacion,{
            headers:{
                Authorization: auth
            }
        })
    }
    onChangePageSize=(value)=>{
        this.setState({
            paginacion:{
                ...this.state.paginacion,
                PageSize: value
            }
        })
    }
    render() {
        const {paginacion} = this.state;
        return (
            <Container>
                <Form style={{width: '300px'}} onSubmit={this.editarPaginacion}>
                    <Form.Group controlId="pageSize">
                        <Form.Label>N&uacute;mero de articulos por p&aacute;gina</Form.Label>
                        <Form.Control required type="number" min="0" max="50" onChange={(e)=>this.onChangePageSize(e.target.value)}
                        value={paginacion.PageSize}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Container>
        )
    }
}
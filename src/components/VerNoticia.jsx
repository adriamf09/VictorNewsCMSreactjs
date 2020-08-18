import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import parse from 'html-react-parser'
import {Container} from 'react-bootstrap'
import './VerNoticia.css'

class VerNoticia extends Component {
    constructor(props){
        super(props);
        this.state={
            noticia:{},
            cargando: false
        }
    }
    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.hasOwnProperty('noticia')){
                this.setState({
                    noticia: this.props.location.state.noticia
                }, ()=>{
                    this.setState({cargando: true})
                })
            }
        }
    }

    render() {
        const {noticia} = this.state;
        if(this.state.cargando){
            return (
                <Container>
                    <div className="noticia">
                        <div className="noticiaInfo">
                            <h1>
                                {noticia.Titular}
                            </h1>
                            <div className="date">
                                {noticia.FechaCreacion}
                            </div>
                        </div>
                        <div className="imageContainer">
                            <img className="image"
                                src={noticia.Portada}
                                alt={noticia.Titular}
                            />
                        </div>
                        <div className="noticiaContent">
                            {parse(this.state.noticia.Contenido)}
                        </div>
                    </div>
                </Container>
            )
        }
        else{
            return (
                <div>
                    Cargando...
                </div>
            )
        }
    }
}

export default withRouter(VerNoticia)
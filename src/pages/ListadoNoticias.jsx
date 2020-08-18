import React, {Component} from 'react';
import {Container} from 'react-bootstrap'
import NoticiasCard from '../components/NoticiasCard';
import './ListadoNoticias.css'
import axios from 'axios'
import MenuCategorias from '../components/MenuCategorias'
import Paginacion from '../components/Paginacion';

export default class ListadoNoticias extends Component{
  state={
    noticias: [],
    categorias:[],
    cargando: true,
    currentCategoria:0,
    busqueda:'',
    activePage: 0
  }
  componentDidMount(){
    axios.get("api/noticias")
    .then(res=>{
      this.setState({noticias: res.data})
    })
    .finally(()=>{
      this.setState({cargando: false})
    })

    axios.get("api/categorias")
    .then(res=>{
      this.setState({categorias: res.data})
    })
  }
  onCategoriaSeleccionada=(categoriaId)=>{
    this.setState({cargando: true, currentCategoria: categoriaId})
    axios.get("api/noticias/getallnoticias")
    .then(res=>{
      this.setState({noticias: res.data.filter(item=> item.CategoriaId === categoriaId)})
    })
    .finally(()=>{
      this.setState({cargando: false})
    })
  }

  onBuscarNoticia= (e) =>{
    e.preventDefault()
    this.setState({cargando: true, currentCategoria:0})
    axios.get("api/noticias/getallnoticias")
    .then(res=>{
      this.setState({noticias: res.data.filter(item => item.Titular.toLowerCase().includes(this.state.busqueda))})
    })
    .finally(()=>{
      this.setState({cargando: false})
    });
  }
  render(){
    const {noticias, categorias, currentCategoria, activePage} = this.state;
    return (
      <Container className="container">
        <div className="menuCategorias">
          <MenuCategorias categorias={categorias} categoriaSeleccionada={this.onCategoriaSeleccionada}
          currentCategoria={currentCategoria}/>
        </div>

        <div>
          <form onSubmit={this.onBuscarNoticia} className="formBuscar">
            <input
              value={this.state.busqueda}
              className="form-control txtBuscar" 
              onChange={(event)=>{
                this.setState({busqueda: event.target.value})
              }}
            />
            <button type="submit" className="btn btn-primary btnBuscar" >
              <span>Buscar</span>
            </button>
          </form>
        </div>
        
        {noticias == null? "Cargando..." : noticias.map((item, index)=><div className="noticiaCard" key={index}>
          <NoticiasCard
            noticia={item}
          />
        </div>)}

        <div className="pagination">
          {<Paginacion activePage={activePage} onSelectedPage={this.goToPage}/>}
        </div>
      </Container>
    )
  }
  goToPage=(page)=>{
    this.setState({activePage: page})
    let numpag = page;
    if(numpag===1){
      numpag=0;
    }
    axios.get(`api/noticias/?page=${page}`)
    .then(res=>{
      if(res.data !==null){
        this.setState({
          noticias: res.data
        })
      }
    })
  }
}

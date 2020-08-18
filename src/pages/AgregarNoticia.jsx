import React,{Component} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Container, Row, Col, FormGroup, Button, Form} from 'react-bootstrap'
import './AgregarNoticia.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {getJwt} from '../components/helpers/jwt'

class NewsEditor extends Component{
    constructor(props){
        super(props);
        this.state={
            categorias: null,
            noticia:{
                Titular:'',
                Autor: '',
                Resumen:'',
                CategoriaId:0,
                Contenido:'',
                FechaCreacion: new Date(),
                FechaPublicacion: new Date(),
                Portada: null,
                EstadoId:2
            },
            tituloError:'',
            resumenError:'',
            portadaError:''
        }
    }

    componentDidMount(){
        axios.get("api/categorias")
        .then(res=>{
            this.setState({categorias: res.data})
        })
    }
    modules = {
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

    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'video', 'code-block'
    ] 

    onChangeNoticiaTitular = (value)=>{
        this.setState( {
            noticia:{
                ...this.state.noticia,
                Titular:value
            }
        })
    }

    onChangeNoticiaResumen=(value)=>{
        this.setState( {
            noticia:{
                ...this.state.noticia,
                Resumen:value
            }
        })
    }

    onChangeNoticiaContenido=(value)=>{
        this.setState( {
            noticia:{
                ...this.state.noticia,
                Contenido:value
            }
        })
    }

    onChangeNoticiaEstado=(value)=>{
        this.setState({
            noticia:{
                ...this.state.noticia,
                EstadoId: value
            }
        })
    }

    onChangeNoticiasPortada = (value)=>{
        this.setState({
            noticia:{
                ...this.state.noticia,
                Portada: value
            }
        })
    }
    obtenerImagenSubida = (e) =>{

        let file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load",  ()=> {
            this.onChangeNoticiasPortada(reader.result);
        }, false);
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    validarNoticia = () =>{
        if(!(this.state.noticia.Titular)){
            this.setState({tituloError: 'Debe ingresar el titulo de la noticia.'})
            return false;
        }
        else if(!(this.state.noticia.Resumen)){
            this.setState({resumenError: 'Debe ingresar un resumen de la noticia, de máximo 1000 caracteres.'})
            return false;
        }
        var portada = document.querySelector('input[type=file]').files[0];
        if(portada == null){
            this.setState({portadaError: 'Debe ingresar una imagen de portada para la noticia.'})
            return false;
        }
        return true;
    }

    crearNoticia = (e) =>{
        e.preventDefault();
        if(!this.validarNoticia()){
            return;
        }

        const categoriaId = parseInt(e.target.elements["categoriaId"].value);
        const noticia = this.state.noticia;
        noticia.CategoriaId = categoriaId;

        const jwt = getJwt();
        axios.post("api/noticias", noticia, {
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
        })
        .then(()=>{
            this.setState({
                noticia:{
                    Titular:'',
                    Autor: '',
                    Resumen:'',
                    CategoriaId:0,
                    Contenido:'',
                    FechaCreacion: new Date(),
                    FechaPublicacion: new Date(),
                    Portada: null,
                    EstadoId:2
                }
            }); document.getElementById("portada").value='';
        })
        .catch(err=>{
            if(err.response.status === 400)
                alert("Los datos ingresados no son validos.")
            else
                alert("Error inesperado.")
        })
        .finally(()=>{
            return (<Redirect to="/inicio"/>);
        })
    }
    
    render(){
        const {categorias, tituloError, resumenError, portadaError} = this.state;
        return(
            <Container>
                <Row>
                    <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                        <h2 className="sectionTitle">Nueva noticia</h2>
                        <form id="formNoticias" method="post" encType="multipart/form-data" onSubmit={this.crearNoticia}>
                            <FormGroup>
                                <Form.Label className="label">Titúlo</Form.Label>
                                <Form.Control type="text"
                                    onChange={(e)=> this.onChangeNoticiaTitular(e.target.value)}
                                    onInput={()=>{this.setState({tituloError:''})}}
                                    value={this.state.noticia.Titular}
                                    className={tituloError? 'form-control is-invalid' : 'form-control'}
                                />
                                {tituloError?<div className="text-danger">{tituloError}</div> :null}
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="label">Imagen de portada</Form.Label>
                                <Form.File id="portada" name="portada" accept="image/*" onChange={(e)=> this.obtenerImagenSubida(e)}
                                onInput={()=>{this.setState({portadaError:''})}}/>
                            </FormGroup>
                            <FormGroup>
                                {portadaError?<div className="text-danger">{portadaError}</div> :null}
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="label">Resumen</Form.Label>
                                <Form.Control as="textarea" rows="3" 
                                    onChange={(e)=> this.onChangeNoticiaResumen(e.target.value)}
                                    onInput={()=>{this.setState({resumenError:''})}}
                                    value={this.state.noticia.Resumen}
                                    className={resumenError? 'form-control is-invalid' : 'form-control'}
                                />
                                {resumenError?<div className="text-danger">{resumenError}</div> :null}
                            </FormGroup>
                            <Form.Group controlId="categoriaId">
                                <Form.Label className="label">Categor&iacute;a</Form.Label>
                                <Form.Control as="select">
                                    {categorias ==null? null
                                    :categorias.map((item, index)=><option key={index} value={item.CategoriaId}>{item.NombreCategoria}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <FormGroup>
                                <Form.Label className="label">Contenido</Form.Label>
                                <ReactQuill className="textEditor" id="textEditor"
                                    ref={(el)=> this.quill = el}
                                    value={this.state.noticia.Contenido}
                                    onChange={(e)=> this.onChangeNoticiaContenido(e)}
                                    theme='snow'
                                    modules={this.modules}
                                    formats={this.formats}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" id="btnSubmitForm" form="formNoticias">Enviar para revisión</Button>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewsEditor
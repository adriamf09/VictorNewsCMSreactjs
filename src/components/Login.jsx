import React, { Component } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import qs from 'qs'
import {Redirect, Link} from 'react-router-dom'

export default class Login extends Component {
    constructor(props){
        super(props);
        let loggedIn = false;
        this.state={
            user:{
                username:'',
                password:'',
                grant_type:'password'
            },
            loggedIn,
            usernameError:'',
            passwordError:''
        }
    }
    
    
    onChangeUserName=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                username: value
            }
        })
    }
    onChangeUserPassword=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                password: value
            }
        })
    }

    validateUser=()=>{
        if(!(this.state.user.username)){
            this.setState({usernameError: 'Debe ingresar su correo electrónico.'})
            return false;
        }
        else if(!(this.state.user.password)){
            this.setState({passwordError: 'Debe ingresar su contraseña.'})
            return false;
        }

        return true;
    }

    login=(e)=>{
        e.preventDefault();
        if(!this.validateUser()){
            return;
        }

        let data = qs.stringify({
            grant_type: "password",
            username: this.state.user.username,
            password: this.state.user.password
        },
            {encode: false}
        );
        let config={
            method: "post",
            url:"token",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };
    
        axios(config)
        .then(res=>{
            localStorage.setItem('jwt', res.data.access_token);
            this.setState({loggedIn: true})
        })
        .catch(err=>{
            if(err.response.status === 400)
                alert("Los datos ingresados no son validos.")
            else
                alert(err.response.message)
        })
        .finally(()=>{
            this.setState({
                user:{
                    username:'',
                    password:'',
                    grant_type:'password'
                }
            })
        })
    }
    render() {
        if(this.state.loggedIn){
            return <Redirect to="/inicio"></Redirect>
        }
        const {usernameError, passwordError} = this.state;
        return (
            <Container>
                <Form style={{width: '500px'}} onSubmit={this.login}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese su correo electrónico" 
                        onChange={(e)=>this.onChangeUserName(e.target.value)}
                        onInput={()=>{this.setState({usernameError:''})}}
                        value={this.state.user.username}
                        className={usernameError? 'form-control is-invalid' : 'form-control'}/>
                        {usernameError?<div className="text-danger">{usernameError}</div> :null}
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Ingrese su contraseña" 
                        onChange={(e)=>this.onChangeUserPassword(e.target.value)}
                        onInput={()=>{this.setState({passwordError:''})}}
                        value={this.state.user.password}
                        className={passwordError? 'form-control is-invalid' : 'form-control'}/>
                        {passwordError?<div className="text-danger">{passwordError}</div> :null}
                    </Form.Group>
                    <Form.Group>
                        <p>¿No tiene una cuenta? Haga click <Link to="/registrarse">Aqu&iacute;</Link> para registrarse.</p>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Iniciar sesi&oacute;n
                    </Button>
                    </Form>
            </Container>
        )
    }
}

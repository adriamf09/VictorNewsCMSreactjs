import React from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './NoticiasCard.css'
export default function NoticiasCard({noticia}) {
    return (
        <Card style={{ width: '18rem' }}>
            <Link to={{
                pathname:'/noticia/' + noticia.NoticiaId,
                state: {noticia: noticia}
            }}>
                <Card.Img variant="top" src={noticia.Portada}/>
            </Link>
            <Card.Body>
                <Card.Title>{noticia.Titular}</Card.Title>
                <Card.Text>
                    {noticia.Resumen}
                </Card.Text>
                <Link to={{
                    pathname:'/noticia/' + noticia.NoticiaId,
                    state: {noticia: noticia}
                }}>
                    <Button variant="primary">Leer m&aacute;s</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

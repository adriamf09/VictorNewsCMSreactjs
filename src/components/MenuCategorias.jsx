import React from 'react'
import {Nav} from 'react-bootstrap'

export default function MenuCategorias({categorias, categoriaSeleccionada, currentCategoria}) {
    return (
        <Nav variant="tabs" activeKey={currentCategoria}>
            {categorias !== null? categorias.map((item, index)=>
                <Nav.Item key={index}>
                    <Nav.Link eventKey={item.CategoriaId} onClick={()=>{
                        categoriaSeleccionada(item.CategoriaId)
                    }}>
                    {item.NombreCategoria}
                    </Nav.Link>
                </Nav.Item>
            ): null}
        </Nav>
    )
}

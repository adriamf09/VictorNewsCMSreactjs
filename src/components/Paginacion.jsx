import React from 'react'
import {Pagination} from 'react-bootstrap'

export default function Paginacion({activePage, onSelectedPage}) {
    let active = activePage;
    let items = [];
    for (let number = 0; number <= 20; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}  onClick={()=>onSelectedPage(number)}>
        {number}
        </Pagination.Item>
    );
    }

    return (
        <Pagination>{items}</Pagination>
    )
}

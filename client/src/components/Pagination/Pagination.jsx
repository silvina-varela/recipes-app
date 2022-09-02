import React from 'react';
import './pagination.css';

const Pagination = ({ pageLength, recipes, pagination, currentPage }) => {
    const pageNum = [];

    // recorro para agregar al arreglo los números de página. Redondeo para arriba
    for (let i = 1; i <= Math.ceil(recipes/pageLength); i++){
        pageNum.push(i);
    }

    return (
        <nav className='pagination'>
            <ul className='pagination-ul'>
                {currentPage > 1 && <li onClick={() => pagination(currentPage-1)} className='pagination-num noselect'> {'<'} </li>}
                
                {pageNum?.map(num => (
                        <li  onClick={() => pagination(num)} className={num === currentPage ? 'page-active noselect' : 'pagination-num noselect'} key={num}>
                            {num}
                        </li>
                ))}

                {currentPage < pageNum?.length && <li onClick={() => pagination(currentPage+1)}  className='pagination-num noselect'> {'>'} </li>}
            </ul>
        </nav>
    )
}

export default Pagination;
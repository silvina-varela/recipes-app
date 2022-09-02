import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRecipes, getDiets, reset } from '../../actions';

import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import Recipes from '../Recipes/Recipes';
import Loader from '../Loader/Loader';
import Sorter from '../Sorter/Sorter';

import './home.css';

const Home = () => {
    const dispatch = useDispatch();

    // traigo el array con todas las recetas
    const { recipes } = useSelector(state => state);

    /* Configuración de pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const pageLength = 9; // 9 recetas por página
    const indexOfLast = currentPage * pageLength; // 1 * 9
    const indexOfFirst = indexOfLast - pageLength; // 9 - 9

    // Seteo las recetas que se muestran en cada página (9 por página)
    const currentRecipes = recipes.slice(indexOfFirst, indexOfLast); // entre 0 y 9 (no inclusive)
    
    // Función para setear la página que se muestra
    const pagination = pageNum => setCurrentPage(pageNum);

    useEffect(() => { 
        dispatch(getRecipes()); // obtengo todas las recetas
        dispatch(getDiets()); // obtengo todas las dietas
        return () => dispatch(reset()); // así no quedan cargadas las anteriores cuando cambio de página
    }, [dispatch]);

    const handleGoHome = e => {
        e.preventDefault();
        dispatch(getRecipes());
        pagination(1);   
    }

    // Si en el reducer devuelve un string, paso un mensaje de que no se encontraron recetas
    if(typeof recipes === 'string') {return(
        <div>
            <div><NavBar handleGoHome={handleGoHome}/></div>
            <div className='sorter'><Sorter pagination={pagination}/></div>
            <div className='home-body not-found'>We couldn't find any recipes :(</div>
        </div> 
    )} else return (
        <div>
          <div><NavBar handleGoHome={handleGoHome}/></div>  
          
        {/* Si no es un string y es un array vacío (o sea que todavía no se llegaron a cargar), entra acá para mostrar el loader */}
        {!recipes.length ?
            
                (<div className='home-body'><Loader/></div>)
             
         
        : 
        (<div>
            <div className='sorter'><Sorter pagination={pagination}/></div>
            <div><Recipes currentRecipes={currentRecipes}/></div>
            <div><Pagination currentPage={currentPage} pageLength={pageLength} recipes={recipes.length} pagination={pagination}/></div>
        </div>)
        }
    </div>
    )

}

export default Home;
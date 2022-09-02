import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortRecipes, filterDiet } from '../../actions';

import './sorter.css';


const Sorter = ({pagination}) => {
    const dispatch = useDispatch();
    const { allDiets } = useSelector(state => state);
    const [sorter, setSorter] = useState('')
  
    const handleFilter = (e) =>{
        dispatch(filterDiet(e.target.value));
        pagination(1) 
    }

    const handleSort = (e) => {
        dispatch(sortRecipes(e.target.value));
        setSorter(e.target.value)
        pagination(1) 
    }

/* Invierte la selección del sort*/
    const handleArrowClick = e => {
        e.preventDefault();
        if(sorter === 'A-Z') {
            dispatch(sortRecipes('Z-A'));
            setSorter('Z-A');
        }
        if(sorter === 'Z-A') {
            dispatch(sortRecipes('A-Z'));
            setSorter('A-Z')
        }
        if(sorter === '+H') {
            dispatch(sortRecipes('-H'));
            setSorter('-H')
        }
        if(sorter === '-H') {
            dispatch(sortRecipes('+H'))
            setSorter('+H')
        }
       pagination(1)
    }

return(
    <div className='filter-sorter'>

{/* sort */}
         <div className='drop-down'>
            {/* Sort alfabéticamente y por health score. 
            Al hacer click orderna por lo más lógico: A-Z y más sano-menos sano. 
            Al hacer click en las flechas, el orden se invierte*/}
            <div>
               <button className='arrows-sort-btn' onClick={handleArrowClick}><span className="arrow-sort-symbol material-symbols-outlined">swap_vert</span></button>
                <select onChange={handleSort}>
                    <option disabled="disabled" value="sort" selected="true" className='filter-title noselect'>Sort recipes</option>
                    <option value="A-Z">Sort alphabetically</option>
                    <option value="+H">Sort by Health Score</option>
                </select>           
            </div>
        </div>

        <div className='drop-down'>
            
{/* Filter */}
            <div className='filter'>
            <select onChange={handleFilter}>
            <option disabled="disabled" selected="true" className='filter-title noselect'>Filter diets</option>
                    {allDiets?.map(d => {
                        return(
                            <option value={d.name} key={d.id}>{d.name}</option>
                        )
                    })}
            <option value='nofilter'>no dietary restrictions</option>
            </select>
            </div>
        </div>
    </div>
)
}

export default Sorter;
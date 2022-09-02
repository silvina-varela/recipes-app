import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import './recipes.css';

const Recipes = ({ currentRecipes }) => {
    return (
        <div className='cards'>
            {
                currentRecipes?.map(r => {
                    return(
                    <div>
                        <Link to={`/home/${r.id}`} className='open' key={r.id}>
                            <RecipeCard title={r.title} diets={r.diets} image={r.image} readyInMinutes={r.readyInMinutes} healthScore={r.healthScore} dishTypes={r.dishTypes}/>
                        </Link>
                    </div>
                    )
                })
             }
        </div>
    )
}

export default Recipes;
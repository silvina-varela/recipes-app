import React from 'react';

import './recipeCard.css';

const RecipeCard = ({ title, image, diets, readyInMinutes, healthScore, dishTypes }) => {

    // Valida la existencia de los arrays y retorna un string
    const dietString = diets?.join(' + ');
    const dishes = dishTypes?.join(', ');
    
    // Si por alguna razón la imagen llega null o con un length inválido, le asigno imágenes según el dishtype
    if(typeof image === 'object' || image?.length < 7) {
        // ['main course', 'breakfast', 'brunch','lunch', 'dinner', 'snack']
        if(dishTypes?.includes('dessert')) image = "https://i.postimg.cc/Pq2Y7JKK/place-Holder-dessert.jpg";
        else if(dishTypes?.includes('side dish')) image = "https://i.postimg.cc/MTHVJwFw/place-Holder-side-Dish.jpg";
        else if (dishTypes?.includes('snack')) image = "https://i.postimg.cc/nzW7HWyD/place-Holder-snack.jpg";
        else image = 'https://i.postimg.cc/3W5vGvJr/place-Holder-Image.jpg';
    }
                      
    return(
        <div className='card-container'>
                <div className='card-info'>
                       <img className='image' src={image} alt={image}/>
                       
                   <h2 className='recipe-title'>{title}</h2>

                   {/* Diets y dishes con condicionales por si no tienen valores */}
                    { dietString ? <h5 className='diets'>{dietString}</h5> : <h6 className='diets'>this recipe might be incompatible with some dietary restrictions</h6>}
                    
                    { dishes ? <h6 className='dishes'>Best for: {dishes}</h6> : <h6 className='dishes'>Great for all courses</h6> }
                    
                </div>
                <div className='numeric-info'>
                {/* chequea que los valores sean mayores a 0 porque pueden ser null o 0. Si el valor no existe o es cero, no se muestra nada*/}
                    {(readyInMinutes > 0) ? <h6 className='health-minutes'><span className="health-minutes material-symbols-outlined">timer</span> {readyInMinutes} mins.</h6> : ''}
                    {(healthScore > 0) ? <h6 className='health-minutes'><span className="health-minutes heart material-symbols-outlined">favorite</span> {healthScore} points</h6> : ''}
        </div>
        </div>
    )
}

export default RecipeCard;
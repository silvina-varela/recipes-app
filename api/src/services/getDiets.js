const { Diet } = require('../db');

/* Agrega diets a la DB */
const getDiets = async () => { 
    // Un array con las recetas más comunes de la api
    const dietsArray = [ 
                'gluten free',
                'ketogenic', 
                'vegetarian',  
                'vegan', 
                'pescatarian',
                'paleolithic', 
                'primal', 
                'fodmap friendly',
                'whole 30',
                'dairy free'
            ]
    dietsArray.forEach(d => {
        Diet.findOrCreate({ 
            where: {name: d}
        })
    })

    const diets = await Diet.findAll();
    return diets;
}

module.exports = {getDiets}


/*
Busqué en la api 'lacto ovo vegetarian', 'ovo vegetarian' y 'lacto vegetarian'
y no devuelven lo esperado en ningún caso
'lacto ovo vegetarian' sería lo mismo que decir 'vegetarian'. 
Para que me encuentre bien las recetas, extraigo de la api la propiedad "vegetarian" (booleano)
En los otros dos casos, opté por no incluirlos entre las dietas

*/




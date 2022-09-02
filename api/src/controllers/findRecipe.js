const { getRecipes } = require('../services/getData');

// Encuentra título por query
const findRecipe = async (q) => {
    let allRecipes = await getRecipes();
    let foundRecipes = await allRecipes.filter(r => r.title.toLowerCase().includes(q.toLowerCase())); 

    if(foundRecipes.length) return foundRecipes;
    
    else throw new Error('Recipe not found');
    
}

module.exports = {findRecipe}


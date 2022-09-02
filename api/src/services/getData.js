require('dotenv').config();
const {API_KEY} = process.env;
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const db = require('../db');

/* REQUEST A LA API */
const getFromApi = async () => {
    let apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`); // 
   
    // Elijo los resultados que quiero extraer de la API
    let apiResults = await apiData.data.results.map(r => {
        return {
            id: r.id,
            title: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            readyInMinutes: r.readyInMinutes,
            dishTypes: r.dishTypes,
            image: r.image,
            diets: r.diets,
            instructions: r.analyzedInstructions[0]?.steps.map(i => {
                return {
                    number: i.number,
                    step: i.step
                }
            }),
            vegetarian: r.vegetarian     // boolean       
        }
    })
    return apiResults;
}

// Request a la DB
const getFromDb = async () => {
    let dbResults = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    return dbResults.map(r => {
        return{
            id: r.id,
            title: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            readyInMinutes: r.readyInMinutes,
            dishTypes: r.dishTypes,
            image: r.image,
            diets: r.diets.map(d => d.name),
            instructions: r.instructions
        }
    })
}

// API + DB
const getRecipes = async () => {
    try{
        const apiResults = await getFromApi();
        const dbResults = await getFromDb();
        const allRecipes = [...apiResults, ...dbResults] 
        return allRecipes;
    } catch(error){
        console.log('Unable to access api - Showing only DB results');
        const dbResults = await getFromDb(); 
        return dbResults;
    }
}

// Detalle por ID
const getRecipeById = async (id) => {
    let recipes = await getRecipes();
    let recipeById = await recipes.filter(r => r.id == id); // me devuelve un array con un objeto
    
    
    if (recipeById.length !== 0){ // valida que exista 
        let details = recipeById[0]; // [{}]
        return details; //{}
    }
    else throw new Error('The recipe doesn\'t exist')
}

module.exports = {getFromApi, getFromDb, getRecipes, getRecipeById}
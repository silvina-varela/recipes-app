const { Router } = require('express');
const { findRecipe } = require('../controllers/findRecipe');
const { getRecipes, getRecipeById } = require('../services/getData');
const { getDiets } = require('../services/getDiets')
const { create } = require('../controllers/create');

const router = Router();

// Configurar los routers
router.get('/recipes', async(req, res) => {
    try{
        const { title } = req.query;
        if(title){
            let foundRecipes = await findRecipe(title);
            res.send(foundRecipes);
        } else {
            let allRecipes = await getRecipes();
            res.send(allRecipes);
        }
    } catch(error){
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

// Get recipe by ID
router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;

    if(id){
        try{
            let recipe = await getRecipeById(id);
            console.log(recipe)
            return res.json(recipe);
        } catch (error){
            console.log(error)
            res.status(404).send(error);
    
        }
    }
  
}

)

router.get('/diets', async (req, res) => {
    
    const diets = await getDiets()
   
    res.send(diets);
})

router.post('/create', async (req, res) => {

    const { title, summary, healthScore, readyInMinutes, dishTypes, image, diets, instructions } = req.body;

    try{
        let created = await create(title, summary, healthScore, readyInMinutes, dishTypes, image, diets, instructions);
        return res.send({msg: 'Recipe created', recipe: created});
    } catch(error){
        res.status(400).send(error.message);
    }
})

module.exports = router;

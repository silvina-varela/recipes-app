const { Recipe, Diet } = require('../db');
const { cleaner, removeAllWhiteSpaces, checkLink } = require('./cleanData')



const create = async (title, summary, healthScore, readyInMinutes, dishTypes, image, diets, instructions) => {

    if(title && summary){
        if(title.length >= 60 && title.length > 1) throw new Error ('Title should have less than 60 characters')
        if(typeof title !== 'string') throw new Error ('Title must be a string')
        if(summary.length >= 1500 && summary.length > 1) throw new Error ('Summary should have less than 1500 characters')
        if(healthScore && typeof healthScore !== 'number') throw new Error ('HealthScore must be a number')
        if(healthScore < 0 || healthScore > 100) throw new Error ('HealthScore\'s range is 0-100')
        if(readyInMinutes && typeof readyInMinutes !== 'number') throw new Error ('ReadyInMinutes must be a number')
        if(readyInMinutes < 0 || readyInMinutes > 240) throw new Error ('ReadyInMinutes\'s range is 0-240')
        if(image && typeof image !== 'string') throw new Error ('Image must be a string')
        if(image && image.length > 2048) throw new Error ('Image url can\'t have more than 2048 characters')
        if(image && !checkLink(image)) throw new Error ('Image url is invalid')
        if(dishTypes && !Array.isArray(dishTypes)) throw new Error('DishTypes must be an array') 
        if(instructions && !Array.isArray(instructions)) throw new Error ('Instructions must be an array')
        if(instructions && !instructions.every(i => typeof i === 'object' && i !== null)) throw new Error ('Instructions can contain only objects')
        if(diets && !Array.isArray(diets)) throw new Error ('Diets must be an array')
        

        // LIMPIEZA
            title = cleaner(title)
            summary = cleaner(summary)
            if(image) image = removeAllWhiteSpaces(image) 
           
     
        let newRecipe = await Recipe.create({
            title, summary, healthScore, readyInMinutes, dishTypes, image, diets, instructions
        })
    
        
        if(diets && diets.length){
          
            let connectDiet = await Diet.findAll({
                where: {name: diets}
             })
             newRecipe.addDiet(connectDiet);
        }
            return newRecipe;
           
        
    } else throw new Error ('Title and summary are required')

    
}
module.exports = { create }




 

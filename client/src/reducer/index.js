import { GET_RECIPES, FILTER_DIET, SORT_RECIPES, GET_DIETS, SEARCH, GET_DETAIL, CREATE_RECIPE, RESET_DETAIL, RESET } from "../actions/constants";

const initialState = {
    recipes: [],
    allRecipes: [], // para tener siempre una copia de todas
    allDiets: [],
    detail: {},
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }

        case GET_DIETS:
            return{
                ...state,
                allDiets: action.payload
            }

        case SEARCH:
            return{
                ...state,
                recipes: action.payload
              }
        
        case SORT_RECIPES:  
            let sorter;
            switch(action.payload){
                    case 'A-Z':
                        sorter = (a, b) => {
                            if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                            if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                            else return 0;
                        }
                            break;
                    case 'Z-A':
                        sorter = (a, b) =>{
                            if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                            if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                            else return 0;
                        }
                            break;
                    case '+H':
                        sorter = (a, b)=>{
                            if(a.healthScore < b.healthScore) return 1;
                            if(a.healthScore > b.healthScore) return -1;
                            else return 0;
                        }
                            break;
                    case '-H':
                        sorter = (a, b)=>{
                            if(a.healthScore < b.healthScore) return -1;
                            if(a.healthScore > b.healthScore) return 1;
                            else return 0;
                        }
                            break;
                                                                      
                    default:
                            break;
                    }

                return{
                    ...state,
                    recipes: state.recipes.sort(sorter)
                }
         
        case FILTER_DIET:
            const filteredByDiet = action.payload;
                    
            // Muestra todas
                if(filteredByDiet === 'nofilter'){
                    return{
                        ...state,
                        recipes: state.allRecipes,
                    } 
                 
                    // Quiero que tome la propiedad 'vegetarian' que traigo de la API (da un booleano)
                    // y que además filtre lo que viene de la db con esta dieta
                } else if (filteredByDiet === 'vegetarian'){
                    let filtered = state.allRecipes?.filter(recipe => {
                        return recipe.vegetarian || recipe.diets?.includes('vegetarian')
                    })  
                    if(filtered.length){
                        return{
                            ...state,
                            recipes: filtered,
                        }
                    } else{
                        return{
                            ...state,
                            recipes: ''
                        }
                    }
                } 
                
                // Filtra por tipo de dieta en todos los demás casos
                else {
                    let filtered = state.allRecipes?.filter(recipe =>{
                        return recipe.diets?.includes(filteredByDiet) 
                    })
                
                // Para chequear que haya encontrado algo
                    if(filtered.length){
                        return{
                            ...state,
                            recipes: filtered,
                        }
                    } else{ // si no encuentra, retorna un string vacío que lo agarra la condición antes del return en el componente
                        return{
                            ...state,
                            recipes: ''
                        }
                    }
                    
                }
     
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        
        case RESET_DETAIL:
            return{
                ...state,
                detail: {}
            }

        case CREATE_RECIPE:
            return{
                ...state,
            }
        case RESET:
            return{
                ...state,
                recipes: []
            }
        default:
            return state
    }
}

export default rootReducer;
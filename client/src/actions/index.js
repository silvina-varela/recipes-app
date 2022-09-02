import { GET_RECIPES, SEARCH, FILTER_DIET, GET_DIETS, SORT_RECIPES, GET_DETAIL, RESET_DETAIL, CREATE_RECIPE, RESET } from './constants.js'

import axios from 'axios';

export const getRecipes = () => {
    return async (dispatch) => {
        return await axios.get('https://food-henry-sv.herokuapp.com/recipes') 
        .then(recipes => dispatch({type: GET_RECIPES, payload: recipes.data}))
        .catch(error => dispatch({tupe: GET_RECIPES, payload: error}))
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        return await axios.get('https://food-henry-sv.herokuapp.com/diets')
        .then(diets => dispatch({type: GET_DIETS, payload: diets.data}))
    }
} 

export const search = (search) => {
    return async (dispatch) => {
        return await axios.get(`https://food-henry-sv.herokuapp.com/recipes?title=${search}`)
            .then(recipes => dispatch({type: SEARCH, payload: recipes.data}))
            .catch(error => dispatch({type: SEARCH, payload: error.message})) // error.message es 'Request failed...' (string)
    }
}

export const sortRecipes = (sort) => {
    return async dispatch => {
        return dispatch({type: SORT_RECIPES, payload: sort})
    }
}

export const filterDiet = (diet) => {
    return async dispatch => {
        return dispatch({type: FILTER_DIET, payload: diet})
    }
}

export const getDetail = (id) => {
    return async dispatch => {
        return await axios.get(`https://food-henry-sv.herokuapp.com/recipes/${id}`)
            .then(detail => dispatch({type: GET_DETAIL, payload: detail.data}))
            .catch(error => dispatch({type: GET_DETAIL, payload: error.message}))
    } 
}

export const resetDetail = (payload) => {
    return async dispatch => {
        return dispatch({type: RESET_DETAIL, payload})
    } 
}

export const reset = (payload) => {
    return async dispatch => {
        return dispatch({type: RESET, payload})
    } 
}


export const create = (payload) => {
    return async dispatch => {
        return await axios.post('https://food-henry-sv.herokuapp.com/create', payload)
            .then(recipe => dispatch({type: CREATE_RECIPE, payload: recipe.data}))
    }
}




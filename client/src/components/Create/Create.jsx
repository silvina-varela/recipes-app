import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { validate } from './validations'

import { getDiets, create } from '../../actions';
import './create.css';
import NavBar from '../NavBar/NavBar';

const Create = () => {
    const dispatch = useDispatch();
    const history = useHistory(); // sirve para volver a la ruta que le indico

    const { allDiets } = useSelector(state => state); // traigo el array de dietas

    // Defino estados iniciales para los campos a llenar. Es lo que se manda a la DB
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: 0,
        readyInMinutes: 0,
        dishTypes: [],
        image: '',
        diets: [],
        instructions: [], // Es un array con objetos. Cada objeto tiene una propiedad number y una propiedad step
    })
    
    useEffect(()=>{
        dispatch(getDiets()); // traigo las dietas para pasarlas al selector
    }, [dispatch])

    const [error, setError] = useState({}) // para ir pasando mensajes de error

    /* SUBMIT */
    const handleRecipeSubmit = e => {
        e.preventDefault();
        console.log(input)
        dispatch(create(input))
        history.push('/home')
    }    

/* INPUTCHANGE y MANEJO DE ERRORES */
    const handleInputChange = e => {
        e.preventDefault()
        setInput({
            ...input, 
            [e.target.name]: e.target.value
    })
        
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))    
}

/* Manejo de inputs numéricos */
    const handleNumberInput = e => {
        e.preventDefault();
        setInput({
            ...input, 
            [e.target.name]: parseInt(e.target.value) // el input permite escribir un punto después de un número pero nunca va a ser pasado por este parseInt
        })
    
        setError(validate({
        ...input,
        [e.target.name]: e.target.value
        })) 
}

/* Manejo de checkbox de dish types */
    const dishesArray = ['main course', 'side dish', 'breakfast', 'brunch','lunch', 'dinner', 'dessert', 'snack']
    const [checkCount, setCheckCount] = useState(0)
    const [isChecked, setIsChecked] = useState({
        'main course': false, 'side dish': false, 'breakfast': false, 'brunch': false,'lunch': false, 'dinner': false, 'dessert': false, 'snack': false
    })

    const handleCheckBox = e =>{    
        if(e.target.checked){
            setInput({
                ...input,
                dishTypes: [...input.dishTypes, e.target.value]
            })
            setCheckCount(checkCount+1)
        } else{
            setCheckCount(checkCount-1)
        }  
    }

/* Manejo de select de dietas */ 
    const handleDietSelect = e => {
    let exists = input.diets.includes(e.target.value); // true si ya la tiene

    if(!exists){ // solo quiero agregar si no la tiene
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    e.target.value = "select" // limpia el select
    }

    const handleDelete = e => {
    setInput({
        ...input,
        diets: input.diets.filter(diet => diet !== e) // filtro las que son diferentes a lo que quiero eliminar
    })
    }

/* Manejo de las instructions */
    const [inputInst, setInputInst] = useState([]) // estado inicial de cada instrucción

    const handleInstChange = (e, index) => {
        const instruction = [...inputInst]
    
        instruction[index]["step"] = e.target.value
        instruction[index]["number"] = index + 1
        setInputInst(instruction)
        setInput({
            ...input,
            instructions: instruction
        })
        setError(validate({
            ...input,
            instructions: inputInst
        }))
}

    // Agregar un input para instrucción
    const handleAddInst = () => {
        const instruction = [...inputInst]
        instruction.push({
                number: '',
                step: ''
            })
        setInputInst(instruction)
    }

    // Elimina el último input de instrucción
    const handleRemoveInst = () => {
        const instruction = [...inputInst]
        instruction.pop()
        setInputInst(instruction)
    }

    
return(
        <div>
        <NavBar />
                     
             <div className='create-body'>
             <div className='arrow-btn'><Link to='/home'><button className='return-btn'><span className="material-symbols-outlined">keyboard_backspace</span></button></Link></div>
             <div><h2>Submit a new recipe</h2></div>
            <div className='form-body'>

{/* Formulario */}
    <form id='create' onSubmit={handleRecipeSubmit}>
        
{/* TITLE */}
        <div className='data-container'>
            <div><label className='noselect'>Title <span className='asterisk'>*</span> </label></div>
            <div><input
                        type='text'
                        value={input.title}
                        name='title'
                        placeholder="Write a catchy title"
                        onChange={handleInputChange}
                        maxLength="60"
                        className={(input.title.length > 0 && error.title && 'title-input inputs-w') || 'inputs title-input'} 
            /></div>
            {input.title.length > 0 && error.title && (<p className='warning-text'>{error.title}</p>)}
        </div>

{/* SUMMARY */}
        <div className='data-container'>
        <div><label className='noselect'>Summary <span className='asterisk'>*</span></label></div>
        <div> <textarea
                        type='text'
                        value={input.summary}
                        name='summary'
                        placeholder='Write a brief paragraph describing your recipe'
                        maxlength="1500"
                        onChange={handleInputChange}
                        className={input.summary.length > 0 && error.summary ? 'summary-input inputs-w' : 'summary-input inputs'}
            /></div>

            <div>{input.summary.length > 0 && error.summary && (<p className='warning-text'>{error.summary}</p>)}</div>
        </div>

{/* DIETS */}
        <div className='data-container'>
            
                <div><label><span className='noselect'>Diets</span>  </label>
                <select className='diet-drop' onChange={handleDietSelect}>
                    <option selected="true" disabled="disabled" value="select">(select up to five)</option>
                        {allDiets?.map((d, index) => {
                            return <option key={index} value={d.name} disabled={input.diets.length >= 5 ? true : false}>{d.name}</option>                          
                        })}  
                </select>
        
        {/* Botón para eliminar dietas */}
            {input.diets.map((d, index) => 
                <div>
                    <ul><li key={index}>{d} <button className='delete-diet' type="button" onClick={() => handleDelete(d)}>  X</button></li></ul>    
                </div>)}
         </div>         
        </div>
        
{/* DISH TYPES */}
        <div className='data-container'>
            <div><label className='noselect'>Courses (select up to three)</label></div>
                {dishesArray.map((dish, i) => {
                    return <div className='dish-label noselect'>
                        <label>
                            <input 
                                className='dish-select'
                                type='checkbox'
                                id='dishCheck'
                                key={i}
                                value={dish}
                                name={dish}
                                onChange={handleCheckBox}
                                disabled={!isChecked[dish] && checkCount > 2 }
                                onClick={()=> setIsChecked({...isChecked, [dish]: !isChecked[dish]})}
                                />
                            <div className='dish-label'>  {dish}</div>
                        </label>
                    </div>
                })}
        </div>
        
{/* HEALTH SCORE */} {/* READY IN MINUTES */}
        <div className='data-container'>
            <div className='numbers'>
            <div>
        <div><label className='noselect'>Health Score</label></div>
            <div><input
                        type='number'
                        value={input.healthScore}
                        name='healthScore'
                        placeholder='0'
                        min="0" max="100"
                        onChange={handleNumberInput}
                        className={error.healthScore ? 'number-range-w' : 'number-range'}
            /></div>
            </div>
            <div>
            <label className='noselect'>Cooking time (mins.)</label>
                    <div>
                    <input
                        type='number'
                        value={input.readyInMinutes}
                        name='readyInMinutes'
                        min="0" max="240"
                        onChange={handleNumberInput}
                        className={error.readyInMinutes ? 'number-range-w' : 'number-range'}
                    />
                    </div>
           </div>
           </div>   
<div>{error.healthScore && (<p className='warning-text'>{error.healthScore}</p>)}</div>
<div>{error.readyInMinutes && (<p className='warning-text'>{error.readyInMinutes}</p>)}</div>
      </div>
                
{/* INSTRUCTIONS */}                 
        <div className='data-container'>
            <div> 
                <label className='noselect'>Instructions (add up to 6 instructions)</label> 
                {/* botones + y - */}
                <button className='inst-btn' type="button" disabled={(error.instructions || inputInst.length > 5) && 'disabled'} onClick={handleAddInst}> + </button>
                <button className='inst-btn' type="button" disabled={(error.instructions || inputInst.length === 0) && 'disabled'} onClick={handleRemoveInst}> - </button>
                <div>
                </div>
                
                <div>
                    {
                        inputInst.map((instruction, i) => {
                            return (
                                <div>
                                    <ul>
                                        <li key={i}>{i+1}. <textarea
                                            type='text'
                                            maxlength="150"
                                            name="step"
                                            value={instruction.step}
                                            placeholder='Write each instruction'
                                            onChange={e => handleInstChange(e, i)}
                                            className={(input.instructions.length > 0 && error.instructions && 'instructions-input inputs-w') || 'inputs instructions-input'}
                                        />
                                        </li>
                                    </ul>
                                </div>
                            ) 
                        }) 
                    }
                </div>
                <div>{error.instructions?.length > 0 && (<p className='warning-text'>{error.instructions}</p>)}</div> 
            </div>
        </div>
                
{/* IMAGE */}            
        <div className='data-container'>
            <div><label className='noselect'>Image</label></div>
               <div> <input
                    type='url'
                    value={input.image}
                    name='image'
                    placeholder='Write the link to your image'
                    maxlength="2048"
                    onChange={handleInputChange}
                    className={(input.image.length > 0 && error.image && 'title-input inputs-w') || 'inputs title-input'}
                />
            </div>
            <div>{input.image.length > 0 && error.image && (<p className='warning-text'>{error.image}</p>)}</div>
        </div>            
</form>

            {console.log(error)}
    
    {/* Botón CREATE */}
    <button className='create-btn' type='submit' form='create' disabled={!input.title || !input.summary || Object.values(error)?.length}>Create recipe</button>
    
    {(!input.title || !input.summary) && (<div className='warning-text'>* Please fill in all required fields</div>)}

    </div> 
    </div>   
    </div>)
}

export default Create;
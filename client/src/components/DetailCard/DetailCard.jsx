import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, resetDetail } from '../../actions'
import { Link } from 'react-router-dom';

import Error404 from '../Error404/Error404';
import Loader from '../Loader/Loader';
import NavBar from '../NavBar/NavBar';
import './detailCard.css';


const DetailCard = (props) => {
    const dispatch = useDispatch();
    const {id} = props.match.params;
    useEffect(() => {
        dispatch(getDetail(id))
        return () => dispatch(resetDetail()); // Así evito que quede cargada la anterior
    }, [dispatch, id])

    const selectedRecipe = useSelector(state => state.detail); // traigo el objeto detail que se crea con el dispatch de getDetail
   
    /* Transformor los arrays de diets y dishtypes a strings */
    const dietString = selectedRecipe.diets?.join(', ');
    const dishes = selectedRecipe.dishTypes?.join(', ');

    /* Seteo imágenes por default según algunos dishtypes */
    // Si por alguna razón la imagen llega null o con un length inválido:
    if(typeof selectedRecipe.image === 'object' || selectedRecipe.image?.length < 7) {
        // ['main course', 'breakfast', 'brunch','lunch', 'dinner', 'snack']
        if(selectedRecipe.dishTypes?.includes('dessert')) selectedRecipe.image = "https://i.postimg.cc/Pq2Y7JKK/place-Holder-dessert.jpg";
        else if(selectedRecipe.dishTypes?.includes('side dish')) selectedRecipe.image = "https://i.postimg.cc/MTHVJwFw/place-Holder-side-Dish.jpg";
        else if (selectedRecipe.dishTypes?.includes('snack')) selectedRecipe.image = "https://i.postimg.cc/nzW7HWyD/place-Holder-snack.jpg";
        else selectedRecipe.image = 'https://i.postimg.cc/3W5vGvJr/place-Holder-Image.jpg';
    }

// Si el reducer mandó un string significa que la receta a la que se quiere acceder por params no existe
if(typeof selectedRecipe === 'string') {return(
    <div>
        <div><NavBar/></div>
        <Error404/>
    </div> 
)} else return (
    <div>
    <NavBar/>
          

{  (Object.keys(selectedRecipe).length === 0) ? (<div className='home-body'><Loader/></div>) 
             : <div className='detail-page-body'>
             <div className='detail-body'>
                <div className='detail-container'>
                <div className='main-detail-info'>
                <div className='info-container'>

{/* Información principal del detail */}
        <div><img className='detail-image' src={selectedRecipe.image} alt='dish'/></div>
        
        <div className='info-block'>
        <div className='arrow'><Link to='/home'><button className='return-btn'><span className="material-symbols-outlined">keyboard_backspace</span></button></Link></div>
        
        <div className='detail-title'><h1>{selectedRecipe.title}</h1></div>
            <div className='detail-numeric-info'>
            { selectedRecipe.readyInMinutes && selectedRecipe.readyInMinutes !== 0 ? <h6><span className="health-minutes material-symbols-outlined">timer</span> Cooking time: {selectedRecipe.readyInMinutes} minutes</h6> : ''}
            { selectedRecipe.healthScore && selectedRecipe.healthScore !== 0 ? <h6><span className="health-minutes heart material-symbols-outlined">favorite</span>  This recipe has {selectedRecipe.healthScore} health points</h6> : ''}
            </div>

            <div className='diet-dish'> 
              { dietString ? <h6 className='diet-dish'><span>Diets:</span> {dietString}</h6> : <h6 className='diet-dish'>This recipe might be incompatible with some dietary restrictions</h6>}
              { dishes ? <h6 className='diet-dish'><span>Best for:</span> {dishes}</h6> : <h6 className='diet-dish'>Great for all courses</h6> }              
            </div>
        </div>
    </div>

{/* Tabs de summary e instructions   */}
    <div>
    <input className='tab' type='radio' name='tab' id='tab1'/>
    <label for='tab1' className='detail-tab'>Summary</label>
    <input className='tab' type='radio' name='tab' id='tab2'/>
    <label for='tab2' className='detail-tab'>Instructions</label>

    <div className='tab-body'>
      <div className='tab-detail'>
            <p className='detail-summary' dangerouslySetInnerHTML={{__html: selectedRecipe.summary}}/>
        </div>
    <div className='tab-detail'>
            {
                    selectedRecipe.instructions?.length ? (
                        selectedRecipe.instructions?.map(i => {
                            return(
                                <div>
                                    <ul className='detail-inst'>
                                        <li className='detail-step' key={i}>{i.number}. {i.step}</li>
                                    </ul>
                                </div>
                            )
                        })
                    ) : (
                        <h4>It seems this recipe has no instructions. Feel free to improvise</h4>
                    )
                } 
        </div>
        </div>
        </div>
        </div>
        </div>
        </div> 
        </div>} 
        </div>   
    )
}


export default DetailCard;
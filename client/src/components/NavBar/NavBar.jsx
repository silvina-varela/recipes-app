import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { search } from '../../actions';

import './nav.css';

const NavBar = ({handleGoHome}) => {
    const dispatch = useDispatch();

    // Estado inicial para la búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        // dispatch(search(e.target.value)); // Si quiero que busque a medida que tipeo
    }

    /* Búsqueda al apretar botón */
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(search(searchTerm));
               
        setSearchTerm('');
        setMenuOpen(false);
    }

    /* Búsqueda al apretar enter */
    const handleEnter = e => {
        e.preventDefault();
        if(e.key === 'Enter'){
            dispatch(search(searchTerm));
            setSearchTerm('');
            setMenuOpen(false);             
        }
    }


    /* para manejar el menú responsive */
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenu = e => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    }

    const handleNavClass = () => {
        let classes = 'navlinks'
        if(menuOpen){
            classes = 'active'
        }
        return classes;
    }

    const handleMenuIcon = () => {
        if(menuOpen){
           return (
            <div className='menu'>
                <div className='menu-x'><span className="material-symbols-outlined">close</span></div>
            </div>
           )
        }else{
           return (
            <div className='menu'>
                    <div className='menu-plus'><span className="material-symbols-outlined">close</span></div>
            </div>
           )
        }
    }
    

    return (
        <div className='fixed-menu'>
        <nav className='navBar'>
            
            <button className='web-title noselect' onClick={handleGoHome}><Link to='/home'>the meal finder</Link></button>
            <div className={handleNavClass()}>
                <li className='link noselect'><Link to='/create'>CREATE</Link></li>
                <div className='search-box'>
                    <input className='input-text' type='text' placeholder='Search' value={searchTerm} onChange={handleChange} onKeyUp={handleEnter}/>
                    <button className='searchButtom noselect' type='submit' onClick={handleSubmit}><span className="searchButtom material-symbols-outlined">search</span></button>
                </div>
                
            </div>
            <div className='toggle' onClick={handleMenu}>
                {handleMenuIcon()}
            </div>
        </nav>
        </div>
    )

}

export default NavBar;
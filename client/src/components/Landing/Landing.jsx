import React from 'react';
import { Link } from 'react-router-dom';

import "./landing.css";

const Landing = () => {
    return(
        <div className='landing-bg'>
            <div className='container'>
            <h1 className='title'>the meal finder</h1>
            <h3 className='info-text'>Search through thousands of recipes and find your next great meal</h3>
            <Link to='/home'>
                <button className='explore-btn'>Explore</button>
            </Link>
            </div>
        </div>
      
    )
}

export default Landing;
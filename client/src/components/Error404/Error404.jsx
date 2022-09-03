import { React } from 'react';
import { Link } from 'react-router-dom';

import "./error404.css";


const Error404 = () => {
    return(
        <div className='home-body error404'>
            <h1 className='not-found'>Page Not Found :/</h1>
            <Link to="/home"><button className='error-btn'>Go back</button></Link>
            
        </div>
    )
}

export default Error404;

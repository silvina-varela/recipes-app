import React from 'react';
import './loader.css';

const Loader = () => {
    return(
        <div className='loader'>
            <span className='load-dot'></span>
            <span className='load-dot'></span>
            <span className='load-dot'></span>
            <span className='load-dot'></span>
            <span className='load-dot'></span>
        </div>
    )
}

export default Loader;
import { React } from 'react';
import NavBar from '../NavBar/NavBar';


const Error404 = () => {
    return(
        <div>
            <h1 className='home-body not-found'>Page Not Found :/</h1>
            <Link to='/home'>
                <button className='error-btn'>Go back</button>
            </Link>
        </div>
    )
}

export default Error404;

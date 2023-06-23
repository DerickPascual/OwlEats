import './Header.css'
import {useNavigate } from 'react-router-dom';

function Header({ button }) {
    const navigate = useNavigate();

    const handleHomeRedirect = () => {
        navigate('/home');
    };

    return (
        <div className='header' >
            <h2><a className='header-anchor' onClick={handleHomeRedirect}>Rice Menus</a></h2>
            <div>{button}</div>
        </div>
    );
}

export default Header;
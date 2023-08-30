import './Footer.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Footer() {
    const navigate = useNavigate();

    const handleTOSNavigate = () => {
        navigate('/tos-and-privacy-policy');
    };

    return (
        <div className="footer">
            <h3><a className="tos-navigate" onClick={handleTOSNavigate}>Terms of Service and Privacy Policy</a></h3>
        </div>
    )
}

export default Footer;
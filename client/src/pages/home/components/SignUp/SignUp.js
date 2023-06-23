import './SignUp.css';
import { useState } from 'react';
import PhoneNumberInput from '../../../../shared_components/PhoneNumberInput/PhoneNumberInput';
import { isValidPhoneNumber } from 'libphonenumber-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [phoneNumber, setPhoneNumber] = useState();
    const [inputError, setInputError] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPhone = `+${phoneNumber}`;
        if (!isValidPhoneNumber(parsedPhone)) {
            setInputError('Invalid phone number');
            return;
        }

        axios.post('/api/register', {
            phoneNumber: parsedPhone
        }, { withCredentials: true })
            .then(() => {
                navigate('/verify');
            }).catch((err) => {
                setInputError(err.response.data.error.message);
            })
    }


    return (
        <div className='SignUp-hero--container'>
            <div className='SignUp-hero--left'>
                <h1 className='SignUp-hero--title'>Get servery menus texted to you everyday at 10:00 am and 4:00 pm</h1>
                <h2 className='SignUp-hero--body'>Choose your serveries and filter menu items</h2>
                <form>
                    <div className='SignUp-hero--form-container'>
                        <PhoneNumberInput
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber} />
                        <button
                            className='SignUp-hero--form-button'
                            onClick={handleSubmit}
                        >
                            Sign up
                        </button>
                    </div>
                    <div className='SignUp-error'>
                        {inputError}
                    </div>
                </form>
            </div>
            <div>
                <img className='SignUp-hero--image' src={require('../../../../images/dinner_text.jpg')} />
            </div>
        </div>
    )
}

export default SignUp;
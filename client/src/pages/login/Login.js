import './Login.css';
import Header from '../../shared_components/Header/Header';
import PhoneNumberInput from '../../shared_components/PhoneNumberInput/PhoneNumberInput';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useState, useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import axios from 'axios';

export function Login() {
    const [phoneNumber, setPhoneNumber] = useState();
    const [inputError, setInputError] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedPhone = `+${phoneNumber}`
        if (!isValidPhoneNumber(parsedPhone)) {
            setInputError('Invalid phone number');
            return;
        }
        // more error checks

        axios.post('/api/login', {
            phoneNumber: parsedPhone
        }, { withCredentials: true }).then((response) => {
            setInputError();
            navigate('/settings');
        }).catch((err) => {
            setInputError(err.response.data.error.message);
        });
    }

    const handleSignUp = () => {
        navigate('/home');
    }

    return (
        <div>
            <Header />
            <div className='login-platform'>
                <div>
                    <h1>Enter your phone number</h1>
                    <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                    <div className='login-button-container'>
                        <button onClick={handleSubmit} className='login-button'>Login</button>
                        <div className='login-error'>
                            {inputError && inputError}
                        </div>
                    </div>
                    <h4 style={{ color: 'rgb(175, 175, 175)' }}>Not registered? <a className='login-sign-up-anchor' onClick={handleSignUp}>Sign up</a></h4>
                </div>
            </div>
        </div>
    )
}

export async function LoginLoader() {
    const res = await axios.get('/api/session', { withCredentials: true });

    if (res.data) {
        return redirect ('/settings');
    }

    return null;
}
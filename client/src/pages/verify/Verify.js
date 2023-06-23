import Header from '../../shared_components/Header/Header';
import './Verify.css'
import { useState } from 'react';
import { redirect, useNavigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';

export function Verify() {
    const phoneNumber = useLoaderData();
    const [verificationCode, setVerificationCode] = useState('');
    const [inputError, setInputError] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!parseInt(verificationCode) || verificationCode.length !== 6) {
            setInputError('Invalid verification code');
            return;
        }

        axios.post('/api/verify', {
            verificationCode: verificationCode
        }, { withCredentials: true })
            .then(() => {
                navigate('/settings');
            })
            .catch((err) => {
                setInputError(err.response.data.error.message);
            })
    }

    return (
        <div>
            <Header />
            <div className='verify-form-container'>
                <div>
                    <h1>Enter your verification code</h1>
                    <div className='verify-button--container'>
                        <div>
                            <input 
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className='verify-input'
                                maxLength={6}
                            ></input>
                        </div>
                        <button className='verify-button' onClick={handleSubmit}>Submit</button>
                        <div className='verify-error'>
                            {inputError && inputError}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function VerifyLoader() {
    const res = await axios.get('/api/register', { withCredentials: true });

    if (!res.data.inVerification || !res.data.phoneNumber) {
        return redirect('/home');
    }

    return res.data.phoneNumber;
}
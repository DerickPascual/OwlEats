import HeaderButton from '../../shared_components/HeaderButton/HeaderButton';
import Header from '../../shared_components/Header/Header';
import Footer from '../../shared_components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import './Home.css'
import { useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export function Home() {
    const navigate = useNavigate();

    const handleSignInRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <Header button={<HeaderButton label={'Sign in'} handler={handleSignInRedirect} />}/>
            <SignUp/>
            <Footer />
        </div>
    )
}

export async function HomeLoader() {
    const res = await axios.get('/api/session', {
        withCredentials: true
    });

    if (res.data) {
        return redirect('/settings');
    }

    return null;
}
import Header from '../../shared_components/Header/Header';
import './Settings.css';
import ServeriesSettings from './components/ServeriesSettings/ServeriesSettings';
import DietPrefSettings from './components/DietPrefSettings/DietPrefSettings';
import AllergenSettings from './components/AllergenSettings/AllergenSettings';
import HeaderButton from '../../shared_components/HeaderButton/HeaderButton';
import { redirect, useNavigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function Settings() {
    const user = useLoaderData();
    const [serveries, setServeries] = useState(user.serveries);
    const [diets, setDiets] = useState(user.diets);
    const [allergens, setAllergens] = useState(user.allergens);
    const [success, setSuccess] = useState(sessionStorage.getItem("showSuccess"));
    const [error, setError] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            sessionStorage.setItem("showSuccess", "");
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        axios.patch('/api/users', {
            serveries: serveries,
            diets: diets,
            allergens: allergens
        }, { withCredentials: true })
            .then(() => {
                sessionStorage.setItem("showSuccess", "Settings saved!");
                window.location.reload();
            }).catch((err) => {
                console.error(err);
                setError(err.message);
            })
    };

    const handleSignOut = (e) => {
        e.preventDefault();

        axios.post('/api/session', {}, { withCredentials: true })
            .then(() => {
                navigate('/home');
            }).catch((err) => {
                console.error(err);
                setError(err.message);
            })
    };

    const handleUnsubscribe = (e) => {
        e.preventDefault();

        axios.delete('/api/users', { withCredentials: true })
            .then(() => {
                navigate('/home');
            }).catch((err) => {
                console.error(err);
                setError(err.message);
            })
    }

    return (
        <div>
            <Header button={<HeaderButton label={'Sign out'} handler={handleSignOut} />} />
            <h1>Settings</h1>
            {success && <p style={{color: 'green'}}>{success}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className='settings-subtext'>
                <h3>Make sure to press the save button at the bottom of the page to save your settings!</h3>
            </div>
            <hr />
            <ServeriesSettings checkedServeries={serveries} setCheckedServeries={setServeries} />
            <hr />
            <DietPrefSettings checkedDiets={diets} setCheckedDiets={setDiets} />
            <hr />
            <AllergenSettings checkedAllergens={allergens} setCheckedAllergens={setAllergens} />
            <hr />
            <h2>Note about diet and allergen filtering:</h2>
            <div className='settings-subtext'>
                <h3>Rice Menus gets its diet and allergen data from the Rice dining web pages. Although highly unlikely, inaccurate dietary or allergen info may occur. If you're using this feature, please make sure to double check with the physical servery menus!</h3>
            </div>
            <hr />
            <div className='settings-bottom-container'>
                <div className='settings-submit-button-container'>
                    <button className='settings-submit-button' onClick={handleSave}>Save</button>
                </div>
                <div className='settings-unsubscribe-container'>
                    <button className='settings-unsubscribe-button' onClick={handleUnsubscribe}>Unsubscribe</button>
                </div>
            </div>
        </div>
    )
}

export async function SettingsLoader() {
    const res = await axios.get('/api/session', { withCredentials: true });

    if (!res.data) {
        return redirect('/login');
    }

    return res.data;
}
